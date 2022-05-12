// @ts-check

// 导出域名
// export const domain = 'http://localhost:9090';

// 默认导出整个接口配置
const api = {

  
  SysBillRefDeleteByPrimaryKey: "bop/api/system/sysBillRef/deleteByPrimaryKey/",
   
}

export default typeof Proxy !== 'undefined' ? new Proxy(api, {
  get(obj, k) {
    if (k in obj) {
      return obj[k];
    }
    throw new Error(`api.${k.toString()} is not defined`);
  }
}) : api;
