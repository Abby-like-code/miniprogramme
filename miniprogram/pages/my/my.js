// // pages/my/my.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad(options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady() {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow() {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide() {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload() {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh() {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom() {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage() {

//   }
// })
// pages/my/my.js
const app = getApp();
Page({ 
  data: { 
  isLogged:false,
  userInfo: {} 
}, 
  onLoad: function() { 
  // 检查用户是否已经授权登录 
   this.checkUserAuth(); 
  }, 
  checkUserAuth: function() { 
    wx.getSetting({ 
      success: res => { if (res.authSetting['scope.userInfo']) { // 用户已授权，直接获取用户信息 
        this.getUserInfo(); 
      } 
    } 
    }); 
  }, 
  getUserInfo: function(e) { 
    if (e && e.detail.userInfo) { 
      // 用户点击了授权按钮 
      this.setData({ 
        isLogged:true,
        userInfo: e.detail.userInfo 
      }); 
      // 将用户信息存储到云数据库 
      this.saveUserInfoToDB(e.detail.userInfo); } else { // 用户未授权
        wx.showToast({ title: '授权失败，请重新授权', icon: 'none' 
      });
    } 
  }, 
  saveUserInfoToDB: function(userInfo) { 
    // 调用云函数保存用户信息 
    wx.cloud.callFunction({ 
      name: 'saveuserinfo', 
      data: { userInfo: userInfo 
      }, 
      success: res => { 
        console.log('保存用户信息成功：', res); 
    }, 
    fail: err => { 
      console.error('保存用户信息失败：', err); } 
    }); 
  }, 
    goToMyPosts: function() { // 跳转到我的发帖页面 
      wx.navigateTo({ url: '/pages/myposts/myposts'
     }); 
    },
    logout: function() { 
      // 清除本地缓存中的用户信息
       wx.removeStorageSync('userInfo'); 
       this.setData({
         isLogged:false, 
         userInfo: {} 
        }); 
       // 调用云函数删除云数据库中的用户信息 
       this.removeUserInfoFromDB();
        // 显示提示信息 
        wx.showToast({ title: '退出登录成功', icon: 'success' }); 
      }, 
      removeUserInfoFromDB: function() { 
          // 调用云函数删除用户信息 
          wx.cloud.callFunction({ 
            name: 'removeUserinfo', 
            success: res => { console.log('删除用户信息成功：', res); },
            fail: err => { console.error('删除用户信息失败：', err); 
          } 
        });
     }
});