## 函数画图 API

项目使用了 Node.js + Express + MySQL + Sequelize ORM 开发。

项目前端：[https://github.com/FOV-RGT/Function-Graph-Renderer-Demo-Frontend](https://github.com/FOV-RGT/Function-Graph-Renderer-Demo-Frontend)

## 配置环境变量

将`.env.example`文件拷贝为`.env`文件，并修改配置。

```txt
NODE_ENV=development
PORT=5005
JWT_SECRET=JWT秘钥
```

其中`NODE_ENV`为当前项目环境设置,`PORT`配置为服务端口，`JWT_SECRET`配置为秘钥。

## 生成秘钥

在命令行中运行 

```shell
node
```
```shell
const crypto = require('crypto');
console.log(crypto.randomBytes(32).toString('hex'));
```

复制得到的秘钥，并填写到`.env`文件中的`SECRET`配置。

## 配置数据库

项目使用 Docker 容器运行 MySQL 数据库。安装好 Docker 后启动MySQL
将config目录下`config.example`文件拷贝为`config.json`文件，并修改配置。

```json
{
    "development": {
    "username": "您的数据库用户名",
    "password": "您的数据库密码"
  }
}
```

## 安装与运行

```shell
# 安装项目依赖包
npm i

# 创建数据库。如创建失败，可以手动建库。
npx sequelize-cli db:create --charset utf8mb4 --collate utf8mb4_general_ci

# 运行迁移，自动建表。
npx sequelize-cli db:migrate

# 运行种子，填充初始数据。
npx sequelize-cli db:seed:all

# 启动服务
npm start
```

访问地址：[http://localhost:5005](http://localhost:5005)，详情请看接口文档。

## 初始管理员账号

```txt
账号：admin
密码: 123123
```
