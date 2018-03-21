//map.js
const util = require('../../utils/util.js')

Page({
      data: {
            mapCtx: "",
            showLocation: true,
            scale: 16,
      },
      onLoad: function (options) {
            console.log("load");
            // 页面初始化 options为页面跳转所带来的参数

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
            // this.mapCtx.moveToLocation();
      },
      onHide: function () {
            // 页面隐藏
      },
      onUnload: function () {
            // 页面关闭
      },
      moveToLocation() {
            console.log("调用了");
            this.mapCtx.moveToLocation();
      }
})
