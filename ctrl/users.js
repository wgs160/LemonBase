var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/query', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/del', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/update', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
