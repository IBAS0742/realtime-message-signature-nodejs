/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var request = require('request');
var reqs = require('superagent');

var app = express();
var server = require('http').Server(app);
var exec = require('child_process').exec;

/* app 配置 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/leancloud-storage/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/leancloud-realtime/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/leancloud-realtime-plugin-typed-messages/dist')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

router.get('/createRoom',function (req,res) {
  createRoom(req.query);
  res.json({success : true});
});
router.post('/createRoom',function (req,res) {
  createRoom(req.body);
  res.json({success : true});
});
var createRoom = function (roomObj) {
    if (roomObj instanceof Object) {
        if (('title' in roomObj) && ('roomID' in roomObj) && ('who' in roomObj)) {
            var cmdStr = 'curl -X POST ' +
                '-H "X-LC-Id: appid appid appid appid" ' +
                '-H "X-LC-Key: appkey appkey appkey appkey" ' +
                '-H "Content-Type: application/json" ' +
                '-d \'' + JSON.stringify({name : roomObj.title,m : [roomObj.who]}) + '\' ' +
                'https:\/\/tab.leancloud.cn\/1.1\/classes\/_Conversation';
				//这里可能是其他节点，例如（主节点/美国节点）
				//https:\/\/api.leancloud.cn\/1.1\/classes\/_Conversation
            exec(cmdStr, function(err,stdout,stderr){
                if(err) {
                    console.log('something error:'+stderr);
                } else {
                    var data = JSON.parse(stdout);
                    console.log(data);
                }
            });
        } else {
        console.log((new Date()) + " 错误创建房间，相关属性缺失。");
        return ;
    }
    } else {
        console.log((new Date()) + " 错误创建房间");
    }
};

// Routes
router.get('/',function(req,res){
  //遣返
  res.render('error');
});

router.get('*',function(req,res) {
  res.render('error');
});
router.post('*',function(req,res) {
  res.render('error');
});

app.use('/', router);

server.listen(3008, function() {
  console.log("port : 3008");
});
