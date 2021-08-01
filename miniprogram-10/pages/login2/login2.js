//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    eye:true,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    qunqing:app.globalData.tbdh
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse){
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
  },
  getUserInfo: function(e) {
//---------------------
let that = this;
// console.log(e)
// 获取用户信息
wx.getSetting({
  success(res) {
    // console.log("res", res)
    if (res.authSetting['scope.userInfo']) {
      console.log("已授权=====")
//8888888888888888888888888888888888
var sessionId =wx.getStorageSync('SESSIONID')
var hymember =wx.getStorageSync('HYMEMBER')
var expiredTime =wx.getStorageSync('EXPIREDTIME')
var now = +new Date()
if (now - expiredTime <=1*24*60*60*1000) {//首先进行缓存判断。这里是存在的情况，将缓存写入全局变量
//if (2 <=1) {//在数据库修改会员绑定后，需要变一下缓存就放开这里的判断。
  app.globalData.sessionId = sessionId
  app.globalData.hymember = hymember
  app.globalData.expiredTime = expiredTime
}else{//首先进行缓存判断。这里是不存在的情况处理
  //console.log("缓存不在有效时间内")
  //var that=app;
wx.login({     // 登录 
  
  success: res => {
    wx.request({
      url:'https://www.qunqing168.com/ecmsapi/index.php?mod=eapiuser&act=codekeyid',
      data:{
        code: res.code
       },
       
       success: function(res) {
       
        if(res.data.login==1){//未绑定的情况，进行下面的步骤 未绑定 为 1 已绑定 为 2

                   //console.log(res)
                   wx.getUserInfo({
                     withCredentials:true,
                     
                     success:function(res_user){

                   wx.request({
                 
                     url:'https://www.qunqing168.com/ecmsapi/index.php?mod=eapiuser&act=signin',
                       data:{
                        
                         session_key:res.data.session_key,
                         sessionId:that.globalData.sessionId,
                         encryptedData:res_user.encryptedData,
                         iv:res_user.iv,
                         hym:res.data.hyxx.hym,
                         mm:res.data.hyxx.mm
                       },
//在服务器换取微信会员信息，并注册新的会员，注册好之后，再将会员信息返回到微信服务器                         
                     success: function(res) {
                   
                       console.log("0k:"+res)// 服务器回包信息 
                       console.log(res)// 服务器回包信息
                      
                       var data = res.data
                     console.log(res.data.sessionId)
                     // 把 SessionId hymember expiredTime  和过期时间放在内存中的全局对象和本地缓存里边
                     app.globalData.sessionId =data.sessionId //sessionId取会员ID号为好
                      wx.setStorageSync('SESSIONID',data.sessionId)//把会员sessionId也就是会员的id号存入本地设备缓存
                      app.globalData.hymember =data.data  //会员信息存入全局变量
                      wx.setStorageSync('HYMEMBER',data.data)//把会员信息存入本地设备缓存
                      var expiredTime = +new Date() +1*24*60*60*1000 // 假设登录态保持1天
                      app.globalData.expiredTime =expiredTime //把保存登录状态过期时间存入全局变量
                      wx.setStorageSync('EXPIREDTIME',expiredTime)//把保存登录状态过期时间永久存入本地设备缓存
                     }
                 
                   })
                 
                   },
                   fail:function(res_user){//未授权返回的信息

                   }
                   }) 

          }else {//已经绑定的情况  把 SessionId hymember expiredTime  和过期时间放在内存中的全局对象和本地缓存里边

            var data = res.data

            
            app.globalData.sessionId =data.sessionId //sessionId取会员ID号为好
            app.globalData.hymember =data.data  //会员信息存入全局变量
             var expiredTime = +new Date() +1*24*60*60*1000 // 假设登录态保持1天
             app.globalData.expiredTime =expiredTime //把保存登录状态过期时间存入全局变量
             wx.setStorageSync('SESSIONID',data.sessionId)//把会员sessionId也就是会员的id号存入本地设备缓存
             wx.setStorageSync('HYMEMBER',data.data)//把会员信息存入本地设备缓存
             wx.setStorageSync('EXPIREDTIME',expiredTime)//把保存登录状态过期时间永久存入本地设备缓存

            }

       
      }
    })

  },
    // 发送 res.code 到后台换取 openId, sessionKey, unionId
  })

}
//8888888888888888888888888888888888      
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      wx.getUserInfo({
        success: res => {
          console.log(res)
          // 可以将 res 发送给后台解码出 unionId
          app.globalData.userInfo = res.userInfo
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (app.userInfoReadyCallback) {
            app.userInfoReadyCallback(res)
          }
          wx.navigateTo({
            url: '../login/login',
          })
        },
 
        fail(res) {//可以不需要
          //console.log("获取用户信息失败", res)

        }
      })
    } else {
      console.log("未授权=====")

      that.showSettingToast("请授权")
    }
  }
})
//---------------------------
},

  // 打开权限设置页提示框
  showSettingToast: function(e) {
    var that=this;
    wx.showModal({
      title: '提示！',
      confirmText:"授权登录",
      showCancel: false,
      content: "授权后才能给您更好的服务<>",
      success: function(res) {
        if (res.confirm) {
              // 获取用户信息
              wx.navigateTo({
                url: '../login/login',
              })
        }
      }
    })
  }
//------------------------------

})
