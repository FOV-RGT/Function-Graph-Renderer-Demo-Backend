const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const { Op } = require('sequelize');
const { BadRequestError, UnauthorizedError, NotFoundError } = require('../../utils/errors');
const { success, failure } = require('../../utils/responses');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * 管理员登录
 * POST /admin/auth/sign_in
 */
router.post('/sign_in', async (req, res) => {
    try {
        const { login, password } = req.body;
        if (!login) {
            throw new BadRequestError('登录名必须填写。');
        }

        if (!password) {
            throw new BadRequestError('密码必须填写。');
        }
        //查询用户
        const condition = {
            where: {
                [Op.or]: [
                    { email: login },
                    { username: login }
                ]
            }
        };
        const user = await User.findOne(condition);
        if (!user) {
            throw new UnauthorizedError('用户不存在。');
        }
        //验证密码
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError('密码错误。');
        }
        //验证是否是管理员
        if (user.role !== 100) {
            throw new UnauthorizedError('用户没有权限登录管理后台。');
        }
        //生成token
        const token = jwt.sign({
            userId: user.id
        }, process.env.JWT_SECRET, { expiresIn: '1d' }
        );

        success(res, '登录成功。', { token });
    } catch (error) {
        failure(res, error);
    }
});

module.exports = router;
