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
字段名称|同时没有解释
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
