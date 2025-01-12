const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { UnauthorizedError } = require('../utils/errors');
const { success, failure } = require('../utils/responses');

module.exports = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            throw new UnauthorizedError('此地址需要管理员才能访问');
        }
        // 验证 token 是否正确
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 从 jwt 中，解析出之前存入的 userId
        const { userId } = decoded;

        const user = await User.findByPk(userId);

        //验证用户是否存在
        if (!user) {
            throw new UnauthorizedError('用户不存在。');
        }

        //验证是否是管理员
        if (user.role !== 100) {
            throw new UnauthorizedError('用户没有权限登录管理后台。');
        }
        //将用户信息挂载到req上
        req.userId = userId;

        next();
    } catch (error) {
        failure(res, error);
    }
};
