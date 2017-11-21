var user_info = $.cookie("user_info")
console.log("cookie ：", user_info, typeof user_info)
// cookie中存在用户信息
if (user_info != "null" && user_info) {
    let user = JSON.parse(user_info)
    console.log(user.uid, user.username, user.nickname)
    // 隐藏登陆注册按钮，显示欢迎信息
    $('.unlogin').addClass('hidden')
    $('.logined').removeClass('hidden')
    $('.userNick').text(user.nickname)
    console.log(1, user_info)
} else {
    $('.unlogin').removeClass('hidden')
    $('.logined').addClass('hidden')
    console.log(2)
}

// 注销按钮
$('.logined a').click(()=>{
    $.cookie('user_info', null, { expires: -1, path: "/" })
    // $('.unlogin').removeClass('hidden')
    // $('.logined').addClass('hidden')
})

// 列表相关---------------------------------

//点击分类显示不同类别的商品
var comics_cache = {}//准备存放缓存
$(".comics").delegate(".type-btn", "click", function (e) {
    //控制样式
    $(".type-btn").removeClass('btn-primary').addClass("btn-info")
    $(this).removeClass('btn-info').addClass("btn-primary")
    //1.获取到此按钮代表的classid
    let classid = $(this).data('id')//$(this).attr("data-id")
    if (Date.now() - comics_cache.time > 10000) {//每次读取缓存前看看时间有没有很长，如果缓存已经存在很长事件了，就清掉
        comics_cache = []
    }
    if (comics_cache[classid]) {//看看缓存里有没有，有的话就直接用
        showcomics(comics_cache[classid])
    } else {
        // 切换选项卡的问题应该在这儿
        $.ajax({
            url: "/comic/getComics",
            data: { classid: classid },
            success: function (results) {
                //把缓存存起来
                comics_cache.time = Date.now()
                comics_cache[classid] = results
                showcomics(results)
            }
        })
    }
})


function showcomics(results) {
    let str = ''
    console.log(results)
    results.forEach((item, i) => {
        str += `
            <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="thumbnail">
                <a href="/detail?id=${item._id }"><img src="${item.imgurl}" title="${item.name}" ></a>
                <div class="caption">
                    <h3><a href="/detail?id=${item._id}"><span style="display: inline-block;" class="animated">${item.name}</span></a></h3>
                    <p>人气：${item.hot}</p>
                    <p>
                    <button data-id="${item._id}" class="add-cart btn btn-danger" >加入补番计划</button> 
                    </p>
                </div>
                </div>
            </div>
        `
        

    })
    $(".comics .row").html(str)
    // 动画效果
    $('.animated').mouseover(function () {
        $(this).addClass('tada');
    })
    $('.animated').mouseout(function () {
        $(this).removeClass('tada');
    })
    // 加入购物车
    $('.caption').delegate('.add-cart', 'click', function () {
        console.log("舒服舒服")
        // 获取存在cookie中的用户信息，如果存在则获取，否则给个空值
        var user_info = $.cookie('user_info') ? JSON.parse($.cookie('user_info')) : null

        if (user_info) {
            // here，用户id， 番剧 id
            console.log(user_info, user_info.uid, $(this).data('id'))
            $.ajax({
                url: "/comic/addComic",
                // 不传数量的话代表1
                data: { uid: user_info.uid, comid: $(this).data('id') },
                success: function (results) {
                    console.log("返回值：", results)
                }
            })
        } else {
            alert("先去登陆吧！")
            window.location.href = '/login'
        }
    })
}

// 动画效果
$('.animated').mouseover(function(){
    $(this).addClass('tada');
})
$('.animated').mouseout(function () {
    $(this).removeClass('tada');
})


