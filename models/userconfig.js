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
      type: DataTypes.STRING,
      defaultValue: null
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