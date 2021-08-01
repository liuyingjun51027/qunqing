// router.js 
module.exports = {
  navigateTo(object) {
      if (getCurrentPages().length > 9) {
          this.redirectTo(object)
          // this.reLaunch(object)
      } else {
          wx.navigateTo(object)
      }
  },
  // 其他跳转不处理
  navigateBack(object) {
      wx.navigateBack(object)
  },
  switchTab(object) {
      wx.switchTab(object)
  },
  redirectTo(object) {
      wx.redirectTo(object)
  },
  reLaunch(object) {
      wx.reLaunch(object)
  }
}

//小程序文档里跳转路径的方法都有介绍，这里就不细说了！讲一下业务背景吧！随着项目越来越大，页面的跳转也越来越多，使用navigateTo方法添加的页面栈也越来越多了，不知不觉可能就到了十层了 再用navigateTo去跳转就跳不动了，这个时候需要redirectTo删除当前页面栈来跳转或者用reLaunch删除所有页面栈来跳转 用那就要看业务场景了。可是什么时候到了十层了呢？这个时候关键的api getCurrentPages()来了！它返回的是一个数组，那么就可以获取它的length来做判断了！
/*************
// app.js
// 引入路径于实际为准
import router from './utils/router.js'
App({
    //....
    router,
    //...
})

// demo.js
const app = getApp()
Page({
    //...
    goto(){
        app.router.navigateTo({url:"/pages/index/index"})
     },
    //...
})
<!-- demo.wxml --> 
<view catchtap="goto">goto</view>

****** */