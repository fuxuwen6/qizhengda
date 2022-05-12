import {Service} from './http.js'
let apiFun = {};
//获取手机验证码
apiFun.getCode = function(data) {
  return Service({
    url: 'user/adminLogin',
    method: 'post',
    data:JSON.stringify(data)
  })
}
//供应商分页查询信息
apiFun.getAllAndroidPlugins= function(page,pageSize,supplierName) {
  return Service({
    url: 'supplier-manage/querySupplierManageAll',
    method: 'get',
    params: { page: page,pageSize:pageSize,supplierName:supplierName}
  })
}
apiFun.queryCommodityAll = function(page,pageSize,merchandiseName){
  return Service({
    url: 'commodity/queryCommodityAll',
    method: 'get',
    params: { page: page,pageSize:pageSize,merchandiseName:merchandiseName}
  })
}
//查询商品详情
apiFun.queryCommodity = function(cNumber){
  return Service({
    url: 'commodity/queryCommodity',
    method: 'get',
    params: { cNumber:cNumber}
  })
}
//查询商品分类类别

apiFun.queryCommodityClass = function(){
  return Service({
    url: 'supplier-class/querySupplierClass',
    method: 'get',
    params:{}
  })
}

//新增商品分类
apiFun.addCommodity = function(data) {
  return Service({
    url: 'commodity/addCommodity',
    method: 'post',
    data:JSON.stringify(data)
  })
}
//新增商品分类
apiFun.updateCommodity = function(data) {
  return Service({
    url: 'commodity/updateCommodity',
    method: 'post',
    data:JSON.stringify(data)
  })
}
//用户管理列表
apiFun.userList = function(page,pageSize) {
  return Service({
    url: 'user/list',
    method: 'get',
    params: { page: page,pageSize:pageSize}
  })
}
//用户管理详情
apiFun.userDetail = function(pkUid) {
  return Service({
    url: 'user/detail',
    method: 'get',
    params: { pkUid:pkUid}
  })
}
//用户管理修改
apiFun.updateUserList = function(data) {
  return Service({
    url: 'user/addOrUpdate',
    method: 'post',
    data:JSON.stringify(data)
  })
}
//用户权限修改
apiFun.updateCodeList = function(data) {
  return Service({
    url: 'user/updateCode',
    method: 'post',
    data:JSON.stringify(data)
  })
}
//订单管理-列表

apiFun.handleOrderList = function(page,pageSize) {
  return Service({
    url: 'order/list',
    method: 'get',
    params: { page: page,pageSize:pageSize}
  })
}
//订单管理-新增修改

apiFun.addOrUpdateList = function(data) {
  return Service({
    url: 'order/addOrUpdate',
    method: 'post',
    data:JSON.stringify(data)
  })
}
export default apiFun;
