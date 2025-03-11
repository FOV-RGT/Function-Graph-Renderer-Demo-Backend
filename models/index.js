'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// 动态加载模型
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // 加载到 db 对象中
  });

// 定义关联关系
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 手动定义 upload 和 mathData 的关联
if (db.upload && db.mathData) {
  db.upload.hasMany(db.mathData, {
    foreignKey: 'uploadId',
    onDelete: 'CASCADE'
  });

  db.mathData.belongsTo(db.upload, {
    foreignKey: 'uploadId'
  });
} else {
  console.error('Upload 或 MathData 模型未正确加载');
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;