var express = require('express');
var bodyParser = require('body-parser');
var AV = require('leanengine');

var common = require('./common');
var signFn = require('./sign/formMsg').formMsg(common).signFn;

// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

var app = express();

// 加载云引擎中间件
app.use(AV.express());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/sign',function(req,res){
  signFn(req.body,res);
});
app.get('/sign',function(req,res){
  signFn(req.query,res);
});


app.use(function(req, res, next) {
  // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
  if (!res.headersSent) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

// error handlers
app.use(function(err, req, res, _next) {
  var statusCode = err.status || 500;
  if (statusCode === 500) {
    console.error(err.stack || err);
  }
  res.status(statusCode);
  res.send({
    message: err.message,
    error: err
  });
});

module.exports = app;
