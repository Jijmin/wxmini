var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    movies: {},
    navigateTitle: '',
    requestUrl: '',
    totalCount: 0,
    isEmpty: true
  },
  onLoad: function (options){
    var category = options.category;
    this.setData({
      navigateTitle: category
    });
    var dataUrl = "";
    switch (category){
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    // 设置特定的头部
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    });
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);
  },
  onScrollLower: function (event){// 滚动到底部加载新数据
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading()
  },
  processDoubanData: function (moviesDouban){// 电影数据格式的处理
    var movies = [];
    for (var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6){
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    var totalMovies = {};
    // 如果要绑定新加载的数据，那么需要同旧有的数据合并到一起
    if (!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
})