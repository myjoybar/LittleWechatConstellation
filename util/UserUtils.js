var app = getApp()
function wxLogin() {

  var that = this
  if (getApp().globalData.hasLogin === false) {
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('获取用户登录态成功！')
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

  } else {
    console.log('已经登录')
  }
}

module.exports = {
  wxLogin: wxLogin,
}