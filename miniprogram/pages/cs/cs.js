const db = wx.cloud.database();

Page({
  data: {
    dgList: [],
  },
  onLoad: function () {
    this.getdgList();
  },
  getdgList: function () {
    db.collection('cs').get({
      success:res=>{
        console.log(res.data)
        this.setData({
          dgList: res.data
        });
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err);
      }
    });
  },
  viewDetail: function (event) {
    const id = event.target.id;
    // 跳转到详情页面，传递服饰的ID
    wx.navigateTo({
      url: '/pages/csdet/csdet?id=' + id,
    });
  }
});