//app.js
App({
  onLaunch: function () {
    // //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    console.log('App Launch')
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('获取用户登录态成功！')
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });


    wx.getUserInfo({
      success: function (res) {
        console.log('res.userInfo.nickName=' + res.userInfo.nickName)
        console.log('res.userInfo.avatarUrl=' + res.userInfo.avatarUrl)
      },
    })

  },
  onShow: function () {
    console.log('App Show')
   
  
  },
  onHide: function () {
    console.log('App Hide')
  },

  globalData: {
    hasLogin: false,
    openid: null
  },

})







