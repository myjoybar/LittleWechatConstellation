//获取应用实例
//http://blog.csdn.net/yanglei0917/article/details/70171921
var FormateUtil = require('../../util/FormateUtil.js')
const getListUrl = require('../../config.js').getBroadcastUrl
const duration = 2000
var app = getApp()
var PAGE_NUMBER = 0;
var PAGE_SIZE = 3;
var MAX_PAGE_COUNT = 10
var CONSTELLATION_TYPE = 1;
Page({
  data: {
    listBroadcast: [],
    isHideBottom: true,
    isHideLoadMore: true
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    getBroadcastList(that, CONSTELLATION_TYPE, PAGE_NUMBER, PAGE_SIZE);
  },
  startShare: function (e) {
    console.log('strat startShare')
    var self = this

  },

  //下拉刷新
  onPullDownRefresh: function () {
    console.log('strat onPullDownRefresh')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    setTimeout(function () {
      // complete
      console.log('complete onPullDownRefresh')
      getBroadcastList(that, CONSTELLATION_TYPE, 0, PAGE_SIZE);
      stopRefresh();
    }, 1500);
  },
  //加载更多
  onReachBottom: function () {
    if (this.data.isHideBottom == false) {
      return
    }
    // if (this.data.listBroadcast.length > MAX_PAGE_COUNT) {
    //   return
    // }

    console.log('reach the bottom and load more')
    var that = this;
    setLoadMoreHideStatus(that, false);
    setTimeout(function () {
      // complete
      console.log('complete loadmore')
      getBroadcastList(that, CONSTELLATION_TYPE, PAGE_NUMBER, PAGE_SIZE);
      setLoadMoreHideStatus(that, true);

    }, 2500);
  }
})



var refresh = function () {
}
// stop refresh
var stopRefresh = function () {
  wx.hideNavigationBarLoading() //完成停止加载
  wx.stopPullDownRefresh() //停止下拉刷新
}

//set load more view hide status
var setLoadMoreHideStatus = function (that, status) {
  that.setData({
    isHideLoadMore: status,
  })
}

// set bottom tip view hide status
var setBottomTipHideStatus = function (that, status) {
  that.setData({
    isHideBottom: status,
  })
}


var getBroadcastList = function (that, constellationType, pageNumber, pageSize) {
  console.log('strat request')
  var self = that
  console.log('getListUrl=' + getListUrl)
  //let getListUrl = 'https://baobab.kaiyanapp.com/api/v4/discovery'
  wx.request({
    url: getListUrl,
    header: { 'Content-Type': 'application/json' },
    data: {
      // noncestr: Date.now(),
      pageNumber: pageNumber,
      pageSize: pageSize,
      constellationType: constellationType
    },

    success: function (result) {
      var self1 = self
      //console.log(' success listBroadcast.length=' + self1.listBroadcast.length)
      PAGE_NUMBER++;
      if (pageNumber == 0) {
        console.log('clear listBroadcast')
        self.data.listBroadcast = [];//清空数组 
      }
      let realResult = result.data;
      console.log('realResult.code =' + realResult.code)
      if (result.code == 200) {
        console.log('request success')
      }
      let listData = realResult.data.content;
      let listLength = listData.length;
      console.log(' listData.length=' + listData.length)
      if (listLength == 0) {
        console.log('no data')
      } else {
        console.log('has data')
        formatTimestamp(listData);
        listData = mergeListdata(self.data.listBroadcast, listData);

        if (listData.length == realResult.data.totalElements) {
          setBottomTipHideStatus(self, false);
        }
        if (listData.length >= MAX_PAGE_COUNT) {
          setBottomTipHideStatus(self, false);
        }else{
          setBottomTipHideStatus(self, true);
        }

        that.setData({
          listBroadcast: listData
        });

      }
      // wx.showToast({
      //   title: '请求成功',
      //   icon: 'success',
      //   mask: true,
      //   duration: duration
      // })
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
    },
    complete: function () {
      if (pageNumber == 0) {
        stopRefresh();
      } else {
        setLoadMoreHideStatus(self, true);
      }
    }
  })
}


var formatTimestamp = function (listBroadcast) {
  let listLength = listBroadcast.length;
  for (var i = 0; i < listLength; i++) {
    listBroadcast[i].displayPublishTimestamp = FormateUtil.formatTimeWithFormat(listBroadcast[i].publishTimestamp / 1000, 'M/D');
    listBroadcast[i].displayStartValidTimestamp = FormateUtil.formatTimeWithFormat(listBroadcast[i].startValidTimestamp / 1000, 'Y.M.D');
    listBroadcast[i].displayEndValidTimestamp = FormateUtil.formatTimeWithFormat(listBroadcast[i].endValidTimestamp / 1000, 'M.D');
  }
}
var mergeListdata = function (listBroadcast, listdata) {
  let listLength = listdata.length;
  for (var i = 0; i < listLength; i++) {
    if (listBroadcast.length >= MAX_PAGE_COUNT) {
      break
    }
    listBroadcast.push(listdata[i])
  }
  return listBroadcast;
}




