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
          <el-input v-model="formInline.user" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleTable">搜索</el-button>
          <!-- <el-button @click="Addbtn">新增商品</el-button> -->
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="merchandiseName"
          label="姓名"
          width="100"
        ></el-table-column>
        <el-table-column prop="address" align="center"  label="手机号"></el-table-column>
        <el-table-column prop="status" align="center"  label="公司名称"></el-table-column>
         <el-table-column prop="status" align="center"  label="上级分销码"></el-table-column>
         <el-table-column prop="status" align="center"  label="公司地址"></el-table-column>
         <el-table-column prop="status" align="center"  label="职务"></el-table-column>
         <el-table-column prop="status" align="center"  label="历史订单数"></el-table-column>
        <el-table-column prop="address" label="操作" align="center" width="380">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button
              class="red" type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >禁言</el-button
            >
            <el-button
              class="red" type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >开通分销员权限</el-button
            >
            <el-button
              class="red" type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >修改分销码</el-button
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
    </el-main>
    <demandManagementEdit ref="edit"></demandManagementEdit>
  </el-container>
</template>
<script>
import demandManagementEdit from "./demandManagementEdit.vue";
export default {
  components: {
    demandManagementEdit,
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
      this.$refs.edit.dialogVisible = true
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