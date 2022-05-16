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
          <el-input v-model="formInline.user" placeholder="商品名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleTable">搜索</el-button>
          <el-button @click="Addbtn">新增商品</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="merchandiseName"
          label="商品名称"
          width="180"
        ></el-table-column>
        <el-table-column prop="address" label="商品价格"></el-table-column>
        <el-table-column prop="status" label="库存"></el-table-column>
        <el-table-column prop="date" label="上架状态">
          <template slot-scope="scope">
            {{ scope.row.status ? "上架" : "下架" }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="date" label="服务方式">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)"
              >服务上门</el-button
            >
            <el-button
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >快递配送</el-button
            >
          </template>
        </el-table-column> -->
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
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
      <!-- <el-pagination
        @current-change="handleCurrentPageChange"
        layout="prev, pager, next"
        :total="pageInfo.totalCount"
        :page-size="pageInfo.pageSize"
      ></el-pagination>-->
    </el-main>
    <commManagementEdit ref="edit" @search="handleTable"></commManagementEdit>
  </el-container>
</template>
<script>
import commManagementEdit from "./commManagementEdit.vue";

export default {
  components: {
    commManagementEdit,
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
    Addbtn() {
      this.$refs.edit.resetForm()
      this.$refs.edit.dialogVisible = true;
    },

    handleEdit(index, row) {
      this.$apiFun.queryCommodity(row.cNumber).then((res) => {
        if (res.code == 200) {
          console.log(res);
          this.$refs.edit.openEdit(res.data,row.cNumber);
        }
      });
    },

    handleDelete() {},
    handleTable() {
      this.$apiFun.queryCommodityAll(this.currentPage1, 20, this.formInline.user).then((res) => {
        // console.log(res.data);
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.totalrecord = res.data.total;
        }
      });
    },
  },
  mounted() {
    this.handleTable()
  },
};
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
}
</style>