//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    logs: [],
    qunqing:app.globalData.tbdh 
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  goto(event){//跳转链接
    app.router.navigateTo({url:event.currentTarget.dataset.lj})
 }
})
