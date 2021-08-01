const app = getApp()
Page({
  data: {
        //搜索框顶端
        navHeight: '',
        menuButtonInfo: {},
        searchMarginTop: 0, // 搜索框上边距
        searchWidth: 0, // 搜索框宽度
        searchHeight: 0, // 搜索框高度

      curIndex: 0,
      isScroll: false, isScroll: true,
      toView: 'm4',
      hymember:[],
  },
  onReady:function(){
    //搜索框顶端实现
    this.setData({
      hymember:app.globalData.hymember,
      menuButtonInfo: wx.getMenuButtonBoundingClientRect()
    })
    console.log(this.data.menuButtonInfo)
    const { top, width, height, right } = this.data.menuButtonInfo
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        const { statusBarHeight } = res
        const margin = top - statusBarHeight //top 安全区域左上角纵坐标 减去 状态栏的高度，单位px
        console.log(top)
        console.log(margin)
        this.setData({
          navHeight: (height + statusBarHeight + (margin * 2)),
          searchMarginTop: statusBarHeight + margin, // 状态栏 + 胶囊按钮边距
          searchHeight: height,  // 与胶囊按钮同高
          searchWidth: right - width // 胶囊按钮右边坐标 - 胶囊按钮宽度 = 按钮左边可使用宽度
        })
      },
    })
    //搜索框顶端实现
    var hymember = this.data.hymember;
    var userid = hymember['userid'];
    var username = hymember['username'];
      var self = this;
      wx.request({
          url:'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=mytjspml',
          data: {
            userid: userid,
            username: username
          },
          success(res){
            console.log(res.data.category)
            console.log(res.data.detail)
            var category =res.data.category;
            var detail =res.data.detail;
              self.setData({
                  category:category,
                  detail : detail
              });
          }
      });
      
  }, 
  switchTab(e){
    const self = this;
     this.setData({
      isScroll: true
    }) 
    setTimeout(function(){
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    },0)
     setTimeout(function () {
      self.setData({
        //isScroll: false
        isScroll: true
      })
    },1) 
      
  },

  goto(event) { //跳转链接
    app.router.navigateTo({
      url: event.currentTarget.dataset.lj
    })
  },
  
})