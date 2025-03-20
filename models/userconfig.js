'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userconfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
        // userconfig 属于 User（一对一关联）
        userconfig.belongsTo(models.User, {
          foreignKey: 'id',
          as: 'user' // 别名
        });
    }
  }
  userconfig.init({
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    chartType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'linear'
    },
    closed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    range: {
      type: DataTypes.STRING, // 数据库中存储为字符串
      allowNull: true,
      defaultValue: null,
      get() {
        const rawValue = this.getDataValue('range'); 
        return rawValue ? rawValue.split(',').map(Number) : null; // 转换为数组
      },
      set(value) {
        if (Array.isArray(value)) {
          this.setDataValue('range', value.join(',')); // 将数组转换为字符串存储
        } else {
          throw new Error('range 字段必须是数组类型');
        }
      }
    },
    dash: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    grid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    zoomFactor: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.5
    },
    moveFactor: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.2
    }
    
  }, {
    sequelize,
    modelName: 'userconfig',
  });
  return userconfig;
};