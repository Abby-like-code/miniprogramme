const cloud = require('wx-server-sdk')
cloud.init({ env:'cloud1-2gnwdgks8d588eb9' }) // 使用当前云环境
const db = cloud.database(); 
exports.main = async (event, context) => { 
  try { 
  const wxContext = cloud.getWXContext();
  // console.log(event.imageUrls);
  // let fileIDs = []; 
  // for (let i = 0; i < event.imageUrls.length; i++) { 
  //   const uploadResult = await cloud.uploadFile({ 
  //     cloudPath: 'postImages/' + Date.now() + '_' + i + '.png',filePath: event.imageUrls[i] 
  //   }); 
  //   console.log('Upload Result:',uploadResult);
  //   fileIDs.push(uploadResult.fileID); 
  // } 
  const result = await db.collection('posts').add({ 
    data: {
       title: event.title, 
      content: event.content, 
      imageUrls:  event.imageUrls,
      createTime: event.time,
      // new Date(),
       userId: wxContext.OPENID,
      views:0,
    } 
  }); 
  console.log('DB Add Result',result);
  return result; 
} 
  catch (err) { 
    console.error(err); 
    return { errMsg: '保存帖子失败' }; 
  }
};