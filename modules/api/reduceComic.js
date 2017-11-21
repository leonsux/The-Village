var connect_mongo = require("../con_mongo")
//处理前台请求减少购物车商品的操作
const reduceComic = ({ uid, comid, num }, res) => {
    //找到这个用户在cart集合里对应的文档
    num = parseFloat(num)
    connect_mongo((db) => {
        let cart = db.collection("cart")
        cart.find({ uid }).toArray((err, results) => {
            if (err) throw err
            let ucar = results[0]
            let comics = ucar.comics
            for (var i = 0; i < comics.length; i++) {
                if (comics[i].comid == comid) {
                    comics[i].num--;
                    if (comics[i].num == 0) {
                        comics.splice(i, 1)
                    }
                    break;
                }
            }
            //更新用户的购物车数据
            cart.update({ uid }, { $set: { comics: ucar.comics } }, (err, results) => {
                if (err) throw err;
                console.log(results)
                res.send('1')
            })
        })


    })


}

module.exports = reduceComic