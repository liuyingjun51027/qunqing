//app.js
import router from './pages/router.js'
App({
  //....
  router, //引入跳转 解决限制十个页面的方法
  //...
  onLaunch: function () { // 登录会员 
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;

    var expiredTime = wx.getStorageSync('EXPIREDTIME')
    if(expiredTime==''){
     
      var expiredTime = 0;
    }
    
    var now = +new Date()

    if (now - expiredTime <= 1 * 24 * 60 * 60 * 1000) { //首先进行缓存判断。这里是存在的情况，将缓存写入全局变量
      console.log(88888888888888888888)
      //if (2 <=1) {//在数据库修改会员绑定后，需要变一下缓存就放开这里的判断。
      var sessionId = wx.getStorageSync('SESSIONID')
      var hymember = wx.getStorageSync('HYMEMBER')
      var userInfo = wx.getStorageSync('USERINFO')
      console.log(sessionId) //我的会员id 即登录会员的id
      console.log(hymember) //我的从服务器调取过来的会员详细信息 等等 如：{userID："1",username:"刘应君"，nickName："天子骄子"，...}
      console.log(userInfo) //微信会员的相关信息

      that.globalData.sessionId = sessionId
      that.globalData.hymember = hymember
      that.globalData.expiredTime = expiredTime
      that.globalData.userInfo = userInfo

    } else {
      console.log(99999999999)
      that.globalData.sessionId = null
      that.globalData.hymember = null
      that.globalData.expiredTime = 0
      that.globalData.userInfo = null
      console.log(sessionId) //我的会员id 即登录会员的id
      console.log(hymember) //我的从服务器调取过来的会员详细信息 等等 如：{userID："1",username:"刘应君"，nickName："天子骄子"，...}
      console.log(userInfo) //微信会员的相关信息

    }

  },
  globalData: {
    sessionId: null, // 缓存用户登录态SessionId
    hymember: null, //服务器会员信息，绑定返回会员信息，未绑定则返回 自动生成的会员名和密码信息
    expiredTime: 0, //登录态保持1天 expiredTime = +new Date() +1*24*60*60*1000
    userInfo: null, //微信会员信息
    tbdh: [ //导航头部五图片
      "https://1681.qunqing168.com/d/cn/sy622.gif",
      "https://1681.qunqing168.com/d/cn/fl622.gif",
      "https://1681.qunqing168.com/d/cn/gwc622.gif",
      "https://1681.qunqing168.com/d/cn/fx622.gif",
      "https://1681.qunqing168.com/d/cn/wo622.gif"
    ],
    dhlj: [ //导航路径
      "../index/index",
      "../category/category",
      "../gwc/gwc",
      "../fx/fx",
      "../user/user",
    ],
    sysWidth:wx.getSystemInfoSync().windowWidth, //获取设备宽度
    sysHeight:wx.getSystemInfoSync().windowHeight //获取设备高度
  }
})