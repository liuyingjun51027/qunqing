// pages/coupon/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: 0,
    username: '',
    tabIndex: 1,
    list: []
  },
  tabFun(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
    this.getList()
  },
  getList:function() {

    var userid = this.data.userid;
    var username = this.data.username;
    var tabIndex = this.data.tabIndex; //0为全部 1为待付款 2为待发货 3为已发货 4为已完成
    console.log(userid)
    console.log(username)
    var that = this;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=listddgl', //这里就是服务器数据的地址链接
      data: { 
        userid: userid,
        username: username,
        tabIndex:tabIndex //0为全部 1为待付款 2为待发货 3为已发货 4为已完成
      },
      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        console.log(res)
        that.setData({
          list: res.data.data,
          list2: res.data.data2,
          pic: res.data.pic
        });
      }
    })
  },
  getList2: function (e) {
    var index = parseInt(e.currentTarget.dataset.index); //值 为1 时为上一页 2 为下一页 3 为好评 4为随意
    console.log(index)
    var total = parseInt(e.currentTarget.dataset.total); //好评总数
    var num = parseInt(e.currentTarget.dataset.page); //好评当前页

    if (index === 1) { //上一页
      //判断page是否为1 如果为1的话 停止

      if (total > 12 && num != 1) {
        var page = num - 1;
      } else {
        wx.showToast({
          title: '已经第一页',
          icon: 'success',
          duration: 2000
        });
        return;
      }

    } else if (index === 2) { //下一页
      if (total > 12 && num <= total / 12) {
        var page = num + 1;
      } else {
        wx.showToast({
          title: '已经最后一页',
          icon: 'success',
          duration: 2000
        });
        return;
      }

    } else if (index === 3) {
      var total = total; //好评总数
      var page = num; //当前页数 */
    }


    var userid = this.data.userid;
    var username = this.data.username;
    var tabIndex = this.data.tabIndex; //0为全部 1为待付款 2为待发货 3为已发货 4为已完成
    console.log(userid)
    console.log(username)
    var that = this;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=listddgl', //这里就是服务器数据的地址链接
      data: {
        page: page, //当前页
        total: total, //总页
        userid: userid,
        username: username,
        index: index,
        tabIndex:tabIndex //0为全部 1为待付款 2为待发货 3为已发货 4为已完成
      },
      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        console.log(res)
        that.setData({
          list: res.data.data,
          list2: res.data.data2,
          pic: res.data.pic
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      tabIndex: options.type || 1,
      userid: options.userid,
      username: options.username,
    })
    this.getList()
  },

  details: function (e) {

    var spid=parseInt(e.currentTarget.dataset.id); //商品id
    var splm=parseInt(e.currentTarget.dataset.classid);//商品栏目id
    var dpsjhym=e.currentTarget.dataset.dpsjhym;//商品栏目id
    var dldp=e.currentTarget.dataset.dldp;//商家卖家id

    
     wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=details', //这里就是服务器数据的地址链接
      data: {
    spid:spid,
    splm:splm,
    dpsjhym:dpsjhym,
    dldp:dldp
       },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        var details=res.data.data;
        console.log(details)
        wx.setStorageSync('details', details) //存入缓存 */
        wx.navigateTo({
          url: '../details/details'
        }) 
      }
        })
  },
})