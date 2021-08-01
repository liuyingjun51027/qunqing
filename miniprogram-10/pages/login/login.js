//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    hymember: app.globalData.hymember,
    motto: 'Hello World',
   /*  userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    canIUseGetUserProfile: false, */
    qunqing: app.globalData.tbdh,
    dhlj: app.globalData.dhlj,

    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,

  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
    var that = this;
    if (wx.getUserProfile) {
      console.log(wx.getUserProfile)
      that.setData({
        canIUseGetUserProfile: true
      })
    }
    var expiredTime = wx.getStorageSync('EXPIREDTIME')
    var now = +new Date()
    if (now - expiredTime <= 1 * 24 * 60 * 60 * 1000) { //首先进行缓存判断。这里是存在的情况，将缓存写入全局变量

      //if (2 <=1) {//在数据库修改会员绑定后，需要变一下缓存就放开这里的判断。
      var sessionId = wx.getStorageSync('SESSIONID')
      var hymember = wx.getStorageSync('HYMEMBER')
      var userInfo = wx.getStorageSync('USERINFO')
      app.globalData.sessionId = sessionId
      app.globalData.hymember = hymember
      app.globalData.expiredTime = expiredTime
      console.log(sessionId) //我的会员id 即登录会员的id
      console.log(hymember) //我的从服务器调取过来的会员详细信息 等等 如：{userID："1",username:"刘应君"，nickName："天子骄子"，...}
      console.log(userInfo) //微信会员的相关信息
      console.log(expiredTime) //上次的缓存时间


      that.setData({
        userInfo: userInfo,
        hasUserInfo: true,

      })

      app.router.navigateTo({
      url: '../index/index',
      })

    } else {
      app.globalData.userInfo = null
      app.globalData.sessionId = null
      app.globalData.hymember = null
      app.globalData.expiredTime = 0
      wx.setStorageSync('SESSIONID', '')
      wx.setStorageSync('HYMEMBER', '')
      wx.setStorageSync('EXPIREDTIME', 0)
      that.setData({
        userInfo: null,
        hasUserInfo: false,
      })
    }
  },

  getUserProfile(e){ // getUserProfile替换掉 getUserInfo 
    // 获取用户信息
    var that = this;

    wx.getUserProfile({ // getUserProfile替换掉 getUserInfo 
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: function (res_user) {
        //success: (res_user) => {
        var userInfo = res_user.userInfo;
        wx.setStorageSync('USERINFO', userInfo) //把微信会员 头像 名称 等信息 存入本地设备缓存
        app.globalData.userInfo = wx.getStorageSync('USERINFO');
       
        wx.login({ // 登录 

          success: res => {
            wx.request({
              url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapiuser&act=codekeyid',
              data: {
                code: res.code
              },
              success: function (res) {
                if (res.data.login == 1) { //未绑定的情况，进行下面的步骤 未绑定 为 1 已绑定 为 2 
                  wx.request({
                    url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapiuser&act=signin',
                    data: {
                      session_key: res.data.session_key,
                      sessionId: that.globalData.sessionId,
                      encryptedData: res_user.encryptedData,
                      iv: res_user.iv,
                      hym: res.data.hyxx.hym,
                      mm: res.data.hyxx.mm
                    },
                    //在服务器换取微信会员信息，并注册新的会员，注册好之后，再将会员信息返回到微信服务器                         
                    success: function (ress) {

                      console.log("0k:" + ress) // 服务器回包信息 
                      console.log(ress) // 服务器回包信息

                      var data = ress.data
                      console.log(ress.data.sessionId)
                      // 把 SessionId hymember expiredTime  和过期时间放在内存中的全局对象和本地缓存里边
                      app.globalData.sessionId = data.sessionId //sessionId取会员ID号为好
                      wx.setStorageSync('SESSIONID', data.sessionId) //把会员sessionId也就是会员的id号存入本地设备缓存
                      app.globalData.hymember = data.data //会员信息存入全局变量
                      wx.setStorageSync('HYMEMBER', data.data) //把会员信息存入本地设备缓存
                      var expiredTime = +new Date() + 1 * 24 * 60 * 60 * 1000 // 假设登录态保持1天
                      app.globalData.expiredTime = expiredTime //把保存登录状态过期时间存入全局变量
                      wx.setStorageSync('EXPIREDTIME', expiredTime) //把保存登录状态过期时间永久存入本地设备缓存

                    }
                  })
                } else { //已经绑定的情况  把 SessionId hymember expiredTime  和过期时间放在内存中的全局对象和本地缓存里边
                  /* var userInfo = res_user.userInfo;
                  wx.setStorageSync('USERINFO', userInfo) //把微信会员 头像 名称 等信息 存入本地设备缓存
                  app.globalData.userInfo = userInfo; */
                  var data = res.data
                  console.log(data)
                  app.globalData.sessionId = data.sessionId //sessionId取会员ID号为好
                  app.globalData.hymember = data.data //会员信息存入全局变量
                  var expiredTime = +new Date() + 1 * 24 * 60 * 60 * 1000 // 假设登录态保持1天
                  app.globalData.expiredTime = expiredTime //把保存登录状态过期时间存入全局变量
                  wx.setStorageSync('SESSIONID', data.sessionId) //把会员sessionId也就是会员的id号存入本地设备缓存
                  wx.setStorageSync('HYMEMBER', data.data) //把会员信息存入本地设备缓存
                  wx.setStorageSync('EXPIREDTIME', expiredTime) //把保存登录状态过期时间永久存入本地设备缓存
                }
                wx.navigateTo({
                  url: '../index/index',

                });
              }
            })

          },
          // 发送 res.code 到后台换取 openId, sessionKey, unionId

        })
      },
      fail: function (res_user) { //未授权返回的信息
        console.log(res_user)
      }
    })

}, 

  // 打开权限设置页提示框
 /*  showSettingToast: function (e) { //也不再需要
     var that = this;
     wx.showModal({
       title: '提示！',
       confirmText: '去设置',
       showCancel: false,
       content: "小程序需要您的授权",
       success: function (res) {
         console.log(res)
         if (res.confirm) {
           // 获取用户信息
           wx.navigateTo({
             url: '../login2/login2',
           })
         }
       }
     })
   },  */
  //------------------------------
  onShow: function () { //有了它 ，页面返回的时候，也可以调取出会员的头像和会员名了
    //{{判断 用户是否授权 如果授权 才跳转到首页
    wx.getSetting({ //返回值中只会出现小程序已经向用户请求过的权限
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.onLoad()
          /*  wx.getUserInfo({
             success: res => {
               var hymember = wx.getStorageSync('HYMEMBER')
               if (hymember) { //如果缓存存在就跳转到首页
                 this.setData({
                   userInfo: app.globalData.userInfo,
                   //hasUserInfo: true
                 })
               }

             }
           }) */
        }
      }

    })
    //判断 用户是否授权 如果授权 才跳转到首页}}
  },
  goto(event) { //跳转链接
    app.router.navigateTo({
      url: event.currentTarget.dataset.lj
    })
  }
})