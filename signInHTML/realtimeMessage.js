/**
 * Created by Administrator on 2017/7/3.
 */

/**
 * 这里负责编写关于实时聊天的所有消息内容，
 * 1.消息及自定义消息的定义
 * 2.各种消息的处理方式
 * */

/**
 * AV : AV 对象
 * conv : convOP 对象
 * messageTip : 默认继承自 conv 对象
 * */
var messageObject = (function (AV,conv,messageTip) {
    var messageIterator = null;
    if (!messageTip) {
        messageTip = conv.messageTip;
    }
    var textMessage = function(message) {
        var msg = new messageType[message.type][0](message.text);
        if (message.attr instanceof Object) {
            msg.setAttributes(message.attr);
        }
        conv.send(msg);
    };
    var fileMessage = function (message) {
        var file = new AV.File(message.subscript,message.url);
        file.save().then(function () {
            var msg = new messageType[message.type][0](file);
            if (message.text instanceof String) {
                msg.setText(message.text);
            }
            if (message.attr instanceof Object) {
                msg.setAttributes(message.attr);
            }
            conv.send(msg);
        }).then(function () {
            messageTip.user.info('发送成功。');
        }).catch(console.error.bind(console));
    };
    var messageType = {
        Text    : [AV.TextMessage,textMessage],
        Image   : [AV.ImageMessage,fileMessage],
        Audio   : [AV.AudioMessage,fileMessage],
        Video   : [AV.VideoMessage,fileMessage],
        File    : [AV.FileMessage,fileMessage],
        Local   : [AV.LocationMessage,fileMessage]
    };
    /**
     * message : {
     *  type : Text,
     *  text : 'text',
     *  subscript : '', //文件描述
     *  url : '',       //当内容为 图像或文本等时，需要该属性，这里可以是 input[file]元素的 files[0]
     *  attr : {}
     * }
     * */
    var sendMessage = function (message) {
        messageType[message.type][1](message);
    };
    var receiveMessage = function () {
    };
    var getMessageIterator = function () {
        if (!messageIterator) {
            messageIterator = conv.convInfo.createMessagesIterator({ limit: 10 });
        }
        return messageIterator;
    };
    //cb 将接受两个参数，第一个是消息数组，第二个是是否没有了
    var getHistory = function (cb) {
        var messageIter = getMessageIterator();
        messageIter.next().then(function (result) {
            cb(result.value,result.done);
        }).catch(console.error.bind(console));
    };
    return {
        send : sendMessage,
        receive : receiveMessage,
        //getMessageIterator : getMessageIterator,
        getHistory : getHistory,
    }
});//(AV,conv);
