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
      custom-class="dialog-no-header dialog-overflow"
    >
      <div class="edit_header">当前位置:编辑供应商</div>
      <div class="tabs_class">
        <div class="center" style="display:flex">
          <div class="left_box">
            <el-form ref="form" :model="supplierList" label-width="100px" style="padding: 0 20px;">
              <el-form-item label="订单编号" >{{supplierList.orderCode}}</el-form-item>
              <el-form-item label="付款方式" >{{supplierList.paymentMethod}}</el-form-item>
              <el-form-item label="收货人" >
                <el-input v-model="supplierList.consignee" placeholder="请输入收货人"></el-input>
                <!-- {{supplierList.consignee}}</el-form-item> -->
              </el-form-item>
              <el-form-item label="收货人电话" >
                <el-input v-model="supplierList.consignee" placeholder="请输入收货人电话"></el-input>
                <!-- {{supplierList.phone}} -->
                </el-form-item>
              <el-form-item label="收货详细地址" >
                <!-- {{supplierList.receivingAddress}} -->
                <v-region
                        v-model="selected"
                        @values="regionChange"
                      ></v-region>
                      <el-input
                        v-model="selected.town"
                        placeholder="具体服务区域"
                      ></el-input>
                <!-- <el-input v-model="supplierList.receivingAddress" placeholder="请输入收货地址"></el-input> -->
                </el-form-item>
              <el-form-item label="送货地址" >
                {{supplierList.deliverAddress}}
                
                </el-form-item>
              <!-- <div class="noMargin" style="text-align: left;">
                <el-button type="primary" @click="editAdress()">编辑收货地址</el-button>
              </div> -->
            </el-form>
          </div>
          <div class="right_box">
            <el-form ref="form" :model="supplierList" label-width="80px" style="padding: 0 20px;">
              <el-form-item label="订单状态" class="noMargin">
                <span style="font-weight: bold;font-size: 18px;">
                    {{tabType[supplierList.orderType]}}
                </span>
                
                </el-form-item>
              <el-form-item label="备注" class="noMargin">
                <!-- {{supplierList.name}} -->
                <el-input v-model="supplierList.mark" placeholder="备注"></el-input>
                </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="center">
          <div>
            <p>商品信息</p>
            <el-table :data="supplierList.queryCommodityVo" style="width: 100%">
              <el-table-column prop="merchandiseName" label="商品标题" width="180"></el-table-column>
              <el-table-column prop="cnumber" label="规格/编号" width="180"></el-table-column>
              <el-table-column prop="supplier" label="供应商"></el-table-column>
              <!-- <el-table-column prop="date" label="是否退款"></el-table-column> -->
              <el-table-column prop="merchandisePrice" label="单价"></el-table-column>
              <el-table-column prop="inventory" label="数量"></el-table-column>
              <el-table-column prop="date" label="配送方式">
                <template slot-scope="scope">
                <!-- model -->
                    
                  {{scope.row.model == '0'?'同城上门':'快递配送'}}
                </template>
              </el-table-column>
              <el-table-column prop="date" label="价格">
                <template slot-scope="scope">
                <!-- model -->
                    
                  {{scope.row.inventory * scope.row.merchandisePrice}}
                </template>
              </el-table-column>
              <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                  <el-button v-if="supplierList.orderType == 2" type="primary" @click="handleEdit(1, scope.row)">配送</el-button>
                  <el-button v-if="supplierList.orderType == 3" type="primary"  @click="handleEdit(2, scope.row)">确认收货</el-button>
                  <el-button v-if="supplierList.orderType == 4" type="primary"  @click="handleEdit(3, scope.row)">确认退款</el-button>
                  <el-button v-if="supplierList.orderType == 5" type="primary"  @click="handleEdit(6, scope.row)">确认完成</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- <p class="textLeft">订单状态：已失效</p> -->
            <p class="textRight">商品合计：¥{{sumTotal}}</p>
            <p class="textRight">运费：¥0</p>
            <p class="textRight">实付款：¥{{sumTotal}}</p>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">返回列表</el-button>
        <el-button type="primary" @click="saveCommManagement">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑配送信息"
      :visible.sync="visibleModel"
      width="420"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :model="addOrModel"
          class="demo-form-inline"
          label-width="120px"
          style="widht:100%"
        >
          <el-row>
            <el-col :span="24" v-if="model == 1">
              <el-form-item label="快递单号">
                <el-input v-model="OrderModelList.expressage" placeholder="快递单号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="model == 1">
              <el-form-item label="快递名称">
                <el-input v-model="OrderModelList.expressageCompany" placeholder="快递名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="model == 1">
              <el-form-item label="备注">
                <el-input v-model="OrderModelList.remarkone" placeholder="备注"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="model == 0">
              <el-form-item label="服务人员">
                <el-input v-model="OrderModelList.servepeople" placeholder="服务人员"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="model == 0">
              <el-form-item label="联系方式">
                <el-input v-model="OrderModelList.phone" placeholder="联系方式"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="model == 0">
              <el-form-item label="上门时间">
                <el-input v-model="OrderModelList.visit_datetime" placeholder="上门时间"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="model == 0">
              <el-form-item label="备注">
                <el-input v-model="OrderModelList.remarktwo" placeholder="备注"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <div>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="onSubmit">取消</el-button>
              </div>
            </el-col>-->
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleModel = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateModel">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑收货信息"
      :visible.sync="visibleGoods"
      width="600"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :model="supplierList"
          class="demo-form-inline"
          label-width="120px"
          style="widht:100%"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="收货人">
                <el-input v-model="supplierList.user" placeholder="收货人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="手机号">
                <el-input v-model="supplierList.user" placeholder="手机号"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="地址">
                <v-region @values="regionChange"></v-region>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleGoods = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateModel">保 存</el-button>
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
      visibleModel: false,
      visibleGoods: false,
      supplierList: {
        pkOid: "", //订单主键ID
        orderName: "", //订单名称
        cperson:'',
        orderCode: "", //订单编号
        orderType: "", //订单状态  5是配送   6是已完成
        price: "", //订单总金额
        freight: "", //运费
        actualPayment: "", //实付款
        number: "", //数量
        deliverAddress: "", //送货地址
        userId: "", //用户ID
        supplierId: "", //供应商ID
        commodityId: "", //商品ID
        docId: "", //文件ID
        consignee: "", //收货人
        receivingAddress: "", //收货地址
        phone: "", //收货人联系方式
        paymentMethod: "", //付款方式
        queryCommodityVo:[],//商品信息
        mark:'',//备注
        urlMethod:'add'
      },
      selected: {
        province: "",
        city: "",
        area: "",
        town: null,
      },
      addOrModel:{

      },
      sumTotal:0,
      tabType : ['','待付款','待发货','待收货','待退款','已退款'],
      model:'',//配送方式
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value1: [],
      value2: [],
      OrderModelList:{
        orderId:'',
        cnumber:'',
        modelType:'',
        expressage:'',
        expressageCompany:'',
        remarkone:'',
        servepeople:'',
        phone:'',
        visit_datetime:'',
        remarktwo:'',
         urlMethod:'',
         id:''
      }
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
    editAdress() {
      this.visibleGoods = true;
    },
    handleEdit(i,row) {
      
      if(i == 1){
        this.visibleModel = true;
        // this.OrderModelList.cNumber = row.cnumber
        // this.OrderModelList.modelType =  row.model
        // this.OrderModelList.orderId = this.supplierList.orderCode
        this.$apiFun.queryOrderModel(row.cnumber,this.supplierList.orderCode).then(res =>{
          
          if(res.code == 200 && res.data){
            
            Object.keys(this.OrderModelList).forEach(item => {
              // ;
              this.OrderModelList[item] = Array.isArray(res.data[item])
                ? res.data[item].map(t => ({ ...t }))
                : res.data[item] && typeof res.data[item] === "object"
                ? { ...res.data[item] }
                : res.data[item];
            });
            this.OrderModelList.urlMethod = "update"
          }else{
            this.OrderModelList.urlMethod = "add"
          }
        })
        
        this.OrderModelList.cnumber = row.cnumber
        this.OrderModelList.modelType =  row.model
        this.OrderModelList.orderId = this.supplierList.orderCode
      }else{
        // 
        this.supplierList.orderType = i + 1
      }
      this.model = row.model
      
    },
    onSubmit() {
      this.visibleModel = false;
    },
    regionChange(data) {
      console.log(data);
    },
    //新增订单信息
    saveCommManagement() {
      // if (this.form.cNumber) {
        this.supplierList.urlMethod = "update"
        this.supplierList.receivingAddress = JSON.stringify(this.selected) 
        this.$apiFun.addOrUpdateList(this.supplierList).then(res => {
          if (res.code == "200") {
            console.log(res);
            this.$message.success("保存成功");
          }
        });
      // }
    },
    //保存订单管理
    addOrUpdateModel(){
      // this.$apiFun.addOrUpdateModel(this.OrderModelList).then(res =>{

      // })
      // 
      // this.OrderModelList.urlMethod = "add"
      
      this.$apiFun.addOrUpdateModel(this.OrderModelList).then(res => {
            // 
          })
    },
    openEdit(row, id) {
      // 
      this.dialogVisible = true;
      Object.keys(this.supplierList).forEach(item => {
        // ;
        this.supplierList[item] = Array.isArray(row[item])
          ? row[item].map(t => ({ ...t }))
          : row[item] && typeof row[item] === "object"
          ? { ...row[item] }
          : row[item];
      });
      
      this.selected = JSON.parse(this.supplierList.receivingAddress)
      // this.supplierList.receivingAddress = JSON.stringify(this.selected) 
      this.sumTotal = 0
      this.supplierList.queryCommodityVo.map(item =>{
        this.sumTotal =  this.sumTotal + item.inventory * item.merchandisePrice
      })
      
      // this.form.pkUid = id;
      this.supplierList.urlMethod = "update"
      console.log(this.supplierList)
    },
    //重置表单
    resetForm() {
      this.supplierList = {
        pkOid: "", //订单主键ID
        orderName: "", //订单名称
        orderCode: "", //订单编号
        orderType: "", //订单状态
        price: "", //订单总金额
        freight: "", //运费
        actualPayment: "", //实付款
        number: "", //数量
        userId: "", //用户ID
        supplierId: "", //供应商ID
        commodityId: "", //商品ID
        docId: "", //文件ID
        consignee: "", //收货人
        receivingAddress: "", //收货地址
        phone: "", //收货人联系方式
        paymentMethod: "" //付款方式
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.left_box {
  width: 50%;
  border-right: 1px solid rgba(187, 187, 187, 100);
}
::v-deep .el-dialog__header {
  text-align: left;
}
</style>