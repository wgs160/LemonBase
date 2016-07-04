/**
 * Created by 15031493 on 2015/5/8.
 */

var dbM = require('./a_base');

function userTM(){
    this.tableName = "user";
    dbM.call(this);
};

module.exports = userTM;

