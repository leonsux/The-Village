
module.exports = (db, res, params)=>{
    // 取到对应的collection集合, users为名
    let users = db.collection('users')
    // 从users中查找匹配数据，转换成数组
    users.find({username:params.username, password:params.password}).toArray((err, result)=>{
        if (err) {
            throw err
        }
        // 存在此用户则返回其对应的信息，
        if (result.length) {
            // send为 express框架的方法
            res.send({uid:result[0]._id, nickname:result[0].nickname})
        } else {
            res.send('0')
        }
        db.close()
    })
}