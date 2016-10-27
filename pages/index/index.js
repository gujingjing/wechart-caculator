//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
//    motto: 'Hello World',
      items: [],
      loadingHidden : true
  },
  addItem: function() {
      wx.navigateTo({
      url: '../item/item'
    })
  },
  // 使用onShow而不使用onLoad，使得添加返回后自刷新
  onShow: function () {
    this.setData({
      loadingHidden : false
    });
    var that = this
    // 获取首页列表，本地storage中取出accessToken作为参数，不必带上uid；
    // 成功回调后，设置为data，渲染wxml
    app.httpService(
                    'item/all', 
                    {'accessToken': wx.getStorageSync('accessToken')}, 
                    function(response){
                        that.setData({
                          'items':response.data,
                          'loadingHidden': true
                        });
                    }
    );
  },
  itemTap: function(e) {
    var id = parseInt(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../item/item?id='+id
    })
  }
})
