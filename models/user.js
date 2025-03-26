'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.userconfig, {
        foreignKey: 'userId',
        as: 'config', // 别名
        onDelete: 'CASCADE'
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '邮箱必须填写。' },
        notEmpty: { msg: '邮箱不能为空。' },
        isEmail: { msg: '邮箱格式不正确。' },
        async isUnique(value) {
          const user = await User.findOne({ where: { email: value } })
          if (user) {
            throw new Error('邮箱已存在，请直接登录。');
          }
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '用户名必须填写。' },
        notEmpty: { msg: '用户名不能为空。' },
        len: { args: [2, 45], msg: '用户名长度必须是2 ~ 45之间。' },
        async isUnique(value) {
          const user = await User.findOne({ where: { username: value } })
          if (user) {
            throw new Error('用户名已经存在。');
          }
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if (!value) {
          throw new Error('密码必须填写。');
        }
        if (value.length < 6 || value.length > 45) {
          throw new Error('密码长度必须是6 ~ 45之间。');
        }
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '昵称必须填写。' },
        notEmpty: { msg: '昵称不能为空。' },
        len: { args: [2, 45], msg: '昵称长度必须是2 ~ 45之间。' }
      }
    },
    role: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        isIn: { args: [[0, 100]], msg: '用户组的值必须是，普通用户：0 管理员：100。' }
      }
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        isUrl: { msg: '头像地址格式不正确。' }
      }
    }
  
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      // 创建用户后，自动创建用户配置
      afterCreate: async (user, options) => {
        const { userconfig } = sequelize.models;
    
        try {
          // 创建用户配置
          await userconfig.create({
            userId: user.id,
            chartType: 'linear',
            closed: false,
            range: null,
            dash: false,
            grid: true,
            zoomFactor: 0.5,
            moveFactor: 0.2,
            globalSamples: 2025
          }, { transaction: options.transaction }); // 使用与用户创建相同的事务
        } catch (error) {
          // 如果创建用户配置失败，抛出错误，事务会回滚
          throw new Error(`创建用户配置失败: ${error.message}`);
        }
      }
    }
  });
  return User;
};