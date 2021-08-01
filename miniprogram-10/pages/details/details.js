// pages/details/details.js
const app = getApp()
Page({

  data: {
    hpzt: "",
    ksfyt: 0,
    bindTaphaoping: [], //商品好评
    bindTaphaoping2: [],
    hpindex: 0, //好评当前页
    fjxz: 0,
    sskmaijia: [],
    addressInfo: null, //买家省市区获取
    fjktsuccess: false, //附近框条卖家是否存在
    //当前定位位置
    distance_new: null, //卖家买家距离
    latitude: null,
    longitude: null,
    //目的地坐标
    //latitude2: 116.403119,
    //longitude2: 39.913607,
    latitude2: null,
    longitude2: null,
    //116.480089,39.995997
    //116.470305,39.990402
    //配框系统
    pkzjg: '', //配框之后总价格
    pkpics: '', //配框之后的图片
    title: "",
    kzsc: "", //卡纸色彩
    bhsc: "", //裱画色彩
    xzxid: 4,
    pkpic: '', //配框图片
    jubugao: false,
    type: {
      wk: 0, //外框 1 为只有外框 2为亚麻 101 为 有亚麻内框 11为只有内框 3302为卡纸 
      kz: 0, //3302 有玻璃背板为3302 不然为假
      zb: 0,
      zp: 0
    },
    /* typex: [1, 2, 101, 31, 32, 33, 3101, 3102, 3201, 3202, 3301, 3302], */
    /* typey: ['外框', '亚麻', '内框', '一层卡纸', '二层卡纸', '三层卡纸', '一层玻璃', '一层背板', '二层玻璃', '二层背板', '三层玻璃', '三层背板'], */
    /* wkid: 0,
    ymid: 264, */
    jubu: false, //配框效果图显示局部
    bukan: {
      'xh': [],
      'sc': [],
      'fg': [],
      'kd': []
    }, //不看
    zhikan: {
      'xh': [],
      'sc': [],
      'fg': [],
      'kd': []
    }, //只看
    buxian: {
      'xh': 3,
      'sc': 3,
      'fg': 3,
      'kd': 3
    }, //不限为1时 查找不看 2时查找只看 3时不查为不限 默认为3

    xz: false,
    mjkuangcai: '', //卖家框条
    /*
            maijiayama: '', //卖家亚麻
            maijiahekazhi: '', //卖家卡纸 */
    //图片地址
    /*    kuangtiao: [],
       yama: [261, 262, 263, 264], */
    pkid: { //配框相关参数集合
      wkid: '',
      ymid: '',
      ymk: 5,
      ymkd: '',
      nkid: '',
      nkhsl: '', //内框横数量
      nkssl: '', //内框竖数量
      zbid: '',
      kzid1: '',
      kzid2: '',
      kzid3: '',
      blid: '',
      bbid: '',
      zpblid: '',
      zpbbid: '',
      kz1k: 5,
      kz1g: 5,
      kz2k: 0.2,
      kz2g: 0.2,
      kz3k: 3,
      kz3g: 3,
      bhblid: '',
      bhbbid: '',
      bh1k: 5,
      bh1g: 5,
      ym: '',
      nk: '',
      ymjg: 0,
      nkjg: 0,
      kzjg: 0,
      bhjg: 0,
      bljg: 0,
      bbjg: 0,
      bhbljg: 0,
      bhbbjg: 0,
      zpbljg: 0,
      zpbbjg: 0
    },

    pkzid: { //配框子项选择
      ym: 1,
      kz: 1,
      gh: 1,
      zp: 1,
    },


    //是否采用衔接滑动  
    circular: true,
    //是否显示画板指示点  
    indicatorDots: true,
    //选中点的颜色  
    indicatorcolor: "red",
    //是否竖直  
    vertical: false,
    //是否自动切换  
    autoplay: false,
    //自动切换的间隔
    interval: 2500,
    //滑动动画时长毫秒  
    duration: 100,
    //所有图片的高度  
    imgheights: [],
    //图片宽度 
    imgwidth: 750,
    //默认  
    current: 0,
    currentimg: 0,

    youhua: false, //判断是否需要配框的条件 true需要 false 不需要
    isScroll: false,
    isScroll: true,
    navOpacity: 0.0,
    showDialog: false,
    ongwcsl: "gwcsl",
    goods: [],
    num: 0, //购买数量
    totalNum: 0, //购买总数
    price: 0, //商品单价
    totalprice: 0, //商品总价
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    imgUrls: [], //放大展示的图片
    hymember: app.globalData.hymember,
    scnum:0,
    sfsc:false,
  },
  /**
   * 生命周期函数--监听页面显示
   */
  kdtz: function (e) { //宽度调整
    var pkid = this.data.pkid;
    const zhi = parseInt(e.currentTarget.dataset.zhi); //值
    const xm = e.currentTarget.dataset.xm; //调整名称 
    var lm = parseInt(e.currentTarget.dataset.lm);

    if (zhi > 0) {
      pkid[xm] = zhi;

    } else {
      pkid[xm] = 0.2;
    }



    this.setData({
      pkid: pkid
    })


    var data = this.data.mjkuangcai.data.maijiakuangtiao;
    var num = data.length;
    var pkpic = [];
    var goods = this.data.goods;
    var type = this.data.type;
    var pkid = this.data.pkid;
    var pkzjg = [];
    var shougf = 0;
    var a = Math.round(2 * (goods['kuang'] / 100 + goods['gao'] / 100));
    console.log(pkid)
    if (lm == 61) {
      for (var i = 0; i < num; i++) {
        pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['kz'] + "&random=1609328505445&kzid1=" + pkid['kzid1'] + "&kzid2=" + pkid['kzid2'] + "&kzid3=" + pkid['kzid3'] + "&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'] + "&kz1k=" + pkid['kz1k'] + "&kz1g=" + pkid['kz1g'] + "&kz2k=" + pkid['kz2k'] + "&kz2g=" + pkid['kz2k'] + "&kz3k=" + pkid['kz3k'] + "&kz3g=" + pkid['kz3k'];

        var area = (goods['kuang'] / 100 + 2 * (pkid['kz1k'] / 100 + pkid['kz2k'] / 100 + pkid['kz3k'] / 100)) * (goods['gao'] / 100 + 2 * (pkid['kz1g'] / 100 + pkid['kz2g'] / 100 + pkid['kz3g'] / 100)); //面积
        var kzblbbjg = area * (pkid['kzjg'] * 1 + pkid['bljg'] * 1 + pkid['bbjg'] * 1);
        var kzzk = 4 * (pkid['kz1k'] / 100 + pkid['kz2k'] / 100 + pkid['kz3k'] / 100) + 4 * (pkid['kz1g'] / 100 + pkid['kz2g'] / 100 + pkid['kz3g'] / 100); //卡纸总宽度

        pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100) + kzzk) * data[i].tprice + shougf + kzblbbjg);
      }
    }
    if (lm == 121) {
      for (var i = 0; i < num; i++) {
        pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['zb'] + "&random=1609328505445&kzid1=" + pkid['bhid1'] + "&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'] + "&kz1k=" + pkid['bh1k'] + "&kz1g=" + pkid['bh1g'];
        var area = (goods['kuang'] / 100 + 2 * (pkid['bh1k'] / 100)) * (goods['gao'] / 100 + 2 * (pkid['bh1g'] / 100)); //面积
        var kzblbbjg = Math.round(area * (pkid['bhjg'] * 1 + pkid['bhbljg'] * 1 + pkid['bhbbjg'] * 1)); //卡纸玻璃背板价格 将卡纸的第一层卡纸价格作为计算价格

        var kzzk = 4 * ((pkid['bh1k']) + 4 * (pkid['bh1g'])) / 100; //卡纸总宽度

        pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100) + kzzk) * data[i].tprice + shougf + kzblbbjg);
      }
    }
    this.setData({

      pkpic: pkpic,
      pkzjg: pkzjg


    })

  },

  jubu: function () {
    wx.showToast({
      title: '正在加载！',
      icon: 'success',
      duration: 1000
    });
    var jubu = this.data.jubu;
    var jubu = !jubu;
    var jubugao = this.data.jubugao;
    if (jubugao) {
      var jubugao = false;
    } else {
      var jubugao = 450;
    }

    this.setData({
      jubu: jubu,
      jubugao: jubugao
    })
  },
  // 计算距离函数
  Rad(d) {
    //根据经纬度判断距离
    return d * Math.PI / 180.0;
  },
  getDistance(lat1, lng1, lat2, lng2) {
    // lat1用户的纬度
    // lng1用户的经度
    // lat2商家的纬度
    // lng2商家的经度
    var radLat1 = this.Rad(lat1);
    var radLat2 = this.Rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.Rad(lng1) - this.Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(1) //保留两位小数 去掉 + 'km'
    console.log('经纬度计算的距离:' + s)
    return s
  },

  onLoad: function (e) {
    var details = wx.getStorageSync('details');
    console.log(details)
    //获取头部的滑动图片 
    //var details = wx.getStorageSync('details');
    var imgUrls = ["https://1681.qunqing168.com" + details.titlepic, "https://1681.qunqing168.com" + details.productpic, "https://1681.qunqing168.com" + details.titlepic2, "https://1681.qunqing168.com" + details.titlepic3, "https://1681.qunqing168.com" + details.titlepic4, "https://1681.qunqing168.com" + details.titlepic5];
    for (var i = 0; i < imgUrls.length; i++) {
      if (imgUrls[i] == "https://1681.qunqing168.com") {
        imgUrls.splice(i, 1); //去掉图片中的空值 也就是不存在的图片
        i = i - 1;
      }
    }



    var pmaxnum = details.pmaxnum;
    var carts = wx.getStorageSync('carts') || []; //获取缓存的购物车信息
    var length = carts.length; //判断购物车有没有信息 
    if (pmaxnum >= 1) {
      var num = 1;
    } else {
      var num = 0;
    }
    if (details.classid == 99) {
      var youhua = true;
      this.suiji(''); //去随机获取框条卖家及框条信息
    } else {
      var youhua = false;
    }

    this.setData({
      youhua: youhua,
      goods: details,
      pmaxnum: pmaxnum,
      num: num,
      hasCarts: true,
      //price: price,
      totalNum: length,
      totalprice: 0,
      imgUrls: imgUrls
    });

    this.sfsc(); //是否收藏
  },
  addCount() {
    let pmaxnum = this.data.pmaxnum;
    let num = this.data.num;
    let price = this.data.price;

    if (num < pmaxnum) {
      num++;
      var totalprice = price * num;
      this.setData({
        num: num,
        hasCarts: true,
        /* totalNum: num, */
        totalprice: totalprice
      })
    } else {
      wx.showToast({
        title: '库存已不足！',
        icon: 'success',
        duration: 2000
      });
    }

  },
  minusCount() {
    let num = this.data.num;
    let price = this.data.price;

    if (num >= 2) {
      num--;
      var totalprice = price * num;
      this.setData({
        num: num,
        hasCarts: true,
        /* totalNum: num, */
        totalprice: totalprice
      })
    } else {
      var totalprice = price;
      this.setData({
        num: 1,
        hasCarts: true,
        /* totalNum: num, */
        totalprice: totalprice
      })
    }
  },

  addToCart: function (res) { //加入购物车
    const self = this;
    /* const num = this.data.num;
    let total = this.data.totalNum; */

    self.setData({
      show: true
    })
    setTimeout(function () {
      self.setData({
        show: false,
        scaleCart: true
      })
      setTimeout(function () {
        self.setData({
          scaleCart: false,
          hasCarts: true,
          /* totalNum: num + total, */
          showDialog: false,
        })
      }, 200)
    }, 300)
    setTimeout(function () {
      self.setData({
        ongwcsl: "gwcsl"
      })
    }, 1000) //延迟时间 这里是1秒

    //var data1 = res.currentTarget.dataset.attach; //商品数据
    var data1 = wx.getStorageSync('details');
    if (data1.pmaxnum < 1) {
      wx.showToast({
        title: '库存不足！',
        icon: 'success',
        duration: 2000
      });
      return;
    }
    var num = this.data.num;
    console.log(data1)
    //重新组合购物车信息
    var data2 = {
      youhua: false,
      maijiaid: data1['maijia']['id'],
      maijia: data1['maijia'],
      selected: false,
      origin: [{
        id: data1['id'],
        classid: data1['classid'],
        title: data1['title'],
        image: 'https://1681.qunqing168.com' + data1['titlepic'],
        num: num,
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
              /*if (carts[i]['origin'][x]['num'] < data2['origin'][0]['pmaxnum']) { //库存充足的情况 */
              //carts[i]['origin'][x]['num'] = carts[i]['origin'][x]['num']+num;
              carts[i]['origin'][x]['num'] = num;
              carts[i]['origin'][x]['selected'] = true;
              var car = carts[i] //取出修改数量后的商品信息
              carts.splice(i, 1) //删除掉数组中原来的商品信息
              carts.unshift(car); //将取出的商品信息放入数组的第一位
              wx.setStorageSync('carts', carts) //存入缓存
              self.gwcnum();
              wx.showToast({
                title: '加入购物车成功！',
                icon: 'success',
                duration: 2000
              });
              return; //如果跳出就不会执行后面的 carts.unshift($data); 
            } else { //不存在相同id的情况
              console.log(carts[i]['origin'])
              carts[i]['origin'].unshift(data2['origin'][0]); //直接将数据写入相同卖家缓存的头部

              wx.setStorageSync('carts', carts) //存入缓存
              self.gwcnum();
              wx.showToast({
                title: '加入购物车成功！',
                icon: 'success',
                duration: 2000
              });

              // 返回（在if内使用return，跳出循环节约运算，节约性能）
              return; //如果跳出就不会执行后面的 carts.unshift($data); 
            }
          }

        } else { //不存在相同卖家的情况
          carts.unshift(data2); //直接将数据写入缓存的头部
          wx.setStorageSync('carts', carts) //存入缓存
          self.gwcnum();
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          });

          // 返回（在if内使用return，跳出循环节约运算，节约性能）
          return; //如果跳出就不会执行后面的 carts.unshift($data); 
        }
      }
    } else {
      carts.unshift(data2); //直接将数据写入缓存的头部
      wx.setStorageSync('carts', carts) //存入缓存
      self.gwcnum();
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      return; //如果跳出就不会执行后面的 carts.unshift($data);   
    }
  },

  gwcnum: function () {
    var num = wx.getStorageSync('carts').length;
    this.setData({

      totalNum: num,

    })
  },




  bindTap(e) {

    const index = parseInt(e.currentTarget.dataset.index);
    console.log(index)
    this.setData({

      curIndex: index,
      fjxz: 0,

    })
  },
  bindTaphaoping(e) { //好评中评差评以及是否有图
    var maijia = e.currentTarget.dataset.maijia;
    console.log(maijia)

    var index = parseInt(e.currentTarget.dataset.index); //值 为1 时为上一页 2 为下一页 3 为好评 4为随意


    console.log(index)
    if (index == 3) {
      this.setData({

        curIndex: index,
        fjxz: 0,

      })
      var total = 0; //好评总数
      var page = 0; //当前页数
    } else {
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

      }
    }
    if (index == 33) {
      var hpzt = e.currentTarget.dataset.hpzt;
      var ksfyt = parseInt(e.currentTarget.dataset.ksfyt);
      this.setData({
        hpzt: hpzt,
        ksfyt: ksfyt
      })
      var total = 0; //好评总数
      var page = 0; //当前页数
    }
    var hpzt = this.data.hpzt;
    var ksfyt = this.data.ksfyt;
    console.log(page)
    console.log(total)
    console.log(hpzt)
    console.log(ksfyt)
    var that = this;

    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=shopddxqzzhbbplb', //这里就是服务器数据的地址链接
      data: {
        maijia: maijia, //卖家
        index: index, //值 为1 时为上一页 2 为下一页 3 为随机  33为好差评查找
        page: page, //好评当前页
        total: total, //好评总页
        hpzt: hpzt, //好评状态
        ksfyt: ksfyt //是否有图
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        var bindTaphaoping = res.data.data;
        var bindTaphaoping2 = res.data.data2;

        function formatName(name) {
          let newStr;
          if (name.length === 2) {
            newStr = name.substr(0, 1) + '*';
          } else if (name.length > 2) {
            let char = '';
            for (let i = 0, len = name.length - 2; i < len; i++) {
              char += '**';
            }
            newStr = name.substr(0, 1) + char + name.substr(-1, 1) + " 购";
          } else {
            newStr = name + " 购";
          }

          return newStr;
        }

        var num = bindTaphaoping.length;
        for (var i = 0; i < num; i++) {
          bindTaphaoping[i]['truename'] = formatName(bindTaphaoping[i]['truename']);
        }

        console.log(bindTaphaoping)

        console.log(bindTaphaoping2)
        if (bindTaphaoping2['success']) { //如果经过查询卡纸是存在的就修改kazhi的值为数组

          var page = bindTaphaoping2['page'] - 1;

          if (page == 0) {
            that.setData({
              bindTaphaoping: []
            });
          }
          var index = bindTaphaoping2['index'];
          if (index == 4) {
            that.setData({
              bindTaphaoping: []
            });
          }
          that.setData({
            ['bindTaphaoping[' + page + ']']: bindTaphaoping,
            hpindex: page,
            bindTaphaoping2: bindTaphaoping2

          });
        }
      }



    })


  },
  toggleDialog: function () {
    this.setData({
      showDialog: false
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        ongwcsl: "gwcsl"
      })
    }, 1000) //延迟时间 这里是1秒
  },
  toCar: function () {
    var num = this.data.num;
    this.setData({
      curIndex: 0,
      ongwcsl: "on",
      showDialog: true,
      hasCarts: true,
      num: num
    })
  },

  /**顶部导航栏透明度变化***/
  onPageScroll: function (e) {
    if (e.scrollTop <= 500 && this.data.navOpacity != 0.0) {
      var num = e.scrollTop / 500;
      /*  console.log(num) */
      this.setData({
        navOpacity: num,
      });
    } else if (e.scrollTop <= 500 && this.data.navOpacity != 1) {
      this.setData({
        navOpacity: num,
      });
    }
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  //预览带框图片
  previewImagee: function (e) {

    var pkpic = [];
    var pkpics = this.data.pkpic;
    var lengthh = pkpics.length;
    for (let x = 0; x < lengthh; x++) {
      pkpic[x] = "https://1681.qunqing168.com/actionn/showimg.php?" + pkpics[x];
    }
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: pkpic

    })
  },
  xyy: function () {
    var kuangtiao = this.data.kuangtiao2;
    var kuangtiao2 = this.data.kuangtiao;
    this.setData({

      kuangtiao: kuangtiao,
      kuangtiao2: kuangtiao2

    })
  },
  suiji2: function (e) {

    var id = parseInt(e.currentTarget.dataset.id);
    var xm = parseInt(e.currentTarget.dataset.xm);
    var id = id;
    if (xm == 2) {
      this.setData({
        curIndex: 0
      })
    }
    this.suiji(id, xm);
  },
  suiji: function (id, xm) {
    var id = id;
    var xm = xm;
    //判断有没有缓存数组，如果有就获取，没有就建立一个空的数组
    wx.getStorageSync('bukan') || []; //不看
    wx.getStorageSync('zhikan') || []; //只看
    wx.getStorageSync('buxian') || []; //不限
    //在缓存中存入空值
    var bukan = {
      'xh': [],
      'sc': [],
      'fg': [],
      'kd': []
    };
    zhikan = {
      'xh': [],
      'sc': [],
      'fg': [],
      'kd': []
    };
    buxian = {
      'xh': 3,
      'sc': 3,
      'fg': 3,
      'kd': 3
    };
    this.setData({
      bukan: bukan, //不看
      zhikan: zhikan, //只看
      buxian: buxian //不限为1时 查找不看 2时查找只看 3时不查为不限 默认为3

    })
    wx.setStorageSync('bukan', bukan); //不看
    wx.setStorageSync('zhikan', zhikan); //只看
    wx.setStorageSync('buxian', buxian); //不限为1时 查找不看 2时查找只看 3时不查为不限 默认为3

    var bukan = wx.getStorageSync('bukan'); //不看
    var zhikan = wx.getStorageSync('zhikan'); //只看
    var buxian = wx.getStorageSync('buxian'); //不限为1时 查找不看 2时查找只看 3时不查为不限 默认为3
    console.log(bukan)
    console.log(zhikan)
    console.log(buxian)


    var that = this;
    if (xm == 2) {
      var url = 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=pkmaijia2';
    } else {
      var url = 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=pkmaijia';
    }
    wx.request({
      url: url, //这里就是服务器数据的地址链接
      data: {
        id: id,
        xm: xm
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        if (res.data.data) {

          var data = res.data;
          /* var data = data.maijiakuangtiao; */
          console.log(data);
          var pkid = that.data.pkid;
          var pkzid = that.data.pkzid;
          var type = [];
          pkid['wkid'] = data.data.maijiakuangtiao[0]['id'];


          if (data.successnk) {
            if (data.successym) {
              pkid['ymid'] = data.data.maijiayama[0]['id'];
              pkid['ymjg'] = data.data.maijiayama[0]['tprice']; //亚麻价格
              pkid['ymkd'] = data.data.maijiayama[0]['kuangdu']; //亚麻宽度
              pkid['ym'] = true;
              type['wk'] = 101;
              pkzid['ym'] = 1;
            } else {
              pkid['ymid'] = '';
              pkid['ymjg'] = 0;
              pkid['ymkd'] = 0; //亚麻宽度
              pkid['ym'] = false;
              pkzid['ym'] = 2;

              type['wk'] = 11;
            }
            pkid['nkid'] = data.data.maijiank[0]['id'];
            pkid['nkjg'] = data.data.maijiank[0]['tprice']; //内框价格
            pkid['nkhsl'] = data.data.maijiank[0]['nkhsl']; //内框横数量
            pkid['nkssl'] = data.data.maijiank[0]['nkssl']; //内框竖数量
            pkid['nk'] = true;


          } else {
            if (data.successym) {
              pkid['ymid'] = data.data.maijiayama[0]['id'];
              pkid['ymjg'] = data.data.maijiayama[0]['tprice']; //亚麻价格
              pkid['ymkd'] = data.data.maijiayama[0]['kuangdu']; //亚麻价格
              type['wk'] = 2;
              pkzid['ym'] = 1;
            } else {
              pkid['ymid'] = '';
              pkid['ymjg'] = 0;
              pkid['ymkd'] = 0; //亚麻宽度
              type['wk'] = 1;
              pkzid['ym'] = 0;
            }
            pkid['nkid'] = '';
            pkid['nkjg'] = 0; //内框价格
            pkid['nkhsl'] = 0; //内框横数量
            pkid['nkssl'] = 0; //内框竖数量
            pkid['nk'] = false;
            that.setData({
              xzxid: 4,
            });
          }

          if (data.successkz) {
            pkid['kzid1'] = data.data.maijiakazhi[0]['id'];
            pkid['kzid2'] = data.data.maijiakazhi[0]['id'];
            pkid['kzid3'] = data.data.maijiakazhi[0]['id'];
            pkid['kz1k'] = 5;
            pkid['kz1g'] = 5;
            pkid['kz2k'] = 0.2;
            pkid['kz2g'] = 0.2;
            pkid['kz3k'] = 3;
            pkid['kz3g'] = 3;
            pkid['kzjg'] = data.data.maijiakazhi[0]['tprice'];

          }
          if (data.successbh) {
            pkid['bhid1'] = data.data.maijiabh[0]['id'];
            pkid['bh1k'] = 5;
            pkid['bh1g'] = 5;
            pkid['bhjg'] = data.data.maijiabh[0]['tprice'];
          }

          if (data.successbl) {
            pkid['blid'] = data.data.maijiabl[0]['id'];
            pkid['bhblid'] = data.data.maijiabl[0]['id'];
            pkid['zpblid'] = data.data.maijiabl[0]['id'];
            pkid['bljg'] = data.data.maijiabl[0]['tprice'];
            pkid['bhbljg'] = data.data.maijiabl[0]['tprice'];
            pkid['zpbljg'] = data.data.maijiabl[0]['tprice'];
          }
          if (data.successbb) {
            pkid['bbid'] = data.data.maijiabb[0]['id'];
            pkid['bhbbid'] = data.data.maijiabb[0]['id'];
            pkid['zpbbid'] = data.data.maijiabb[0]['id'];
            pkid['bbjg'] = data.data.maijiabb[0]['tprice'];
            pkid['bhbbjg'] = data.data.maijiabb[0]['tprice'];
            pkid['zpbbjg'] = data.data.maijiabb[0]['tprice'];
          }
          if (data.successbb && data.successbl) { //有内框和亚麻的情况
            if (data.successkz) {
              type['kz'] = '3302';
              type['zb'] = '3102';
            }
            type['zp'] = '103';
          } else {
            type['kz'] = 1;
            type['zb'] = 1;
            type['zp'] = 1;
          }

          if (data.successkz) { //有内框和亚麻的情况
            var scss = res.data.scss;
          }
          if (data.successbh) { //有内框和亚麻的情况
            var scssbh = res.data.scssbh;
          }


          if (data.successym || data.successnk) {

            var xzxid = 4;

          } else if (data.successkz) {

            var xzxid = 5;

          } else if (data.successbh) {

            var xzxid = 6;

          } else if (data.successbl && data.successbb) {

            var xzxid = 7;

          } else {
            var xzxid = '';
          }
          that.setData({
            pkzid: pkzid,
            xzxid: xzxid,
            mjkuangcai: res.data, //框条亚麻内框卡纸玻璃背板的详细信息的集合
            pkid: pkid, //配框图片使用
            type: type, //配框类型
            title: res.data.title
          });

          var data = that.data.mjkuangcai.data.maijiakuangtiao;
          console.log(that.data.mjkuangcai)
          var num = data.length;
          var pkpic = [];
          var pkzjg = [];
          var goods = that.data.goods;
          console.log(goods)
          var xzxid = xzxid;

          var pkid = that.data.pkid;
          var type = that.data.type;
          console.log(type)
          console.log(pkid)
          var shougf = 0;
          var a = 2 * (goods['kuang'] / 100 + goods['gao'] / 100);
          if (xzxid == 4) {
            for (var i = 0; i < num; i++) {

              pkpic[i] = "id=" + data[i].id + "&classid=62&parentid=" + goods['id'] + "&ymid=" + pkid['ymid'] + "&nkid=" + pkid['nkid'] + "&pk=youhua1&type=" + type['wk'] + "&random=1609328505445";
              //外框 1 为只有外框 2为亚麻 101 为 有亚麻内框 11为只有内框


              if (type['wk'] == 1) { //只有外框的情况
                pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100)) * data[i].tprice + shougf);
              } else if (type['wk'] == 2) { //只有外框和亚麻的情况
                var ymjg = Math.round((a + 8 * (pkid['ymkd'] / 100)) * pkid['ymjg']);
                pkzjg[i] = Math.round((a + (8 * (data[i].kuangdu / 100) + 8 * (pkid['ymkd'] / 100))) * data[i].tprice + shougf + ymjg);
              } else if (type['wk'] == 101) { //外框和亚麻 加内框的情况
                var ymjg = Math.round((a + 8 * (pkid['ymkd'] / 100)) * pkid['ymjg']);
                var e = Math.round((pkid['nkhsl'] * (goods['kuang'] / 100) + pkid['nkssl'] * (goods['gao'] / 100)) * pkid['nkjg']); //内框价格
                pkzjg[i] = Math.round((a + (8 * (data[i].kuangdu / 100) + 8 * (pkid['ymkd'] / 100))) * data[i].tprice + shougf + e + ymjg);
              } else if (type['wk'] == 11) { //外框和内框的情况
                var e = Math.round((pkid['nkhsl'] * (goods['kuang'] / 100) + pkid['nkssl'] * (goods['gao'] / 100)) * pkid['nkjg']); //内框价格
                pkzjg[i] = Math.round(((a + 8 * (data[i].kuangdu / 100)) * data[i].tprice + shougf + e));
              }

            }
          } else if (xzxid == 5) {

            for (var i = 0; i < num; i++) {

              pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['kz'] + "&random=1609328505445&kzid1=" + pkid['kzid1'] + "&kzid2=" + pkid['kzid2'] + "&kzid3=" + pkid['kzid3'] + "&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'] + "&kz1k=" + pkid['kz1k'] + "&kz1g=" + pkid['kz1g'] + "&kz2k=" + pkid['kz2k'] + "&kz2g=" + pkid['kz2k'] + "&kz3k=" + pkid['kz3k'] + "&kz3g=" + pkid['kz3k'];


              var area = (width / 100 + 2 * (pkid['kz1k'] / 100 + pkid['kz2k'] / 100 + pkid['kz3k'] / 100)) * (height / 100 + 2 * (pkid['kz1g'] / 100 + pkid['kz2g'] / 100 + pkid['kz3g'] / 100)); //面积
              var kzblbbjg = Math.round(area * (pkid['kzjg'] + pkid['bljg'] + pkid['bbjg'])); //卡纸玻璃背板价格 将卡纸的第一层卡纸价格作为计算价格

              var kzzk = 4 * ((pkid['kz1k'] + pkid['kz2k'] + pkid['kz3k'] + pkid['kz1g'] + pkid['kz2g'] + pkid['kz3g']) / 100); //卡纸总宽度

              pkzjg[i] = Math.round(((a + 8 * (data[i].kuangdu / 100) + kzzk) * data[i].tprice + shougf + kzblbbjg)); //外框价格Math.round(),
            }
          } else if (xzxid == 6) {
            pkzjg[i] = Math.round(((a + 8 * (data[i].kuangdu / 100)) * data[i].tprice + shougf)); //外框价格Math.round(),

          } else if (xzxid == 7) { //xzid==7的情况
            for (var i = 0; i < num; i++) {
              pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['zp'] + "&random=1609328505445&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'];
            }

          } else {

            for (var i = 0; i < num; i++) {

              pkpic[i] = "id=" + data[i].id + "&classid=62&parentid=" + goods['id'] + "&ymid=" + pkid['ymid'] + "&pk=youhua1&type=" + type['wk'] + "&random=1609328505445";


              pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100)) * data[i].tprice + shougf); //外框价格Math.round(),
            }
          }

          var latitude = res.data.data.latitude;
          var longitude = res.data.data.longitude;
          console.log(res)
          console.log("纬度" + latitude)
          console.log("经度" + longitude)
          that.setData({
            scss: scss,
            scssbh: scssbh,
            pkpic: pkpic,
            total: res.data.data.total,
            page: res.data.data.page,
            title: res.data.title,
            pkzjg: pkzjg,
            latitude2: latitude,
            longitude2: longitude
          });
          wx.getLocation({ //获取我的位置
            type: 'gcj02',
            success(res) {
              console.log(res.latitude)
              var distance_new = that.getDistance(res.latitude, res.longitude, that.data.latitude2, that.data.longitude2);
              var latitude = res.latitude;
              var longitude = res.longitude;
              /* console.log(distance_new)
              const speed = res.speed;
              const accuracy = res.accuracy;
              console.log(latitude)
              console.log(longitude)
              console.log(speed)
              console.log(accuracy) */
              that.setData({
                latitude: latitude,
                longitude: longitude,
                distance_new: distance_new
              });
            }
          })


        }
      }


    })
    var type = this.data.type;
    if (type == 33) {
      //this.kazhi2();
    } else {
      wx.showToast({
        title: '正在加载！',
        icon: 'success',
        duration: 3000
      });
    }
  },
  chooseAddress: function (e) { //获取买家省市区
    this.setData({
      curIndex: 4,
      fjxz: 1
    })
    var that = this;
    var addressInfo = wx.getStorageSync('addressInfo');
    if (addressInfo) { // 本地如果有缓存列表，提前渲染
      that.setData({
        addressInfo: addressInfo
      })
    } else {
      wx.chooseAddress({
        success: (res) => {
          wx.setStorageSync("addressInfo", res);
          that.setData({
            addressInfo: res
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
    var addressInfo = wx.getStorageSync('addressInfo');
    var that = this;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=fujinpkmaijia', //这里就是服务器数据的地址链接
      data: {
        pro: addressInfo.provinceName,
        city: addressInfo.cityName,
        county: addressInfo.countyName

      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        /*  wx.getLocation({
           type: 'wgs84',
           success (res) {
             const latitude = res.latitude
             const longitude = res.longitude
             const speed = res.speed
             const accuracy = res.accuracy
           }
          }) */
        var latitude = that.data.latitude; //我的经纬度
        var longitude = that.data.longitude; //我的经纬度
        console.log(res)
        var data = res.data.data;
        var num = data.length;
        for (var i = 0; i < num; i++) {
          data[i]['juli'] = that.getDistance(latitude, longitude, data[i].latitude, data[i].longitude);
        }
        console.log(data)

        function compare(property, desc) {
          return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            if (desc == true) {
              // 升序排列
              return value1 - value2;
            } else {
              // 降序排列
              return value2 - value1;
            }
          }
        }
        console.log(data.sort(compare("juli", true))) //配框卖家由近到远排序
        //console.log(data.sort(compare("juli",false)))
        that.setData({
          fjktsuccess: res.data.success,
          sskmaijia: data,
        })
      }
    })

  },
  citysousuo: function (e) { //获取买家省市区
    this.setData({
      fjxz: 1
    })
    var pro = e.currentTarget.dataset.pro;
    var city = e.currentTarget.dataset.city;
    var county = e.currentTarget.dataset.area;
    console.log(pro)
    console.log(city)
    console.log(county)
    var that = this;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=fujinpkmaijia', //这里就是服务器数据的地址链接
      data: {
        pro: pro,
        city: city,
        county: county

      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        var latitude = that.data.latitude; //我的经纬度
        var longitude = that.data.longitude; //我的经纬度
        console.log(res)
        var data = res.data.data;
        var num = data.length;
        for (var i = 0; i < num; i++) {
          data[i]['juli'] = that.getDistance(latitude, longitude, data[i].latitude, data[i].longitude);
        }
        console.log(data)

        function compare(property, desc) {
          return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            if (desc == true) {
              // 升序排列
              return value1 - value2;
            } else {
              // 降序排列
              return value2 - value1;
            }
          }
        }
        console.log(data.sort(compare("juli", true))) //配框卖家由近到远排序
        //console.log(data.sort(compare("juli",false)))
        that.setData({
          fjktsuccess: res.data.success,
          sskmaijia: data,
        })
      }
    })

  },
  chooseAddresss: function (e) { //修改定位 获取买家省市区
    var that = this;
    wx.chooseAddress({
      success: (res) => {
        wx.setStorageSync("addressInfo", res);
        that.setData({
          addressInfo: res
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  citysss: function (e) { //按城市搜索
    this.setData({
      fjxz: 2
    })
    var that = this;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=citypkss', //这里就是服务器数据的地址链接
      data: {},

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        var data = res.data.data;
        that.setData({
          citysss: data,
        })
      }
    })

  },
  pksxykz: function (e) { //翻页  
    var title = e.currentTarget.dataset.title; //卡纸提供
    var index = parseInt(e.currentTarget.dataset.index); //值 为1 时为上一页 2 为下一页 3 为随机 4 为按色彩查询
    var lm = parseInt(e.currentTarget.dataset.lm); //值 为1 时为上一页 2 为下一页 3 为随机 4 为按色彩查询
    if (index === 4) {
      var kzsc = e.currentTarget.dataset.kzsc; //卡纸色彩 
      if (lm === 61) {
        this.setData({
          kzsc: kzsc, //如果存在色彩就将此色彩写入data
        });
      }
      if (lm === 121) {

        this.setData({
          bhsc: kzsc, //如果存在色彩就将此色彩写入data
        });
      }
    } else {
      var total = parseInt(e.currentTarget.dataset.total); //卡纸总数
      var num = parseInt(e.currentTarget.dataset.page); //卡纸当前页
    }




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
      var kzsc = ''; //卡纸色彩 
      if (lm === 61) {
        this.setData({
          kzsc: kzsc, //如果存在色彩就将此色彩写入data

        });
      }
      if (lm === 121) {
        this.setData({
          bhsc: kzsc //如果存在色彩就将此色彩写入data
        });
      }

    }
    if (lm === 61) {
      var kzsc = this.data.kzsc; //调取当前卡纸色彩
    }
    if (lm === 121) {
      var kzsc = this.data.bhsc; //调取当前卡纸色彩
    }

    var lm = parseInt(e.currentTarget.dataset.lm);
    var that = this;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=pkkazhi', //这里就是服务器数据的地址链接
      data: {
        kzsc: kzsc, //卡纸色彩
        index: index, //区分上下页 等数字标识
        title: title, //当前卖家名称
        page: page, //当前页
        total: total, //总页
        lm: lm

      },


      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        console.log(res)
        var mjkuangcai = that.data.mjkuangcai;
        if (lm === 61) {
          mjkuangcai['data']['maijiakazhi'] = res.data.data; //将查出来的框条合并到一个数组
          mjkuangcai['data']['pagekz'] = res.data.pagekz; //亚麻当前页面
          mjkuangcai['data']['totalkz'] = res.data.totalkz; //亚麻总数量
          mjkuangcai['data']['scss'] = res.data.scss; //亚麻总数量
        }
        if (lm === 121) {
          mjkuangcai['data']['maijiabh'] = res.data.data; //将查出来的框条合并到一个数组
          mjkuangcai['data']['pagebh'] = res.data.pagekz; //亚麻当前页面
          mjkuangcai['data']['totalbh'] = res.data.totalkz; //亚麻总数量
          mjkuangcai['data']['scssbh'] = res.data.scss; //亚麻总数量
        }


        if (res.data.success) { //如果经过查询卡纸是存在的就修改kazhi的值为数组
          that.setData({
            mjkuangcai: mjkuangcai

          });
        }
      }


    })
    wx.showToast({
      title: '正在加载！',
      icon: 'success',
      duration: 5000
    });
  },
  pksxyybbpic: function (e) { //玻璃 背板 内框 生成配框图片
    var pkid = this.data.pkid;
    var xm = e.currentTarget.dataset.xm; //选择项 ym kz gh zp
    var xmm = e.currentTarget.dataset.xmm; //选择项 ymjg nkjg kzjg bljg bbjg
    var id = parseInt(e.currentTarget.dataset.id); // 为 1时 不看 2时 只看 3时不限
    var jg = parseInt(e.currentTarget.dataset.jg); // 玻璃 背板 内框价格
    pkid[xm] = id;
    pkid[xmm] = jg;
    if (xm == 'nkid') {
      var nkhsl = parseInt(e.currentTarget.dataset.nkhsl); //内框横数量 
      var nkssl = parseInt(e.currentTarget.dataset.nkssl); //内框竖数量 
      pkid['nkhsl'] = nkhsl;
      pkid['nkssl'] = nkssl;
      var type = this.data.type;
      pkid['nk'] = true;
      if (pkid['ym']) {
        type['wk'] = 101;
      } else {
        type['wk'] = 11;
      }
      this.setData({
        type: type
      })
    }
    this.setData({
      pkid: pkid,
    })

    var data = this.data.mjkuangcai.data.maijiakuangtiao;
    var num = data.length;
    var pkpic = [];

    var goods = this.data.goods;

    var xzxid = this.data.xzxid;
    console.log(xzxid)

    var pkid = this.data.pkid;
    var type = this.data.type;

    var pkzjg = [];
    var shougf = 0;
    var a = 2 * (goods['kuang'] / 100 + goods['gao'] / 100);
    if (xzxid == 4) {
      for (var i = 0; i < num; i++) {

        pkpic[i] = "id=" + data[i].id + "&classid=62&parentid=" + goods['id'] + "&ymid=" + pkid['ymid'] + "&nkid=" + pkid['nkid'] + "&pk=youhua1&type=" + type['wk'] + "&random=1609328505445";

        if (type['wk'] == 101) { //外框和亚麻 加内框的情况
          var ymjg = Math.round((a + 8 * (pkid['ymkd'] / 100)) * pkid['ymjg']);
          var e = Math.round((pkid['nkhsl'] * (goods['kuang'] / 100) + pkid['nkssl'] * (goods['gao'] / 100)) * pkid['nkjg']); //内框价格
          pkzjg[i] = Math.round((a + (8 * (data[i].kuangdu / 100) + 8 * (pkid['ymkd'] / 100))) * data[i].tprice + shougf + e + ymjg);
        } else if (type['wk'] == 11) { //外框和内框的情况
          var e = Math.round((pkid['nkhsl'] * (goods['kuang'] / 100) + pkid['nkssl'] * (goods['gao'] / 100)) * pkid['nkjg']); //内框价格
          pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100)) * data[i].tprice + shougf + e);
        }

      }
    } else if (xzxid == 5) {

      for (var i = 0; i < num; i++) {

        pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['kz'] + "&random=1609328505445&kzid1=" + pkid['kzid1'] + "&kzid2=" + pkid['kzid2'] + "&kzid3=" + pkid['kzid3'] + "&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'] + "&kz1k=" + pkid['kz1k'] + "&kz1g=" + pkid['kz1g'] + "&kz2k=" + pkid['kz2k'] + "&kz2g=" + pkid['kz2k'] + "&kz3k=" + pkid['kz3k'] + "&kz3g=" + pkid['kz3k'];

        var area = (goods['kuang'] / 100 + 2 * (pkid['kz1k'] / 100 + pkid['kz2k'] / 100 + pkid['kz3k'] / 100)) * (goods['gao'] / 100 + 2 * (pkid['kz1g'] / 100 + pkid['kz2g'] / 100 + pkid['kz3g'] / 100)); //面积
        var kzblbbjg = Math.round(area * (pkid['kzjg'] * 1 + pkid['bljg'] * 1 + pkid['bbjg'] * 1)); //卡纸玻璃背板价格 将卡纸的第一层卡纸价格作为计算价格

        var kzzk = 4 * ((pkid['kz1k'] + pkid['kz2k'] + pkid['kz3k'] + pkid['kz1g'] + pkid['kz2g'] + pkid['kz3g']) / 100); //卡纸总宽度

        pkzjg[i] = Math.round(((a + 8 * (data[i].kuangdu / 100) + kzzk) * data[i].tprice + shougf + kzblbbjg)); //外框价格Math.round(),


      }
    } else if (xzxid == 6) {
      for (var i = 0; i < num; i++) {

        pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['zb'] + "&random=1609328505445&kzid1=" + pkid['bhid1'] + "&blid=" + pkid['bhblid'] + "&bbid=" + pkid['bhbbid'] + "&kz1k=" + pkid['bh1k'] + "&kz1g=" + pkid['bh1g'];

        var area = (goods['kuang'] / 100 + 2 * (pkid['bh1k'] / 100)) * (goods['gao'] / 100 + 2 * (pkid['bh1g'] / 100)); //面积
        var kzblbbjg = Math.round(area * (pkid['bhjg'] * 1 + pkid['bhbljg'] * 1 + pkid['bhbbjg'] * 1)); //卡纸玻璃背板价格 将卡纸的第一层卡纸价格作为计算价格

        var kzzk = 4 * ((pkid['bh1k']) + (pkid['bh1g']) / 100); //卡纸总宽度

        pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100) + kzzk) * data[i].tprice + shougf + kzblbbjg);

      }

    } else if (xzxid == 7) { //xzid==7的情况
      for (var i = 0; i < num; i++) {

        pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['zp'] + "&blid=" + pkid['zpblid'] + "&bbid=" + pkid['zpbbid'];
        var area = (goods['kuang'] / 100) * (goods['gao'] / 100); //面积
        var kzblbbjg = Math.round(area * (pkid['zpbljg'] * 1 + pkid['zpbbjg'] * 1)); //卡纸玻璃背板价格 将卡纸的第一层卡纸价格作为计算价格
        pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100)) * data[i].tprice + shougf + kzblbbjg);
      }

    } else {

      for (var i = 0; i < num; i++) {

        pkpic[i] = "id=" + data[i].id + "&classid=62&parentid=" + goods['id'] + "&ymid=" + pkid['ymid'] + "&pk=youhua1&type=" + type['wk'] + "&random=1609328505445";
        pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100)) * data[i].tprice + shougf); //外框价格Math.round(),
      }
    }

    this.setData({
      pkpic: pkpic, //带框图片
      pkzjg: pkzjg
    });
  },
  pksxyybb: function (e) { //配框上下页 亚麻 玻璃 背板
    var title = this.data.title; //外框提供
    var index = parseInt(e.currentTarget.dataset.index); //值 为1 时为上一页 2 为下一页 3 为随机
    var total = parseInt(e.currentTarget.dataset.total); //总页
    var num = parseInt(e.currentTarget.dataset.page); //当前页
    var lm = parseInt(e.currentTarget.dataset.lm);

    if (index === 1) { //上一页

      if (total > 1 && num != 1) {
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
      if (total > 4 && num <= total / 4) {
        var page = num + 1;
      } else {
        wx.showToast({
          title: '已经最后一页',
          icon: 'success',
          duration: 2000
        });
        return;
      }

    } else {
      var page = num;
      if (total < 4) {
        wx.showToast({
          title: '只有一页',
          icon: 'success',
          duration: 2000
        });
        return;
      }
    }
    var that = this;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=pksxyybb', //这里就是服务器数据的地址链接
      data: {
        index: index,
        title: title,
        page: page,
        total: total,
        lm: lm
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        var mjkuangcai = that.data.mjkuangcai;
        console.log(res.data)
        var data = res.data;
        if (lm == 62) { //亚麻
          mjkuangcai['data']['maijiayama'] = data.data;
          mjkuangcai['data']['totalym'] = data.total;
          mjkuangcai['data']['pageym'] = data.page;
        } else if (lm == 113) { //内框
          mjkuangcai['data']['maijiank'] = data.data;
          mjkuangcai['data']['totalnk'] = data.total;
          mjkuangcai['data']['pagenk'] = data.page;
        } else if (lm == 114) { //玻璃
          mjkuangcai['data']['maijiabl'] = data.data;
          mjkuangcai['data']['totalbl'] = data.total;
          mjkuangcai['data']['pagebl'] = data.page;
        } else if (lm == 115) { //背板
          mjkuangcai['data']['maijiabb'] = data.data;
          mjkuangcai['data']['totalbb'] = data.total;
          mjkuangcai['data']['pagebb'] = data.page;
        }
        that.setData({
          mjkuangcai: mjkuangcai,

        });
      }
    })
  },
  pksxy: function (e) { //外框上下 翻页

    const title = e.currentTarget.dataset.title; //外框提供
    const index = parseInt(e.currentTarget.dataset.index); //值 为1 时为上一页 2 为下一页 3 为随机
    const total = parseInt(e.currentTarget.dataset.total);
    const num = parseInt(e.currentTarget.dataset.page);
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

    } else {
      if (total < 12) {
        wx.showToast({
          title: '只有一页',
          icon: 'success',
          duration: 2000
        });
        return;
      }
    }


    var cailiaobx = this.data.buxian.xh;
    if (cailiaobx == 1) {
      const xh = this.data.bukan.xh;
      var cailiao = JSON.stringify(xh);

    } else if (cailiaobx == 2) {
      const xh = this.data.zhikan.xh;
      var cailiao = JSON.stringify(xh);

    } else {
      var cailiao = '';

    }




    var wkscbx = this.data.buxian.sc;
    if (wkscbx == 1) {
      const sc = this.data.bukan.sc;
      var wksc = JSON.stringify(sc);

    } else if (wkscbx == 2) {
      const sc = this.data.zhikan.sc;
      var wksc = JSON.stringify(sc);

    } else {
      var wksc = '';

    }

    var ktfgbx = this.data.buxian.fg;
    if (ktfgbx == 1) {
      const fg = this.data.bukan.fg;
      var ktfg = JSON.stringify(fg);

    } else if (ktfgbx == 2) {
      const fg = this.data.zhikan.fg;
      var ktfg = JSON.stringify(fg);

    } else {
      var ktfg = '';

    }


    var kuangdubx = this.data.buxian.kd;
    if (kuangdubx == 1) {
      const kd = this.data.bukan.kd;
      var kuangdu = JSON.stringify(kd);

    } else if (kuangdubx == 2) {
      const kd = this.data.zhikan.kd;
      var kuangdu = JSON.stringify(kd);

    } else {
      var kuangdu = '';

    }

    var that = this;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=pksxy', //这里就是服务器数据的地址链接
      data: {
        index: index,
        title: title,
        page: page,
        total: total,
        /* chazhao: array */
        cailiao: cailiao, //框条材料
        wksc: wksc, //外框色彩
        ktfg: ktfg, //框条风格
        kuangdu: kuangdu, //框条宽度

        cailiaobx: cailiaobx, //框条材料 不限值 1 为不看 2为只看 3为不限
        wkscbx: wkscbx, //外框色彩 不限值
        ktfgbx: ktfgbx, //框条风格 不限值
        kuangdubx: kuangdubx //框条宽度 不限值

      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        if (res.data.success) {
          var mjkuangcai = that.data.mjkuangcai;
          var data = res.data.data;

          var num = data.length;
          var pkpic = [];

          var goods = that.data.goods;

          var xzxid = that.data.xzxid;
          console.log(xzxid)

          var pkid = that.data.pkid;
          var type = that.data.type;
          var pkzjg = [];
          var shougf = 0;
          var a = 2 * (goods['kuang'] / 100 + goods['gao'] / 100);

          if (xzxid == 4) {
            for (var i = 0; i < num; i++) {

              pkpic[i] = "id=" + data[i].id + "&classid=62&parentid=" + goods['id'] + "&ymid=" + pkid['ymid'] + "&nkid=" + pkid['nkid'] + "&pk=youhua1&type=" + type['wk'] + "&random=1609328505445";
              if (type['wk'] == 101) { //外框和亚麻 加内框的情况
                var ymjg = Math.round((a + 8 * (pkid['ymkd'] / 100)) * pkid['ymjg']);
                var e = Math.round((pkid['nkhsl'] * (goods['kuang'] / 100) + pkid['nkssl'] * (goods['gao'] / 100)) * pkid['nkjg']); //内框价格
                pkzjg[i] = Math.round((a + (8 * (data[i].kuangdu / 100) + 8 * (pkid['ymkd'] / 100))) * data[i].tprice + shougf + e + ymjg);
              } else if (type['wk'] == 11) { //外框和内框的情况
                var e = Math.round((pkid['nkhsl'] * (goods['kuang'] / 100) + pkid['nkssl'] * (goods['gao'] / 100)) * pkid['nkjg']); //内框价格
                pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100)) * data[i].tprice + shougf + e);
              }
            }
          } else if (xzxid == 5) {

            for (var i = 0; i < num; i++) {

              pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['kz'] + "&random=1609328505445&kzid1=" + pkid['kzid1'] + "&kzid2=" + pkid['kzid2'] + "&kzid3=" + pkid['kzid3'] + "&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'] + "&kz1k=" + pkid['kz1k'] + "&kz1g=" + pkid['kz1g'] + "&kz2k=" + pkid['kz2k'] + "&kz2g=" + pkid['kz2k'] + "&kz3k=" + pkid['kz3k'] + "&kz3g=" + pkid['kz3k'];
              var area = (goods['kuang'] / 100 + 2 * (pkid['kz1k'] / 100 + pkid['kz2k'] / 100 + pkid['kz3k'] / 100)) * (goods['gao'] / 100 + 2 * (pkid['kz1g'] / 100 + pkid['kz2g'] / 100 + pkid['kz3g'] / 100)); //面积
              var kzblbbjg = Math.round(area * (pkid['kzjg'] * 1 + pkid['bljg'] * 1 + pkid['bbjg'] * 1)); //卡纸玻璃背板价格 将卡纸的第一层卡纸价格作为计算价格
              var kzzk = 4 * ((pkid['kz1k'] + pkid['kz2k'] + pkid['kz3k'] + pkid['kz1g'] + pkid['kz2g'] + pkid['kz3g']) / 100); //卡纸总宽度

              pkzjg[i] = Math.round(((a + 8 * (data[i].kuangdu / 100) + kzzk) * data[i].tprice + shougf + kzblbbjg)); //外框价格Math.round(),
            }
          } else if (xzxid == 6) {
            for (var i = 0; i < num; i++) {

              pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['zb'] + "&random=1609328505445&kzid1=" + pkid['bhid1'] + "&blid=" + pkid['bhblid'] + "&bbid=" + pkid['bhbbid'] + "&kz1k=" + pkid['bh1k'] + "&kz1g=" + pkid['bh1g'];
              var area = (goods['kuang'] / 100 + 2 * (pkid['bh1k'] / 100)) * (goods['gao'] / 100 + 2 * (pkid['bh1g'] / 100)); //面积
              var kzblbbjg = Math.round(area * (pkid['bhjg'] * 1 + pkid['bhbljg'] * 1 + pkid['bhbbjg'] * 1)); //卡纸玻璃背板价格 将卡纸的第一层卡纸价格作为计算价格

              var kzzk = 4 * (pkid['bh1k'] + pkid['bh1g']) / 100; //卡纸总宽度

              pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100) + kzzk) * data[i].tprice + shougf + kzblbbjg);
            }

          } else if (xzxid == 7) { //xzid==7的情况
            for (var i = 0; i < num; i++) {
              pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['zp'] + "&random=1609328505445&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'];
              var area = (goods['kuang'] / 100) * (goods['gao'] / 100); //面积
              var kzblbbjg = Math.round(area * (pkid['zpbljg'] * 1 + pkid['zpbbjg'] * 1)); //卡纸玻璃背板价格 将卡纸的第一层卡纸价格作为计算价格
              pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100)) * data[i].tprice + shougf + kzblbbjg);
            }

          } else {

            for (var i = 0; i < num; i++) {

              pkpic[i] = "id=" + data[i].id + "&classid=62&parentid=" + goods['id'] + "&ymid=" + pkid['ymid'] + "&pk=youhua1&type=" + type['wk'] + "&random=1609328505445";
              pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100)) * data[i].tprice + shougf); //外框价格Math.round(),
            }
          }






          /* mjkuangcai['maijiakuangtiao'] = maijia;
          var page = res.data.page;
          console.log(page) */
          mjkuangcai['data']['maijiakuangtiao'] = data;
          mjkuangcai['data']['total'] = res.data.total;
          mjkuangcai['data']['page'] = res.data.page;
          that.setData({
            pkpic: pkpic, //带框图片
            pkzjg: pkzjg,
            /* kuangtiao: kuangtiao, */
            mjkuangcai: mjkuangcai,
            /* page: page, */
          });
        }
      }


    })
    wx.showToast({
      title: '正在加载！',
      icon: 'success',
      duration: 5000
    });
  },

  imageLoad: function (e) { //获取图片真实宽度 
    /*     var imgwidth = e.detail.width,
         imgheight = e.detail.height,  */
    //console.log(e.currentTarget.dataset.width)
    var wkkuan = parseInt(e.currentTarget.dataset.wkkuan);
    var xzxid = this.data.xzxid;

    var pkid = this.data.pkid;
    if (xzxid == 4) {
      var kuan = (parseInt(pkid['ymk']) + wkkuan) * 2;
      var gao = (parseInt(pkid['ymk']) + wkkuan) * 2;
    } else if (xzxid == 5) {
      var kuan = (parseInt(pkid['kz1k']) + parseInt(pkid['kz2k']) + parseInt(pkid['kz3k']) + wkkuan) * 2;
      var gao = (parseInt(pkid['kz1g']) + parseInt(pkid['kz2k']) + parseInt(pkid['kz3k']) + wkkuan) * 2;
    } else if (xzxid == 6) {
      var kuan = (parseInt(pkid['bh1k']) + wkkuan) * 2;
      var gao = (parseInt(pkid['bh1g']) + wkkuan) * 2;
    } else if (xzxid == 7) { //xzid==7的情况
      var kuan = (0 + wkkuan) * 2;
      var gao = (0 + wkkuan) * 2;
    } else {
      var kuan = wkkuan * 2;
      var gao = wkkuan * 2;
    }


    var imgwidth = parseInt(e.currentTarget.dataset.width) + kuan;
    var imgheight = parseInt(e.currentTarget.dataset.height) + gao;

    //宽高比  
    var ratio = imgwidth / imgheight;
    //计算的高度值  
    if (ratio >= 1) {
      var viewHeight = 750 / ratio;
    } else {
      var viewHeight = (750 - 40) / ratio;
    }

    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    if (e.detail.current) {
      var current = e.detail.current;
    } else {
      var current = 0;
    }
    this.setData({
      current: current
    })
  },
  xz: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);

    if (index === 4) {
      var wkid = parseInt(e.currentTarget.dataset.wkid);
      var pkid = this.data.pkid;
      pkid['wkid'] = wkid;
      console.log(pkid)
      var pkid = pkid;
      this.setData({
        pkid: pkid,
      })

    }

    var xzid = this.data.xzid;
    var xzxid = this.data.xzxid;
    /*     var xz = this.data.xz; */
    if (index === xzid) {
      this.setData({
        xzid: '',
        xz: false,
      })

      //this.gb();
      return;
    }

    /* var xzxid = this.data.xzxid; */
    console.log(this.data.current)
    var currentimg = this.data.current;
    /*     var pkid = pkid; */
    this.setData({
      /*  pkid: pkid, */
      currentimg: currentimg,
      xzxid: xzxid,
      xzid: index,
      xz: true,

    })
  },
  xzym: function (e) {
    var kuangtiao = this.data.mjkuangcai.data.maijiakuangtiao;
    var num = kuangtiao.length;
    var pkpic = [];
    var goods = this.data.goods;
    var type = this.data.type;
    var pkid = this.data.pkid;
    console.log(pkid)
    for (var i = 0; i < num; i++) {
      pkpic[i] = "id=" + kuangtiao[i].id + "&classid=62&parentid=" + goods['id'] + "&ymid=" + pkid['ymid'] + "&nkid=" + pkid['nkid'] + "&pk=youhua1&type=" + type['wk'] + "&random=1609328505445";
    }
    var currentimg = this.data.currentimg;
    this.setData({
      currentimg: currentimg,
      pkpic: pkpic,
      xzid: 4,
      xz: true,
      xzxid: 4,

    })
  },
  kazhi: function (e) { //翻页
    var data = this.data.mjkuangcai.data.maijiakuangtiao;
    var num = data.length;
    var pkpic = [];
    var goods = this.data.goods;
    var type = this.data.type;
    var pkid = this.data.pkid;
    console.log(pkid)
    const lm = parseInt(e.currentTarget.dataset.lm);
    var pkzjg = [];
    var shougf = 0;
    var a = Math.round(2 * (goods['kuang'] / 100 + goods['gao'] / 100));
    if (lm == 61) {
      var xzid = 5;
      var xzxid = 5;
      for (var i = 0; i < num; i++) {
        pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['kz'] + "&random=1609328505445&kzid1=" + pkid['kzid1'] + "&kzid2=" + pkid['kzid2'] + "&kzid3=" + pkid['kzid3'] + "&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'] + "&kz1k=" + pkid['kz1k'] + "&kz1g=" + pkid['kz1g'] + "&kz2k=" + pkid['kz2k'] + "&kz2g=" + pkid['kz2k'] + "&kz3k=" + pkid['kz3k'] + "&kz3g=" + pkid['kz3k'];

        var area = (goods['kuang'] / 100 + 2 * (pkid['kz1k'] / 100 + pkid['kz2k'] / 100 + pkid['kz3k'] / 100)) * (goods['gao'] / 100 + 2 * (pkid['kz1g'] / 100 + pkid['kz2g'] / 100 + pkid['kz3g'] / 100)); //面积
        var kzblbbjg = area * (pkid['kzjg'] * 1 + pkid['bljg'] * 1 + pkid['bbjg'] * 1);
        var kzzk = 4 * (pkid['kz1k'] / 100 + pkid['kz2k'] / 100 + pkid['kz3k'] / 100) + 4 * (pkid['kz1g'] / 100 + pkid['kz2g'] / 100 + pkid['kz3g'] / 100); //卡纸总宽度

        pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100) + kzzk) * data[i].tprice + shougf + kzblbbjg);

      }

    }
    if (lm == 121) {
      var xzid = 6;
      var xzxid = 6;
      for (var i = 0; i < num; i++) {
        pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['zb'] + "&random=1609328505445&kzid1=" + pkid['bhid1'] + "&blid=" + pkid['bhblid'] + "&bbid=" + pkid['bhbbid'] + "&kz1k=" + pkid['bh1k'] + "&kz1g=" + pkid['bh1g'];
        var area = (goods['kuang'] / 100 + 2 * (pkid['bh1k'] / 100)) * (goods['gao'] / 100 + 2 * (pkid['bh1g'] / 100)); //面积
        var kzblbbjg = Math.round(area * (pkid['bhjg'] * 1 + pkid['bhbljg'] * 1 + pkid['bhbbjg'] * 1)); //卡纸玻璃背板价格 将卡纸的第一层卡纸价格作为计算价格

        var kzzk = 4 * ((pkid['bh1k']) + 4 * (pkid['bh1g'])) / 100; //卡纸总宽度

        pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100) + kzzk) * data[i].tprice + shougf + kzblbbjg);

      }
    }
    console.log(pkzjg)
    this.setData({
      /* currentimg: currentimg, */
      pkpic: pkpic,
      pkzjg: pkzjg,
      xzid: xzid,
      xz: true,
      xzxid: xzxid,

    })

    var currentimg = this.data.currentimg;



    const index = parseInt(e.currentTarget.dataset.index);


    console.log(index)
    var xzid = this.data.xzid;
    var xz = this.data.xz;
    if (index === xzid) {
      //this.gb();
      return;
    }
    this.setData({
      xzid: index,
      xz: true
    })
    const title = this.data.title; //外框提供

    console.log(title)
    var that = this;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=pkkazhi', //这里就是服务器数据的地址链接
      data: {

        title: title,
        lm: lm //栏目为61为卡纸 121 为国画装裱
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        var kazhi = res.data.data;
        var pagekz = res.data.pagekz; //卡纸当前页
        var totalkz = res.data.totalkz; //卡纸总页数
        var scss = res.data.scss;
        console.log(kazhi)

        if (res.data.success) { //如果经过查询卡纸是存在的就修改kazhi的值为数组
          that.setData({
            pagekz: pagekz,
            totalkz: totalkz,
            scss: scss

          });
        }
      }



    })
    wx.showToast({
      title: '正在加载！',
      icon: 'success',
      duration: 5000
    });
  },
  xzzp: function () { //照片配框
    var data = this.data.mjkuangcai.data.maijiakuangtiao;
    var num = data.length;
    var pkpic = [];
    var goods = this.data.goods;
    var type = this.data.type;
    var pkid = this.data.pkid;
    console.log(pkid)
    var pkzjg = [];
    var shougf = 0;
    var a = Math.round(2 * (goods['kuang'] / 100 + goods['gao'] / 100));
    for (var i = 0; i < num; i++) {
      pkpic[i] = "id=" + data[i].id + "&classid=115&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['zp'] + "&random=1609328505445&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'];
      var area = (goods['kuang'] / 100) * (goods['gao'] / 100); //面积
      var kzblbbjg = Math.round(area * (pkid['zpbljg'] * 1 + pkid['zpbbjg'] * 1)); //卡纸玻璃背板价格 将卡纸的第一层卡纸价格作为计算价格
      pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100)) * data[i].tprice + shougf + kzblbbjg);
    }

    console.log(pkzjg)
    var currentimg = this.data.currentimg;
    this.setData({
      current: currentimg,
      pkpic: pkpic,
      pkzjg: pkzjg,
      xzid: 7,
      xz: true,
      xzxid: 7,

    })
  },
  gb: function (e) {
    var xzid = this.data.xzid;
    if (xzid == 4) {
      var xzxid = 4;
    } else if (xzid == 5) {
      var xzxid = 5;
    } else if (xzid == 6) {
      var xzxid = 6;
    } else if (xzid == 7) { //xzid==7的情况
      var xzxid = 7;
    }
    var currentimg = this.data.currentimg;
    this.setData({
      current: currentimg,
      xzid: '',
      xz: false,
      xzxid: xzxid,


    })
  },
  gb2: function (e) {
    var xzid = this.data.xzid;
    if (xzid == 4) {
      var ymid = e.currentTarget.dataset.ymid;
      var ymjg = parseInt(e.currentTarget.dataset.ymjg);
      var ymkd = parseInt(e.currentTarget.dataset.ymkd);
      var type = this.data.type;
      if (ymid) {
        var pkid = this.data.pkid;
        pkid['ymid'] = ymid;
        pkid['ymjg'] = ymjg;
        pkid['ymkd'] = ymkd;
        pkid['ym'] = true;
        if (pkid['nk']) {
          type['wk'] = 101;
        } else {
          type['wk'] = 2;
        }

      }
      this.setData({
        pkid: pkid,
        type: type
      })
      var goods = this.data.goods;
      var pkid = this.data.pkid;
      console.log(pkid)
      var type = this.data.type;
      var data = this.data.mjkuangcai.data.maijiakuangtiao;
      var num = data.length;
      var pkpic = [];
      var pkzjg = [];
      var shougf = 0;
      var a = 2 * (goods['kuang'] / 100 + goods['gao'] / 100);
      for (var i = 0; i < num; i++) {
        pkpic[i] = "id=" + data[i].id + "&classid=62&parentid=" + goods['id'] + "&ymid=" + pkid['ymid'] + "&nkid=" + pkid['nkid'] + "&pk=youhua1&type=" + type['wk'] + "&random=1609328505445";
        if (type['wk'] == 2) {
          var ymjg = Math.round((a + 8 * (pkid['ymkd'] / 100)) * pkid['ymjg']);
          pkzjg[i] = Math.round((a + (8 * (data[i].kuangdu / 100) + 8 * (pkid['ymkd'] / 100))) * data[i].tprice + shougf + ymjg);
        }
        if (type['wk'] == 101) {
          var ymjg = Math.round((a + 8 * (pkid['ymkd'] / 100)) * pkid['ymjg']);
          var e = Math.round((pkid['nkhsl'] * (goods['kuang'] / 100) + pkid['nkssl'] * (goods['gao'] / 100)) * pkid['nkjg']); //内框价格
          pkzjg[i] = Math.round((a + (8 * (data[i].kuangdu / 100) + 8 * (pkid['ymkd'] / 100))) * data[i].tprice + shougf + e + ymjg);
        }
      }
      /* var currentimg = this.data.currentimg; */
      this.setData({
        /* current: currentimg, */
        pkpic: pkpic,
        pkzjg: pkzjg
      })
    } else if (xzid == 5) {

    } else if (xzid == 6) {

    } else if (xzid == 7) { //xzid==7的情况

    }

  },
  xuanzhe: function (e) {
    var title = this.data.title; //框条提供者
    var xm = e.currentTarget.dataset.xm; //选择项cailiao  wksc 色彩 ktfg风格 kuangdu宽度 yama 亚麻 neikuang内框 jiage价格
    var xzzid = parseInt(e.currentTarget.dataset.xzzid); // 为 1时 不看 2时 只看 3时不限
    var xztj = e.currentTarget.dataset.xztj; //选择传递过来的字段 比如 发泡料 白木 金色 银色  宽度 等等 
    console.log(title)
    console.log(xm)
    console.log(xzzid)
    console.log(xztj)
    //xzzid 1时 不看 2时 只看 3时不限 4取消 5添加 6降序 7升序 
    //xztj 比如 发泡料 白木 金色 银色  宽度 等等 

    if (xm == 'cailiao') {
      if (xzzid == 1) { //不看的情况

        var bukans = this.data.bukan;
        var length = bukans['xh'].length;
        if (length > 0) {
          for (let i = 0; i < length; i++) {
            if (bukans['xh'][i] == xztj) {
              bukans['xh'].splice(i, 1) //删除掉数组中原来的商品信息
            }
          }
          bukans['xh'].unshift(xztj);
        } else {
          bukans['xh'].unshift(xztj); //向数组的开头添加一个xh元素
        }

        var buxian = this.data.buxian; //不限
        buxian['xh'] = xzzid;
        this.setData({
          bukan: bukans,
          buxian: buxian
        })

        console.log(this.data.bukan)
        console.log(this.data.buxian)
      } else if (xzzid == 2) { //只看的情况
        var bukans = this.data.bukan;
        bukans['xh'] = [];


        var zhikans = this.data.zhikan;
        zhikans['xh'] = [];
        zhikans['xh'].unshift(xztj);


        var buxian = this.data.buxian; //不限
        buxian['xh'] = xzzid;
        this.setData({
          bukan: bukans,
          buxian: buxian,
          zhikan: zhikans
        })

        console.log(this.data.bukan)
        console.log(this.data.zhikan)
        console.log(this.data.buxian)

      } else { //不限的情况 xzzid == 3
        var bukans = this.data.bukan;
        bukans['xh'] = [];


        var zhikans = this.data.zhikan;
        zhikans['xh'] = [];



        var buxian = this.data.buxian; //不限
        buxian['xh'] = 3;
        this.setData({
          bukan: bukans,
          zhikan: zhikans,
          buxian: buxian
        })
      }

    }
    if (xm == 'wksc') {
      if (xzzid == 1) {

        var bukans = this.data.bukan;
        var length = bukans['sc'].length;
        if (length > 0) {
          for (let i = 0; i < length; i++) {
            if (bukans['sc'][i] == xztj) {
              bukans['sc'].splice(i, 1) //删除掉数组中原来的商品信息
            }
          }
          bukans['sc'].unshift(xztj);
        } else {
          bukans['sc'].unshift(xztj);
        }

        var buxian = this.data.buxian; //不限
        buxian['sc'] = xzzid;
        this.setData({
          bukan: bukans,
          buxian: buxian
        })

        console.log(this.data.bukan)
        console.log(this.data.buxian)

      } else if (xzzid == 2) { //只看的情况
        var bukans = this.data.bukan;
        bukans['sc'] = [];


        var zhikans = this.data.zhikan;
        zhikans['sc'] = [];
        zhikans['sc'].unshift(xztj);


        var buxian = this.data.buxian; //不限
        buxian['sc'] = xzzid;
        this.setData({
          bukan: bukans,
          buxian: buxian,
          zhikan: zhikans
        })

        console.log(this.data.bukan)
        console.log(this.data.zhikan)
        console.log(this.data.buxian)
      } else { //不限的情况 xzzid == 3
        var bukans = this.data.bukan;
        bukans['sc'] = [];


        var zhikans = this.data.zhikan;
        zhikans['sc'] = [];



        var buxian = this.data.buxian; //不限
        buxian['sc'] = 3;
        this.setData({
          bukan: bukans,
          zhikan: zhikans,
          buxian: buxian
        })
      }

    }
    if (xm == 'ktfg') {
      if (xzzid == 1) { //不看的情况
        var bukans = this.data.bukan;
        var length = bukans['fg'].length;
        if (length > 0) {
          for (let i = 0; i < length; i++) {
            if (bukans['fg'][i] == xztj) {
              bukans['fg'].splice(i, 1) //删除掉数组中原来的商品信息
            }
          }
          bukans['fg'].unshift(xztj);
        } else {
          bukans['fg'].unshift(xztj);
        }

        var buxian = this.data.buxian; //不限
        buxian['fg'] = xzzid;
        this.setData({
          bukan: bukans,
          buxian: buxian
        })

        console.log(this.data.bukan)
        console.log(this.data.buxian)

      } else if (xzzid == 2) { //只看的情况
        var bukans = this.data.bukan;
        bukans['fg'] = [];


        var zhikans = this.data.zhikan;
        zhikans['fg'] = [];
        zhikans['fg'].unshift(xztj);


        var buxian = this.data.buxian; //不限
        buxian['fg'] = xzzid;
        this.setData({
          bukan: bukans,
          buxian: buxian,
          zhikan: zhikans
        })

        console.log(this.data.bukan)
        console.log(this.data.zhikan)
        console.log(this.data.buxian)
      } else { //不限的情况 xzzid == 3
        var bukans = this.data.bukan;
        bukans['fg'] = [];


        var zhikans = this.data.zhikan;
        zhikans['fg'] = [];



        var buxian = this.data.buxian; //不限
        buxian['fg'] = 3;
        this.setData({
          bukan: bukans,
          zhikan: zhikans,
          buxian: buxian
        })
      }
    }
    if (xm == 'kuangdu') {
      if (xzzid == 1) { //不看的情况
        var bukans = this.data.bukan;
        var length = bukans['kd'].length;
        if (length > 0) {
          for (let i = 0; i < length; i++) {
            if (bukans['kd'][i] == xztj) {
              bukans['kd'].splice(i, 1) //删除掉数组中原来的商品信息
            }
          }
          bukans['kd'].unshift(xztj);
        } else {
          bukans['kd'].unshift(xztj);
        }

        var buxian = this.data.buxian; //不限
        buxian['kd'] = xzzid;
        this.setData({
          bukan: bukans,
          buxian: buxian
        })

        console.log(this.data.bukan)
        console.log(this.data.buxian)
      } else if (xzzid == 2) { //只看的情况
        var bukans = this.data.bukan;
        bukans['kd'] = [];


        var zhikans = this.data.zhikan;
        zhikans['kd'] = [];
        zhikans['kd'].unshift(xztj);


        var buxian = this.data.buxian; //不限
        buxian['kd'] = xzzid;
        this.setData({
          bukan: bukans,
          buxian: buxian,
          zhikan: zhikans
        })

        console.log(this.data.bukan)
        console.log(this.data.zhikan)
        console.log(this.data.buxian)
      } else { //不限的情况 xzzid == 3
        var bukans = this.data.bukan;
        bukans['kd'] = [];


        var zhikans = this.data.zhikan;
        zhikans['kd'] = [];



        var buxian = this.data.buxian; //不限
        buxian['kd'] = 3;
        this.setData({
          bukan: bukans,
          zhikan: zhikans,
          buxian: buxian
        })
      }
    }



    var cailiaobx = this.data.buxian.xh;
    if (cailiaobx == 1) {
      const xh = this.data.bukan.xh;
      var cailiao = JSON.stringify(xh);

    } else if (cailiaobx == 2) {
      const xh = this.data.zhikan.xh;
      var cailiao = JSON.stringify(xh);

    } else {
      var cailiao = '';

    }




    var wkscbx = this.data.buxian.sc;
    if (wkscbx == 1) {
      const sc = this.data.bukan.sc;
      var wksc = JSON.stringify(sc);

    } else if (wkscbx == 2) {
      const sc = this.data.zhikan.sc;
      var wksc = JSON.stringify(sc);

    } else {
      var wksc = '';

    }

    var ktfgbx = this.data.buxian.fg;
    if (ktfgbx == 1) {
      const fg = this.data.bukan.fg;
      var ktfg = JSON.stringify(fg);

    } else if (ktfgbx == 2) {
      const fg = this.data.zhikan.fg;
      var ktfg = JSON.stringify(fg);

    } else {
      var ktfg = '';

    }


    var kuangdubx = this.data.buxian.kd;
    if (kuangdubx == 1) {
      const kd = this.data.bukan.kd;
      var kuangdu = JSON.stringify(kd);

    } else if (kuangdubx == 2) {
      const kd = this.data.zhikan.kd;
      var kuangdu = JSON.stringify(kd);

    } else {
      var kuangdu = '';

    }

    var that = this;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=pksxy', //这里就是服务器数据的地址链接
      data: {

        title: title, //框条卖家提供者

        cailiao: cailiao, //框条材料
        wksc: wksc, //外框色彩
        ktfg: ktfg, //框条风格
        kuangdu: kuangdu, //框条宽度

        cailiaobx: cailiaobx, //框条材料 不限值 1 为不看 2为只看 3为不限
        wkscbx: wkscbx, //外框色彩 不限值
        ktfgbx: ktfgbx, //框条风格 不限值
        kuangdubx: kuangdubx //框条宽度 不限值
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        if (res.data.success) {

          /* if (res.data.data) { */


          var mjkuangcai = that.data.mjkuangcai;
          var data = res.data.data;

          var num = data.length;
          var pkpic = [];

          var goods = that.data.goods;

          var xzxid = that.data.xzxid;
          console.log(xzxid)

          var pkid = that.data.pkid;
          var type = that.data.type;
          if (xzxid == 4) {
            for (var i = 0; i < num; i++) {

              pkpic[i] = "id=" + data[i].id + "&classid=62&parentid=" + goods['id'] + "&ymid=" + pkid['ymid'] + "&nkid=" + pkid['nkid'] + "&pk=youhua1&type=" + type['wk'] + "&random=1609328505445";
            }
          } else if (xzxid == 5) {

            for (var i = 0; i < num; i++) {

              pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['kz'] + "&random=1609328505445&kzid1=" + pkid['kzid1'] + "&kzid2=" + pkid['kzid2'] + "&kzid3=" + pkid['kzid3'] + "&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'] + "&kz1k=" + pkid['kz1k'] + "&kz1g=" + pkid['kz1g'] + "&kz2k=" + pkid['kz2k'] + "&kz2g=" + pkid['kz2k'] + "&kz3k=" + pkid['kz3k'] + "&kz3g=" + pkid['kz3k'];
            }
          } else if (xzxid == 6) {
            for (var i = 0; i < num; i++) {

              pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['zb'] + "&random=1609328505445&kzid1=" + pkid['bhid1'] + "&blid=" + pkid['bhblid'] + "&bbid=" + pkid['bhbbid'] + "&kz1k=" + pkid['bh1k'] + "&kz1g=" + pkid['bh1g'];
            }

          } else if (xzxid == 7) { //xzid==7的情况

          } else {

            for (var i = 0; i < num; i++) {

              pkpic[i] = "id=" + data[i].id + "&classid=62&parentid=" + goods['id'] + "&ymid=" + pkid['ymid'] + "&pk=youhua1&type=" + type['wk'] + "&random=1609328505445";
            }
          }
          mjkuangcai['data']['maijiakuangtiao'] = data;
          mjkuangcai['data']['total'] = res.data.total;
          mjkuangcai['data']['page'] = res.data.page;

          var mjkuangcai = mjkuangcai;
          console.log(mjkuangcai)
          /* var page = res.data.page;
          console.log(chazhao) */
          console.log(res.data.chazhao)
          that.setData({

            pkpic: pkpic,

            mjkuangcai: mjkuangcai,
            /* page: page */
          });


          /*  } */


        } else {
          wx.showToast({
            title: '已没有更多选择',
            icon: 'success',
            duration: 1000
          });
        }
      }

    })

  },
  pkmaijia: function (e) {
    var id = parseInt(e.currentTarget.dataset.id); //配框卖家id
    wx.setStorageSync("pkmaijiaid", id) // 覆盖缓存数据 油画
    app.router.navigateTo({
      url: "../detailspk/detailspk"
    })
  },
  type: function (e) {
    var type = parseInt(e.currentTarget.dataset.type); // 为 1时 不看 2时 只看 3时不限
    this.setData({
      type: type
    })
  },


  kzxz: function (e) {
    const id = parseInt(e.currentTarget.dataset.id); //卡纸玻璃背板的ID号
    var xm = e.currentTarget.dataset.xm; //参数名称 比如 kazhi1 kazhi2 等等
    var lm = parseInt(e.currentTarget.dataset.lm);
    var xmm = e.currentTarget.dataset.xmm; //选择项 ymjg nkjg kzjg bljg bbjg
    var jg = parseInt(e.currentTarget.dataset.jg); // 玻璃 背板 内框价格


    if (id) {
      var pkid = this.data.pkid;
      pkid[xm] = id;
      pkid[xmm] = jg;

    }
    this.setData({
      pkid: pkid
    })


    var data = this.data.mjkuangcai.data.maijiakuangtiao;
    var num = data.length;
    var pkpic = [];
    var goods = this.data.goods;
    var type = this.data.type;
    var pkid = this.data.pkid;
    var pkzjg = [];
    var shougf = 0;
    var a = 2 * (goods['kuang'] / 100 + goods['gao'] / 100);

    /*    if (lm == '61') {
         for (var i = 0; i < num; i++) {
           pkpic[i] = "id=" + kuangtiao[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['kz'] + "&random=1609328505445&kzid1=" + pkid['kzid1'] + "&kzid2=" + pkid['kzid2'] + "&kzid3=" + pkid['kzid3'] + "&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'] + "&kz1k=" + pkid['kz1k'] + "&kz1g=" + pkid['kz1g'] + "&kz2k=" + pkid['kz2k'] + "&kz2g=" + pkid['kz2k'] + "&kz3k=" + pkid['kz3k'] + "&kz3g=" + pkid['kz3k'];
         }

       }
       if (lm == '121') {
         for (var i = 0; i < num; i++) {
           pkpic[i] = "id=" + kuangtiao[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['zb'] + "&random=1609328505445&kzid1=" + pkid['bhid1'] + "&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'] + "&kz1k=" + pkid['bh1k'] + "&kz1g=" + pkid['bh1g'];
         }

       } */



    if (lm == 61) {
      for (var i = 0; i < num; i++) {
        pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['kz'] + "&random=1609328505445&kzid1=" + pkid['kzid1'] + "&kzid2=" + pkid['kzid2'] + "&kzid3=" + pkid['kzid3'] + "&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'] + "&kz1k=" + pkid['kz1k'] + "&kz1g=" + pkid['kz1g'] + "&kz2k=" + pkid['kz2k'] + "&kz2g=" + pkid['kz2k'] + "&kz3k=" + pkid['kz3k'] + "&kz3g=" + pkid['kz3k'];

        var area = (goods['kuang'] / 100 + 2 * (pkid['kz1k'] / 100 + pkid['kz2k'] / 100 + pkid['kz3k'] / 100)) * (goods['gao'] / 100 + 2 * (pkid['kz1g'] / 100 + pkid['kz2g'] / 100 + pkid['kz3g'] / 100)); //面积
        var kzblbbjg = area * (pkid['kzjg'] * 1 + pkid['bljg'] * 1 + pkid['bbjg'] * 1);
        var kzzk = 4 * (pkid['kz1k'] / 100 + pkid['kz2k'] / 100 + pkid['kz3k'] / 100) + 4 * (pkid['kz1g'] / 100 + pkid['kz2g'] / 100 + pkid['kz3g'] / 100); //卡纸总宽度

        pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100) + kzzk) * data[i].tprice + shougf + kzblbbjg);
      }
    }
    if (lm == 121) {
      for (var i = 0; i < num; i++) {
        pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['zb'] + "&random=1609328505445&kzid1=" + pkid['bhid1'] + "&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'] + "&kz1k=" + pkid['bh1k'] + "&kz1g=" + pkid['bh1g'];
        var area = (goods['kuang'] / 100 + 2 * (pkid['bh1k'] / 100)) * (goods['gao'] / 100 + 2 * (pkid['bh1g'] / 100)); //面积
        var kzblbbjg = Math.round(area * (pkid['bhjg'] * 1 + pkid['bhbljg'] * 1 + pkid['bhbbjg'] * 1)); //卡纸玻璃背板价格 将卡纸的第一层卡纸价格作为计算价格

        var kzzk = 4 * ((pkid['bh1k']) + 4 * (pkid['bh1g'])) / 100; //卡纸总宽度

        pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100) + kzzk) * data[i].tprice + shougf + kzblbbjg);
      }
    }
    this.setData({

      pkpic: pkpic,
      pkzjg: pkzjg

    })



  },
  kzxzqb: function (e) {
    const id = parseInt(e.currentTarget.dataset.id); //卡纸玻璃背板的ID号
    var jg = parseInt(e.currentTarget.dataset.jg); // 玻璃 背板 内框价格
    var pkid = this.data.pkid;
    pkid['kzid1'] = id;
    pkid['kzid2'] = id;
    pkid['kzid3'] = id;
    pkid['kzjg'] = jg;
    this.setData({
      pkid: pkid

    });
    var data = this.data.mjkuangcai.data.maijiakuangtiao;
    var num = data.length;
    var pkpic = [];
    var goods = this.data.goods;
    var type = this.data.type;
    var pkid = this.data.pkid;
    var pkzjg = [];
    var shougf = 0;
    var a = 2 * (goods['kuang'] / 100 + goods['gao'] / 100);
    console.log(pkid)
    for (var i = 0; i < num; i++) {
      pkpic[i] = "id=" + data[i].id + "&parentid=" + goods['id'] + "&pk=youhua1&type=" + type['kz'] + "&random=1609328505445&kzid1=" + pkid['kzid1'] + "&kzid2=" + pkid['kzid2'] + "&kzid3=" + pkid['kzid3'] + "&blid=" + pkid['blid'] + "&bbid=" + pkid['bbid'] + "&kz1k=" + pkid['kz1k'] + "&kz1g=" + pkid['kz1g'] + "&kz2k=" + pkid['kz2k'] + "&kz2g=" + pkid['kz2k'] + "&kz3k=" + pkid['kz3k'] + "&kz3g=" + pkid['kz3k'];
      var area = (goods['kuang'] / 100 + 2 * (pkid['kz1k'] / 100 + pkid['kz2k'] / 100 + pkid['kz3k'] / 100)) * (goods['gao'] / 100 + 2 * (pkid['kz1g'] / 100 + pkid['kz2g'] / 100 + pkid['kz3g'] / 100)); //面积
      var kzblbbjg = area * (pkid['kzjg'] * 1 + pkid['bljg'] * 1 + pkid['bbjg'] * 1);
      var kzzk = 4 * (pkid['kz1k'] / 100 + pkid['kz2k'] / 100 + pkid['kz3k'] / 100) + 4 * (pkid['kz1g'] / 100 + pkid['kz2g'] / 100 + pkid['kz3g'] / 100); //卡纸总宽度

      pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100) + kzzk) * data[i].tprice + shougf + kzblbbjg);
    }
    this.setData({
      pkpic: pkpic,
      pkzjg: pkzjg
    })
  },
  pkzid: function (e) {
    var pkzid = this.data.pkzid;
    var xm = e.currentTarget.dataset.xm; //选择项 ym kz gh zp
    var id = parseInt(e.currentTarget.dataset.id); // 为 1时 不看 2时 只看 3时不限
    pkzid[xm] = id;
    this.setData({
      pkzid: pkzid
    })

  },
  select: function (e) {
    var pkid = this.data.pkid;
    var type = this.data.type;
    var xm = e.currentTarget.dataset.xm; //选择项 ym nk
    var pkpic = [];
    var num = pkpic.length;
    pkid[xm] = !pkid[xm];
    if (pkid['ym']) {
      if (pkid['nk']) {
        type['wk'] = 101;
      } else {
        type['wk'] = 2;
      }
    } else {
      if (pkid['nk']) {
        type['wk'] = 11;
      } else {
        type['wk'] = 1;
      }
    }
    this.setData({
      pkid: pkid,
      type: type,
    })

    var goods = this.data.goods;
    var data = this.data.mjkuangcai.data.maijiakuangtiao;
    var type = this.data.type;
    var pkid = this.data.pkid;
    var num = data.length;
    var pkpic = [];
    var pkzjg = [];
    var shougf = 0;
    var a = 2 * (goods['kuang'] / 100 + goods['gao'] / 100);
    for (var i = 0; i < num; i++) {
      pkpic[i] = "id=" + data[i].id + "&classid=62&parentid=" + goods['id'] + "&ymid=" + pkid['ymid'] + "&nkid=" + pkid['nkid'] + "&pk=youhua1&type=" + type['wk'] + "&random=1609328505445";

      if (type['wk'] == 1) { //只有外框的情况
        pkzjg[i] = Math.round((a + 8 * (data[i].kuangdu / 100)) * data[i].tprice + shougf);
      } else if (type['wk'] == 2) { //只有外框和亚麻的情况
        var ymjg = Math.round((a + 8 * (pkid['ymkd'] / 100)) * pkid['ymjg']);
        pkzjg[i] = Math.round((a + (8 * (data[i].kuangdu / 100) + 8 * (pkid['ymkd'] / 100))) * data[i].tprice + shougf + ymjg);
      } else if (type['wk'] == 101) { //外框和亚麻 加内框的情况
        var ymjg = Math.round((a + 8 * (pkid['ymkd'] / 100)) * pkid['ymjg']);
        var e = Math.round((pkid['nkhsl'] * (goods['kuang'] / 100) + pkid['nkssl'] * (goods['gao'] / 100)) * pkid['nkjg']); //内框价格
        pkzjg[i] = Math.round((a + (8 * (data[i].kuangdu / 100) + 8 * (pkid['ymkd'] / 100))) * data[i].tprice + shougf + e + ymjg);
      } else if (type['wk'] == 11) { //外框和内框的情况
        var e = Math.round((pkid['nkhsl'] * (goods['kuang'] / 100) + pkid['nkssl'] * (goods['gao'] / 100)) * pkid['nkjg']); //内框价格
        pkzjg[i] = Math.round(((a + 8 * (data[i].kuangdu / 100)) * data[i].tprice + shougf + e));
      }
    }


    this.setData({
      pkpic: pkpic,
      pkzjg: pkzjg
    })

  },
  cakanweizhi: function (e) {
    var latitude = (parseInt(e.currentTarget.dataset.latitude) / 1000000);
    var longitude = (parseInt(e.currentTarget.dataset.longitude) / 1000000);
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        //const latitude = res.latitude
        //const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
    })
  },
  spxqy: function (e) {
    var classid = parseInt(e.currentTarget.dataset.lmid);
    var id = parseInt(e.currentTarget.dataset.lmzid);
    var dldp = e.currentTarget.dataset.dldp; //代理店铺
    var dpsjhym = e.currentTarget.dataset.dpsjhym; //代理商家会员名
    console.log(classid)
    console.log(id)
    console.log(dldp)
    console.log(dpsjhym)
    var spid = id;
    var splm = classid;
    var dldp = dldp;
    var dpsjhym = dpsjhym;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=details', //这里就是服务器数据的地址链接
      data: {
        spid: spid,
        splm: splm,
        dldp: dldp, //代理店铺
        dpsjhym: dpsjhym //代理商家会员名
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        var details = res.data.data;
        console.log(details)
        wx.setStorageSync('details', details) //存入缓存 */

        app.router.navigateTo({
          url: "../details/details"
        })

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
  wdsc: function (e) {
    var hymname = this.data.hymember['username'];
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=wdsc', //这里就是服务器数据的地址链接
      data: {

        hym: hymname //我的会员名

      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
        console.log(res)
        var list = res.data.data;
        var page = res.data.page;
        if (!res.data.success) {

          wx.showToast({
            title: '此商家 暂无商品！',
            icon: 'success',
            duration: 1000
          });
          return;
        }
        console.log(list)

        wx.setStorageSync('page', page) //存入缓存 
        wx.setStorageSync('list', list) //存入缓存 
        //wx.setStorageSync('dpsjhym', hymname) //存入缓存 

        app.router.navigateTo({
          url: "../wdsc/wdsc"
        })

      }
    })
  },
  sfsc: function () { //是否收藏
    //获取到商品的id classid 我的会员id 去我的收藏表去查找 ，如果存在返回1 否则返回0
    var classid = this.data.goods.classid;
    var id = this.data.goods.id;
    var hymid = this.data.hymember['userid'];
    var that=this;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=sfsc', //这里就是服务器数据的地址链接
      data: {
        classid: classid,
        id: id,
        hymid: hymid, //我的会员id

      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      
      success: function (res) { //这里属于数据调取的固定写法
        console.log(res)

          that.setData({
            scnum: res.data.num,
            sfsc: res.data.success
  
          })

      }
    })
  },
  tjsc: function () { //添加收藏
    this.setData({
      sfsc: true
    })
    var splm = this.data.goods.classid;
    var spid = this.data.goods.id;
    var hymid = this.data.hymember['userid'];
    var hymname = this.data.hymember['username'];
    var mjid = this.data.goods.maijia.id;
    var mjlm = this.data.goods.maijia.classid;
    var that=this;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=tjsc', //这里就是服务器数据的地址链接
      data: {
        splm: splm,
        spid: spid,
        hymid: hymid, //我的会员id
        hymname: hymname, //我的会员id
        mjid:mjid,
        mjlm:mjlm
      },

      method: 'GET', //参数传递的方式 分为get 和post两种
      success: function (res) { //这里属于数据调取的固定写法
  
  
          that.sfsc()
      
        

      }
    })
  }
})