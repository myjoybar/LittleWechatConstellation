/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

http://106.14.139.72:8198/superwifi/updateinfo/ 
// var host = "14592619.qcloud.la"
var host = "106.14.139.72:8198/superwifi"
var config = {
  host,
  // 获取列表信息
  getListUrl: `http://${host}/updateinfo`,
};
module.exports = config
