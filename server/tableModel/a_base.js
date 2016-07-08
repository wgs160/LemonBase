/**
 * Created by 15031493 on 2015/5/6.
 */

var mysql  = require('mysql');
var dbconfig  = require('./dbconfig');
function dbModel() {
        this.conn = null;
        this.isconn = false;
        this.tableName = "you need a table name";

        this.openConn();//初始化时设置连接参数
};

dbModel.prototype.openConn = function () {
        this.conn = mysql.createConnection(dbconfig);
}
dbModel.prototype.end = function () {
        this.conn.end();
        this.isconn = false;
}

dbModel.prototype.__consoleErr = function (__msg) {
        console.info("错误内容:" + __msg);
        console.info("错误提示:" + __msg.message);
};

dbModel.prototype.query = function (sql,callback) {
        try{
                this.conn.connect();
                this.isconn = true;
                this.conn.query( sql || 'SELECT 1 + 1 AS solution', function(err, rows, fields) {
                        if (err) throw err;
                        if(callback){
                                callback(rows);
                        }
                        console.log(sql);
                        //  console.log('The solution is: ', rows[0]);
                });
        }catch (e){
                this.__consoleErr(e);
        }
};

module.exports = dbModel;