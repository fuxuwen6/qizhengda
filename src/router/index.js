import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    redirect: '/components/supplier/supplierTable',
  },
  {
    path: '/',
    component: resolve => require(['../views/Home.vue'], resolve),
    meta: {
      title: '首页'
    },
    children: [{
      path: '/page/Dashboard',
      component: resolve => require(['../components/page/Dashboard.vue'], resolve),
      meta: {
        title: '系统首页',
        idj: ''
      },
      name: '首页'
    },{
      path: '/components/supplier/supplierTable',
      component: resolve => require(['../components/supplier/supplierTable.vue'], resolve),
      meta: {
        title: '供应商管理',
        idj: ''
      },
      name: '供应商管理'
    },{
      path: '/components/commManagement/commManagementList',
      component: resolve => require(['../components/commManagement/commManagementList.vue'], resolve),
      meta: {
        title: '商品管理',
        idj: ''
      },
      name: '商品管理'
    },{
      path: '/components/orderManagement/orderManagementList',
      component: resolve => require(['../components/orderManagement/orderManagementList'], resolve),
      meta: {
        title: '商品管理',
        idj: ''
      },
      name: '商品管理'
    },{
      path: '/components/userManagement/userManagementList',
      component: resolve => require(['../components/userManagement/userManagementList'], resolve),
      meta: {
        title: '用户管理',
        idj: ''
      },
      name: '用户管理'
      
    },{
      path: '/components/distributorManagement/distributorManagementList',
      component: resolve => require(['../components/distributorManagement/distributorManagementList'], resolve),
      meta: {
        title: '分销员管理',
        idj: ''
      },
      name: '分销员管理'
      
    },{
      path: '/components/demandManagement/demandManagementList',
      component: resolve => require(['../components/demandManagement/demandManagementList'], resolve),
      meta: {
        title: '需求管理',
        idj: ''
      },
      name: '需求管理'
      
    }
    
  ]
  },
  {
    path: '/login',
    component: resolve => require(['../components/page/login.vue'], resolve)
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router
