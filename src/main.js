import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';             //全局引入element
import 'element-ui/lib/theme-chalk/index.css';    //全局引入element的样式
import store from './store'
import vRegion from 'v-region'
import {Service} from '@/api/http.js'
Vue.prototype.$axios=Service
import api from "./api/api-config";
import axios from 'axios';
import apiFun from "@/api/api.js";
import FileSaver from 'file-saver'

import XLSX from 'xlsx'

Vue.prototype.$FileSaver = FileSaver; //设置全局

Vue.prototype.$XLSX = XLSX; //设置全局

Vue.prototype.$apiFun = apiFun;//请求接口api

Vue.prototype.$http = axios;

Vue.prototype.api = api;
// Vue.prototype.$apiFun = apiFun;//请求接口api
Vue.config.productionTip = false
Vue.use(vRegion);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
