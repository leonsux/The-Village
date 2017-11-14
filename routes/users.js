var express = require('express');
var router = express.Router();

var con_mongo = require('../modules/con_mongo')
var api_handler = require("../modules/api")

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// 登陆路由，使用的是GET
router.get('/login', function(req, res, next){
  // 可以，很强势，不用我自己费尽取数据了，
  let params = req.query  //{ username: 'leon', password: '****'}
  console.log("这是啥？", "??", params)
  // 连接数据库
  con_mongo((db)=>{
    api_handler.login(db, res, params)
  })
})

// 注册，使用的是POST
router.post('/register', function (req, res, next) {
  // 可以，很强势，不用我自己费尽取数据了，这里是req.body，而不是query
  let params = req.body  //{ username: 'leon', password: '****'}
  console.log("这是啥？", "??", params)
  // 连接数据库
  con_mongo((db) => {
    api_handler.register(db, res, params)
  })
})
module.exports = router;
