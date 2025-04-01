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



const corsOptions = {
  origin: 'https://hanshu.kz2006.top', // 允许的跨域请求来源
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的 HTTP 方法
  allowedHeaders: ['Content-Type', 'Authorization','token'], // 允许的请求头
  credentials: true, // 允许发送 Cookie
};

app.use(cors(corsOptions));
//路由配置
app.use('/',indexRouter);
app.use('/users', userAuth, usersRouter);
app.use('/admin/users',adminAuth, adminUsersRouter);
app.use('/admin/auth', adminAuthRouter);
app.use('/auth', authRouter);
app.use('/mathdata',userAuth,mathdataRouter);
app.use('/avatar_url',userAuth,avatarRouter);
module.exports = app;
