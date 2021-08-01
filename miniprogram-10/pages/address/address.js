// pages/address/address.js
const app = getApp()
Page({
  //此页面除了onLoad()之外其他 都没有用 都可以删除
/*    data:{
     address:{
      name:'',
      phone:'',
      detail:''
    }  
  }, */
  onLoad(){
    //----------------
    wx.chooseAddress({
  success (res) {

    var value={
      name:res.userName,//收货人姓名
      phone:res.telNumber,//收货人手机号码
      postalCode:res.postalCode,
      detail:res.provinceName+' '+res.cityName+' '+res.countyName+' '+res.detailInfo//省市区 详细地址
      }
     wx.setStorage({
        key: 'address',
        data: value,
         success: function(){
          wx.navigateBack();//返回上一页
        } 
      })

       },
  fail (err) { //取消的话也要返回上一页
          wx.navigateBack();//返回上一页
       },
 
    })
  },
/*   formSubmit(e){
    const value = e.detail.value;
   if (value.name && value.phone && value.detail){

//-------------------
      wx.request({
   url:'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=address',
    data: {
        name:value.name,
        phone:value.phone,
        detail:value.detail,
        xm:1,//修改
        hyid: app.globalData.hymember.userid,//会员id
      },
    success: function(res) {

    }
      })
//-------------------
      wx.setStorage({
        key: 'address',
        data: value,
        success(){
          wx.navigateBack();//返回上一页
        }
      })
    }else{
      wx.showModal({
        title:'提示',
        content:'请填写完整资料',
        showCancel:false
      })
    }
  },


formSubmit22: function(e){
     var self = this;
      wx.request({
   url:'https://www.qunqing168.com/ecmsapi/index.php?mod=eapidb&act=address',
    data: {
        xm:4,
        hyid: app.globalData.hymember.userid,
      },
    success: function(res) {
              self.setData({
          address2 : res.data
        })

    }
      })  
    } */
})