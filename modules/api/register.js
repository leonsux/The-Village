module.exports = (db, res, params)=>{
    // 取到对应的collection集合, users为名
    let users = db.collection('users')
    // 从users中查找匹配数据，转换成数组，这里只需要通过用户名查找即可，因为用户名不能重复
    console.log("找的就是你",params.username)
    users.find({ username: params.username }).toArray((err, result) => {
        if (err) {
            throw err
        }
        // 若已存在说明注册失败
        if (result.length) {
            // console.log(result[0])
            // send为 express框架的方法
            res.send('0')
        } else {
            // 可以注册，插入到数据库
            users.insertOne(params, (err, result)=>{
                if (result.insertedCount == 1) {//插入条数
                    console.log("成功啦")
                    res.send('1')
                } else {
                    res.send('0')
                }
            })
            res.send('0')
        }
        db.close()
    })
}