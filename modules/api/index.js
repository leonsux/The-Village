
let login = require('./login')
let register = require('./register')
var getComics = require('./getComics')
var getComicsInList = require('./getComicsInList')
var addComic = require('./addComic')
var reduceComic = require('./reduceComic')
var removeComic = require('./removeComic')
var cart = require('./cart')

module.exports = {
    login, register, getComics, getComicsInList, addComic, cart, reduceComic, removeComic
}
