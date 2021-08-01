// pages/wxzf/wxzf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.qunqing168.com/e/ali_wxpay/php_sdk_v3.0.10/example/index.php', //支付样式
      
      method: 'GET',  //参数传递的方式 分为get 和post两种
      success:function(res){  //这里属于数据调取的固定写法
        console.log(res.data.data);
        console.log(this);
        that.setData(
          {
            wxzf: res.data


          }
        );
      }
    })
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