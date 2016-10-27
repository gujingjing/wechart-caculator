//获取应用实例
var app = getApp()
Page({
  data:{
    id: 0,
    title:"",
    toastHidden:true,
    modalHidden:true,
    toastMessage:"默认",
    modalMessage:"默认",
    cate:'+',//收入，支出类型
    cashNumber:"0",
    date:"",//日期
    items:[
      {name: "收入", value: "+", checked: "true"},
      {name: "支出", value: "-"},
    ]
  },
  //单选按钮
  radioChange:function(e){
    this.setData({
      cate:e.detail.value
    })
  },
  //金额变化
  bindCashInput:function(e){
    this.setData({
      cashNumber:e.detail.value
    })
  },
  //日期变化
  bindTimeChange:function(e){
    this.setData({
      date:e.detail.value
    })
  },
  //编辑
  buttonEditClick:function(e){
    //标题为空
    
  },
  //添加
  buttonAddClick:function(e){
    if(this.data.title==""){
        this.setData({
      modalMessage:"标题位空",
      modalHidden:false
    })
    }
    console.log(this.data.title);

    
    wx.setStorageSync("add_title",this.data.title);

    var myData={
      "key":"myKey",
      "data":this.data.title
    };
    wx.setStorage(myData);

    var synData=wx.getStorageSync("add_title");
    console.log("add_title==="+synData);

    wx.getStorage({
      "key":"myKey",
      success:function(res){
        console.log("myKey==="+res.data);
      }
    });
  },
  //删除
  buttonDelClick: function(e){
    
  },
  //modal变化-确定取消同时先用一个
  modalChange:function(){
    this.setData({
      modalMessage:"默认",
      modalHidden:true,
      toastMessage:"点击了",
      toastHidden:false
    })
  },
  //toast变化
  toastChange:function(){
    this.setData({
      toastHidden:true
    })
  },
  //标题改变
  bindTitleInput: function(e){
    this.setData({
      title:e.detail.value
    })
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  }
})