const db = wx.cloud.database();

Page({
  data: {
    clothesList: [],
  },
  onLoad: function () {
    this.getClothesList();
  },
  getClothesList: function () {
    db.collection('ancientClothes').get({
      success:res=>{
        console.log(res.data)
        this.setData({
          clothesList: res.data
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
      url: '/pages/clothesDetail/clothesDetail?id=' + id,
    });
  }
});