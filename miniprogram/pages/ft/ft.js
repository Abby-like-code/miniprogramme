const app = getApp(); 
var index = 0;
Page({ 
  data: { 
    title: '', 
    content: '', 
    imageUrls: [] ,
    time:'',
  }, 
  handleTitleInput(e) { 
    this.setData({ title: e.detail.value }); 
  }, 
  handleContentInput(e) { 
    this.setData({ 
      content: e.detail.value 
    }); 
  },
chooseImage() {
   wx.chooseMedia({ 
    count: 9 ,
    mediaType: ['image'], 
    sourceType: ['album', 'camera'], 
  success: (res) => { 
    const tempFiles = res.tempFiles;
    const tempFilePaths = tempFiles.map(file => file.tempFilePath); 
    // this.setData({ 
    //   imageUrls:this.data.imageUrls.concat(tempFilePaths)
    //  }); 
    let time = Date.now()
    for(var i = 0;i<tempFilePaths.length;i++){
       wx.cloud.uploadFile({ 
        cloudPath: 'postImages/' + time+ '_' + i,
        filePath: tempFilePaths[i] 
      })
      .then(res=>{
        console.log(res);
        this.setData({
          imageUrls:this.data.imageUrls.concat(res.fileID)
        })
        
      })
      // console.log('Upload Result:',uploadResult);
      // fileIDs.push(uploadResult.fileID); 
    }

  }
})
},
publishPost() { 
  if (!this.data.title || !this.data.content ) { 
    wx.showToast({ 
      title: '请填写完整的帖子信息', 
      icon: 'none' 
    }); 
      return;
    } 
  var fileID = [];
  var timetime = Date.now();
   console.log(timetime);
  // var data = newDate.toLocaleString()
  this.setData({ 
    time:timetime
  })
  wx.cloud.callFunction({ 
        name: 'addPost', 
        data: {  
          title: this.data.title, 
          content: this.data.content, 
          imageUrls: this.data.imageUrls ,
          time:this.data.time
        },
        success: (res) => { 
          // for (index = 0; index< imageUrls.length; index++) { 
          //   const uploadResult =
          //    wx.cloud.uploadFile({ 
          //     cloudPath: 'postImages/' + Date.now() + '_' + index + '.png',
          //     filePath: imageUrls[index] 
          //   }); 
          //   console.log('Upload Result:',uploadResult);
          //   fileIDs.push(uploadResult.fileID); 
          // } 
            console.log('发布帖子成功：', res); wx.showToast({ title: '发布成功', icon: 'success' }); 
            this.setData({ title: '', content: '', imageUrls: []
          });
  }, 
  fail: (err) => { 
    console.error('发布帖子失败：', err); 
    wx.showToast({ 
      title: '发布失败，请稍后重试',
      icon: 'none' 
    }); 
  } 
})
}})