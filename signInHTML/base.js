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
                            // .addConv("roomID/*5958b5ea7a1ff9003262097f*/",function () {
                            //     realtimeObj.messageDear =
                            //         messageObject(AV,realtimeObj.conversationObj);
                            // });
                });
}

//发送给文本消息
realtimeObj.messageDear.send({type:'Text',text : (new Date).toString()});
//发送本地图片
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
//发送url图片
realtimeObj.messageDear.send({type:'Text',text : (new Date).toString()})








