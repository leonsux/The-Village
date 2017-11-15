//全局变量用于在更改类型或者排序规则后获取数据的时候使用
var classid = null;
var order = null;
var keyword = null;
var pageNum = 1;//控制页数
var pageSize = 4;//控制每页几个
var flag = true; //判断是否还有下一页

let user_info = $.cookie("user_info")
// console.log("cookie 串：", user_info, typeof user_info)
// cookie中存在用户信息
if (user_info) {
    let user = JSON.parse(user_info)
    // console.log(user.uid, user.username, user.nickname)
    // 隐藏登陆注册按钮，显示欢迎信息
    $('.unlogin').addClass('hidden')
    $('.logined').removeClass('hidden')
    $('.userNick').text(user.nickname)
    // console.log(1, user_info)
} else {
    $('.unlogin').removeClass('hidden')
    $('.logined').addClass('hidden')
    // console.log(2)
}

// 注销按钮
$('.logined a').click(() => {
    $.cookie('user_info', null)
    // $('.unlogin').removeClass('hidden')
    // $('.logined').addClass('hidden')
    // console.log("3")
})


//全局变量用于在更改类型或者排序规则后获取数据的时候使用
var classid = null;
var order = null;
var keyword = null;
$(".comics").delegate(".type-btn", "click", function (e) {
    flag = true;
    pageNum = 1

    //当切换类型的时候，不需要关键字搜索
    keyword = null
    $("#search-inp").val('')

    //控制样式
    $(".type-btn").removeClass('btn-primary').addClass("btn-info")
    $(this).removeClass('btn-info').addClass("btn-primary")
    //1.获取到此按钮代表的classid
    if ($(this).data('id') == classid) {//如果两次点击是相同的type，阻止下面代码运行，不重新获取
        return;
    }
    classid = $(this).data('id')//$(this).attr("data-id")
    //classid为0代表全部，
    getGoods()

})
$(".comics").delegate(".order-btn", "click", function (e) {
    //更改样式
    $(".order-btn").removeClass("btn-danger").addClass("btn-info")
    $(this).removeClass("btn-info").addClass("btn-danger")

    //1.获取到此按钮代表的order
    if ($(this).data('order') == order) {//如果点击的还是同一个按钮的时候，取消排序
        $(this).removeClass("btn-danger").addClass("btn-info")//重置样式
        order = null
    } else {
        order = $(this).data('order')//$(this).attr("data-id")
    }

    //classid为0代表全部，
    getGoods()

})



$("#search-inp").keyup(function (e) {
    if (e.keyCode == 13) {
        keyword = this.value
        pageNum = 1//当搜索内容的时候回到第一页
        getGoods()
    }
})

$("#prev").click(function () {
    if (pageNum > 1) {
        pageNum--;
        getGoods()
    } else {
        alert('已经是第一页了')
    }
})

$("#next").click(function () {
    if (flag) {
         pageNum++;
        getGoods()
    } else {
        alert("后面已经没有了呦！")
    }
   
})

function getGoods() {
    // console.log("你好：", pageSize)
    $.ajax({
        url: "/comic/getComicsInList",
        data: { classid: classid, order: order, keyword: keyword, pageNum: pageNum, pageSize: pageSize},
        success: function (results) {
            showGoods(results)
        }
    })
}

function showGoods(results) {
    let str = ''
    let count = 0;
    results.forEach((item, i) => {
        str += `
            <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="thumbnail">
                <a href="/detail?id=<%= item._id %>"><img src="${item.imgurl}" title="${item.name}" ></a>
                <div class="caption">
                    <h3><a href="/detail?id=<%= item._id %>">${item.name}</a></h3>
                    <p>人气：${item.hot}</p>
                    <p>
                    <button class="btn btn-danger" >加入补番计划</button> 
                    </p>
                </div>
                </div>
            </div>
        `
        count++;
    })
    if(count < 4){
        flag = false;
    }
    $(".comics .row").html(str)
}