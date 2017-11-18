var connect_mongo = require('../con_mongo')

module.exports = ({uid, comid, num}, res) =>{
    num = parseFloat(num)

    connect_mongo((db)=>{
        // 购物车集合
        let carts = db.collection('cart')
        // 先查找匹配用户信息
        carts.find({uid}).toArray((err, results)=>{
            if(err) throw err;
            // 如果carts集合里没有用户信息，那么插入一条
            if (!results.length) {
                carts.insertOne({uid: uid, comics:[{comid: comid, num: num?num:1}]}, (err, results)=>{
                    if(err) throw err;
                    // 插入成功返回 1
                    res.send('1')
                })
            } else { //如果有用户信息，则去匹配商品
                let ucart = results[0]
                let isHas = false
                ucart.comics = ucart.comics.map((item, i)=>{
                    if (item.comid == comid) {
                        isHas = true
                        item.num += num?num:1
                    }
                    return item
                })

                // 更新购物车信息
                if (!isHas) { //若用户之前没有此商品，将该商品添加进去
                    ucart.comics.push({comid: comid, num: num?num:1})
                }
                // 更新数据
                carts.update({uid}, {$set: {comics: ucart.comics}}, (err, results)=>{
                    if(err) throw err;
                    res.send('1')
                })
            }
        })
    })

    console.log("用户id 和 商品id：",uid, comid)
}
// 数据结构
// { uid: uid, mycomics: []}