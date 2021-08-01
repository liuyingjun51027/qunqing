// pages/fx/fx.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    danmuList: ['太好看了', 'hhhh', '11111', '99999'],
    list: [],
    page: 0,
    qunqing: [],
    dhlj: [],
    sysWidth: 0,
    hymember:[],
    userInfo: [],
    videoidx: null,//视频显示
    plidx:null, //评论显示
    topNum:0
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    that.setData({
      qunqing: app.globalData.tbdh,
      dhlj: app.globalData.dhlj,
      sysWidth: app.globalData.sysWidth,
      hymember: app.globalData.hymember,
      userInfo: app.globalData.userInfo
      });
    var list = wx.getStorageSync("fxlist") || [];



    if (list) { // 本地如果有缓存列表，提前渲染

      that.setData({
        page: 1,
        //list: list,
        ['list[0]']: list,

      })

    }
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=fx', //这里就是服务器数据的地址链接
      data: {
        page: 1,
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        console.log(res.data.data);

        var arr = res.data.data;
        arr.map(item => { //遍历去掉数组当中的<br />
          item.xq = item.xq.replace(/<br \/>/g, '\n').replace(/\"\"/g, '')

        })
        console.log(arr)
        var list = res.data.data;
        var page = 0; //油画
         that.setData({
          page: 1,
          ['list[' + page + ']']: list
        }); 
        console.log(list)
        wx.setStorageSync("fxlist", list);
        var nowTime = new Date();
        that.time(list, page, 0, list.length, nowTime);
        that.textgao(list, page, 0, list.length);
      }
    })
    //requestTask.abort() // 取消请求任务

  },

  myfx: function () {
    app.router.navigateTo({
      //url: "../fxmy/fxmy"
      url: "../fxmy/myxc/myxc"
    })

  },
  onShow: function () { // 页面显示/切入前台时触发。
    //this.onLoad()
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
  textgao: function (list, page, i, length) {
    var that = this;
    if (i < length) {
      var query = wx.createSelectorQuery();
      query.select('#c' + i).boundingClientRect(function (rect) {
        console.log(rect.height);
        if (rect.height > 60) {
          that.setData({
            ['list[' + page + '][' + i + '].xs']: true
          })
        }
      }).exec();
      var i = i + 1;
      that.textgao(list, page, i, length);
    }

  },
  zk: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var id = parseInt(e.currentTarget.dataset.id);
    this.setData({
      ['list[' + index + '][' + id + '].xs2']: true
    })

  },
  sq: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var id = parseInt(e.currentTarget.dataset.id);
    this.setData({
      ['list[' + index + ']['+id+'].xs2']: false
    })

  },
  mageyulan: function (e) {
    var tplj = e.currentTarget.dataset.tplj;
    var tpljfz = [];
    for (var i = 0; i < tplj.length; i++) {
      tpljfz[i] = "https://1681.qunqing168.com" + tplj[i];
    }
    wx.previewImage({
      current: tpljfz[0], // 当前显示图片的http链接
      urls: tpljfz // 需要预览的图片http链接列表
    })
  },
  pengyouquandelete: function (e) {
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
            url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapitable&act=pengyouquandelete', //这里就是服务器数据的地址链接
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
  pengyouquanupload: function (e) { //朋友圈修改
    app.router.navigateTo({
      url: "../fxmy/fxxg/fxxg"
    })
    /*     var that = this;
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
                url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapitable&act=pengyouquanupload', //这里就是服务器数据的地址链接
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
        }) */
  },
  bindPlay: function (e) {
    var idx = parseInt(e.currentTarget.dataset.idx);
    // 没有播放时播放视频
    if (!this.data.videoidx) {
      this.setData({
        videoidx: idx
      })
      this.videoContext = wx.createVideoContext('myVideo' + idx)
      this.videoContext.play()
    } else { // 有播放时先将视频暂停，再播放当前点击的current
      var videoContext = wx.createVideoContext('video' + this.data.videoidx)
      videoContext.pause()
        if (this.data.videoidx != idx) {
          
          this.setData({
            videoidx: null
          })
        }

      this.setData({
        videoidx: idx
      })
      var videoContext = wx.createVideoContext('video' + idx)
      videoContext.play()
    }
  },
  bindPause: function (e) {
    var idx = this.data.videoidx;
    this.videoContext = wx.createVideoContext('myVideo' + idx)
    this.videoContext.pause()
    this.setData({
      videoidx: null
    })
  },
  zkgb:function(e){
    var kg = parseInt(e.currentTarget.dataset.kg);//1为展开 2为关闭
    if(kg==1){
      var idx = parseInt(e.currentTarget.dataset.idx);
      this.setData({
        plidx: idx
      })
    }else{//为2的情况 关闭
      this.setData({
        plidx: null
      })
    }
  },
  dz:function(e){
    var hymember=this.data.hymember;
    console.log(hymember)
var kg = parseInt(e.currentTarget.dataset.kg);//1为展开 2为关闭
var idx = parseInt(e.currentTarget.dataset.idx);
if(kg==2){
  console.log(e.detail.value);
}
console.log(kg)
console.log(idx)
/*
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=dz', //这里就是服务器数据的地址链接
      data: {
        kg: kg,
        idx:idx
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        console.log(res.data.data);

        var arr = res.data.data;
        arr.map(item => { //遍历去掉数组当中的<br />
          item.xq = item.xq.replace(/<br \/>/g, '\n')

        })
        console.log(arr)
        var list = res.data.data;
        var page = that.data.page - 1; //油画
        that.setData({
          page: page,
          ['list[' + page + ']']: list
        });
        console.log(list)
        wx.setStorageSync("fxlist", list);
        var nowTime = new Date();
        that.time(list, page, 0, list.length, nowTime);
        that.textgao(list, page, 0, list.length);
      }
    })*/
  },
  nextPage: function (e) {
    wx.showLoading({
      title: '加载内容中...',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    var that = this;
    var page = that.data.page;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=fx', //这里就是服务器数据的地址链接
      data: {
      page:page + 1
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        var arr = res.data.data;
        arr.map(item => { //遍历去掉数组当中的<br />
          item.xq = item.xq.replace(/<br \/>/g, '\n')

        })
        if (res.data.data) {
          console.log(res.data.data);
          var list = res.data.data //新的数据

          let page = that.data.page+ 1;
          that.setData({
            page: page,
            ['list[' + page + ']']: list
          });
          console.log(list)
          wx.setStorageSync("fxlist", list);
          var nowTime = new Date();
          that.time(list, page, 0, list.length, nowTime);
          that.textgao(list, page, 0, list.length);
        }
      }
    })

    // requestTask.abort() // 取消请求任务

  },
})