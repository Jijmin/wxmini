Page({
  data: {
    nickName:'Jijmin',
    avatarUrl: '/images/avatar/1.png'
  },
  onTap: function(event){
    wx.switchTab({
      url: '../posts/post',
    });
  },
  onLoad: function(){
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        var nickName = userInfo.nickName;
        var avatarUrl = userInfo.avatarUrl;
        that.setData({
          nickName: nickName,
          avatarUrl: avatarUrl
        });
      }
    })
  }
})