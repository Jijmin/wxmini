import { Movie } from './Movie.js'
var app = getApp();
Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    var movie = new Movie(url);
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      });
    });
  },
  viewMoviePostImg: function (event) {// 查看图片
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
  onShareAppMessage: function () {// 用户点击右上角分享
    console.log(11111);
  }
})