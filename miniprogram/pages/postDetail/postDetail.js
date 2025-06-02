const db = wx.cloud.database();
const app = getApp();
var postId=0;
import common from "../../util/common";

Page({
  data: {
    post: {},
    comments: [],
    commentContent: '',
    
  },
  onLoad: function (options) {
    postId = options.id;
    this.getPostDetail(postId);
    this.getComments(postId);
    
  },
  getPostDetail: async function (postId) {
    try {
      // await db.collection('posts').doc(postId).update({
      //   data:{
      //     views:_.inc(1)
      //   }
      // });
      const post = await db.collection('posts').doc(postId).get();
      // console.log(post.data);
      const userRes = await db.collection('users').doc(post.data.userId).get();
      post.data.avatar = userRes.data.avatarUrl;
      post.data.author = userRes.data.nickName;
      post.data.createTime=common.getTime(post.data.createTime,3);
      
     
      this.setData({
        post: post.data
      });
    } catch (err) {
      console.error('获取帖子详情失败：', err);
    }
  },
  getComments: async function (postId) {
    try {
      const comments =await db.collection('comments').where({
        postId: postId
      }).get();//.orderBy('createTime', 'desc')
      const dt =comments.data;
      // for (let comment of dt) { 
      //           const userRes = await db.collection('users')
      //           .doc(comment._openid)
      //           .get(); 
      //           comment.avatar = userRes.data.avatarUrl; 
      //           comment.author = userRes.data.nickName;
      //           comment.createTime=common.getTime(comment.createTime,2)
      //          } 
     
      this.setData({
        comments: dt
      });
    } catch (err) {
      console.error('获取评论失败：', err);
    }
  },
  // getComments: async function (postId) {
  //   db.collection('comments').where({
  //     postId: postId})
  //   .get({ 
  //     success: async (res) => { 
  //       const comments = res.data; 
  //       for (let comment of comments) { 
  //         const userRes = await db.collection('users')
  //         .doc(comment._openid)
  //         .get(); 
  //         comment.avatar = userRes.data.avatarUrl; 
  //         comment.author = userRes.data.nickName;
  //         comment.createTime=common.getTime(comment.createTime,2)
  //        } 
  //        this.setData({ 
  //          comments: comments
  //         });
  //       }, 
  //       fail: err => { 
  //       console.error('获取评论失败：', err); 
  //     } 
  //   }); 
  //   },
  // onCommentInput: function (event) {
  //   this.setData({
  //     commentContent: event.detail.value
  //   });
  // },
  onCommentInput(e) { 
    this.setData({ commentContent: e.detail.value}); 
  }, 
  addComment: async function () {
    // console.log(res);
    // if (!wx.getStorageSync('openid')) {
    //   // 未授权登录，提示用户登录
    //   wx.showToast({
    //     title: '请先登录',
    //     icon: 'none'
    //   });
    //   return;
    // }
    
    wx.getStorageSync('openid') ;
    // const userRes = await db.collection('users')
    //       .doc(_openid)
    //       .get(); 
    //       avatarUrl = userRes.data.avatarUrl; 
    //       author = userRes.data.nickName;
    // app.globalData.userInfo
    try {
      await db.collection('comments').add({
        data: {
          postId: postId,
          // avatarUrl: avatarUrl,
          // nickName: nickName,
          commentContent: this.data.commentContent,
          createTime: new Date()
        }
      });
      this.setData({
        commentContent: ''
      });
      this.getComments(postId); // 刷新评论列表
    } catch (err) {
      console.error('添加评论失败：', err);
      wx.showToast({
        title: '添加评论失败',
        icon: 'none'
      });
    }
  }
});