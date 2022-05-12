<template>
  <div
    class="wrapper"
    @click="walk()"
    v-loading="isShow"
    element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <!-- <v-tags style="z-index: 100"></v-tags> -->
      <div class="content" ref="content">
        <transition name="move" mode="out-in">
          <!--<keep-alive :include="/tagsList|sysUserList/">-->
          <!-- <keep-alive exclude="test-keep-alive"> -->
            <router-view></router-view>
          <!-- </keep-alive> -->
        </transition>
      </div>
      <!-- <div class="el_foot"> -->
      <!-- <vbreadcrumb></vbreadcrumb> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
 
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
export default {
  name: 'Home',
  data() {
    return {
      tagsList: [],
      collapse: false,
      time: 0,
      timer: null,
      isShow: false,
      date: 0,
      dater: null,
      screenWidth: document.body.clientWidth,
    };
  },
  components: {
    vHead,
    vSidebar,
    // vTags
    // vbreadcrumb
  },
  methods:{
    walk(){

    }
  }
}
</script>
<style lang="scss" scoped>
.content-box{
  height: calc(100% - 55px);
  width: calc(100% - 344px);
      float: right;
}
.content{
  height: 100%;
}
</style>
