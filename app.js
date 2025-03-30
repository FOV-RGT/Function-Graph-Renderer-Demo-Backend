var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors');
require('dotenv').config();
var app = express();

const adminAuth = require('./middlewares/admin-auth');
const userAuth = require('./middlewares/user-auth');
const mathdataRouter = require('./routes/mathdata');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const avatarRouter = require('./routes/avatar');
//CORS跨域配置
const allowedOrigins = ['https://hanshu.kz2006.top']; // 允许的域名

const adminUsersRouter = require('./routes/admin/users');
const adminAuthRouter = require('./routes/admin/auth');
const authRouter = require('./routes/auth');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.options('*', (req, res) => {
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true'); // 如果需要 Cookie
    }
    
    res.sendStatus(204); // 返回 204 No Content
  });
//路由配置
app.use('/',indexRouter);
app.use('/users', userAuth, usersRouter);
app.use('/admin/users',adminAuth, adminUsersRouter);
app.use('/admin/auth', adminAuthRouter);
app.use('/auth', authRouter);
app.use('/mathdata',userAuth,mathdataRouter);
app.use('/avatar_url',userAuth,avatarRouter);
module.exports = app;
