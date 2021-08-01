// pages/orders/orders.js
const app = getApp()
Page({
  data: {

    address: {},
    hasAddress: false,
    total: 0,
    hasList: false,
    cartss: []
  },
  onLoad: function () {
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=address',
      data: {

      },

      success: function (res) {
        console.log(res)
      }
    })

  },
  onReady() {
    this.getTotalPrice();
  },

  onShow: function () {
    let carts = wx.getStorageSync('carts');
    console.log(carts)
     for (var i = carts.length-1; i > -1; i--) { //第一步将origin数组当中没有选中的去掉
       console.log("carts"+i)
        for (var x = carts[i].origin.length-1; x >-1; x--) {
          console.log("origin.length"+x)
          //console.log("carts[i].origin[x].selected---"+carts[i].origin[x].selected)

         if (carts[i].origin[x].selected===false) {
          console.log("carts["+i+"].origin["+x+"].selected false---"+carts[i].origin[x].selected)
         carts[i].origin.splice(x,1);

        }

      } 
    }

     for (let i = carts.length-1; i > -1; i--) { //第一步将origin数组当中没有选中的去掉

      if (carts[i].origin.length===0) {
        carts.splice(i, 1); // 删除购物车列表里这个商品
      }
    } 
   let length = carts.length; //数组长度
    if (length > 0) {
      var hasList = true
    } else {
      var hasList = false
    }
    this.setData({
      hasList: hasList,
      cartss: carts

    })
    this.getTotalPrice();

    const self = this;
    wx.getStorage({

      key: 'address',
      success(res) {

        self.setData({
          address: res.data,

          hasAddress: true
        })
      }
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.cartss; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      for (let x = 0; x < carts[i]['origin'].length; x++) {
        total += carts[i]['origin'][x].num * carts[i]['origin'][x].price; // 所有价格加起来
      }
    }
    this.setData({
      total: total.toFixed(2)
    })
  },

  toPay: function (res) {//去支付
    var $data = res.currentTarget.dataset;
    console.log($data.money)
    console.log($data.attach)
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapiextendfpay&act=wxpaytyxd',
      data: {
        fee: $data.money,
        openid: app.globalData.hymember.openId,
        attach: JSON.stringify($data.attach) //订单详情数据 进行转化 
        //detail:22222222 //订单详情数据
      },
      success: function (res) { 
        //console.log(global.openid)
        console.log(res.data);
        console.log(app.globalData.hymember.openId);
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            console.log('success');
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 3000
            });
          }
        })
      }
    })

  },
   /* 支付  可供参考 未使用 */
   payVip: function (res) {
    console.log("oOi-M5bNLTICkicV0syHrE5AWd4E")
    console.log(res.currentTarget.dataset);
    var $data = res.currentTarget.dataset;
    console.log($data.money)
    this.globalData.paymoney = $data.money
    console.log(this.globalData.paymoney)
    wx.request({
      //url: '***payjoinfee.php',//改成你自己的链接
      url: 'https://www.qunqing168.com/php_sdk_v3.0.10/payjoinfee.php', //改成你自己的链接

      data: {
        fee: this.globalData.paymoney,
        //openid: wx.getStorageSync('openid')
        openid: 'oOi-M5bNLTICkicV0syHrE5AWd4E'

      },
      method: 'GET',
      success: function (res) {
        //console.log(global.openid)
        console.log(res.data);
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            console.log('success');
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 3000
            });
            wx.request({
              url: getApp().globalData.URL + '/e/extend/api/index.php?m=user&c=ktvip',
              data: {
                userid: global.userid,
                groupid: $data.id,
                userdate: $data.vipday
              },
              method: 'GET',
              success: function (res) {
                wx.setStorageSync("groupid", $data.id);
                global.groupid = wx.getStorageSync("groupid");
                wx.showToast({
                    title: '开通成功', //应该是 支付成功
                    icon: 'succes',
                    duration: 2000,
                    mask: true
                  }),
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../../pages/index/index'
                    })
                  }, 3000)
              }
            })
          },
          'fail': function (res) {
            console.log(res);
          },
          'complete': function (res) {
            console.log('complete');
          }
        });
      },
      fail: function (res) {
        console.log(res.data)
      }
    });
  }
})