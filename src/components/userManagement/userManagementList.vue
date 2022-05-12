<template>
  <el-container class="listWrap">
    <el-header style="height: auto">
      <el-form
        :inline="true"
        style="margin: 60px 0 5px 0; text-align: left"
        :model="formInline"
        class="demo-form-inline"
      >
        <!-- <el-form-item>
          <el-input v-model="formInline.user" placeholder="姓名"></el-input>
        </el-form-item> -->
        <!-- <el-form-item>
          <el-input v-model="formInline.user" placeholder="手机号"></el-input>
        </el-form-item> -->
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
          prop="nickname"
          label="姓名"
          width="100"
        ></el-table-column>
        <el-table-column prop="realName" align="center"  label="手机号"></el-table-column>
        <el-table-column prop="status" align="center"  label="公司名称"></el-table-column>
         <!-- <el-table-column prop="status" align="center"  label="上级分销码"></el-table-column> -->
         <el-table-column prop="pkRid" align="center"  label="是否开通分销员权限">
           <template slot-scope="scope">
             {{scope.row.pkRid ==4?"是":"否" }}
           </template>
         </el-table-column>
         <el-table-column prop="companyName" align="center"  label="公司地址"></el-table-column>
         <!-- <el-table-column prop="status" align="center"  label="用户类型"></el-table-column> -->
         <!-- <el-table-column prop="status" align="center"  label="历史订单数"></el-table-column> -->
        <el-table-column prop="address" label="操作" align="center" width="380">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)"
              >查看</el-button
            >
            <!-- <el-button
              class="red" type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >禁言</el-button
            > -->
            <el-button
              class="red" type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >开通分销员权限</el-button
            >
            <!-- <el-button
              class="red" type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >修改分销码</el-button
            > -->
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
    <userManagementEdit ref="edit"></userManagementEdit>
  </el-container>
</template>
<script>
import userManagementEdit from "./userManagementEdit.vue";
export default {
  components: {
    userManagementEdit,
  },
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      pkUid:'',
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
      this.$apiFun.userDetail(row.pkUid).then((res) => {
        if (res.code == 200) {
          this.$refs.edit.openEdit(res.data,row.pkUid)
        }
      });
    },

    handleDelete(i,row) {
      // apiFun.updateCodeList
      this.$apiFun.updateCodeList({pkUid:row.pkUid}).then((res) => {
        // console.log(res.data);
        if (res.code == 200) {
          this.$message.success('修改成功')
          // this.tableData = res.data.list;
          // this.totalrecord = res.data.total;
        }
      });
    },
    handleTable() {
      this.$apiFun.userList(this.currentPage1, 20).then((res) => {
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