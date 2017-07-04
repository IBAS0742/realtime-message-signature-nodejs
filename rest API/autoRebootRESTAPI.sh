#!/bin/bash

#使用以下语句运行
#nohup ./autoRebootRESTAPI.sh > a.log 2>&1 &

interval=30; #监听的间隔时间
appName='restapi.js';

while [ 1 -le 6 ]
do
	echo "in while";
    nodeStatus=$(ps -ef|grep 'node '$appName|wc -l);
    echo $nodeStatus;
    #如果 nodeStatus 为 < 2 表示线程死了,应该重启并生成新日志
    if test $nodeStatus -lt 2
     then
        echo '线程死了,正在重新启动';
        d='logs/'$(date +'%Y-%m-%d_%H:%M:%S-%W')'.log'
        node $appName 2>&1|tee $d&
        #echo $(node test.js 2>&1) >> $d&
    fi
    sleep $interval;
done
