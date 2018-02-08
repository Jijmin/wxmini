var postsData = require('../../../data/posts-data.js');
var app = getApp();
Page({
  data: {
    currentPostId: null,
    isPlayingMusic: false,
    collected: false
  },
  onLoad: function (option) {
    var postId = option.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });
    // 获取本地缓存中的收藏状态值
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {// 收藏了
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      });
    } else {// 没有收藏
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
    // 控制点击播放之后退出后又回到这个播放页面时播放图标的显示
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      });
    }
    this.setMusicMonitor();
  },
  setMusicMonitor: function () {
    // 点击播放图标和总控开关都会触发这个函数
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (currentPage.data.currentPostId === that.data.currentPostId) {
        // 打开多个post-detail页面之后,每个页面不会关闭,只会隐藏。通过页面栈拿到当前页面的postid,只处理当前页面的音乐播放
        if (app.globalData.g_currentMusicPostId == that.data.currentPostId) {
          that.setData({
            isPlayingMusic: true
          });
        }
      }
      app.globalData.g_isPlayingMusic = true;
    });
    wx.onBackgroundAudioPause(function () {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (currentPage.data.currentPostId == that.data.currentPostId) {
        if (app.globalData.g_currentMusicPostId == that.data.currentPostId) {
          that.setData({
            isPlayingMusic: false
          });
        }
      }
      app.globalData.g_isPlayingMusic = true;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
    });
  },
  onMusicTap: function (event) {// 点击音乐播放器
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {// 暂停音乐
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    } else {// 播放音乐
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      });
      this.setData({
        isPlayingMusic: true
      });
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = currentPostId;
    }
  },
  onColletionTap: function (event) {// 点击收藏图片
    this.getPostsCollectedAsy();
  },
  getPostsCollectedAsy: function (event) {// 收藏
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        // 收藏toggle
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        // 修改缓存数据状态
        that.showToast(postsCollected, postCollected);
      },
    })
  },
  showToast: function (postsCollected, postCollected) {// 修改缓存数据
    // 更新文章的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定变量，从而实现图片的切换
    this.setData({
      collected: postCollected
    });
    // 信息提示
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },
  onShareTap: function (event) {// 分享
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function (res) {
        // res.cancel 用户是不是点击了取消按钮  res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消？' + res.cancel + '现在无法实现分享功能，什么时候能支持呢',
        })
      }
    });
  }
})