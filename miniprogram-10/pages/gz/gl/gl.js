// pages/myspgl/myspgl.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hymember: [],
    val: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var val = this.data.val;
    val['lmid'] = options.lmid;
    val['fclassid'] = options.fclassid;
    val['fid'] = options.fid;
    val['lmmc'] = options.lmmc;
    console.log(options)
    console.log(val)
    this.setData({
      hymember: app.globalData.hymember,
      val: val
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goto(event) { //跳转链接
    app.router.navigateTo({
      url: event.currentTarget.dataset.lj
    })
  },
  sjdp: function (e) { //商家店铺

      var dpsjhym = e.currentTarget.dataset.dpsjhym; //代理商家会员名
      wx.request({
        url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=sjdp', //这里就是服务器数据的地址链接
        data: {
          page: 0,
          pagee: 0,
          hym: dpsjhym, //代理商家会员名
          tabIndexx: 0
        },

        method: 'GET', //参数传递的方式 分为get 和post两种
        success: function (res) { //这里属于数据调取的固定写法
          var list = res.data.data;
          var sjdp = res.data.sjdp;
          var page = res.data.page;
          var mjuser = res.data.mjuser;
          if (!res.data.success) {

            wx.showToast({
              title: '此商家 暂无商品！',
              icon: 'success',
              duration: 1000
            });
            return;
          }
          console.log(list)
          wx.setStorageSync('mjuser', mjuser) //存入缓存 
          wx.setStorageSync('page', page) //存入缓存 
          wx.setStorageSync('list', list) //存入缓存 
          wx.setStorageSync('sjdp', sjdp) //存入缓存  
          wx.setStorageSync('dpsjhym', dpsjhym) //存入缓存 

          app.router.navigateTo({
            url: "../sjdp/sjdp"
          })

        }
      })
    }
})