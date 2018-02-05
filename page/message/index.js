//获取应用实例
//http://blog.csdn.net/yanglei0917/article/details/70171921

const getListUrl = require('../../config.js').getListUrl
const duration = 2000
var app = getApp()
Page({
  onLoad: function () {
    console.log('onLoad')
  },
  request: function (e) {
    console.log('strat request')
    var self = this
    // this.setData({
    //   name: '杨磊'
    // })
    console.log('getListUrl=' + getListUrl)
  let getListUrl = 'https://baobab.kaiyanapp.com/api/v4/discovery'
    wx.request({
      url: getListUrl,
      header: { 'Content-Type': 'application/json' },  
      data: {
         noncestr: Date.now()
      },
      success: function (result) {
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          mask: true,
          duration: duration
        })
        self.setData({
          loading: false
        })
        console.log('request success', result)
      },

      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
        self.setData({
          loading: false
        })
      }
    })
  }
})
