<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$router.push("/login");
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
html,
body,
#app,
.wrapper {
  width: 100%;
  height: 100%;
  z-index: 99999;
  overflow: hidden;
  margin: 0;
}
.editWarp {
  width: 100%;
  height: 0;
  // position: absolute;
  .el-dialog__wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
.listWrap {
  z-index: 999;
}
.el-container {
  position: relative;
}
//编辑页面样式汇总
.dialog-no-header > .el-dialog__header {
  display: none;
}

.dialog-no-header > .el-dialog__body {
  height: calc(100% - 140px);
}
.edit_header {
  color: rgba(16, 16, 16, 100);
  font-size: 18px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}
.tabs_class {
  margin-top: 30px;
  height: calc(100% - 54px);
  .el-tabs {
    height: 100%;
    .el-tabs__content {
      height: calc(100% - 55px);
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
.upload-demo {
  text-align: left;
}
.mt_table {
  margin: 31px 57px;
}
//表格顶部颜色
.el-table th.el-table__cell {
  background-color: rgba(215, 215, 215, 100) !important;
  color: rgba(16, 16, 16, 100);
}
.gray_input {
  // width: 1161px;
  height: 112px;
  line-height: 20px;
  background-color: rgba(230, 230, 230, 100);
  color: rgba(16, 16, 16, 100);
  font-size: 14px;
  text-align: center;
  display: flex;
  align-items: center;
  margin-bottom: 22px;
}
.el-form-item.noMargin {
  margin-bottom: 0;
  .el-form-item__content {
    // width: 470px;
  }
  .el-input-group__append {
    background-color: rgba(134, 134, 134, 100);
    color: #fff;
  }
}
.TIPS {
  color: rgba(134, 134, 134, 100);
  font-size: 14px;
  height: 20px;
  .el-form-item__content {
    text-align: left;
  }
}

.el-form {
  .el-form-item__label {
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
  }
}
.rg-select__el {
  line-height: 20px;
}
.dialog-overflow .el-dialog__body {
  overflow-y: auto;
}
.textLeft {
  text-align: left;
}
.textRight {
  text-align: right;
}
.addressInput {
  .el-input {
    width: 160px;
    margin-left: 4px;
    input {
      height: 35px;
    }
  }
}
.el-main {
  .el-table {
    height: calc(100% - 50px);
    .el-table__body-wrapper {
    overflow-y: auto;
    height: calc(100% - 48px);
    }
    
  }
  .el-pagination {
    text-align: center;
  }
}
</style>
