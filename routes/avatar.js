const express = require('express');
const router = express.Router();
const { success, failure } = require('../utils/responses');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { client, config } = require('../utils/aliyun');
const { User } = require('../models');
const user = require('../models/user');




router.get('/', async function (req, res, next) {
    try{
        const userId = req.userId;
        const userRecord = await User.findByPk(userId);
        if (userRecord && userRecord.avatarUrl) {
          const oldAvatarKey = userRecord.avatarUrl.split('/').pop();
          if (oldAvatarKey) {
              try {
                  // 删除阿里云OSS上的旧头像
                  await client.delete(`uploads/${oldAvatarKey}`);
                  console.log('旧头像已删除');
              } catch (deleteError) {
                  console.error('删除旧头像失败:', deleteError);
                  // 删除失败不影响后续操作，继续执行
              }
          }
      }

    // 有效期
    const date = moment().add(5, 'seconds');
    // 自定义上传目录及文件名
    const key = `uploads/${uuidv4()}`;
  
    // 上传安全策略
    const policy = {
      expiration: date.toISOString(),  // 限制有效期
      conditions:
        [
          ['content-length-range', 0, 5 * 1024 * 1024], // 限制上传文件的大小为：5MB
          { bucket: client.options.bucket }, // 限制上传的 bucket
          ['eq', '$key', key], // 限制上传的文件名
          ['in', '$content-type', ['image/jpeg', 'image/png', 'image/gif', 'image/webp']], // 限制文件类型
        ],
    };
  
    // 签名
    const formData = await client.calculatePostSignature(policy);
  
    // bucket 域名（阿里云上传地址）
    const host =
      `https://${config.bucket}.${(await client.getBucketLocation()).location}.aliyuncs.com`.toString();
  
    // 返回参数
    const params = {
      expire: date.format('YYYY-MM-DD HH:mm:ss'),
      policy: formData.policy,
      signature: formData.Signature,
      accessid: formData.OSSAccessKeyId,
      host,
      key,
      url: host + '/' + key,
    };
  
    success(res, '获取阿里云 OSS 授权信息成功。', params);
    } catch (error) {
        failure(res, error);
    }
  });

  //头像上传成功后，将头像地址保存到数据库
  router.put('/', async function (req, res, next) {
    try {
        
        const  newAvatarUrl  = req.body.avatarUrl; // 从请求体中获取新的头像地址
        const userId = req.userId; // 从请求中获取用户 ID
        const userRecord = await User.findByPk(userId); // 从数据库中查询用户记录
        // 如果用户不存在，返回错误信息
        if (!userRecord) {
            throw new Error('用户不存在。');
        }
        if (userRecord.avatarUrl) {
            // 如果用户已有头像，更新头像地址
            await User.update({ avatarUrl: newAvatarUrl }, { where: { id: userId } });
            success(res, '头像更新成功。');
        } else {
            // 如果用户没有头像，添加头像地址
            await User.update({ avatarUrl: newAvatarUrl }, { where: { id: userId } });
            success(res, '头像添加成功。');
        }
    } catch (error) {
        failure(res, error);
    }
});
  module.exports = router;
