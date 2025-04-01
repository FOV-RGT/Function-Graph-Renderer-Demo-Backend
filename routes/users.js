const express = require('express');
const router = express.Router();
const { User,userconfig } = require('../models');
const { success, failure, makeToken } = require('../utils/responses');
const { BadRequestError, NotFoundError } = require("../utils/errors");
const bcrypt = require('bcryptjs');



/**
 * 公共方法：查询当前用户
 */
async function getUser(req, showPassword = false) {
  const id = req.userId;

  let condition = {};
  if (!showPassword) {
    condition = {
      attributes: { exclude: ['password'] },
    };
  }

  const user = await User.findByPk(id, condition);
  if (!user) {
    throw new NotFoundError(`ID: ${ id }的用户未找到。`)
  }

  return user;
}

// 获取用户信息
router.get('/me', async function (req, res) {
  try {
    const user = await getUser(req);
    const imformation = {
      email: user.email,
      username: user.username,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
      signature: user.signature,
    };
    success(res, '获取用户信息成功。', { imformation });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 更新账户信息
 * PUT /users/account
 */
router.put('/account', async function (req, res) {
  try {
    const body = {
      email: req.body.email,
      username: req.body.username,
      currentPassword: req.body.currentPassword,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
      nickname: req.body.nickname,
      signature: req.body.signature,
    };

   
    if(body.password){
      

      if (!body.currentPassword) {
        throw new BadRequestError('当前密码必须填写。');
      }
  
      if (body.password !== body.passwordConfirmation) {
        throw new BadRequestError('两次输入的密码不一致。');
      }
      
      const user = await getUser(req, true);

      //验证密码是否正确
      const isPasswordValid = bcrypt.compareSync(body.currentPassword, user.password);
      
      if (!isPasswordValid) {
        throw new BadRequestError('当前密码不正确。');
      }
    }
    
    const user = await getUser(req);

    await user.update(body);

    // 删除密码
    delete user.dataValues.password;

    await user.reload();
  
    const token = makeToken(user);

    const userinf={
      email: user.email,
      username: user.username,
      nickname: user.nickname,

    }
  
    success(res, '更新账户信息成功。', { userinf,token });
  } catch (error) {
    failure(res, error);
  }
});

//用户配置查询
router.get('/userconfig', async function (req, res) {
  try {
    const condition = {
      attributes:{exclude:['createdAt','updatedAt']},
    };
    const id = req.userId;
    const config = await userconfig.findByPk(id,condition);
    
    success(res, '获取用户配置成功。', { config });
  } catch (error) {
    failure(res, error);
  }
});

//用户配置更新
router.put('/userconfig', async function (req, res) {
  try {
    const id = req.userId;
    const body = req.body;
    const config = await userconfig.findByPk(id);
    if (!config) {
      throw new NotFoundError('用户配置未找到。');
    }
    await config.update(body);
    success(res, '更新用户配置成功。');
  } catch (error) {
    failure(res, error);
  }
});

module.exports = router;
