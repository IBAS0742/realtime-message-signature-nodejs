/**
 * Created by Administrator on 2017/6/28.
 */

/**
 * 聊天室操作
 * */

//account 为一个 Account 实例对象
var ConvOP = (function (account,messageTip) {
    var convInfo = {};
    function addConv(convId,cb) {
        var $this = this;
        this
            .account
            .tom
            .getConversation(convId)
            .then(function(conv){
                $this.convInfo = conv;
                conv.join();
                $this.messageTip.system.info("成功加入聊天室");
                $this.info.isConnected = true;
                if (cb) {
                    cb();
                }
            }).catch(console.error.bind($this.messageTip.error));
        return this;
    };
    function send(msg) {
        if (!this.info.isConnected) {
            this.messageTip.user.info("建立聊天中，请稍等。");
            return this;
        }
        if (msg instanceof Object) {
            try {
                this.convInfo.send(msg);
            } catch (e) {
                this.messageTip.system.error("消息发生失败");
                this.messageTip.user.info("消息发生失败");
            }
        }
        return this;
    }
    return {
        convInfo : convInfo,
        messageTip : messageTip ? messageTip : account.messageTip,
        account : account,
        addConv : addConv,
        send : send,
        info : { //这里存放该类中的特有属性
            isConnected : false
        }
    }
});//();



