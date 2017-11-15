var connect_mongo = require("../con_mongo")
//处理前台请求商品的操作
const getComicsInList = (params, res) => {
    let { classid, order, keyword } = params//classid为类型 order为排序依据
    connect_mongo((db) => {
        let comics = db.collection("comics")
        let rule = {}//控制classid
        let sort_rule = {}//控制sort
        if (parseFloat(classid)) {//如果为0说明要查找所有的数据，不加限定条件
            rule.classid = parseFloat(classid)
        }
        if (keyword) {
            rule.keyword = new RegExp("" + keyword + "");
        }
        if (order) {//如果order存在，说明要按照价格或人气排序
            sort_rule[order] = -1
        }
        comics.find(rule).sort(sort_rule).toArray((err, results) => {
            if (err) throw err;
            res.send(results)

            db.close()
        })
    })

}

module.exports = getComicsInList