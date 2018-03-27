//map.js
const util = require('../../utils/util.js')
const TXMapWX = require('../../libs/qqmap-wx-jssdk.js');
var TXMapSDK;
Page({
      data: {
            centerNeedle:true,
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
            markers:[],
            includePoint:[],
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
            
            // 页面初始化 options为页面跳转所带来的参数
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
            const _this = this;
            // 页面渲染完成
            _this.mapCtx = wx.createMapContext("map");

            //-----------------------------------------
           
            wx.getStorage({
                  key: 'startAD',
                  success: function (res) {
                        if(!res){

                              _this.mapCtx.moveToLocation();
                        }else{
                              console.log(res.data)
                              const lat = res.data.lat;
                              const lng = res.data.lng;
                              _this.setData({
                                    startAD: res.data,
                                    includePoint: [{ latitude: lat, longitude:lng}]
                              });
                              _this.createStartMarks(lat, lng);
                              _this.includePointsInMap(_this.data.includePoint)
                        }
                  }
            })
      },
      onHide: function () {
            // 页面隐藏
      },
      onUnload: function () {
            // 页面关闭
      },
      moveToLocation() {
            this.mapCtx.moveToLocation();
      }, 
      regionchange(e) {
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
                                    },
                                    fail(res) {
                                          console.log(res);
                                    }
                              })
                        },
                        fail(res) {
                              console.log(res);
                        }
                  });
            }
            this.setData({
                  controls: location
            });
      },
      includePointsInMap(arr){
            console.log(arr);
            this.mapCtx.includePoints({
                  points: arr
            })
      },
      //创建开始和结束位置的markers
      createStartMarks(lat, lng){
            const _this = this;
            const tempMarkers = [];
            const index = tempMarkers.length;
            const marker = {
                  id: index + 1,
                  latitude: lat,
                  longitude: lng,
                  width: 40,
                  height: 40,
                  anchor: {
                        x: .1
                  },
                  iconPath: '/resources/imgs/start.png'
            };
            tempMarkers.push(marker);
            _this.setData({
                  markers: tempMarkers
            })
      },
      chooseStartAddress(){
            wx.navigateTo({
                  url: '../../pages/chooseAddress/chooseAddress?type=1'
            })
      },
      chooseEndAddress() {
            wx.navigateTo({
                  url: '../../pages/chooseAddress/chooseAddress?type=2'
            })
      }
})
