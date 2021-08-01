// pages/editor/editor.js
Page({
  data: {
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS })
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)
 
    })
  },
  /** editor 部分 **/
  //获取编辑器的内容
  getEditorValue(e) {
    this.setData({
      ['formData.content']: e.detail.html
    })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      wx.showLoading({
        title: '加载内容中...',
      })
      setTimeout(function () {
        let data = that.data;
        wx.hideLoading();
        that.editorCtx.setContents({
          html: data.pageData ? data.pageData.content : '',
          success: (res) => {
            console.log(res)
          },
          fail: (res) => {
            console.log(res)
          }
        })
      }, 1000)
    }).exec()
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)
  },
  //插入图片事件监听
  insertImage() {
    var _this = this;
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage_editor('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage_editor('camera')
          }
        }
      }
    })
  },
  // 选择图片本地路径
  chooseWxImage_editor: function (type) {
    var that = this;
    var imgsPaths = that.data.imgs;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths[0]);
        that.upImgs_editor(res.tempFilePaths[0], 0) //调用上传方法
      }
    })
  },
  /**编辑器图片上传至服务器**/
  upImgs_editor: function (imgurl, index) {
    var that = this;
    var _this = this;
    wx.uploadFile({
      url: 'https://jorian.image.cn/fileUpload',//此处的服务器地址请替换成自己的
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        var resj = JSON.parse(res.data);
        console.log(resj) //接口返回网络 
        var src = resj.data.url
        //插入到回答主体中
        _this.editorCtx.insertImage({
          src: src,
          data: {
            id: 'abcd',
            role: 'god'
          },
          success: function () {
            console.log('insert image success')
          }
        })
      }
    })
  },
  /** editor 部分结束 **/
 
})