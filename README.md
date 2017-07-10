# realtime-message-signature-nodejs
-----
### 项目一 ： signProject
这个项目是修改了[LeanCloud 实时通信云引擎签名 Demo](https://github.com/leancloud/realtime-messaging-signature-cloudcode)，其中只实现了 sign2 聊天操作签名，虽然也可以作为登录签名使用，但是初学者很难理解。当然他封装了 cloud.js，但是没有用到。
同时没有解释 app 的配置。

-  使用我的项目是需要进行配置，配置文件为 /sign/appSetting.js
 [获取配置位置](https://tab.leancloud.cn/app.html?appid=#/key)
```javascript
global.appSetting = {
    'LEANCLOUD_APP_ID' : "****",
    'LEANCLOUD_APP_KEY' : "****",
    'LEANCLOUD_APP_MASTER_KEY' : "****"
};
```
- 如果需要配置其他的签名，可以配置在 /sign/fieldsSetting.js
```javascript
//配置方法
'配置名称' : [{
        name_ : '',
        method_ : 'before',
        type_ : 'string'
    },{
        name_ : 'client_id',
        method_ : 'after',
        type_ : 'string'
    }],
```
字段名称|解释
--|--
name_|表示对应表单中的字段，为空时表示一个空串
method_|只能是 before 和 after，表示直接加入还是加入到尾部，操作聊天时用到
type_|表示类型，只能是 string 和 array
> 其中member应该是 array 但是在传过来前我已经进行转换，变成了 string

----
### 项目二 ： realtimeProject

需要将 /view/index.hbs 中的第 25 行的 APPID 填上才可使用。

----
### 启动项目
两个项目启动方法分别为
```nodejs
//项目一 ： signProject
npm init
node server.js
```
```nodejs
//项目二 ： realtimeProject
npm init
node chat.js
```

----
### 项目三 ： rest api
这个项目主要负责两件事，提供脚本服务和rest api 服务
```html
<!-- 实时通信所需脚本 -->
<script src = "domain:prot/av.js"></script>
<script src = "domain:prot/typed-messages.js"></script>
<script src = "domain:prot/typed-messages.js"></script>
```

另外，rest API 服务，我写了一个创建房间的例子
```javascript
var cmdStr = 'curl -X POST ' +
    '-H "X-LC-Id: appID appID appID appID" ' +
    '-H "X-LC-Key: appKey appKey appKey" ' +
    '-H "Content-Type: application/json" ' +
    '-d \'' + JSON.stringify({name : "房间名称",m : ["参与者们"]}) + '\' ' +
    'https:\/\/tab.leancloud.cn\/1.1\/classes\/_Conversation';
exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('something error :'+stderr);
    } else {
        var data = JSON.parse(stdout);
        console.log(data);
    }
});
```

----
### 其他：signInHTML
这里的脚本建议是启动 项目三 来进行配合，这里引用脚本的顺序为
```javascript
<script src = "domain:prot/av.js"></script>
<script src = "domain:prot/typed-messages.js"></script>
<script src = "domain:prot/typed-messages.js"></script>
<script src = "jquery.js"></script>
<script src = "messageTip.js"></script>
<script src = "Account.js"></script>
<script src = "Conv.js"></script>
<script src = "realtimeMessage.js"></script>
```

下面给一个实例
```javascript
function loginAndInRoom() {
	//realtimeObj 定义于 Account.js 文件中统一管理
	realtimeObj.account =
            Account(realtimeObj.realtime,defaultMessageTip,{who : 'who' + parseInt(Math.random() * 1000)})
                .setOnMessage(function(message, conversation) {
                    //这里需要修改
		    //这里是收到信息后对信息处理的方法
                    console.log(message);
                }).login(function(){
                    window.onunload = function() {
                        realtimeObj.account.tom.close();
                    };
                    realtimeObj.conversationObj =
                        ConvOP(realtimeObj.account)
			     //以下代码为进入指定 ID 的房间，其他做法请修改 Conv.js 文件进行扩展
                             .addConv("roomID"/*5958b5ea7a1ff9003262097f*/,function () {
                                 realtimeObj.messageDear =
                                     messageObject(AV,realtimeObj.conversationObj);
                                //这部分为回调，可以继续编写逻辑模块
                             });
                });
}

//假定以上代码执行完成后
//发送给文本消息
realtimeObj.messageDear.send({type:'Text',text : (new Date).toString()});
//发送本地图片
var getPhoto = document.getElementById("fileInpnt");
realtimeObj
    .messageDear
    .send(
        {
            type:'Image',
            text : '尝试发一张图片',
            subscript : '描述一下咯',
            url : getPhoto.files[0],
            attr : {
                'attr1' : 'first',
                'attr2' : 'second'
            }
        }
    );
```
