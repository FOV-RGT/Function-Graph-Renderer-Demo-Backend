'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class change extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  change.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    dimension:{
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: '维度必须填写。' },
        notEmpty: { msg: '维度不能为空。' },
        isIn:{
          args: [['2', '3']],
          msg: '维度必须是2、3中的一个。'
        }
      }
    },
    fn: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '函数必须填写。' },
        notEmpty: { msg: '函数不能为空。' }
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '颜色必须填写。' },
        notEmpty: { msg: '颜色不能为空。' }
      }
    },
    nSamples: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: { msg: '样本数必须填写。' },
        notEmpty: { msg: '样本数不能为空。' }
      }
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: '是否可见必须填写。' },
        notEmpty: { msg: '是否可见不能为空。' }
      }
    },
    graphType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '图形类型必须填写。' },
        notEmpty: { msg: '图形类型不能为空。' }
      }
    },
    closed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'closed必须填写。' },
        notEmpty: { msg: 'closed不能为空。' }
      }
    },
  }, {
    sequelize,
    modelName: 'change',
  });
  return change;
};