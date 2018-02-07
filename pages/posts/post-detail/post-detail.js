var postsData = require('../../../data/posts-data.js');
Page({
  data: {

  },
  onLoad: function(option){
    var postId = option.id;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    })
  }
})