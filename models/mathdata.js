'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mathData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mathData.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    uploadId: DataTypes.INTEGER,
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
    range: {
      type: DataTypes.STRING, // 数据库中存储为字符串
      allowNull: true,
      defaultValue: null,
      get() {
        const rawValue = this.getDataValue('range'); 
        return rawValue ? rawValue.split(',').map(Number) : null; // 转换为数组
      },
      set(value) {
        if (Array.isArray(value)||value===null) {
          this.setDataValue('range', value ? value.join(',') : null);
        } else {
          throw new Error('range 字段必须是数组类型或null');
        }
      }
    },
  }, {
    sequelize,
    modelName: 'mathData',
  });
  return mathData;
};