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
          <el-input
            v-model="formInline.user"
            placeholder="经销商名称"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleTable">搜索</el-button>
          <el-button @click="Addbtn">新增</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index"  label="序号" width="180">
        </el-table-column>
        <el-table-column prop="supplierName" label="经销商名称" width="180">
        </el-table-column>
        <el-table-column prop="supplierAddress" label="经销商地址"> </el-table-column>
        <el-table-column prop="ctime" :formatter="dataTime" label="创建日期"> </el-table-column>
        <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
                <el-button   @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button   class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="totalrecord"
        :current-page.sync="currentPage1"
        @current-change="handleTable"
        :page-size="20"
      >
      </el-pagination>
    </el-main>
    <supplierTableEdit ref="edit" @search="handleTable"></supplierTableEdit>
  </el-container>
</template>
<script>
import supplierTableEdit from './supplierTableEdit.vue'
import * as fecha from "element-ui/lib/utils/date";
export default {
  components:{
    supplierTableEdit
  },
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      totalrecord: 0,
      currentPage1: 1,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    Addbtn() {},


    handleEdit(i,row){
      this.$refs.edit.openEdit(row)
      // this.$refs.edit.dialogVisible = true
    },

    handleDelete(){

    },
    dataTime(row, column, cellValue) {
      return cellValue ? fecha.format(new Date(cellValue), "yyyy-MM-dd") : "";
    },
    handleTable(){
      this.$apiFun.getAllAndroidPlugins(this.currentPage1, 20,this.formInline.user).then(res => {
      console.log(res.data)
      this.tableData = res.data.list
    })
    }
  },
  mounted(){
   this.handleTable()
    
  }
};
</script>
<style lang="scss" scoped>
.el-container{
    height: 100%;
}
</style>