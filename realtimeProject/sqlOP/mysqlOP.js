/**
 * Created by sunbing on 17-4-6.
 */

var mysqlPool = require("sqlpool").sqlpool;

mysqlPool.init({
    host : '', //ip or localhost or www.xxx.xx
    user : "root",
    password : "" //pass
},'database','datatable');//,'baseData');

var sqlOP = mysqlPool.methods;

module.exports.sqlOP = sqlOP;

