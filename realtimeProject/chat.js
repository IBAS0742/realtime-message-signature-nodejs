/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();

var app = express();
var server = require('http').Server(app);
var AV = require('leancloud-storage');
var Realtime = require('leancloud-realtime').Realtime;
var request = require('request');

/* app 配置 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/leancloud-realtime/dist')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Routes
router.get('/',function(req,res){
  //遣返
  //var APP_ID = 'FVm5C4C23k515b9Htq6CllP8-9Nh9j0Va';
  //var APP_KEY = 'dum7cy7v5J9JXlfPFpgGaXLj';
  //AV.init({
  //  appId: APP_ID,
  //  appKey: APP_KEY
  //});

  //var TestObject = AV.Object.extend('testClass');
  //var testObject = new TestObject();
  //testObject.save({
  //  words: 'Hello World!'
  //}).then(function(object) {
  //  console.log('LeanCloud Rocks!');
  //});
  res.render('index');
});

router.post('/sign',function(req,res){
  getSign(req.body,res);
});
router.get('/sign',function(req,res){
  getSign(req.query,res);
});

function getSign(form,res){
    form.members = form.members || [];
  request.post({
        url:'http://localhost:3000/sign',
        form: {
            client_id : form.client_id,
            conv_id : form.conv_id,
            members : form.members.sort().join(':'),
            action : form.action,
            type_ : form.type_
        },
      },
      function(err,httpResponse,body){
        console.log(body);
        res.json(
            JSON.parse(body)
        );
      });
};

router.post('/tet',function(req,res) {
    console.log(req);
});

router.get('*',function(req,res) {
  res.render('error');
});

app.use('/', router);

server.listen(3008, function() {
  console.log("port : 3008");
});
