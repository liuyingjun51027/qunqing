// pages/search/search.js
const app = getApp()
let timeId = null;
Page({
  data: {
    keyword: '',
    history: ['风景', '海景', '向日葵'], //搜索历史记录
    hot: ['风景', '海景', '向日葵', '老虎'], //热点推荐
    result: [],//搜索到的结果数组
    showKeywords: false,
    keywords: ['风景', '海景', '向日葵', '黄金大道'], //搜索关键字
    value:'',
    id: '',
    showResult: false,
    historyss:1,
    page:0
  },
  cancelSearch() { //取消搜索
    wx.setStorageSync("search", '') // 覆盖缓存数据
    this.setData({
      showResult: false,
      showKeywords: false,
      historyss:1,
      value: '',
      result:[],
      page:0

    })
  },
  searchInput(e) {
    var that = this;
    
    console.log(e.detail.value)
    if (!e.detail.value) {
      wx.setStorageSync("search", '') // 清除缓存数据
      this.setData({
        showKeywords: false,
        historyss:1,
        result:[],
        page:0
      })
    } else {
      //---------------
      var text=e.detail.value;
      wx.request({

        url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=keywords', //这里就是服务器数据的地址链接
        data: {

          keyword: text,
          

        },

        method: 'GET', //参数传递的方式 分为get 和post两种
        success: function (res) { //这里属于数据调取的固定写法
          if (res.data.data) {
            console.log(res.data.data);
            var list = res.data.data //油画

            that.setData({
         
              keywords: list,
              page:0

            });
  
          }
        }
      })
      //----------------

      if (!this.data.showKeywords) {

        timeId && clearTimeout(timeId);
        timeId = setTimeout(() => {
          this.setData({

            showKeywords: true,
            historyss:false,
            page:0
          })
        }, 1000)
      }
    }
  },
  keywordHandle(e) {
    var that = this;
    const text = e.target.dataset.text;
    const id = e.target.dataset.id;
    console.log(text+id)
    wx.request({

      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=search', //这里就是服务器数据的地址链接
      data: {

        keyword: text,
        id:id

      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        if (res.data.data) {
          console.log(res.data.total);
          console.log(res.data.data);
          var list = res.data.data //油画
          
          that.setData({
            page:0,
            keyword: text,
            ['result[0]']: list,

          });
          wx.setStorageSync("search", list) // 覆盖缓存数据 油画

        }
      }
    })


    this.setData({
      value: text,
      id: id,
      showKeywords: false,
      showResult: true,
      historyss:false,
      page:0,
    })
    this.historyHandle(text);
  },

  keywordHandle2(e) {
    var that = this;
    const text = e.target.dataset.text;

      wx.request({

        url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=keywords', //这里就是服务器数据的地址链接
        data: {

          keyword: text,


        },

        method: 'GET', //参数传递的方式 分为get 和post两种
        success: function (res) { //这里属于数据调取的固定写法
          if (res.data.data) {
            console.log(res.data.data);
            var list = res.data.data //油画

            that.setData({
              value: text,
              keywords: list,
              page:0

            });

          }
        }
      })
      //----------------

      if (!this.data.showKeywords) {

        timeId && clearTimeout(timeId);
        timeId = setTimeout(() => {
          this.setData({
            showKeywords: true,
            historyss:false,
            page:0
          })
        }, 1000)
      }
  
  },


  historyHandle(value) {
    let history = this.data.history;
    const idx = history.indexOf(value);
    if (idx === -1) {
      // 搜索记录只保留8个
      if (history.length > 7) {
        history.pop(); //pop() 方法用于删除并返回数组的最后一个元素
      }
    } else {
      history.splice(idx, 1); //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
    }
    history.unshift(value); //unshift() 方法可向数组的开头添加一个或更多元素
    wx.setStorageSync('history', JSON.stringify(history)); //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串
    this.setData({
      history
    });
  },
  onLoad() {
    const history = wx.getStorageSync('history');
    if (history) {
      this.setData({
        history: JSON.parse(history)
      })
      console.log(this.data.history);
    }
  },
  // 获取滚动条当前位置
  scrolltoupper: function (e) {
    console.log(e)
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
  details: function (res) {

    var details = res.currentTarget.dataset.details;
    console.log(details)
    var spid=details.id;
    var splm=details.classid;
    var mjid=details.maijia.id;
    var mjlm=details.maijia.classid;
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
          url: "../details/details"
        }) 
    
      }
    })

  },
  nextPage: function (e) {
    console.log(e)

    const text = this.data.value;
    const id = this.data.id;

    wx.showLoading({
      title: '加载内容中...',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    var that = this;
    if(id){
      var url="https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=search";
    }else{
      var url="https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=searchall";
    }
    wx.request({
      url: url, //这里就是服务器数据的地址链接
      data: {
        keyword: text,
        id:id
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        /* var list = wx.getStorageSync("search"); //油画
        
          console.log(res.data.data);
          var lists = res.data.data //新的数据
          var length = lists.length; //数组长度
          for (let i = 0; i <= length; i++) {
            list.push(lists[i])
          } */
          var list = res.data.data //新的数据
           var page=that.data.page+1
          that.setData({

            ['result['+page+']']: list,
            page:page

          });
          wx.setStorageSync("search", list) // 覆盖缓存数据

 /*          if (res.data.data) { } else {
          that.nextPage2()
        } */
      }
    })

    // requestTask.abort() // 取消请求任务

  },
  /* nextPage2: function () {
    this.nextPage()
  }, */
  // 获取滚动条当前位置
  scrolltoupper: function (e) {
   /*  console.log(e) */
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
  onShow:function(e) {
   //添加属性confirm-type=“search” 键盘回车键完成变成搜索 添加属性@confirm=“searchClick()” 点击回车键（完成或搜索）时触发confirm事件
   var that = this;
   var text=e.detail.value;
   console.log(text) 
    console.log(e.detail.value) 
   if (e.detail.value!=undefined) {
     this.setData({
       showKeywords: false,
       historyss:1,
       page:0
     })
   } else {
    var text=e.detail.value;
    wx.request({

      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=searchall', //这里就是服务器数据的地址链接
      data: {

        keyword: text,

      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        if (res.data.data) {

          console.log(res.data.data);
          var list = res.data.data //油画

          that.setData({
            page:0,
            keyword: text,
            ['result[0]']: list,

          });
          wx.setStorageSync("search", list) // 覆盖缓存数据 油画

        }
      }
    })


    this.setData({
      value: text,
      id:'',
      showKeywords: false,
      showResult: true,
      historyss:false
    })
    this.historyHandle(text); 
    }
    }
})
