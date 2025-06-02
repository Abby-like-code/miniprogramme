// // 云函数入口文件
// const cloud = require('wx-server-sdk')

// cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }
const cloud = require('wx-server-sdk'); 
cloud.init({
  env:'cloud1-2gnwdgks8d588eb9'
}); 
const db = cloud.database(); 
exports.main = async (event, context) => { 
  try { 
    const wxContext = cloud.getWXContext(); 
    // 更新或添加用户信息到数据库 
    const result = await db.collection('users').doc(wxContext.OPENID).set({ 
      data: event.userInfo, 
      // 数据库中不存在此用户时，新增记录
      // 如果已存在，则更新记录 
      upsert: true 
    }); 
    return result; 
  } catch (err) { 
    console.error(err); 
    return { errMsg: '保存用户信息失败' 
    }; 
  } 
};