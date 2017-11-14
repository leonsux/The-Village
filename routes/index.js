var express = require('express');
var router = express.Router();

/* GET home page. */
// 主页
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 登录页
router.get('/login', function(req, res, next){
  res.render('login', {})
});

// 注册页
router.get('/register', function (req, res, next) {
  res.render('register', {})
});
module.exports = router;
