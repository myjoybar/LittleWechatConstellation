/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

//http://106.14.139.72:8198/superwifi/updateinfo/ 
// var host = "14592619.qcloud.la"

//http://106.14.139.72:8221/constellation/findallbroadcast?page=0&size=10&constellationType=1&sortDirection=0
// var host = "xiaobao.shiseshouzhang.com:8221/constellation"
var host = "xiaobao.shiseshouzhang.com/constellation"
var config = {
  
  host,
  // 获取列表信息
  getBroadcastUrl: `https://${host}/findallbroadcast`,
};
module.exports = config
