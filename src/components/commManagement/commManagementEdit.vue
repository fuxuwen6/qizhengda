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
      <div class="edit_header">当前位置:编辑商品</div>
      <div class="tabs_class">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form ref="form" :model="supplierList" label-width="120px">
                  <el-form-item label="商品名称">
                    <el-input v-model="supplierList.merchandiseName"></el-input>
                  </el-form-item>
                  <el-form-item label="商品价格">
                    <el-input
                      v-model="supplierList.merchandisePrice"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <el-select
                      v-model="supplierList.categoryId"
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
                  <el-form-item label="商品排序">
                    <el-input v-model="supplierList.sort"></el-input>
                  </el-form-item>
                  <el-form-item label="商品简介">
                    <el-input v-model="supplierList.cIntroduction"></el-input>
                  </el-form-item>
                  <el-form-item label="首页商品大图">
                    <el-upload
                      class="upload-demo"
                      :action="$axios.url + '/doc/fileUpload'"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :on-success="successUpload"
                      :file-list="pictureWebList"
                      list-type="picture"
                    >
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="商品图片">
                    <el-upload
                      class="upload-demo"
                      :action="$axios.url + '/doc/fileUpload'"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="pictureAppList"
                      :on-success="successUploadS"
                      list-type="picture"
                    >
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="选择供应商">
                    <el-input
                      v-model="supplierList.brand"
                      @click="dialogTable = true"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="商品库存" name="kucun">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form ref="form" :model="supplierList" label-width="120px">
                  <el-form-item label="商品编号">
                    <el-input
                      v-model="supplierList.cNumber"
                      disabled
                      placeholder="商品编号自动生成"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="重量">
                    <el-input v-model="supplierList.weight"></el-input>
                  </el-form-item>
                  <el-form-item label="库存">
                    <el-input v-model="supplierList.inventory"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="商品详情" name="second">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form ref="form" :model="supplierList" label-width="120px">
                  <el-form-item label="商品详情">
                    <el-upload
                      class="upload-demo"
                      :action="$axios.url + '/doc/fileUpload'"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="supplier_img_urlList"
                      :on-success="successUploadST"
                      list-type="picture"
                    >
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                    </el-upload>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="提成/分成" name="third">
            <el-row :gutter="20">
              <el-col :span="16">
                <div class="gray_input">
                  <el-form ref="form" :model="supplierList" label-width="120px">
                    <el-form-item label="分销员提成" class="noMargin">
                      <el-input v-model="supplierList.promotionCommission">
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
                      <el-input v-model="supplierList.platformCommission">
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
          <el-tab-pane label="服务方式" name="fiveth">
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
                    <el-form-item label="服务方式" class="noMargin">
                      <el-radio v-model="supplierList.model" :label="0"
                        >同城上门</el-radio
                      >
                      <el-radio v-model="supplierList.model" :label="1"
                        >快递配送
                      </el-radio>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="服务区域" name="fourth">
            <el-row :gutter="20">
              <el-col :span="16">
                <div
                  class="gray_input addressInput"
                  style="
                    background-color: inherit;
                    border: 1px solid rgba(187, 187, 187, 100);
                  "
                >
                  <el-form ref="form" :model="supplierList" label-width="120px">
                    <el-form-item label="服务区域:全部" class="noMargin">
                      <v-region
                        v-model="selected"
                        @values="regionChange"
                      ></v-region>
                      <el-input
                        v-model="supplierList.address"
                        placeholder="具体服务区域"
                      ></el-input>
                    </el-form-item>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogTable"
      width="30%"
      :before-close="(dialogTable = false)"
    >
      <el-table :data="listData" style="width: 100%">
        <el-table-column prop="date" label="ID名称" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="供应商"> </el-table-column>
        <el-table-column prop="address" label="手机号"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="">
            <el-button>选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTable = false">取 消</el-button>
        <el-button type="primary" @click="dialogTable = false">确 定</el-button>
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
      dialogTable: false,
      src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      supplierList: {
        merchandiseName: "", //商品名称
        pictureWeb: "", //首页商品大图
        pictureApp: "", //商品图片
        brand: "", //品牌
        merchandisePrice: "", //商品价格
        communityType: "", //0.商品/1.服务
        categoryId: "", //商品类别ID
        model: "", //服务方式
        weight: "", //重量
        inventory: "", //库存
        platformCommission: "", //平台提成
        promotionCommission: "", //分销员提成
        sort: "", //商品排序
        area: "", //区
        address: "", //地址
        cIntroduction: "", //商品简介
        // supplier: [], //供应商
        province: "", //省
        city: "", //市
        // SupplierClass: "",
        communityType: "1",
        cNumber: "", //商品编号
        supplier_img_url: "", //商品详情
        docId: "",
        appDocId: "",
      },
      selected: {
        province: "130000",
        city: "130500",
        area: "130523",
        town: null,
      },
      visibleModel: false,
      options: [],
      pictureWebList: [],
      pictureAppList: [],
      listData: [],
      supplier_img_urlList: [],
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
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
      //
      this.supplierList.province = this.selected.province;
      this.supplierList.city = this.selected.city;
      this.supplierList.area = this.selected.area;
    },
    openEdit(row, id) {
      
      this.dialogVisible = true;
      Object.keys(this.supplierList).forEach((item) => {
        // ;
        this.supplierList[item] = Array.isArray(row[item])
          ? row[item].map((t) => ({ ...t }))
          : row[item] && typeof row[item] === "object"
          ? { ...row[item] }
          : row[item];
      });
      // Object.keys(this.supplierList).forEach((item) => {
      //   this.supplierList[item]
      // })

      // this.pictureWebList = JSON.parse(this.supplierList.pictureWeb);
      //     this.pictureAppList = JSON.parse(this.supplierList.pictureApp);
      this.supplierList.categoryId = this.supplierList.categoryId.split(",");
      //
      this.selected.province = this.supplierList.province;
      this.selected.city = this.supplierList.city;
      this.selected.area = this.supplierList.area;
      // this.supplierList.model = this.supplierList.model == 0?'true':'false'
      this.pictureWebList = [];
      this.pictureAppList = [];
      this.supplier_img_urlList = [];

      if (this.supplierList.pictureWeb)
        // debugger

        this.supplierList.pictureWeb.split("','").map((item) => {
          let name = item.split("/");
          this.pictureWebList.push({
            name: name[name.length],
            url: this.$axios.url + item,
          });
        });
      if (this.supplierList.pictureApp)
        this.supplierList.pictureApp.split("','").map((item) => {
          let name = item.split("/");
          this.pictureAppList.push({
            name: name[name.length],
            url: this.$axios.url + item,
          });
        });
      if (this.supplierList.supplier_img_url)
        this.supplierList.supplier_img_url.split("','").map((item) => {
          let name = item.split("/");
          this.supplier_img_urlList.push({
            name: name[name.length],
            url: this.$axios.url + item,
          });
        });

      // this.supplierList.pictureApp = item.response.data.pkFid;

      // this.supplierList.supplier_img_url = item.response.data.pkFid;

      this.supplierList.cNumber = id;
      console.log(this.supplierList);
      // this.supplierList = row[0];
    },
    //重置表单
    resetForm() {
      this.supplierList = {
        merchandiseName: "", //商品名称
        pictureWeb: "", //首页商品大图
        pictureApp: "", //商品图片
        brand: "", //品牌
        merchandisePrice: "", //商品价格
        communityType: "", //0.商品/1.服务
        categoryId: "", //商品类别ID
        model: "", //服务方式
        weight: "", //重量
        inventory: "", //库存
        platformCommission: "", //平台提成
        promotionCommission: "", //分销员提成
        sort: "", //商品排序
        area: "", //区
        address: "", //地址
        cIntroduction: "", //商品简介
        // supplier: [], //供应商
        province: "", //省
        city: "", //市
        // SupplierClass: "",
        communityType: "1",
        cNumber: "", //商品编号
        supplier_img_url: "", //商品详情
        docId: "",
        appDocId: "",
      };
      this.pictureWebList = [];
      this.pictureAppList = [];
      this.supplier_img_urlList = [];
    },
    //新增商品信息
    //新增商品信息
    saveCommManagement() {
      // this.supplierList.pictureWeb = JSON.stringify(this.pictureWebList)
      // this.supplierList.pictureApp = JSON.stringify(this.pictureAppList)
      // this.supplierList.supplier_img_url = JSON.stringify(this.supplier_img_urlList)
      let arr = [[], [], []];
      // arr.length = 3

      this.pictureWebList.map((item) => {
        if (item && item.response) {
          arr[0].push(item.response.data.pkFid);
        }

        // this.supplierList.pictureWeb = item.response.data.pkFid;
      });
      this.pictureAppList.map((item) => {
        if (item && item.response) {
          arr[1].push(item.response.data.pkFid);
        }
        // this.supplierList.pictureApp = item.response.data.pkFid;
      });
      this.supplier_img_urlList.map((item) => {
        if (item && item.response) {
          arr[2].push(item.response.data.pkFid);
        }
        // this.supplierList.supplier_img_url = item.response.data.pkFid;
      });
      // this.supplierList.model = this.supplierList.model == 'true'?0:1
      if(this.supplierList.docId && arr[0]){
        this.supplierList.pictureWeb =  this.supplierList.docId + ',' + arr[0].toString();
      }else if(arr[0]){
        this.supplierList.pictureWeb =    arr[0].toString();
      }
      if(this.supplierList.pictureApp && arr[1]){
        this.supplierList.pictureApp = this.supplierList.appDocId + ',' +  arr[1].toString();
      }else if(arr[1]){
        this.supplierList.pictureApp =    arr[1].toString();
      }
      
      this.supplierList.supplier_img_url = arr[2].toString();
      

      this.supplierList.categoryId = this.supplierList.categoryId.toString();
      
      // 
      // this.supplierList.pictureApp = this.supplierList.appDocId
      // this.supplierList.pictureWeb = this.supplierList.docId
      if (this.supplierList.cNumber) {
        this.$apiFun.updateCommodity(this.supplierList).then((res) => {
          if (res.code == "200") {
            console.log(res);
            this.$message.success('保存成功');
            this.$emit('search')
          }
        });
      } else {
        this.$apiFun.addCommodity(this.supplierList).then((res) => {
          if (res.code == "200") {
            console.log(res);
            this.$message.success('保存成功');
            this.$emit('search')
          }
        });
      }
    },

    //首页商品大图文件上传成功后触发方法
    successUpload(response, file, fileLis) {
      if (response.code == 200) {
        this.pictureWebList = fileLis;
        //
        // if(this.supplierList.docId && this.supplierList.docId.length > 0){
        //   this.supplierList.docId = this.supplierList.docId + ',' + file.response.data.pkFid
        // }else{
        //   this.supplierList.docId = ''
        //   this.supplierList.docId = this.supplierList.docId  + file.response.data.pkFid
        // }

        // this.supplierList.appDocId =

        // this.pictureWeb = this.pictureWeb + file.response.data.pkFid
      }
    },
    //首页商品大图文件上传成功后触发方法
    successUploadS(response, file, fileLis) {
      if (response.code == 200) {
        this.pictureAppList = fileLis;
        // if(this.supplierList.appDocId &&  this.supplierList.appDocId.length > 0){
        //   this.supplierList.appDocId = this.supplierList.appDocId + ',' + file.response.data.pkFid
        // }else{
        //   this.supplierList.appDocId = ''
        //   this.supplierList.appDocId = this.supplierList.appDocId  + file.response.data.pkFid
        // }
      }
    },
    //首页商品大图文件上传成功后触发方法
    successUploadST(response, file, fileLis) {
      if (response.code == 200) {
        this.supplier_img_urlList = fileLis;
      }
    },
  },
  mounted() {
    this.$apiFun.queryCommodityClass().then((res) => {
      if (res.code == 200) {
        console.log(res);
        res.data.map((item) => {
          this.options.push({
            value: item,
            label: item,
          });
        });
      }
    });
    this.$apiFun.querySupplierManageAllAdmin("").then((res) => {
      if (res.code == 200) {
        this.listData = res.data;
      }
    });
  },
};
</script>

<style>
</style>