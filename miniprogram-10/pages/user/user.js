// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sfsj: false,
    qunqing: app.globalData.tbdh,
    dhlj: app.globalData.dhlj,
    hymember: [],
    userInfo: [],
    usertx: '',
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      usertx: app.globalData.hymember.userpic,
      hymember:app.globalData.hymember
    })
    var carts = wx.getStorageSync('carts') || [];
    var length = carts.length;
    this.setData({
      totalNum:length
    });
    var hymember = this.data.hymember;
   /*  if(hymember==null){
     this.getUserProfile()
    } */
    var userid = hymember['userid'];
    var username = hymember['username'];
/*     console.log(userid)
    console.log(username) */
    this.sfsj(userid, username);
  },

  sfsj: function (userid, username) { //判断是否商家
    var that = this;
    var userid = userid;
    var username = username;
    console.log(userid)
    console.log(username)
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=sfsj',
      data: {
        userid: userid,
        username: username
      },
      success: function (res) {
        console.log(res.data.success)
        that.setData({
          sfsj: res.data.success
        })
      }
    })
  },
  goto(event) { //跳转链接
    app.router.navigateTo({
      url: event.currentTarget.dataset.lj
    })
  }

})