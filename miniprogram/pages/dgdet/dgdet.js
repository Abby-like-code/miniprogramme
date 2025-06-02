const db = wx.cloud.database();

Page({
  data: {
    clothesDetail: {},
  },
  onLoad: function (options) {
    const id = options.id;
    this.getClothesDetail(id);
  },
  getClothesDetail: function (id) {
    db.collection('dg').doc(id).get({
      success: res => {
        this.setData({ 
          clothesDetail: res.data
        });
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err);
      }
    });
  }
});