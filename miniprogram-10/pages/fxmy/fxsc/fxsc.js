// pages/fx/fxsc/fxsc.js
const app = getApp();
Page({

  data: {
    img: false,
    video: false,
    imglist: [],
    imagesurl: [],
    //videolist: [],
    hymember: app.globalData.hymember,
    sysHeight: app.globalData.sysHeight,
    type: 0, //1为图片 2为视频
    //usertx: app.globalData.hymember.userpic
  },
  xiugai: function (imagesurl, successUp, failUp, i, length, classid, id, type) {
    var that = this;
    if (type == 1) {
      if (i == 0) {
        var titlepic = 'titlepic';
      } else {
        var r = i + 1;
        var titlepic = 'titlepic' + r;
      }
    } else {
      if (i == 0) {
        var titlepic = 'video';
      } else {
        var titlepic = 'titlepic';
      }
      
    }
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapitable&act=pengyouquan2',
      data: {
        picurl: imagesurl[i],
        titlepic: titlepic,
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
          app.router.navigateTo({
            url: "../../fx/fx"
          })
        } else { //递归调用uploadDIY函数
          that.xiugai(imagesurl, successUp, failUp, i, length, classid, id, type);
        }
      }
    })
  },
  /**
   * form提交事件
   */
  uploadDIY: function (filePaths, successUp, failUp, i, length, classid, id, type) {
    console.log(filePaths)
    console.log(length)
    /* if (type == 1) {
      var filePaths = filePaths[i];
    }
    if (type == 2) {
      var filePaths = filePaths[i]['tempFilePath'];
    } */

    //var filePaths = filePaths[i];
    var that = this;
    wx.uploadFile({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapitable&act=pengyouquan',
      filePath: filePaths[i],
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
          wx.hideLoading();
          //Toast('总共' + successUp + '张上传成功,' + failUp + '张上传失败！');
          var imagesurl = that.data.imagesurl;
          console.log('总共' + successUp + '张上传成功,' + failUp + '张上传失败！')
          that.xiugai(imagesurl, 0, 0, 0, imagesurl.length, classid, id, type);
        } else { //递归调用uploadDIY函数
          that.uploadDIY(filePaths, successUp, failUp, i, length, classid, id,type);
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
    var imglist = self.data.imglist;

 /*    //图片
    if (type == 1) {
      var imglist = self.data.imglist;
    }
    //视频
    if (type == 2) {
      var imglist = self.data.imglist;
      var imglist = [imglist[0].tempFilePath, imglist[0].thumbTempFilePath];
    } */
console.log(imglist)
    //提问内容
    var content = e.detail.value.content;
    console.log(content)
    if (content == '') {
      if (imglist.length == 0) {
        wx.showToast({
          title: '内容不能为空',
          icon: 'loading',
          duration: 1000,
          mask: true
        })
        return
      }
    }
    wx.showLoading({
      title: '正在提交...',
      mask: true
    })
    wx.hideLoading();
    //添加问题
    wx.request({
      url: 'https://www.qunqing168.com/ecmsapi/index.php?mod=eapitable&act=zengjiaxinxi',
      data: {
        content: content,
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
        var classid = 315;
        // success
        if (typeof (res.data) == 'number') {
          if (imglist != '') {
            //开始插入图片
            self.uploadDIY(imglist, 0, 0, 0, imglist.length, classid, id, type);
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

  //点击预览图片
  onLoad: function (options) {
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
            imglist: [tempFilePaths[0].tempFilePath, tempFilePaths[0].thumbTempFilePath],//tempFilePaths,
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

          var imglistx = imglist.concat(tempFilePaths);

          self.setData({
            imglist: imglistx,
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
            imglist: [tempFilePaths[0].tempFilePath, tempFilePaths[0].thumbTempFilePath],//tempFilePaths,
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
  }
})