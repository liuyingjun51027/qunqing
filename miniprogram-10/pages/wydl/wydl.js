// pages/fx/fx.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 0,
    qunqing: [],
    dhlj: [],
    sysWidth: 0,
    hymember: [],
    userInfo: [],
    videoidx: null, //视频显示
    plidx: null, //评论显示
    topNum: 0,
    fclassid: 0,
    fid: 0, //商家id
    myfid: 0, //我的商家id
    classid: 0,
    lmmc: '', //栏目名称
    title: '', //商家会员名
    dpmc: '', //店铺名称
    x: 0,
    sjuserid: 0, //商家会员id
    sjusername: '', //商家会员名
    spdlxe: 0, //商品代理限额 50 其实就是商家中平台为其约定的每件商品可被道理的次数
    dlxgxx: [] //我的店铺的代理相关信息 就是我的代理总数量 还可代理数量 已代理 等相关信息
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
  onLoad: function (options) {

    var that = this;
    if (options) {
      that.setData({
        fclassid: options.fclassid,
        fid: options.fid,
        myfid: options.myfid,
        classid: options.lmid,
        lmmc: options.lmmc, //栏目名称
        title: options.title, //商家会员名
        dpmc: options.dpmc, //店铺名称
        sjuserid: options.userid, //店铺名称
        sjusername: options.username, //店铺名称
        spdlxe: options.spdlxe, //商品代理限额 50 其实就是商家中平台为其约定的每件商品可被道理的次数
        x: options.x, //1为 代理 2 为取消
        qunqing: app.globalData.tbdh,
        dhlj: app.globalData.dhlj,
        sysWidth: app.globalData.sysWidth,
        hymember: app.globalData.hymember,
        userInfo: app.globalData.userInfo
      });
    }
    var fclassid = that.data.fclassid
    var fid = that.data.fid
    var myfid = that.data.myfid
    var classid = that.data.classid
    var sjuserid = that.data.sjuserid //
    var sjusername = that.data.sjusername //
    var x = that.data.x
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=spxxwydl', //这里就是服务器数据的地址链接
      data: {
        fclassid: fclassid,
        fid: fid,
        myfid: myfid,
        classid: classid,
        username: sjusername,
        userid: sjuserid,
        page: 1,
        x: x
      },
      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        console.log(res.data.data);
        if (res.data.success) {
          var list = res.data.data;
          var dlxgxx = res.data.dlxgxx; //我的店铺的代理相关信息 就是我的代理总数量 还可代理数量 已代理 等相关信息
          console.log(res.data.dlxgxx);
          var page = 0; //油画
          that.setData({
            dlxgxx: dlxgxx,
            page: 1,
            ['list[' + page + ']']: list
          });
          var nowTime = new Date();
          that.time(list, page, 0, list.length, nowTime);
        } else {
          that.setData({
            page: 0
          });
        }
      }
    })
  },

  goto(event) { //跳转链接
    app.router.navigateTo({
      url: event.currentTarget.dataset.lj
    })
  },
  // 第三种方式：函数处理

  time: function (list, page, i, length, nowTime) {
    //console.log(nowTime)
    var nowTime = nowTime;
    var data = Number(list[i].newstime * 1000);
    //console.log(data)
    var now = new Date(data);
    //console.log(now)
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var timee = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    //console.log(timee)

    var oldTime = data;

    var diff = Math.floor((nowTime - oldTime) / 1000 / 60);
    let time = timee;

    if (diff <= 59) {
      time = diff + '分钟前';

    } else if (diff <= 60 * 24 - 1) {
      time = Math.floor(diff / 60) + '小时前';

    } else if (diff <= 60 * 24 * 3 - 1) {
      time = Math.floor(diff / 60 / 24) + '天前';

    } else {
      //time = time.split(" ")[0];
      time = time;

    }
    this.setData({
      ['list[' + page + '][' + i + '].newstime']: time
    })
    i++;
    if (i < length) {

      this.time(list, page, i, length, nowTime);
    }

  },

  spxxdelete: function (e) {//删除事件
    var that = this;
    var id = parseInt(e.currentTarget.dataset.id);
    var classid = parseInt(e.currentTarget.dataset.classid);
    console.log(id)

    wx.showModal({
      title: '删除提醒',
      content: '请您再次确定要删除吗？',
      success(res) {
        console.log(res)
        if (res.confirm) {
          console.log('用户点确定了')
          wx.request({
            url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=spxxdelete', //这里就是服务器数据的地址链接
            data: {
              id: id,
              classid: classid
            },
            method: 'GET', //参数传递的方式 分为get 和post两种
            success: function (res) { //这里属于数据调取的固定写法
              console.log(res);
              that.onLoad();
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  spxxupload: function (e) { //朋友圈修改
    app.router.navigateTo({
      url: "../xgxx/xgxx"
    })

  },
  wydl: function (e) {
    wx.showToast({
      title: '正在操作...',
      icon: 'success',
      duration: 1000
    });
    var that = this;
    var list = that.data.list;
    var index = parseInt(e.currentTarget.dataset.index);
    var idx = parseInt(e.currentTarget.dataset.idx);
    var x = parseInt(e.currentTarget.dataset.x);
    if (x == 1) {
      list[index][idx]['wydl'] = true;
    }
    if (x == 2) {
      list[index][idx]['qxdl'] = true;
    }
    that.setData({
      list: list
    })
    var id = parseInt(e.currentTarget.dataset.id);
    var classid = parseInt(e.currentTarget.dataset.classid);
    var x = e.currentTarget.dataset.x;


    var fclassid = that.data.fclassid
    var myfid = that.data.myfid //传我的店铺id
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=daili', //这里就是服务器数据的地址链接
      data: {
        fclassid: fclassid,
        fid: myfid,
        id: id,
        classid: classid,
        x: x
      },
      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        console.log(res.data);
        list[index][idx] = res.data.spxx;
        var dlxgxx = res.data.dlxgxx; //我的店铺代理相关信息
        that.setData({
          list: list,
          dlxgxx: dlxgxx
        })
      }
    })
  },


  nextPage: function (e) {
    wx.showLoading({
      title: '加载内容中...',
    })
    /* setTimeout(function () {
      wx.hideLoading()
    }, 2000) */

    var that = this;
    var fclassid = that.data.fclassid
    var fid = that.data.fid
    var myfid = that.data.myfid
    var classid = that.data.classid
    var sjuserid = that.data.sjuserid //
    var sjusername = that.data.sjusername //
    var x = that.data.x
    var page = that.data.page;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=spxxwydl', //这里就是服务器数据的地址链接
      data: {
        fclassid: fclassid,
        fid: fid,
        myfid: myfid,
        classid: classid,
        username: sjusername,
        userid: sjuserid,
        page: page + 1,
        x: x
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        if (res.data.success) {
          wx.hideLoading()
          console.log(res.data.data);
          var list = res.data.data //新的数据

          let page = that.data.page + 1;
          that.setData({
            page: page,
            ['list[' + page + ']']: list
          });
          console.log(list)
          var nowTime = new Date();
          that.time(list, page, 0, list.length, nowTime);


        } else {
          wx.hideLoading()
        }
      }
    })
  },
  sjdp: function (e) { //商家店铺

    var dpsjhym = e.currentTarget.dataset.dpsjhym; //代理商家会员名
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=sjdp', //这里就是服务器数据的地址链接
      data: {
        page: 0,
        pagee: 0,
        hym: dpsjhym, //代理商家会员名
        tabIndexx: 0
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        var list = res.data.data;
        var sjdp = res.data.sjdp;
        var page = res.data.page;
        var mjuser = res.data.mjuser;
        if (!res.data.success) {

          wx.showToast({
            title: '此商家 暂无商品！',
            icon: 'success',
            duration: 1000
          });
          return;
        }
        console.log(list)
        wx.setStorageSync('mjuser', mjuser) //存入缓存 
        wx.setStorageSync('page', page) //存入缓存 
        wx.setStorageSync('list', list) //存入缓存 
        wx.setStorageSync('sjdp', sjdp) //存入缓存  
        wx.setStorageSync('dpsjhym', dpsjhym) //存入缓存 

        app.router.navigateTo({
          url: "../sjdp/sjdp"
        })

      }
    })
  },
  tishi: function (e) {
    var tishi = e.currentTarget.dataset.tishi;
    wx.showToast({
      title: tishi,
      icon: 'none', //success
      duration: 1000
    });
  }
})