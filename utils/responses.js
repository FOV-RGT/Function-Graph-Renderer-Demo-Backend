const jwt = require('jsonwebtoken');
const { sequelize,User } = require('../models');
/**
 * 请求成功
 * @param res
 * @param message
 * @param data
 * @param code
 */
function success(res, message, data = {}, code = 200) {
    res.status(code).json({
        status: true,
        message,
        data
    });
}

/**
 * 请求失败
 * @param res
 * @param error
 */
function failure(res, error) {
    if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map(e => e.message);
        return res.status(400).json({
            status: false,
            message: '请求参数错误',
            errors
        });
    }

    if (error.name === 'BadRequestError') {
        return res.status(400).json({
            status: false,
            message: '请求参数错误',
            errors: [error.message]
        });
    }

    if (error.name === 'UnauthorizedError') {
        return res.status(401).json({
            status: false,
            message: '认证失败',
            errors: [error.message]
        });
    }

    if (error.name === 'NotFoundError') {
        return res.status(404).json({
            status: false,
            message: '资源不存在',
            errors: [error.message]
        });
    }

    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: false,
            message: '认证失败',
            errors: ['您提交的 token 错误。']
        });
    }

    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
            status: false,
            message: '认证失败',
            errors: ['您的 token 已过期。']
        });
    }

    res.status(500).json({
        status: false,
        message: '服务器错误',
        errors: [error.message]
    });

}

function makeToken(user) {

    return jwt.sign({
        userId: user.id,
    }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

async function createUserWithConfig(userData) {
    const transaction = await sequelize.transaction(); // 开启事务
  
    try {
      // 创建用户
      const user = await User.create(userData, { transaction });
  
      // 提交事务
      await transaction.commit();
  
      return user;
    } catch (error) {
      // 如果发生错误，回滚事务
      await transaction.rollback();
      throw new Error(`用户创建失败: ${error.message}`);
    }
  }

module.exports = {
    success,
    failure,
    makeToken,
    createUserWithConfig
}
