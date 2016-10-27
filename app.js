//app.js
App({
  onLaunch: function () {
    //调用应用实例的方法获取全局数据
    var that = this
    //调用登录接口
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            //请求登录
            that.httpService(
                'user/login',
                {
                  openid: res.userInfo.nickName
                }, 
                function(response){
                  //成功回调，本地缓存accessToken
                  var accessToken = wx.getStorageSync('logs') || '';
                  accessToken = response.data.accessToken;
                  wx.setStorageSync('accessToken', accessToken);
                }
            );
          }
        })
      }
    })
  },
  httpService:function(uri, param, cb) {
    // 如果令牌已经存在，那么提交令牌到服务端
    if (wx.getStorageSync('accessToken')) {
      param.accessToken = wx.getStorageSync('accessToken');
    }
//	  分别对应相应路径，参数，回调
	  wx.request({
		    url: 'http://financeapi.applinzi.com/index.php/' + uri,
		    data: param,
		    header: {
		        'Content-Type': 'application/json'
		    },
		    success: function(res) {
		    	cb(res.data)
		    },
		    fail: function() {
		    	console.log('接口错误');
		    }
		})  
  }
})