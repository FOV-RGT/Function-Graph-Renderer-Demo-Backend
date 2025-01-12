const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { UnauthorizedError } = require('../utils/errors');
const { success, failure } = require('../utils/responses');

module.exports = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            throw new UnauthorizedError('请先登录');
        }
        // 验证 token 是否正确
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 从 jwt 中，解析出之前存入的 userId
        const  userId  = decoded.userId;
        
        const user = await User.findByPk(userId);
        
        //将用户信息挂载到req上
        req.userId = userId;

        next();
    } catch (error) {
        failure(res, error);
    }
};
