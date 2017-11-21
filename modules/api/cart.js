
module.exports = (db, req, res)=>{
    let user_info = req.cookies.user_info ? JSON.parse(req.cookies.user_info) : ''

    // 如果没登录
    if (!user_info) {
        // console.log('0')
        res.render('cart', {results: 'no-login'})
    } else {
        // 已登录
        // console.log('1')
        // res.render('cart', {results: 'login'})

        cart = db.collection('cart')

        cart.find({uid: user_info.uid}).toArray((err, results)=>{
            if(err) throw err;
            // 购物车为空
            if (!results.length || !results[0].comics.length) {
                res.render('cart', {results: 'no-buy'})
            } else {
                // 已选
                let comics = results[0].comics

                // 所有comics
                let allComic = db.collection('comics')
                // 番剧总数和总热度
                let [allNum, allPrice] = [0, 0]
                // 遍历出已选番剧信息
                
                allComic.find({}).toArray((err, results)=>{
                    if(err) throw err;
                    comics = comics.map((item)=>{
                        // 累加番剧数目
                        allNum += item.num
                        for (var i = 0; i < results.length; i++) {
                            if (item.comid == results[i]._id) {
                                // 番剧总热度
                                allPrice += results[i].hot * item.num;
                                item.imgurl = results[i].imgurl;
                                item.name = results[i].name;
                                item.hot = results[i].hot;
                                item._id = item.comid
                                break;
                            }
                        }
                        return item
                    })
                    comics.allNum = allNum
                    comics.allPrice = allPrice
                    res.render('cart', {results: comics})
                })
                

            
                
            }
        })
    }
}