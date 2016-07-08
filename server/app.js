var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var ejs = require('ejs');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

// 加载路由控制
//var routes = require('./ctrl/index');
var users = require('./ctrl/users');

// 创建项目实例
var app = express();

// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));// 定义日志和输出级别
app.use(bodyParser.json());// 定义数据解析器
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());// 定义cookie解析器
app.use(express.static(path.join(__dirname, 'public')));// 定义静态文件目录

app.use(session({
  resave: false,
  saveUninitialized: true,
  key: 'SSID',
  secret: "SESSION_SECRET_PLEASE_NOT_MODIFY",
  cookie: { maxAge: 5*1000
  } }));

// 匹配路径和路由
//app.use('/', routes);
app.use('/', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
