var express = require('express');
var router = express.Router();
var connect_mongo = require("../modules/con_mongo")

/* GET home page. */
// 主页
router.get('/', function(req, res, next) {
  connect_mongo((db)=>{
    db.collection('banner').find({}).toArray((err, banners)=>{
      if(err) throw err;
      res.render('index',{banners})
    })
  })
  // res.render('index', { title: 'Express' });
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
