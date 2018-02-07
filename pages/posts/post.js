var postsData = require('../../data/posts-data.js');
Page({
  data: {
    postList: [],
    imgUrls: [{// banner数据
      url: '/images/wx.png',
      postId: 3
    }, {
      url: '/images/vr.png',
      postId: 4
    }, {
      url: '/images/iqiyi.png',
      postId: 5
    }],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    vertical: false
  },
  onLoad: function () {
    this.setData({
      postList: postsData.postList
    });
  },
  onPostTap: function (event) { 
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    });
  },
  /* banner图点击事件 */
  onSwiperTap: function (event) {
    // target：指的是当前点击组件，currentTarget：指的是事件捕获的组件
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    });
  }
})