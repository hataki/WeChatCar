// miniprogram/pages/car/map/map.js
// 引入SDK核心类
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'CX4BZ-SZ76D-S4Q4Q-HBI4X-WV23H-2KB2O' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //触发关键词输入提示事件
  getsuggest: function (e) {
    var _this = this;
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      region: '上海', //设置城市名，限制关键词所示的地域范围，非必填参数
      page_size: 8,
      success: function (res) {//搜索成功后的回调
        console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({
          showview: false
        })
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug

        });
      },
      fail: function (error) {
        console.error(error + "失败");
        _this.setData({
          showview: true
        })
      },
      complete: function (res) {
        console.log(res);

      }
    });
  },

  //方法回填
  backfill: function (e) {

    this.setData({
      showview: true
    })
    var id = e.currentTarget.id;
    console.log(this.data.suggestion[id].latitude + "    " + this.data.suggestion[id].longitude);
    this.setData({
      backfill: this.data.suggestion[id].title,
      latitude: this.data.suggestion[id].latitude,
      longitude: this.data.suggestion[id].longitude,
      suggestion:{},
      markers: [{        
        id: 0,
        latitude: this.data.suggestion[id].latitude,
        longitude: this.data.suggestion[id].longitude,
        width: 50,
        height: 50
      }],
      scale:16
    });
    // for (var i = 0; i < this.data.suggestion.length; i++) {
    //   if (i == id) {
    //     this.setData({
    //       backfill: this.data.suggestion[i].title,
    //       latitude: this.data.suggestion[i].latitude,
    //       longitude: this.data.suggestion[i].longitude
    //     });
    //     return;
    //   }
    // }
  },
  choose:function()
  {
    wx.chooseLocation({
      success: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})