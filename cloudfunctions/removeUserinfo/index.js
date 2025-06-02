// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env:'cloud1-2gnwdgks8d588eb9' }) // 使用当前云环境

const db = cloud.database(); 
exports.main = async (event, context) => { 
  try { 
    const wxContext = cloud.getWXContext(); 
    // 删除数据库中的用户信息 
    const result = await db.collection('users').doc(wxContext.OPENID).remove(); 
    return result; 
  } catch (err) { 
    console.error(err); 
    return { 
      errMsg: '删除用户信息失败' 
    };
  }
};