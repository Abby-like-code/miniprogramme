const app = getApp(); 
Page({ 
  data: { posts: [] }, 
  onLoad: function () { 
    // 加载用户的帖子 
    this.loadUserPosts(); 
  }, 
  loadUserPosts: function () { 
    // 调用云函数获取用户的帖子 
    wx.cloud.callFunction({ 
      name: 'getUserPosts', 
      success: res => { 
        console.log('获取用户帖子成功：', res); 
        this.setData({ posts: res.result.data }); 
      }, 
      fail: err => { console.error('获取用户帖子失败：', err); } 
    }); 
  },
  deletePost: function (e) { 
    const postId = e.currentTarget.dataset.postid; 
    // 弹出确认窗口 
    wx.showModal({ title: '确认删除', content: '确定要删除这篇心得吗？', success: res => { if (res.confirm) { 
      // 用户点击确定 
      this.confirmDelete(postId); 
    }
  } 
}); 
}, 
confirmDelete: function (postId) { 
  // 调用云函数删除帖子 
  wx.cloud.callFunction({ 
    name: 'deletePost', 
    data: { postId: postId }, 
    success: res => { console.log('删除帖子成功：', res); 
    // 刷新帖子列表 
    this.loadUserPosts(); 
  }, 
  fail: err => { console.error('删除帖子失败：', err); } 
}); 
},
goToPostPage: function () { 
  // 跳转到发帖页面 
  wx.navigateTo({ 
    url: '/pages/ft/ft' 
  }); 
}
});