<template>
  <el-container class="listWrap">
    <el-header style="height: auto">
      <el-form
        :inline="true"
        style="margin: 60px 0 5px 0; text-align: left"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item>
          <el-input v-model="formInline.orderCode" placeholder="订单编号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleTable">搜索</el-button>
          <el-button @click="exportData">导出</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部订单" name="first"></el-tab-pane>
        <el-tab-pane label="待付款" name="two"></el-tab-pane>
        <el-tab-pane label="待发货" name="three"></el-tab-pane>
        <el-tab-pane label="待收货" name="four"></el-tab-pane>
        <el-tab-pane label="待退款" name="five"></el-tab-pane>
        <el-tab-pane label="已退款" name="six"></el-tab-pane>
      </el-tabs>
      <el-table :data="tableData" style="width: 100%"  id="outTable">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="orderName" label="订单名称" width="180"></el-table-column>
        <el-table-column prop="orderCode" label="订单号"></el-table-column>
        <el-table-column prop="number" label="数量"></el-table-column>
        <el-table-column prop="consignee" label="收货人信息"></el-table-column>
        <el-table-column prop="utime" :formatter="dataTime" label="下单时间"></el-table-column>
        <el-table-column prop="orderType" label="订单状态"></el-table-column>
        <el-table-column prop="supplierId" label="供应商"></el-table-column>
        <el-table-column prop="address" class="operation" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="prev, pager, next"
        :total="totalrecord"
        :current-page.sync="currentPage1"
        @current-change="handleTable"
        :page-size="20"
      ></el-pagination>
    </el-main>
    <orderManagementEdit ref="edit"></orderManagementEdit>
  </el-container>
</template>
<script>
import orderManagementEdit from "./orderManagementEdit.vue";
import * as fecha from "element-ui/lib/utils/date";
export default {
  components: {
    orderManagementEdit
  },
  data() {
    return {
      formInline: {
        orderCode: null,
        orderType: null
      },
      activeName: "first",
      pkUid: "",
      tableData: [],
      totalrecord: 0,
      currentPage1: 1
    };
  },
  methods: {
    Addbtn() {
      this.$refs.edit.resetForm();
      this.$refs.edit.dialogVisible = true;
    },

    handleEdit(index, row) {
      // debugger
      this.$apiFun.queryOrder(row.pkOid).then(res => {
        // debugger
        this.$refs.edit.openEdit(res.data);
      })
      
    },
    //切换table标签
    handleClick(tab, event) {
      if(tab.index == 0){
        this.formInline.orderType = null
      }else{
        this.formInline.orderType = tab.index
      }
        
        this.handleTable()
    },
    handleDelete(i, row) {
      // apiFun.updateCodeList
      this.$apiFun.updateCodeList({ pkUid: row.pkUid }).then(res => {
        // console.log(res.data);
        if (res.code == 200) {
          this.$message.success("修改成功");
          // this.tableData = res.data.list;
          // this.totalrecord = res.data.total;
        }
      });
    },
    handleTable() {
      this.$apiFun.handleOrderList(
        {pageNo:this.currentPage1,pageSize: 20,orderCode:this.formInline.orderCode,orderType:this.formInline.orderType}
        ).then(res => {
        // console.log(res.data);
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.totalrecord = res.data.total;
        }
      });
    },
    //导出

    //导出功能
    exportData() {
      // debugger
      let excelName = "订单管理.xlsx";
      var xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      // 克隆节点
      let tables = document.getElementById("outTable").cloneNode(true);

      // 判断是否为固定列，解决（为固定列时，会重复生成表格）
      if (tables.querySelector(".el-table__fixed") !== null) {
        tables.removeChild(tables.querySelector(".el-table__fixed"));
      }
     let tableHeader = tables.querySelector('.el-table__header-wrapper');
        let tableBody = tables.querySelector('.el-table__body');
        tableHeader.childNodes[0].append(tableBody.childNodes[1]);
        let headerDom = tableHeader.childNodes[0].querySelectorAll('th');
        // 移除左侧checkbox的节点
        // if (headerDom[0].querySelectorAll('.el-checkbox')) {
        //     headerDom[0].remove();
        // }
        for (let key in headerDom) {
            if (headerDom[key].innerText === '操作') {
                headerDom[key].remove();
            }
        }
      
      // 清理掉checkbox 和操作的button
        let tableList = tableHeader.childNodes[0].childNodes[2].querySelectorAll('td');
        for (let key = 0; key < tableList.length; key++) {
            if ( tableList[key].querySelectorAll('.el-button').length > 0) {
                tableList[key].remove();
            }
        }
      const XLSX = require('xlsx')
      let table_book = XLSX.utils.table_to_book(tables, xlsxParam);
      var table_write = XLSX.write(table_book, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        this.$FileSaver.saveAs(
          new Blob([table_write], { type: "application/octet-stream" }),
          excelName
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, table_write);
      }
      return table_write;
    },

    dataTime(row, column, cellValue) {
      return cellValue ? fecha.format(new Date(cellValue), "yyyy-MM-dd") : "";
    }
  },
  mounted() {
    this.handleTable();
  }
};
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
}
</style>