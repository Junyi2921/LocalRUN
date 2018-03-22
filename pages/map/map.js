//map.js
const util = require('../../utils/util.js')
const TXMapWX = require('../../libs/qqmap-wx-jssdk.js');
var TXMapSDK;
Page({
      data: {
            mapCtx: "",
            showLocation: true,
            scale: 16,
            controls: [{
                  id: "",
                  iconPath: '../../resources/imgs/locationEnd.png',
                  position: {
                        top: getApp().globalData.systemInfo.windowHeight/ 2 - 50,
                        left: getApp().globalData.systemInfo.windowWidth / 2 - 28,
                        width: 56,
                        height: 56
                  },
                  clickable: true
            }],
            startAD:{
                  lat:"",
                  lng:"",
                  address:"",
                  formatted:""
            },
            endAD:{
                  lat: "",
                  lng: "",
                  address: "请选择您要送往的位置",
                  formatted: ""
            }
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
      moveToLocation() {
            this.mapCtx.moveToLocation();
      }, regionchange(e) {
            const _this = this;
            const location = _this.data.controls;
            if(e.type == "begin"){
                  location[0].iconPath = '../../resources/imgs/locationStart.png';
            }else if(e.type == "end"){
                  location[0].iconPath = '../../resources/imgs/locationEnd.png';
                  _this.mapCtx.getCenterLocation({
                        success(result) {
                              const chooseLat = result.latitude;
                              const chooseLng = result.longitude;
                              TXMapSDK.reverseGeocoder({
                                    location:{
                                          latitude: chooseLat,
                                          longitude: chooseLng
                                     },
                                     success(res){
                                           _this.setData({
                                                 startAD:{
                                                       lat: chooseLat,
                                                       lng: chooseLng,
                                                       address: res.result.address,
                                                       formatted: res.result.formatted_addresses.recommend
                                                }
                                           })
                                     }
                              })
                        }
                  });
            }
            this.setData({
                  controls: location
            });
      },
})
