// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    listdata:[],

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    qunqing: app.globalData.tbdh,
    dhlj: app.globalData.dhlj,
    hymember: app.globalData.hymember,
    page:0,
    
    tabIndex:99,
    tabIndexx:0,//0全部1销量2新品3价格4秒杀
    pagee:0,//按销量新品等查询时翻页
    bdlm:0,

    haoping:true, //好评是否显示
    dpsjhym:'',
    hymname:'',
    mjuser:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var carts = wx.getStorageSync('carts') || [];//购物车中的数量
    var length = carts.length;
    this.setData({
      totalNum:length
    });
//--------
    var that = this;
    wx.getSetting({ //返回值中只会出现小程序已经向用户请求过的权限
      fail: function (res_user) { //未授权返回的信息
        
        app.router.navigateTo({
          url: "../logs/logs"
        })
      }
    })

    var hymname = this.data.hymember['username'];
     var list = wx.getStorageSync("list"); 
     var page =0;
     let List = that.groupArray(list, list.length);
console.log(list)

    if (List) { // 本地如果有缓存列表，提前渲染

      that.setData({
        hymname:hymname,
         page:1,
         //userInfo: app.globalData.userInfo,
        ['listdata['+page+']']:list
      })

    }

  },


  
    /**
     * 对一维数组进行二维化
     * dataArray:源数组
     * subGroupLength:子数组元素的个数
     */ 
    groupArray: function(dataArray, subGroupLength) {
      let start = 0;
      let dataGroupArray = [];
      while(start < dataArray.length) {
        dataGroupArray.push(dataArray.slice(start, start += subGroupLength));
      }
      console.log(dataGroupArray);
      // [ [{...},{...},...,{...}], [...], [...], ..., [...] ]
      return dataGroupArray;
    },

  goto(event) { //跳转链接
    app.router.navigateTo({
      url: event.currentTarget.dataset.lj
    })
  },


 

  getgwc: function (res) {
    var data1 = res.currentTarget.dataset.attach; //商品数据
    console.log(data1)
    //重新组合购物车信息
    var data2 = {
      maijiaid: data1['maijia']['id'],
      maijia: data1['maijia'],
      selected: false,
      origin: [{
        id: data1['id'],
        title: data1['title'],
        image: 'https://1681.qunqing168.com' + data1['titlepic'],
        num: 1,
        pmaxnum: data1['pmaxnum'],
        price: data1['price'],
        selected: true
      }]
    }


    //判断有没有购物车缓存数组，如果有就获取，没有就建立一个空的数组
    var carts = wx.getStorageSync('carts') || [];
    var length = carts.length;
    if (length > 0) {
      for (let i = 0; i < length; i++) {
        if (data2['maijiaid'] === carts[i]['maijiaid']) { //存在相同卖家的情况
          var v = carts[i]['origin'];
          var lengthh = v.length;
           console.log(lengthh)
          for (let x = 0; x < lengthh; x++) {
            if (data2['origin'][0]['id'] === carts[i]['origin'][x]['id']) { //存在相同id的情况
              if (carts[i]['origin'][x]['num'] < data2['origin'][0]['pmaxnum']) { //库存充足的情况
                carts[i]['origin'][x]['num'] = carts[i]['origin'][x]['num'] + 1;
                carts[i]['origin'][x]['selected'] = true;
                var car = carts[i] //取出修改数量后的商品信息
                carts.splice(i, 1) //删除掉数组中原来的商品信息
                carts.unshift(car); //将取出的商品信息放入数组的第一位
                wx.setStorageSync('carts', carts) //存入缓存
                wx.showToast({
                  title: '加入购物车成功！',
                  icon: 'success',
                  duration: 2000
                });
               
                app.router.navigateTo({
                  url: "../gwc/gwc"
                })
              } else { //库存不足的情况
                wx.showToast({
                  title: '没有多余库存！',
                  icon: 'success',
                  duration: 2000
                });
                
              }

              return; //如果跳出就不会执行后面的 carts.unshift($data); 
            } else { //不存在相同id的情况
              console.log(carts[i]['origin'])
              carts[i]['origin'].unshift(data2['origin'][0]); //直接将数据写入相同卖家缓存的头部

              wx.setStorageSync('carts', carts) //存入缓存
              wx.showToast({
                title: '加入购物车成功！',
                icon: 'success',
                duration: 2000
              });
              app.router.navigateTo({
                url: "../gwc/gwc"
              })
              // 返回（在if内使用return，跳出循环节约运算，节约性能） 
              return; //如果跳出就不会执行后面的 carts.unshift($data); 
            }
          }

        } else { //不存在相同卖家的情况
          carts.unshift(data2); //直接将数据写入缓存的头部
          wx.setStorageSync('carts', carts) //存入缓存
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          });
          app.router.navigateTo({
            url: "../gwc/gwc"
          })
          // 返回（在if内使用return，跳出循环节约运算，节约性能） 
          return; //如果跳出就不会执行后面的 carts.unshift($data); 
        }
      }
    } else {
      carts.unshift(data2); //直接将数据写入缓存的头部
      wx.setStorageSync('carts', carts) //存入缓存
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
      app.router.navigateTo({
        url: "../gwc/gwc"
      })
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      return; //如果跳出就不会执行后面的 carts.unshift($data);   
    }
  },

  details: function (res) {
    var details = res.currentTarget.dataset.details;
    console.log(details)
    var spid=details.id;//商品id
    var splm=details.classid;//商品栏目id
    var mjid=details.maijia.id;//商家卖家id
    var mjlm=details.maijia.classid;//商家卖家栏目id
     wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=details', //这里就是服务器数据的地址链接
      data: {
    spid:spid,
    splm:splm,
    mjid:mjid,
    mjlm:mjlm
       },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        var details=res.data.data;
        console.log(details)
        wx.setStorageSync('details', details) //存入缓存 */

        app.router.navigateTo({
          url: '../details/details'
        })

      }
        })
  },
  nextPage: function (e) {
    var page =this.data.page+1;
    wx.showLoading({
      title: '加载内容中...',
    })
   setTimeout(function () {
      wx.hideLoading()
    }, 2000) 

    var that = this;
    var hymname = wx.getStorageSync("hymname");
 

    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=wdsc', //这里就是服务器数据的地址链接
      data: {
        page:page,
        hym :hymname,
    
        page:page
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        if (res.data.success) {
          console.log(res.data.success);
         
          var list= res.data.data; //新的数据
         
          let page = that.data.page + 1;
        
          that.setData({
            floorstatus: true,
            userInfo: app.globalData.userInfo,

            ['listdata['+page+']']:list,
            page: page

          });
          wx.setStorageSync("list",list) // 覆盖缓存数据 油画

        } else {
          console.log(res.data.data);
        
          //that.nextPage2()
        }
      }
    })

    // requestTask.abort() // 取消请求任务

  },
 
  onePage: function (e) {
    wx.showLoading({
      title: '加载内容中...',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    this.onLoad()


  },
  // 获取滚动条当前位置
  scrolltoupper: function (e) {
    //console.log(e)
    if (e.detail.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  //回到顶部
  goTop: function (e) { // 一键回到顶部
    this.setData({
      topNum: this.data.topNum = 0
    });
  },
 
  globalData: {
    page: 0,
    paymoney: null
  }
})