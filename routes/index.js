var express = require('express');
var router = express.Router();
var connect_mongo = require("../modules/con_mongo")
var async = require('async')
/* GET home page. */
// 主页
router.get('/', function(req, res, next) {

  //可以给前端返回一个ejs模板编译后的html，第一个参数为要响应的模板的名字，后面对象是渲染模板时使用的数据
  let results = {}
  //获取到轮播图数据后渲染index.ejs模板
  async.waterfall([
    function (next) {
      connect_mongo((db) => {
        next(null, db)
      })
    },
    function (db, next) {
      db.collection('banner').find({}).toArray((err, banners) => {//查找banner
        if (err) throw err;
        results.banners = banners
        next(null, db)
      })
    },
    function (db, next) {
      db.collection('class').find({}).toArray((err, classes) => {//查找商品分类
        if (err) throw err;
        results.classes = classes
        next(null, db)
      })
    },
    function (db, next) {
      db.collection('comics').find({ classid: 1 }).limit(4).toArray((err, comics) => {//查找对应的商品
        if (err) throw err;
        results.comics = comics
        next(null)
      })

    }
  ], function () {
    console.log(results)
    res.render('index', results)
  })
  /*
  connect_mongo((db)=>{
    db.collection('banner').find({}).toArray((err, banners)=>{
      if(err) throw err;
      res.render('index',{banners})
    })
  })
  */
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

// 列表页
router.get('/list', function(req, res, next){
  let results = {}
  async.waterfall([
    function (next) {
      connect_mongo((db) => {
        next(null, db)
      })
    },
    function (db, next) {
      db.collection("comics").find({}).limit(4).toArray((err, comics) => {
        if (err) throw err;
        results.comics = comics
        next(null, db)
      })
    },
    function (db, next) {
      db.collection('class').find({}).toArray((err, classes) => {//查找商品分类
        if (err) throw err;
        results.classes = classes
        next(null, results)
      })
    }
  ], function (err, results) {
    res.render('list', results)
  })
})
module.exports = router;
