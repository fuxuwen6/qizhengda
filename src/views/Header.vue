<template>
  <div class="header_div">
    <span class="header_title">
      企政达后台管理系统
    </span>
    <div class="header_person">
      <span>{{userInfo.nickname}}</span>
      <span @click="backLogin">退出登录</span>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      userInfo:{}
    }
  },
  methods:{
    backLogin(){
      this.$router.push("/login");
      sessionStorage.clear()
    }
  },
  mounted(){
    // decodeURIComponent
    this.userInfo = JSON.parse(sessionStorage.getItem('user')) 
  }
}
</script>
<style scoped lang="scss">
.header_div{
  // width: 100%;
  height: 55px;
  line-height: 55px;
  background-color: rgba(23, 129, 252, 100);
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 0 44px 0 92px;
  .header_title{
    color: rgba(255, 255, 255, 100);
    font-size: 22px;
    font-family: SourceHanSansSC-regular;
  }
  .header_person{
    color: rgba(255, 255, 255, 100);
    font-size: 14px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
    span:last-child{
      cursor: pointer;
      margin-left:20px;
    }
  }
}
</style>
