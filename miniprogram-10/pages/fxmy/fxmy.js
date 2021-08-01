// pages/fx/fx.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qunqing: app.globalData.tbdh,
    dhlj: app.globalData.dhlj,
    sysWidth: app.globalData.sysWidth 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var list = wx.getStorageSync("fxlist")



    if (list) { // 本地如果有缓存列表，提前渲染

      that.setData({
        userInfo: app.globalData.userInfo,
        list: list

      })

    }
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=fx', //这里就是服务器数据的地址链接
      data: {

      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        console.log(res.data.data);
        var arr = [{
            id: '1',
            hundred: '1%<br />',
          },
          {
            id: '2',
            hundred: '2%',
          }
        ];
        arr.map(item => {
          item.hundred = item.hundred.replace(/br/g, '')

        })
        console.log(arr)
        var arr = res.data.data;
        arr.map(item => {
          item.xq = item.xq.replace(/<br \/>/g, '\n')

        })
        console.log(arr)
        var list = res.data.data;
        that.setData({
          userInfo: app.globalData.userInfo, 
          list: list

        });
        console.log(list)
        wx.setStorageSync("fxlist", list);
        var nowTime = new Date();
        that.time(list, 0, list.length, nowTime);
        that.textgao(list, 0, list.length);
      }
    })
    //requestTask.abort() // 取消请求任务

  },

  shangchuan: function (e) {
    console.log(e)
var index=parseInt(e.currentTarget.dataset.index);
     app.router.navigateTo({
      url: "../fxmy/fxsc/fxsc?&index="+index
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

  time: function (list, i, length, nowTime) {
    console.log(nowTime)
    var nowTime = nowTime;
    var data = Number(list[i].newstime * 1000);
    console.log(data)
    var now = new Date(data);
    console.log(now)
    var year = now.getFullYear();
    var month = now.getMonth() + 1; 
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //var timee = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    var timee = date+'/'+month + "月";

    console.log(timee)

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
      ['list[' + i + '].newstime']: time
    })
    i++;
    if (i < length) {

      this.time(list, i, length, nowTime);
    }

  },
  textgao: function (list, i, length) {
    var that = this;
    if (i < length) {

      //console.log(list)
      //console.log(i)
      //console.log(length)

      var query = wx.createSelectorQuery();
      query.select('#c' + i).boundingClientRect(function (rect) {


        console.log(rect.height);
        if (rect.height > 60) {
          that.setData({
            ['list[' + i + '].xs']: true
          })
        }

      }).exec();
      var i = i + 1;
      that.textgao(list, i, length);
    }

  },
  zk: function (e) {
    var id = parseInt(e.currentTarget.dataset.id);
    this.setData({
      ['list[' + id + '].xs2']: true
    })

  },
  sq: function (e) {
    var id = parseInt(e.currentTarget.dataset.id);
    this.setData({
      ['list[' + id + '].xs2']: false
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
              classid:classid
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
myfx: function () {
  app.router.navigateTo({
    url: "../fxmy/myxc/myxc"
  })

}
})