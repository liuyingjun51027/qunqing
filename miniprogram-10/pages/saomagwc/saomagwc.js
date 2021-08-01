// pages/saomagwc/saomagwc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
arr:[],
scanFunctionIsUseAble:true
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
    var that=this;
   /*  wx.scanCode({ //这是微信提供的调取扫一扫功能的方法，api依旧简单的让人绝望

        success (res) {
          console.log(res)
          that.setData({
            arr:res
          })
        }, */

      /* success: (res) => {												//扫码成功
        console.log(res)
         var path = res.path;   										//把链接取出存到变量
         var reg = new RegExp('scene=', "g"); 			//然后创建一个正则表达式，截取scene=后面的数据部分
         var scene = path.replace(reg, "");					//保留有用的部分重新存储到这个变量里
         var scene = decodeURIComponent(scene);   //这是解码方式，把得到的链接数据进行解密
         var pathArr = scene.split('?');							//然后通过 ？号截取问号之后的数据。
                                               //截取成功以后的格式storeCode=10003060&tableNo=0001
         var arrPara = pathArr[1].split("&");					//再通过&符进行截取数据之后格式为： //storeCode=10003060   tableNo=0001
         var arr = [];
         for (var i in arrPara) {
         // 通过 = 号在截取一次   这是截取后的数据应该是 storeCode,10003060     tableNo,0001
            arr = arrPara[i].split("=");			
           //循环定义存到缓存，用的时候调用就可以了。					
            wx.setStorageSync(i == 0 ? "menu_storeCode" : "menu_tableNo", arr[1]);
that.setData({
  arr:res
})
         }
      }, */
/*       fail: (res) => {
         wx.showToast({
            title: '扫码失败',
            icon: 'loading',
            duration: 1500
         })
      },
   }) */
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

  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },


  takeCode(e) {
    if (this.data.scanFunctionIsUseAble){
      this.setData({
        scanFunctionIsUseAble: false,
        code:e.detail.result,
      })
      console.log(this.data.code);
      var fileCode = e.detail.result;
      setTimeout(()=>{this.setData({scanFunctionIsUseAble:true,})},2000)
      //每隔两秒可以扫一次
    }
  }

})