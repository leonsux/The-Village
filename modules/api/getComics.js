var connect_mongo = require("../con_mongo")
//处理前台请求商品的操作
const getComic = (params, res) => {
    let { classid } = params
    console.log(typeof classid)
    connect_mongo((db) => {
        let goods = db.collection("comics")
        goods.find({ classid: parseFloat(classid) }).limit(4).toArray((err, results) => {
            if (err) throw err;
            console.log(results)
            res.send(results)
        })
    })

}

module.exports = getComic