//获取应用实例
//http://blog.csdn.net/yanglei0917/article/details/70171921
var util = require('../../util/util.js')
const getListUrl = require('../../config.js').getBroadcastUrl
const duration = 2000
var app = getApp()
Page({
  data: {
    listBroadcast: [],
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this;
    getBroadcastList(that);
  },

})

var getBroadcastList = function (that) {
  console.log('strat request')
  var self = that
  // this.setData({
  //   name: '杨磊'
  // })
  console.log('getListUrl=' + getListUrl)
  //let getListUrl = 'https://baobab.kaiyanapp.com/api/v4/discovery'
  wx.request({
    url: getListUrl,
    header: { 'Content-Type': 'application/json' },
    data: {
      // noncestr: Date.now(),
      page: 0,
      size: 10,
      constellationType: 1
    },
    success: function (result) {
      let realResult = result.data;
      console.log('realResult.code =' + realResult.code)
      if (result.code == 200) {
        console.log('request success')
      }
      let listBroadcast = realResult.data.content;
      let listLength = listBroadcast.length;
      console.log(' listBroadcast.length=' + listBroadcast.length)
      if (listLength == 0) {
        console.log('no data')
      } else {
        console.log('has data')
        formatTimestamp(listBroadcast);
        that.setData({
          listBroadcast: listBroadcast
        });
      }
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
  var formatTimestamp = function (listBroadcast) {
    let listLength = listBroadcast.length;
    for (var i = 0; i < listLength; i++) {
      listBroadcast[i].displayPublishTimestamp = util.formatTimeWithFormat(listBroadcast[i].publishTimestamp / 1000, 'M/D');
      listBroadcast[i].displayStartValidTimestamp = util.formatTimeWithFormat(listBroadcast[i].startValidTimestamp / 1000, 'Y.M.D');
      listBroadcast[i].displayEndValidTimestamp = util.formatTimeWithFormat(listBroadcast[i].endValidTimestamp / 1000, 'M.D');
    }

  }



}

