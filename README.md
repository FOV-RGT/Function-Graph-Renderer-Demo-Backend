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
=======
# <p style="text-align:center;"> FunctionPlotter-demo </p>
<p style="text-align:center;"> <img src="./486.1-done.png" width="100" height="100"> </p>

---
## <p style="text-align:center;"> 注：前端v0.9.0及以上版本，不再依赖后端进行图形解析 </p>
## <p style="text-align:center;"> 前言 </p>
虽说后端就当看个乐子，但不得不说用python进行算式符号的解析非常省事，后续可能会保留算式解析部分，用**Brython**来实现python代码在前端的直接运行，或者寻找方便解析算式的js库。

服务器接收函数时可能会返回500状态码，这是因为本地环境变量配置不到位，可在f12调试页面打开前端发送的get请求网址查看错误情况。

---
## <p style="text-align:center;"> 项目运行 </p>
1.前置条件
- [python](https://www.python.org/downloads/windows/)（电脑要安装python，vscode也要安装python插件。安装完请重启设备）

2.安装依赖
```python
python -m venv env 
env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
