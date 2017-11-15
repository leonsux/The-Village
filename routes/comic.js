var express = require('express');
var router = express.Router();
var connect_mongo = require('../modules/con_mongo')
var api_handler = require("../modules/api")
/* GET users listing. */


router.get('/getComics', function (req, res, next) {
    let params = req.query
    api_handler.getComics(params, res)
});

router.get('/getComicsInList', function (req, res, next) {
    let params = req.query
    api_handler.getComicsInList(params, res)
});

module.exports = router;
