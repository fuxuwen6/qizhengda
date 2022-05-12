<template>
  <div class="login-container">
     <p class="login_p">企政达后台管理系统</p>
     <el-form :model="ruleForm" status-icon   ref="ruleForm"  class="demo-ruleForm">
        <el-form-item  prop="name">
          <el-input type="name"  v-model="ruleForm.account" placeholder="用户名" ></el-input>
        </el-form-item>
        <el-form-item   prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.pswd" ></el-input>
        </el-form-item>
 
        <el-form-item>
          <!-- <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button> -->
          <div class="login_btn" @click="submitForm('ruleForm')">
            登录
          </div>

        </el-form-item>
      </el-form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
          account: 15521508968,
          pswd: 'admin',
 
        },
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
    };
  },
  methods: {
     submitForm(formName){
       this.$apiFun.getCode(this.ruleForm).then(res =>{
         console.log(res)
         if(res.code == 200){
           decodeURIComponent
           sessionStorage.setItem('role',JSON.stringify(res.data.role) )
           sessionStorage.setItem('treeList',JSON.stringify(res.data.treeList) )
           sessionStorage.setItem('user',JSON.stringify(res.data.user) )
            this.$router.push("/");
         }else{
           
         }
       })
      // this.$router.push("/");
     }
  },
};
</script>
<style scoped>
.login-container {
  position: absolute;
  width: 575px;
  height: 400px;
  overflow: hidden;
 left: calc(50% - 287px);
    top: calc(50% - 200px);
  /* background-color: red; */
}
.login_p{
  margin-bottom: 53px;
  color: rgba(16, 16, 16, 100);
font-size: 36px;
text-align: center;
}
.login_btn{
  width: 575px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: rgba(176, 176, 176, 100);
  color: rgba(16, 16, 16, 100);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
</style>