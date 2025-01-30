var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const adminAuth = require('./middlewares/admin-auth');
const userAuth = require('./middlewares/user-auth');
const mathdataRouter = require('./routes/mathdata');
const cors=require('cors');



require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const adminUsersRouter = require('./routes/admin/users');
const adminAuthRouter = require('./routes/admin/auth');
const authRouter = require('./routes/auth');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CORS跨域配置
app.use(cors());
//路由配置
app.use('/',indexRouter);
app.use('/users', userAuth, usersRouter);
app.use('/admin/users',adminAuth, adminUsersRouter);
app.use('/admin/auth', adminAuthRouter);
app.use('/auth', authRouter);
app.use('/mathdata',userAuth,mathdataRouter);
module.exports = app;
