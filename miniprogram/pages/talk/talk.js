const db = wx.cloud.database(); 
import common from "../../util/common"

Page({ data: { 
  posts: [],
 }, 
 onLoad: function () { 
   this.getPosts(); 
  }, 
  getPosts: function () { 
    db.collection('posts').orderBy('createTime', 'asc')
    .get({ 
      success: async (res) => { 
        const posts = res.data; 
        for (let post of posts) { 
          const userRes = await db.collection('users')
          .doc(post.userId)
          .get(); 
          post.avatar = userRes.data.avatarUrl; 
          post.author = userRes.data.nickName;
          post.createTime=common.getTime(post.createTime,2)
         } 
         this.setData({ 
           posts: posts
          });
        }, 
        fail: err => { 
        console.error('[数据库] [查询记录] 失败：', err); 
      } 
    }); 
  }, 
  viewPostDetail: function (event) { 
    const postId = event.currentTarget.dataset.postid; 
    wx.navigateTo({ 
      url: '/pages/postDetail/postDetail?id=' + postId, 
    }); 
  } 
});