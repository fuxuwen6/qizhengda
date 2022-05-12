<template>
  <div class="editWarp">
    <el-dialog
      title="提示"
      :modal-append-to-body="false"
      :show-close="false"
      :close-on-click-modal="false"
      :modal="false"
      fullscreen
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      custom-class="dialog-no-header"
    >
      <div class="edit_header">当前位置:用户管理</div>
      <el-row :gutter="20" style="margin-top:30px">
        <el-col :span="16">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.name" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="分销二维码">
              <el-input v-model="form.name" placeholder="请输入分销二维码"></el-input>
            </el-form-item>
            <el-form-item label="分销码">
               
            </el-form-item>
            <el-form-item label="已提现">
               
            </el-form-item>
            <el-form-item label="待提现">
               
            </el-form-item>
            <el-form-item label="总收入">
               
            </el-form-item>
            <el-form-item label="状态">
               
            </el-form-item>
            <el-form-item label="绑定的用户列表"></el-form-item>
          </el-form>
        </el-col>
        <el-col :span="20" style="margin-left:80px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="merchandiseName" label="姓名" width="100"></el-table-column>
            <el-table-column prop="address" align="center" label="电话"></el-table-column>
            <el-table-column prop="status" align="center" label="职务"></el-table-column>
            <el-table-column prop="status" align="center" label="公司地址"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">返回列表</el-button>
        <el-button type="primary" @click="saveCommManagement">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      form: {
        merchandiseName: "", //商品名称
        pictureWeb: "", //首页商品大图
        pictureApp: "" //商品图片
      }
    };
  },
  methods: {
    handleClose(done) {},
    openEdit(row, id) {
      this.dialogVisible = true;
      Object.keys(this.form).forEach(item => {
        // debugger;
        this.form[item] = Array.isArray(row[item])
          ? row[item].map(t => ({ ...t }))
          : row[item] && typeof row[item] === "object"
          ? { ...row[item] }
          : row[item];
      });

      this.form.cNumber = id;
    },
    //重置表单
    resetForm() {
      this.form = {
        merchandiseName: "", //商品名称
        pictureWeb: "", //首页商品大图
        pictureApp: "", //商品图片
        brand: "", //品牌
        merchandisePrice: "" //商品价格
      };
    },
    //新增商品信息
    saveCommManagement() {
      if (this.form.cNumber) {
        this.$apiFun.updateCommodity(this.form).then(res => {
          if (res.code == "200") {
            console.log(res);
            this.$message.success("保存成功");
          }
        });
      } else {
        this.$apiFun.addCommodity(this.form).then(res => {
          if (res.code == "200") {
            console.log(res);
            this.$message.success("保存成功");
          }
        });
      }
    }
  },
  mounted() {}
};
</script>

<style>
</style>