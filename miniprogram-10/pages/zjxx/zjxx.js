// pages/fx/fxsc/fxsc.js
const app = getApp();
Page({

  data: {

    video: false,
    imglistt: [], //上传到服务器时使用
    imglist: {}, //上传页面展示时使用
    imagesurl: [],

    hymember: [],
    sysHeight: app.globalData.sysHeight,

    //usertx: app.globalData.hymember.userpic
    frombiaodan: [],
    region: {
      pro: '北京市',
      city: '北京市',
      area: '朝阳区',
      befrom: ''
    },
    smtj: false, //扫码添加显示
    fq: {
      zpcb: 0,
      tprice: 0,
      price: 0,
      mjfq: 0,
      dlfq: 0,
      coupon: 0,
      pmaxnum: 0,
      sfsj: "否"
    },
    fclassid:0,
    fid:0,
    classid:0,
    lmmc:'',
    type: 1, //1为图片 2为视频
  },
  xiugai: function (imagesurl, successUp, failUp, i, length, classid, id, type,filePaths) {
    var that = this;

    wx.request({

      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=spxxtjtp',
      data: {
        picurl: imagesurl[i],
        titlepic: filePaths[i],
        classid: classid,
        id: id
      },
      method: 'GET',
      header: {
        "Content-Type": "multipart/form-data" //记得设置

      },
      success: (res) => {
        successUp++;
      },
      fail: (res) => {
        failUp++;
      },
     
      complete: () => {
        i++;
        if (i == length) {
          wx.hideLoading();

          console.log('总共' + successUp + '张上传成功,' + failUp + '张上传失败！')
          var fclassid = that.data.fclassid;
          var fid = that.data.fid;
          var lmmc = that.data.lmmc;
          app.router.navigateTo({
            //url: "../zjxx/zjxx"
            url:"../zjxx/zjxx?lmid="+classid+"&fclassid="+fclassid+"&fid="+fid+"&lmmc="+lmmc
          })
        } else { //递归调用uploadDIY函数
          that.xiugai(imagesurl, successUp, failUp, i, length, classid, id, type,filePaths);
        }
      }
    })
  },
  /**
   * form提交事件
   */
  uploadDIY: function (filePaths, successUp, failUp, i, length, classid, id, type,imglist) {

/*     if (type == 1) {
      var filePaths = filePaths[i];
    }
    if (type == 2) {
      var filePaths = filePaths[i]['tempFilePath'];
    } */

    //var filePaths = imglist[filePaths[i]];

        var that = this;
         wx.uploadFile({
          url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=scpic',
          filePath: imglist[filePaths[i]],
          name: 'file',
          formData: {
            'id': id,
            'classid': classid,
            'type': type //1为图片 2为视频
          },
          success: (res) => {
            successUp++;
            //console.log('上传图片成功：', JSON.parse(res.data));
            var data = JSON.parse(res.data);
            //var data = res.data;
            console.log(data)
            // 把获取到的路径存入imagesurl字符串中
            that.data.imagesurl
            that.setData({
              imagesurl: that.data.imagesurl.concat(data.pic)
            })
            console.log(that.data.imagesurl)
          },
          fail: (res) => {
            failUp++;
          },
          complete: () => {
            i++;
            if (i == length) {
              var imagesurl = that.data.imagesurl;
              console.log('总共' + successUp + '张上传成功,' + failUp + '张上传失败！')
              that.xiugai(imagesurl, 0, 0, 0, imagesurl.length, classid, id, type,filePaths);
            } else { //递归调用uploadDIY函数
              that.uploadDIY(filePaths, successUp, failUp, i, length, classid, id, type,imglist);
            }
          },
        });   
  },
  bindFormSubmit: function (e) {
    self = this;
    var hymember = this.data.hymember;
    var userid = hymember['userid'];
    var username = hymember['username'];
    var usertx = hymember['userpic'];
    var type = this.data.type;
    var imglistt = self.data.imglistt;
    var imglist = self.data.imglist;
    console.log(imglist)
    //提问内容
    console.log(e.detail.value)
    var frombiaodan = this.data.frombiaodan;
    var fromdata = e.detail.value;
    console.log(frombiaodan)
    console.log(fromdata)
    for (var i = 0; i < frombiaodan.length; i++) {
      if ('img' != frombiaodan[i]['f']) {
        if (fromdata[frombiaodan[i]['f']]) {} else {
          wx.showToast({
            title: frombiaodan[i]['fname'] + '内容不能为空',
            //icon: 'loading',
            duration: 1000,
            mask: true
          })
          return;

        }
      }
    }
    wx.showLoading({
      title: '正在提交...',
      mask: true
    })
    //添加问题
    var classid = self.data.classid;
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=spxxtj', //商品信息添加

      data: {
        classid: classid,
        fromdata: fromdata,
        hytx: usertx, //会员头像
        userid: userid,
        title: username //会员名
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //header: app.globalData.header, // 设置请求的 header
      header: {
        "Content-Type": "multipart/form-data" //记得设置

      },
      success: function (res) {
        console.log(res.data)
        var id = res.data;
        // success
        if (typeof (res.data) == 'number') {
          if (imglist != '') {

            //开始插入图片  应该在这里遍历对象
            self.uploadDIY(imglistt, 0, 0, 0, imglistt.length, classid, id, type,imglist);
          } else {
            wx.hideLoading();
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
              mask: true
            })
          }
        } else {
          wx.hideLoading();
          wx.showToast({
            title: res.data,
            icon: 'loading',
            duration: 10000,
            mask: true
          })
        }
      }
    })

  },

  onLoad: function (options) {
    var that = this;
    console.log(options.lmid)
    that.setData({
      hymember:app.globalData.hymember,
      fclassid: options.fclassid,
      fid: options.fid,
      classid: options.lmid,
      lmmc: options.lmmc
    })
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=frombiaodan',
      data: {
        classid: options.lmid,
      },
      method: 'GET',
      header: {
        "Content-Type": "multipart/form-data" //记得设置
      },
      success: function (res) {
        console.log(res.data)
        var frombd = res.data
        that.setData({
          frombiaodan: frombd,

        })
      }
    })
  },

  onLoad222: function (options) {
    console.log(options.index)
    var self = this;
    var x = parseInt(options.index);
    if (x == 1) {
      console.log('点击选择图片')
      wx.chooseImage({ //  chooseMessageFile
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          self.setData({
            imglist: tempFilePaths,
            type: 1,
            img: true,
          })
        }
      })
    }
    if (x == 2) {
      console.log('点击选择视频 ')
      /*   wx.chooseMessageFile({
          count: 1,
          type: 'file',
          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFiles
            console.log(tempFilePaths)
            self.setData({
              imglist: tempFilePaths,
              type: 2,
              img: true,
            })
          }
        }) */
      wx.chooseMedia({
        count: 1,
        //mediaType: ['image','video'],
        mediaType: ['video'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
          console.log(res.tempFiles.tempFilePath)
          console.log(res.tempFiles.size)
          const tempFilePaths = res.tempFiles
          console.log(tempFilePaths)
          self.setData({
            imglist: [tempFilePaths[0].tempFilePath, tempFilePaths[0].thumbTempFilePath], //tempFilePaths,
            type: 2,
            img: true,
          })
        }
      })
    }
  },
  //点击预览图片
  ylimg: function (e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.imglist // 需要预览的图片http链接列表
    })
  },

  isimg: function (e) {
    var self = this;
    var x = parseInt(e.currentTarget.dataset.index);
    var pic = e.currentTarget.dataset.pic;
    console.log(pic)
    var imglist = self.data.imglist;
    var num = (9 - imglist.length);
    console.log(num)
    if (x == 1) {
      console.log('点击选择图片')
      wx.chooseImage({ //  chooseMessageFile
        count: num, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          imglist[pic] = tempFilePaths[0];
          console.log(imglist)
          console.log(Object.keys(imglist))
          var imglistt=Object.keys(imglist);
          self.setData({
            imglistt:imglistt,
            imglist: imglist,
            type: 1,
            img: true
          })
        }
      })
    }
    if (x == 2) {
      console.log('点击选择视频 ')
      /*       wx.chooseMessageFile({
              count: 1,
              type: 'video',
              success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFiles
                console.log(tempFilePaths)
                self.setData({
                  imglist: tempFilePaths,
                  type: 2,
                  img: true
                })
              }
            }) */
      wx.chooseMedia({
        count: 1,
        //mediaType: ['image','video'],
        mediaType: ['video'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
          console.log(res.tempFiles.tempFilePath)
          console.log(res.tempFiles.size)

          const tempFilePaths = res.tempFiles
          console.log(tempFilePaths)
          self.setData({
            imglist: [tempFilePaths[0].tempFilePath, tempFilePaths[0].thumbTempFilePath], //tempFilePaths,
            type: 2,
            img: true,
          })
        }
      })
    }
  },
  isimgg: function (e) {
    var self = this;
    var x = parseInt(e.currentTarget.dataset.index);
    var pic = e.currentTarget.dataset.pic;
    var picnum = parseInt(e.currentTarget.dataset.picnum);
    console.log(pic.length)
    console.log(picnum)
    var imglistt = self.data.imglistt;
    var imglist = self.data.imglist;

    if (x == 1) {
      console.log('点击选择图片')
      wx.chooseImage({ //  chooseMessageFile
        count: picnum, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          for (var i = 0; i < tempFilePaths.length; i++) {
            imglist[pic[i]] = tempFilePaths[i];

            /* console.log(imglistt) */
            //console.log(imglist)
            
          }

          console.log(Object.keys(imglist))
          var imglistt=Object.keys(imglist);
          self.setData({
            imglistt: imglistt,
            imglist: imglist,
            type: 1,
            img: true
          })
        }
      })

      //console.log(imglist)
      console.log(Object.keys(imglist))
    }
    if (x == 2) {
      console.log('点击选择视频 ')
      /*       wx.chooseMessageFile({
              count: 1,
              type: 'video',
              success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFiles
                console.log(tempFilePaths)
                self.setData({
                  imglist: tempFilePaths,
                  type: 2,
                  img: true
                })
              }
            }) */
      wx.chooseMedia({
        count: 1,
        //mediaType: ['image','video'],
        mediaType: ['video'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
          console.log(res.tempFiles.tempFilePath)
          console.log(res.tempFiles.size)

          const tempFilePaths = res.tempFiles
          console.log(tempFilePaths)
          self.setData({
            imglist: [tempFilePaths[0].tempFilePath, tempFilePaths[0].thumbTempFilePath], //tempFilePaths,
            type: 2,
            img: true,
          })
        }
      })
    }
  },
  imgsc: function (e) { //删除不需要的图片
    var listimg = this.data.imglist;
    listimg.splice(e.currentTarget.dataset.id, 1);
    var that = this;
    /*     console.log("触发了我")
        console.log("长按"); */
    wx.showModal({ //这个不用多说，做过小程序都看得懂
      title: '提示',
      content: '确认删除该图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          that.setData({
            imglist: listimg
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  quxiao: function () {
    this.setData({
      imglist: [],
      img: false
    })
  },
  //省市区调取
  bindRegionChange: function (e) {
    var value = e.detail.value;
    var region = {};
    region['pro'] = value[0];
    region['city'] = value[1];
    region['area'] = value[2];
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: region

    })
  },
  bindPickerChange: function (e) {
    var frombiaodan = this.data.frombiaodan;
    var id = parseInt(e.currentTarget.dataset.id);
    var ffid = e.currentTarget.dataset.ffid;
    var name = e.currentTarget.dataset.name;
    if (name == 'fq') {
      console.log(e.detail.value)
      console.log(22222222222222222222222)
    }
    //var content = e.detail.value.content;//得到购买价格
    console.log('picker发送选择改变，携带值为', e.detail.value)
    frombiaodan[id][ffid] = e.detail.value;
    console.log(frombiaodan)
    this.setData({
      frombiaodan: frombiaodan
    })
  },
  ssqw: function () {
    var that = this;
    var region = {};

    wx.chooseAddress({
      success(res) {
        region['pro'] = res.provinceName
        region['city'] = res.cityName
        region['area'] = res.countyName
        region['befrom'] = res.detailInfo
        that.setData({
          region: region
        })
      }
    })
  },
  saomagwc: function () {
    app.router.navigateTo({
      url: "../saomagwc/saomagwc"
    })
  },
  smtj: function () {
    this.setData({
      smtj: true
    })
  },
  smtjqx: function () {
    this.setData({
      smtj: false
    })
  },
  takeCode(e) { //扫码添加
    this.setData({
      code: e.detail.result,
      smtj: false
    })

  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
  bindKeyInput: function (e) {
    var that = this;
    var f = e.currentTarget.dataset.f;
    console.log(f)
    console.log(e.detail.value)
    var fq = that.data.fq;
    if (e.detail.value) {
      if (f == 'pmaxnum') {
        fq[f] = e.detail.value;
        if (e.detail.value > 0 && e.detail.value != '') {
          fq['sfsj'] = '是';
        } else {
          fq['sfsj'] = '否';
        }
      } else {

        fq[f] = (parseInt(e.detail.value * 100) / 100).toFixed(2);
        if (f == 'price' || f == 'dlfq') {
          fq['mjfq'] = (fq['price'] - fq['dlfq']).toFixed(2);
        }
      }
      console.log(fq)

    } else {
      fq[f] = 0;
      if (f == 'pmaxnum') {
        fq['sfsj'] = '否';
      }
    }

    that.setData({
      fq: fq
    })

  },
  bindKeyInputon: function (e) {
    var that = this;
    var f = e.currentTarget.dataset.f;
    console.log(f)
    console.log(e.detail.value)
    var fq = that.data.fq;
    if (fq[f] == 0) {
      fq[f] = '';
    }
    that.setData({
      fq: fq
    })
  },
  goto(event) { //跳转链接
    app.router.navigateTo({
      url: event.currentTarget.dataset.lj
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
  }
})
