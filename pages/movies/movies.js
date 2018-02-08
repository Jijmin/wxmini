var app = getApp();
Page({
  data: {},
  onLoad: function(){
    var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters?start=0&count=3';// 正在热映
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon?start=0&count=3';// 即将上映
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250?start=0&count=3';// Top250

    this.getMovieListData(inTheatersUrl);
  },
  getMovieListData: function(url){// 获取电影数据
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res){
        console.log(res);
      },
      fail: function (error) {
        console.log(error)
      }
    })
  }
})