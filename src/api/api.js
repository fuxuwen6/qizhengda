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
//供应商分页查询列表信息
apiFun.getAllAndroidPlugins= function(pageNo,pageSize,supplierName) {
  return Service({
    url: 'pc/querySupplierManageList',
    method: 'get',
    params: { page: pageNo,pageSize:pageSize,supplierName:supplierName}
  })
}
//供应商基本信息查询
apiFun.querySupplierManageInfo= function(id) {
  return Service({
    url: 'supplier-manage/querySupplierManageInfo',
    method: 'get',
    params: { id: id}
  })
}
//查询客户评价管理审核接口
apiFun.updateMessage= function(data) {
  return Service({
    url: 'message/updateMessage',
    method: 'post',
    params:data
  })
}
//提成修改
apiFun.updateCommission= function(data) {
  return Service({
    url: 'commission/updateCommission',
    method: 'post',
    params:data
  })
}
//供应商修改
apiFun.updateSupplierManage= function(data) {
  return Service({
    url: 'supplier-manage/updateSupplierManage',
    method: 'post',
    data:JSON.stringify(data)
  })
}
apiFun.queryCommodityAll = function(pageNo,pageSize,merchandiseName){
  return Service({
    url: 'commodity/queryCommodityAll',
    method: 'get',
    params: { pageNo: pageNo,pageSize:pageSize,merchandiseName:merchandiseName}
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
//商品管理选择供应商
//
apiFun.querySupplierManageAllAdmin = function(supplierName){
  return Service({
    url: 'supplier-manage/querySupplierManageAllAdmin',
    method: 'get',
    params: { supplierName:supplierName}
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
apiFun.userList = function(pageNo,pageSize) {
  return Service({
    url: 'user/list',
    method: 'get',
    params: { pageNo: pageNo,pageSize:pageSize}
  })
}
//用户管理详情
apiFun.userDetail = function(pkUids) {
  return Service({
    url: 'user/detail',
    method: 'post',
    data: JSON.stringify({ pkUids:pkUids})
  })
}
//用户管理修改
// apiFun.updateUserList = function(data) {
//   return Service({
//     url: 'user/addOrUpdate',
//     method: 'post',
//     data:JSON.stringify(data)
//   })
// }
//修改分销码

apiFun.addOrUpdateASS = function(data) {
  return Service({
    url: 'user/addOrUpdate',
    method: 'post',
    data:JSON.stringify(data)
  })
}
// user/addOrUpdate
//用户权限修改
apiFun.updateCodeList = function(data) {
  return Service({
    url: 'user/updateCode',
    method: 'post',
    data:JSON.stringify(data)
  })
}
//订单管理-列表

apiFun.handleOrderList = function(data) {
  // debugger
  return Service({
    url: 'order/list',
    method: 'post',
    data:JSON.stringify(data)
    // params:{ pageNo: pageNo,pageSize:pageSize}
  })
}
//配送新增和修改
apiFun.addOrUpdateModel = function(data) {
  // debugger
  return Service({
    url: 'order/addOrUpdateModel',
    method: 'post',
    data:JSON.stringify(data)
    // params:{ pageNo: pageNo,pageSize:pageSize}
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

//订单管理配送查询

apiFun.queryOrderModel = function(cnumber,orderId) {
  return Service({
    url: 'order/queryOrderModel',
    method: 'get',
    params: { cnumber: cnumber,orderId:orderId}
    
  })
}

//查询所有需求信息

apiFun.queryDemandAll = function(pageNo,pageSize,name,phone) {
  return Service({
    url: 'demdand/queryDemandAll',
    method: 'get',
    params: { pageNo: pageNo,pageSize:pageSize,name: name,phone:phone}
  })
}
//查询需求详情
apiFun.upDemandVo = function(data) {
  return Service({
    url: 'demdand/upDemandVo',
    method: 'get',
    data:JSON.stringify(data)
  })
}

//修改需求状态
apiFun.queryDemand = function(id) {
  return Service({
    url: 'demdand/queryDemand',
    method: 'get',
    params: { id: id}
  })
}
//查询订单列表
// apiFun.queryDemand = function(id) {
//   return Service({
//     url: 'demdand/queryDemand',
//     method: 'get',
//     params: { id: id}
//   })
// }

//查询订单详情
apiFun.queryOrder = function(pkUid) {
  return Service({
    url: 'order/queryOrder',
    method: 'get',
    params: { pkUid: pkUid}
  })
}

//订单详情编辑和新增
// apiFun.addOrUpdate = function(pkUid) {
//   return Service({
//     url: 'order/addOrUpdate',
//     method: 'get',
//     params: { pkUid: pkUid}
//   })
// }

//分销员管理
apiFun.selectCode = function() {
  return Service({
    url: 'user/selectCode',
    method: 'get',
    // data:JSON.stringify(data)
  })
}


//交易担保管理
apiFun.queryGuanranteeAllVo = function(pageNo,pageSize,firstPartyName,firstPartyPhone) {
  return Service({
    url: 'guanrantee/queryGuanranteeAllVo',
    method: 'get',
    params: { pageNo: pageNo,pageSize: pageSize,firstPartyName: firstPartyName,firstPartyPhone: firstPartyPhone}
  })
}
//交易担保详情
apiFun.queryGuanranteeVo = function(id) {
  return Service({
    url: 'guanrantee/queryGuanranteeVo',
    method: 'get',
    params: { id: id}
  })
}
//3.修改担保状态
apiFun.upGuanranteeVo = function(id,uPerson) {
  return Service({
    url: 'guanrantee/upGuanranteeVo',
    method: 'post',
    // data:JSON.stringify(data)
    params: { id: id,uPerson:uPerson}
  })
}
//修改交易担保信息
apiFun.updateGuanranteeVo = function(data) {
  return Service({
    url: 'guanrantee/updateGuanranteeVo',
    method: 'post',
    data:JSON.stringify(data)
  })
}
export default apiFun;
