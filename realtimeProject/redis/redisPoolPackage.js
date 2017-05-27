/**
 * Created by sunbing on 17-4-10.
 */
/**
 * Created by sunbing on 17-4-6.
 */

var poolRedis = require('pool-redis');

var redisPoolPackage = function() {
    var pool;

    var init_ = function(obj,redisDB) {
        pool = poolRedis(
            obj || {
                'host': '', //ip or localhost or www.xxx.xx
                'password': '', //pass
                'maxConnections': 10
            });
        if (redisDB) {
            var a = parseInt(redisDB);
            method.dbIndex = ((a && a > 0 && a < 16)?a : 0) + "";
            console.log("[redis] choose db is " + method.dbIndex);
        }
    };

    var method = {
        dbIndex : "2",
        getDefaultOneConnection : function(cb) {
            var dbIndex = this.dbIndex;
            pool.getClient(function(client,done){
                if (client) {
                    client.select(dbIndex);
                    cb(client);
                    done();
                } else {
                    console.warn('can not get one client .');
                    cb(null);
                }
            });
        },
        defaultDear : function(){},
        getK : function(key_,cb) {
            this.getDefaultOneConnection(function(client){
                if (client) {
                    client.get(key_,function(err,res){
                        if (err) {
                            cb("");
                        } else {
                            cb(res);
                        }
                    });
                } else {
                    cb(null);
                    //return null;
                }
            });
        },
        setK : function(key_,val_,cb) {
            this.getDefaultOneConnection(function(client){
                if (client) {
                    client.set(key_,val_,function(err,res){
                        if (err) {
                            cb("");
                        } else {
                            cb(res);
                        }
                    });
                } else {
                    cb(null);
                    //return null;
                }
            });
        },
        setMapKVV : function(mkey,value_,value__,cb) {
            this.getDefaultOneConnection(function(client){
                if (cb) {
                    cb(client.hmset(mkey,value_,value__));
                } else {
                    client.hmset(mkey,value_,value__);
                }
            });
        },
        setMapKObj : function(mkey,value,cb) {
            if (value instanceof Object) {
                this.getDefaultOneConnection(function(client){
                    cb(client.HMSET(
                        mkey,
                        value
                    ));
                });
            } else {
                cb(false);
                console.error("value 表示对象");
            }
        },
        getMapByK : function(mkey,cb) {
            this.getDefaultOneConnection(function(client){
                client.hgetall(mkey,function(err,obj){
                    cb(err,obj);
                });
            });
        },
        endPool : function() {
            pool.closeAll();
        }
    };

    return {
        inti : init_,
        method : method
    };
} ();


module.exports.redisPoolPackage = redisPoolPackage;

