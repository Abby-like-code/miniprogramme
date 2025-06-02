// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env:'cloud1-2gnwdgks8d588eb9'}) // 使用当前云环境
const db = cloud.database(); exports.main = async (event, context) => { const wxContext = cloud.getWXContext(); try { 
  // 查询用户的帖子 
  const res = await db.collection('posts') .where({ userId: wxContext.OPENID }) .get(); 
  return { data: res.data }; 
} catch (err) { console.error(err); return { errMsg: '获取用户帖子失败' }; } 
};