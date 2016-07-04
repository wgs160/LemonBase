var express = require('express');
var router = express.Router();
var userTM = require('../tableModel/userTM');
var _ = require('underscore');

router.use('/home', function(req, res, next) {
  if(req.session.user){
    next();
  }
  res.render('login', { title: '登陆你没登录' });

});
/* GET home page. */
router.get('/', function(req, res, next) {
  var userT = new userTM();
  var sql = 'select * from '+userT.tableName;

  userT.query(sql,function (row) {
      console.log(row);
      console.log( _.isDate(row[0].loginTime));
      userT.end();
  });

  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登陆' });
});
router.get('/home', function(req, res, next) {
  res.render('home', { title: '首页',user : req.session.user });
});
router.get('/logout', function(req, res, next) {
  req.session = null;
  res.render('logout', { title: '登出' });
});



//登陆
router.post('/dologin', function(req, res, next) {
  var user={
    name:'张三',
    age:'15'
  }

  if(req.body.name===user.name && req.body.age===user.age){
    req.session.user = user;
    res.redirect('/home');
    return false;
  }

  res.redirect('/login');
});


module.exports = router;
