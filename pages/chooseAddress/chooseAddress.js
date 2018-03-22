//chooseAddres.js
const util = require('../../utils/util.js')
const TXMapWX = require('../../libs/qqmap-wx-jssdk.js');
var TXMapSDK;
Page({
      data: {
            searchContent: "",
            searchList: "",
            scrollTop: 0
      },
      onLoad: function (options) {
            console.log("load");
            // 页面初始化 options为页面跳转所1带来的参数
            TXMapSDK = new TXMapWX({
                  key: 'UHOBZ-3K3RD-B6G4J-HK7G6-HDXJ6-ENBBH'
            });
      },
      onShow: function () {
            // 页面显示
            console.log("show");
      },
      onReady: function () {
            console.log("ready");
            // 页面渲染完成
            this.mapCtx = wx.createMapContext("map");
            this.mapCtx.moveToLocation();
      },
      onHide: function () {
            // 页面隐藏
      },
      onUnload: function () {
            // 页面关闭
      },
      bindKeyInput: function (e) {
            this.setData({
                  searchContent: e.detail.value
            })
      },
      searchAddressList() {
            const _this = this;
            TXMapSDK.getSuggestion({
                  keyword: _this.data.searchContent,
                  region: "天津市",
                  region_fix: 0,
                  success: function (res) {
                        _this.setData({
                              searchList: res.data,
                              scrollTop: 0
                        })
                  },
                  fail: function (res) {
                        console.log(res);
                  },
                  complete: function (res) {
                        console.log(res);
                  }
            });
      },
      getLocation() {
            wx.getLocation({
                  success: function (res) {
                        wx.showToast({
                              title: JSON.stringify(res.latitude),
                              icon: 'success',
                              duration: 2000
                        })
                  },
            })
      },
      getHistoryList() {
            wx.showToast({
                  title: '查询历史记录',
                  icon: 'success',
                  duration: 2000
            })
      },
      chooseNativeMap() {
            wx.chooseLocation({
                  success: function (res) {
                        console.log(res)
                        wx.showToast({
                              title: res.address,
                              icon: 'success',
                              duration: 2000
                        })
                  },
            })
      },
      chooseItem(e){
            const _this = this;
            const index = e.currentTarget.id;
            const lb = _this.data.searchList[index].location;
            wx.showToast({
                  title: JSON.stringify(lb),
                  icon: 'success',
                  duration: 2000
            })
      }
})
