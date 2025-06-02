// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env:'cloud1-2gnwdgks8d588eb9' }) // 使用当前云环境
const db = cloud.database();
const MAX_LIMIT = 6; // 每次获取的最大数量

exports.main = async (event, context) => {
  const { lastPostId } = event;
  const wxContext = cloud.getWXContext();

  try {
    let where = {};
    if (lastPostId) {
      where._id = db.command.lt(lastPostId);
    }

    // 获取帖子列表
    const posts = await db.collection('posts')
      .where(where)
      .orderBy('_id', 'desc')
      .limit(MAX_LIMIT)
      .get();

    return {
      data: posts.data,
    };
  } catch (err) {
    console.error(err);
    return {
      errMsg: '获取帖子失败',
    };
  }
};