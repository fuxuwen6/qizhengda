<template>
  <div class="slider_menu">
     <!-- <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item v-for="(item,i) in menuList" :key="i" :index="i">
        <span slot="title"> {{item}} </span>
      </el-menu-item>
    </el-menu> -->
     <div class="menu_box" v-for="(item,i) in menuList" :key="i" @click="checkoutRouter(item,i)" :class="selectMenu == i ? 'menu_box_hover':''">
       <span>
          {{item.name}}
       </span>
       
     </div>
     <span>
       联系客服
     </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectMenu: 0,
      menuList:[{
        name:'供应商管理',
        url:'/components/supplier/supplierTable'
      },{
        name:'商品管理',
        url:'/components/commManagement/commManagementList'
      },{
        name:'订单管理',
        url:'/components/orderManagement/orderManagementList'
      },{
        name:'用户管理',
        url:'/components/userManagement/userManagementList'
      },{
        name:'分销员管理',
        url:'/components/distributorManagement/distributorManagementList'
      },{
        name:'需求管理',
        url:'/components/demandManagement/demandManagementList'
      },{
        name:'交易担保管理',
        url:''
      },{
        name:'企政圈管理',
        url:''
      },{
        name:'页面管理',
        url:''
      },{
        name:'数据统计',
        url:''
      },{
        name:'分类管理',
        url:''
      },{
        name:'服务区域管理',
        url:''
      }]
    };
  },
  methods:{
    checkoutRouter(item,i){
      this.$router.push({
          path: item.url,
          query: {
          }
        });
      this.selectMenu = i
    }
  }
}
</script>
<style scoped lang="scss">
.slider_menu{
  width: 344px;
  height: calc(100% - 55px);
  background-color: rgba(215, 215, 215, 100);
  text-align: center;
  float: left;
  overflow-y: scroll;
  .menu_box{
    width: 223px;
    height: 67px;
    line-height: 20px;
    border-radius: 4px;
    background-color: rgba(129, 135, 142, 100);
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
    margin: 10px auto;
    cursor: pointer;
    span{
      color: rgba(255, 255, 255, 100);
      font-size: 18px;
      text-align: left;
      font-family: SourceHanSansSC-regular;
      line-height: 67px;
    }
  }
  .menu_box:hover,.menu_box_hover{
    background-color: rgba(23, 129, 252, 100);
  }
}
</style>
