/**
 * Created by Administrator on 2017/6/28.
 */

//使用该脚本前应该引入脚本 messageTip.js

//建议格式
// userInfo = {
//     who : '',    //用户身份 id或者其他能作为唯一标志的东西
//     detail : {}  //其他信息，可以在自己扩展中使用到
//     tom : 登陆后的用户身份信息
// };

/**
 * messageTip : {
 *  user : {    //用户逻辑层面上的信息
 *      error : fn,
 *      warn : fn,
 *      info : fn
 *  },
 *  system : {  //系统逻辑层面上的信息
 *      error : fn,
 *      warn : fn,
 *      info : fn
 *  }
 * }
 * */

/**
 * 【Tip】 该对象为单例
 * realtime : 腾讯tab提供的实时聊天对象
 * messageTip ; 消息提示对象，包含各种情况下的信息输出，上面讲解
 * userInfo : 用户信息类，上面定义
 * */
var realtimeObj = {
    Realtime : null,
    realtime : null,
    conversationObj : null,
    account : null,
    messageDear : null,
};

~function () {
    AV.init({
        appId: 'appId: appId: appId: appId: ',
        appKey : 'appKey appKey appKey appKey',
    });
    // 初始化实时通讯 SDK
    realtimeObj.Realtime = AV.Realtime;
    realtimeObj.realtime = new realtimeObj.Realtime({
        appId: 'appId: appId: appId: appId: ',
        pushOfflineMessages: true,
        plugins: [AV.TypedMessagesPlugin], // 注册富媒体消息插件
    });
}();

var Account = (function (realtime,messageTip,userInfo) {
    var signUrl = "domain:prot/sign";
    if (!realtime) {
        console.error("realtime 对象不存在!");
        return {};
    };
    if (!messageTip) {
        messageTip = {
            user : {},
            system : {}
        }
    };
    if (messageTip) {
        for (var i in defaultMessageTip.user) {
            if (i in messageTip.user) {} else {
                messageTip.user[i] = defaultMessageTip.user[i];
            }
        }
        for (var i in defaultMessageTip.system) {
            if (i in messageTip.system) {} else {
                messageTip.system[i] = defaultMessageTip.system[i];
            }
        }
    };
    function signatureFactory(client_id) {
        return $.ajax({
            url : signUrl,
            data : {
                client_id : client_id,
                type_ : 'connect'
            },
            success : function(msg) {
                sign_login = msg;
                return msg;
            }
        });
    };
    function conversationSignatureFactory(conversationId, clientId, targetIds, action) {
        var type_;
        if (action == 'join' || action == 'add' || action == 'quit' || action == 'remove') {
            type_ = 'oprateConversation';
        } else {
            type_ = 'startConversation';
        }
        return $.ajax({
            url : signUrl,
            data : {
                client_id : clientId,
                conv_id : conversationId,
                members : targetIds.sort().join(':'),
                action : action,
                type_ : type_
            },
            success : function (msg) {
                sign_conve = msg;
                return msg;
            }
        });
    };

    var login = function (cb) {
        if (!this.info.onMessage) {
            throw new Error("请先设置消息接受函数");
        }
        var $this = this;
        realtime.createIMClient(userInfo.who,{
            signatureFactory: signatureFactory,
            conversationSignatureFactory: conversationSignatureFactory,
        },'Web').then(function(tom_){
            $this.tom = tom_;
            $this.tom.on('message',$this.info.onMessage);
            tom_.on('conflict',function (){
                messageTip.user.warn('已经在其他位置登录');
                $this.tom.close().then(function() {
                    $this.messageTip.user.info('退出登陆');
                }).catch(console.error.bind(console));
            });
            if (cb) {
                cb();
            }
        });
        return this;
    };

    //退出登陆并启动回调函数
    var logout = function (cb) {
        if (userInfo.tom) {
            userInfo.tom.close();
        }
        if (cb) {
            cb();
        }
        return this;
    };
    var setOnMessage = function (fn) {
        this.info.onMessage = fn;
        return this;
    };
    return {
        userInfo : userInfo,
        login : login,
        logout : logout,
        messageTip : messageTip,
        setOnMessage : setOnMessage,
        info : {
            //这里记录所有跟这个类相关的信息
            onMessage : null,       //接收到消息的回掉函数
        }
    }
});//(用户信息);

