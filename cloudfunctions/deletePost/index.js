// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env:'cloud1-2gnwdgks8d588eb9'  }) // 使用当前云环境
const db = cloud.database(); exports.main = async (event, context) => { const { postId } = event; const wxContext = cloud.getWXContext(); try { 
  // 删除帖子 
  const res = await db.collection('posts') .doc(postId) .remove(); 
  return res; 
} catch (err) { console.error(err); return { errMsg: '删除帖子失败' }; } 
};