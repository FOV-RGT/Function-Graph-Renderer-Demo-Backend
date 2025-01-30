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
    userId: DataTypes.INTEGER.UNSIGNED,
    dimension:{
      type: DataTypes.STRING,
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
    functionValue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mathData',
  });
  return mathData;
};