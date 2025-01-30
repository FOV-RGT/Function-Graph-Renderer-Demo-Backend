const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { success, failure } = require('../utils/responses');
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

//修改账户信息
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
      passwordConfirmation: req.body.passwordConfirmation
    };

    if (!body.currentPassword) {
      throw new BadRequestError('当前密码必须填写。');
    }

    if (body.password !== body.passwordConfirmation) {
      throw new BadRequestError('两次输入的密码不一致。');
    }

    // 加上 true 参数，可以查询到加密后的密码
    const user = await getUser(req, true);

    // 验证当前密码是否正确
    const isPasswordValid = bcrypt.compareSync(body.currentPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError('当前密码不正确。');
    }

    await user.update(body);

    // 删除密码
    delete user.dataValues.password;

    await user.reload();
  
    const token = makeToken(user);
    localStorage.setItem('token', token);
    success(res, '更新账户信息成功。', { user,token });
  } catch (error) {
    failure(res, error);
  }
});


module.exports = router;
