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
        <el-table-column prop="status" align="center"  label="分销二维码"></el-table-column>
         <el-table-column prop="status" align="center"  label="分销码"></el-table-column>
         <el-table-column prop="status" align="center"  label="已提现"></el-table-column>
         <el-table-column prop="status" align="center"  label="待提现"></el-table-column>
         <el-table-column prop="status" align="center"  label="总收入"></el-table-column>
         <el-table-column prop="status" align="center"  label="状态"></el-table-column>
         <el-table-column prop="status" align="center"  label="绑定的下线"></el-table-column>
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
    <distributorManagementEdit ref="edit"></distributorManagementEdit>
  </el-container>
</template>
<script>
import distributorManagementEdit from "./distributorManagementEdit.vue";
export default {
  components: {
    distributorManagementEdit,
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