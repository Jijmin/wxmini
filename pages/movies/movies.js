var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {},
  onLoad: function(){
    var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters?start=0&count=3';// 正在热映
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon?start=0&count=3';// 即将上映
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250?start=0&count=3';// Top250

    this.getMovieListData(inTheatersUrl, 'inTheatersc', '正在热映');
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },
  onMovieTap: function(event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: './movie-detail/movie-detail?id=' + movieId
    })
  },
  onMoreTap: function(event){// 点击更多
    // 获取到列表组件传递回来的data-category
    var category = event.currentTarget.dataset.category;
    // 有返回的跳转
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },
  getMovieListData: function (url, settedKey, categoryTitle){// 获取电影数据
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res){
        that.processDoubanData(res.data, settedKey, categoryTitle);
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },
  processDoubanData: function (moviesDouban, settedKey, categoryTitle){
    var movies = [];
    for (var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length >= 6){// 对标题长度限制
        title = title.substring(0, 6) + '...';
      }
      // 页面展示数据进行筛选以及处理
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      };
      movies.push(temp);
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(readyData);
  }
})