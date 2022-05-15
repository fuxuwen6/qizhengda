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
      <div class="edit_header">当前位置:编辑供应商</div>
      <div class="tabs_class">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form ref="form" :model="supplierList" label-width="120px">
                  <el-form-item label="供应商名称">
                    <el-input v-model="supplierList.supplierName"></el-input>
                  </el-form-item>
                  <el-form-item label="供应商账号">
                    <el-input v-model="supplierList.account"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="供应商密码">
                    <el-input v-model="supplierList.password"></el-input>
                  </el-form-item> -->
                  <el-form-item label="供应商手机号">
                    <el-input v-model="supplierList.telPhone"></el-input>
                  </el-form-item>
                  <el-form-item label="供应商分类">
                    <el-select
                      v-model="supplierList.classId"
                      multiple
                      placeholder="请选择"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="供应商排序">
                    <el-input v-model="supplierList.manageDesc"></el-input>
                  </el-form-item>
                  <el-form-item label="供应商简介">
                    <el-input v-model="supplierList.supplierInfo"></el-input>
                  </el-form-item>
                  <el-form-item label="供应商图片">
                    <el-upload
                      class="upload-demo"
                      :action="$axios.url + '/doc/fileUpload'"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="supplier_img_urlList"
                      :on-success="successUpload"
                      list-type="picture"
                    >
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                      <!-- <div slot="tip" class="el-upload__tip">
                        只能上传jpg/png文件，且不超过500kb
                      </div>-->
                    </el-upload>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="客户评价管理" name="second">
            <div class="mt_table">
              <el-table :data="supplierList.queryMessages" style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="180"
                ></el-table-column>
                <el-table-column
                  prop="sId"
                  label="ID"
                  width="180"
                ></el-table-column>
                <el-table-column prop="mPic" label="图片">
                  <template slot-scope="scope">
                    <div v-for="item in scope.row.mPic.split(',')" :key="item">
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="$axios.url + item"
                        :fit="fit"
                      ></el-image>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="cTime"
                  label="评价日期"
                ></el-table-column>
                <el-table-column prop="mText" label="内容"></el-table-column>
                <el-table-column prop="operation" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      icon="el-icon-edit"
                      @click="handleEdit(scope.$index, scope.row)"
                      >审核拒绝</el-button
                    >
                    <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleEdit(scope.$index, scope.row)"
                      >审核通过</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="提成/分成" name="third">
            <el-row :gutter="20">
              <el-col :span="16">
                <div class="gray_input">
                  <el-form ref="form" :model="supplierList" label-width="120px">
                    <el-form-item label="分销员提成" class="noMargin">
                      <el-input v-model="supplierList.commission.promotionCommission">
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>

                    <el-form-item class="noMargin TIPS"
                      >交易担保金额的一定比例作为提成佣金</el-form-item
                    >
                  </el-form>
                </div>
                <div class="gray_input">
                  <el-form ref="form" :model="supplierList" label-width="120px">
                    <el-form-item label="平台提成" class="noMargin">
                      <el-input v-model="supplierList.commission.platformCommission">
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>

                    <el-form-item class="noMargin TIPS"
                      >交易担保金额的一定比例作为提成佣金</el-form-item
                    >
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="服务区域" name="fourth">
            <el-row :gutter="20">
              <el-col :span="16">
                <div
                  class="gray_input"
                  style="
                    background-color: inherit;
                    border: 1px solid rgba(187, 187, 187, 100);
                  "
                >
                  <el-form ref="form" :model="supplierList" label-width="120px">
                    <el-form-item label="服务区域:全部" class="noMargin">
                      <v-region @values="regionChange"></v-region>
                    </el-form-item>

                    <el-form-item class="noMargin TIPS"
                      >交易担保金额的一定比例作为提成佣金</el-form-item
                    >
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>

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
      activeName: "first",
      supplierList: {
        account: "",
        classId: null,
        code: null,
        commission: [],
        company: null,
        companyName: null,
        cperson: null,
        ctime: null,
        docId: null,
        email: null,
        id: 2,
        idCard: null,
        lastLoginTime: null,
        manageDesc: 3,
        mark: null,
        nickname: null,
        pageNo: null,
        pageSize: null,
        pkUid: null,
        preCode: null,
        pswd: null,
        qrCode: null,
        queryMessages: [],
        realName: null,
        smsType: null,
        status: null,
        supplierAddress: null,
        supplierId: null,
        supplierImgUrl: null,
        supplierInfo: null,
        supplierName: null,
        supplierPhone: null,
        telPhone: null,
        uperson: null,
        urlMethod: null,
        userId: null,
        userOrder: null,
        userType: null,
        utime: null,
      },
      supplier_img_urlList: [],
      options: [],
      value1: [],
      value2: [],
      fileList: [],
      tableData: [],
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    regionChange(data) {
      console.log(data);
    },
    successUpload(response, file, fileLis) {
      if (response.code == 200) {
        this.supplier_img_urlList = fileLis;
      }
    },
    openEdit(row) {
      this.dialogVisible = true;
      Object.keys(this.supplierList).forEach((item) => {
        // debugger;
        this.supplierList[item] = Array.isArray(row[item])
          ? row[item].map((t) => ({ ...t }))
          : row[item] && typeof row[item] === "object"
          ? { ...row[item] }
          : row[item];
      });
      // debugger
    },
    //客户评价管理修改
    handleEdit(index, row) {
      this.$apiFun.updateMessage({ id: row.id }).then((res) => {
        this.$message.success("修改成功");
      });
    },
    saveCommManagement() {
      console.log(this.activeName);
      if (this.activeName == "first") {
        let fromList = {
          supplierAddress: this.supplierList.supplierAddress,
          account: this.supplierList.account,
          supplierImgUrl: this.supplierList.supplierImgUrl,
          supplierInfo: this.supplierList.supplierInfo,
          supplierName: this.supplierList.supplierName,
          supplierPhone: this.supplierList.supplierPhone,
          telPhone: this.supplierList.telPhone,
          id: this.supplierList.id,
          manageDesc: this.supplierList.manageDesc,
          // classId: this.supplierList.classId,
        };
        this.$apiFun.updateSupplierManage(fromList).then((res) => {
          if (res.code == "200") {
            console.log(res);
            this.$message.success("保存成功");
            this.$emit("search");
          }
        });
      }else if(this.activeName == "third"){
        this.$apiFun.updateMessage(this.supplierList.commission).then(res => {
          if(res.code == 200){
            this.$message.success('修改成功')
          }
        })
      }
      // let arr = []
      // this.supplier_img_urlList.map((item) => {
      //   if (item && item.response) {
      //     arr.push(item.response.data.pkFid);
      //   }
      // });
      // if(this.supplierList.supplierImgUrl && arr){
      //   this.supplierList.supplierImgUrl = this.supplierList.supplierImgUrl + ',' +  arr.toString();
      // }else if(arr[1]){
      //   this.supplierList.supplierImgUrl =    arr.toString();
      // }

      // if(this.supplierList.classId) this.supplierList.classId = this.supplierList.classId.toString();
      // if (this.supplierList.id) {
      //   this.$apiFun.updateSupplierManage(this.supplierList).then((res) => {
      //     if (res.code == "200") {
      //       console.log(res);
      //       this.$message.success('保存成功');
      //       this.$emit('search')
      //     }
      //   });
      // }
    },
  },
};
</script>

<style>
</style>