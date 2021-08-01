// pages/gwc/gwc.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //qunqing: app.globalData.tbdh, //不再需要
    //dhlj: app.globalData.dhlj,

    carts: [], // 购物车列表
    hasList: false, // 列表是否有数据
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: false, // 全选状态，默认不全选
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /*   onLoad: function (options) {

    }, */
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    var carts = wx.getStorageSync('carts') || [];
    console.log(carts)
    var length = carts.length; //数组长度
    if (length > 0) {
      var hasList = true
    } else {
      var hasList = false
    }

    this.setData({
      hasList: hasList, // 既然有数据了，那设为true吧
      carts: carts

    });
    this.getTotalPrice(); // 获取总价 
  },


  goto(event) { //跳转链接
    app.router.navigateTo({
      url: event.currentTarget.dataset.lj
    })
  },
  getTotalPrice() {
    let carts = this.data.carts; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据

      for (let x = 0; x < carts[i]['origin'].length; x++) {
        if (carts[i]['origin'][x].selected) { // 判断选中才会计算价格
          total += carts[i]['origin'][x].num * carts[i]['origin'][x].price; // 所有价格加起来
        }
      }

    }
    this.setData({ // 最后赋值到data中渲染到页面
      //carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  select(e) { //是否全选当前origin中的selected
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let carts = this.data.carts;
    let selectAllS = carts[index]['selected']; // 是否全选状态
    let cartss = carts[index].origin;
    console.log(cartss)
    for (let i = 0; i < cartss.length; i++) {
      carts[index].origin[i].selected = !selectAllS; // 改变所有商品状态          
    }
    carts[index]['selected'] = !selectAllS;
    wx.setStorageSync('carts', carts); //存入缓存
    this.setData({
      carts: carts
    });
    this.getTotalPrice(); // 重新获取总价
  },
  selectList(e) {
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    const index2 = e.currentTarget.dataset.index2; // 获取data- 传进来的index
    let carts = this.data.carts;
    console.log(carts)
    const selected = carts[index2].origin[index].selected;
    carts[index2].origin[index].selected = !selected; // 改变状态  
    if (selected) {
      carts[index2]['selected'] = false;
    }

    this.setData({
      carts: carts
    });
    wx.setStorageSync('carts', carts); //存入缓存 
    this.getTotalPrice(); // 重新获取总价
  },

  selectAll(e) { // 是否全选状态
    let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {

      carts[i]['selected'] = selectAllStatus;


      let length = carts[i]['origin'].length;

      for (let x = 0; x < length; x++) {
        carts[i].origin[x].selected = selectAllStatus; // 改变所有商品状态
      }
    }
    wx.setStorageSync('carts', carts); //存入缓存


    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice(); // 重新获取总价
  },
  // 增加数量
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    const index2 = e.currentTarget.dataset.index2; // 获取data- 传进来的index
    let carts = this.data.carts;

    let num = carts[index2].origin[index].num;
    let pmaxnum = carts[index2].origin[index].pmaxnum;
    if (num == pmaxnum) {
      wx.showToast({
        title: '没有多余库存！',
        icon: 'success',
        duration: 2000
      });
      return false; //如果购买数量等于库存时 跳出 不在执行后面的代码
    }

    num = num + 1;
    carts[index2].origin[index].num = num;

    wx.setStorageSync('carts', carts); //存入缓存

    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const index2 = e.currentTarget.dataset.index2;
    let carts = this.data.carts;
    let num = carts[index2].origin[index].num;
    if (num <= 1) {
      return false; //如果购买数量为0 或者1的情况下 跳出不执行下面的
    }
    num = num - 1;
    carts[index2].origin[index].num = num;
    wx.setStorageSync('carts', carts); //存入缓存
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    const index2 = e.currentTarget.dataset.index2;
    let carts = this.data.carts;
    const length = carts[index2].origin.length;
    if (length > 1) {
      carts[index2].origin.splice(index, 1); // 删除购物车列表里这个商品
    } else {
      carts.splice(index2, 1); // 删除购物车列表里这个商品 
    }
    wx.setStorageSync('carts', carts); //存入缓存
    this.setData({
      carts: carts
    });
    if (!carts.length) { // 如果购物车为空
      this.setData({
        hasList: false // 修改标识为false，显示购物车为空页面
      });
    } else { // 如果不为空
      this.getTotalPrice(); // 重新计算总价格
    }
  },
  qinkongAll: function () {
    wx.setStorageSync('carts', ''); //存入缓存 
    this.onShow();
  },
  orders: function () {
    /*    let carts = this.data.carts;
       //var carts = wx.getStorageSync('carts'); //
       for (var i = 0; i < carts.length; i++) { //第一步将origin数组当中没有选中的去掉

         for (var x = 0; x < carts[i].origin.length; x++) {
           if (carts[i].origin[x].selected) {} else {
             carts[i].origin.splice(x, 1); // 删除购物车列表里这个商品
           }
         }
       }

       console.log(carts) 
       for (var i = 0; i < carts.length; i++) { //第一步将origin数组当中没有选中的去掉
         console.log(carts[i].origin.length)
         if (carts[i].origin.length === 0) {
           carts.splice(i, 1); // 删除购物车列表里这个商品
         }
       }



     console.log(carts)
     wx.setStorageSync('cartss', carts); //存入缓存 
    */

    var address = wx.getStorageSync('address') || []; //先从缓存中读取配送地址      
    if ((address.name && address.phone && address.detail)) { //如果缓存中存在 就直接跳转 这样会快一些

      /* wx.navigateTo({
        url: '../orders/orders'
      }) */
      app.router.navigateTo({
        url: '../orders/orders'
      })

    } else {
      this.orderss(); //如果缓存中不存在就到服务器去调取 
    }

  },
  orderss: function () { //获取配送地址
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=address',
      data: {
        hyid: app.globalData.hymember.userid,
      },
      success: function (res) {
        console.log(res)
        console.log(res.data['0'].truename)
        var name = res.data['0'].truename;
        var phone = res.data['0'].phone;
        var detail = res.data['0'].address;
        var value = {
          name: name,
          phone: phone,
          detail: detail
        }
        if (value.name && value.phone && value.detail) { //数据存在就写入缓存
          wx.setStorage({
            key: 'address',
            data: value,
          })
        } else {
          wx.removeStorage({ //数据不存在就清除缓存
            key: 'address',
            success(res) {
              console.log(res)
            }
          })
        }

        wx.navigateTo({
          url: '../orders/orders'
        })
      }
    })
  },

  details: function (res) {
    var details = res.currentTarget.dataset.details;
    var details2 = res.currentTarget.dataset.details2;
   console.log(details)
    var mjid = res.currentTarget.dataset.mjid;
    var spid = details.id; //商品id
    var splm = details.classid; //商品栏目id
    var mjid = details2.id; //商家卖家id
    var mjlm = details2.classid; //商家卖家栏目id
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=details', //这里就是服务器数据的地址链接
      data: {
        spid: spid,
        splm: splm,
        mjid: mjid,
        mjlm: mjlm
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        var details = res.data.data;
        console.log(details)
        wx.setStorageSync('details', details) //存入缓存 */
        wx.navigateTo({
          url: '../details/details'
        })
      }
    })
  },

})