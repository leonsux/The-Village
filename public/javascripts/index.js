let user_info = $.cookie("user_info")
console.log("cookie 串：", user_info, typeof user_info)
// cookie中存在用户信息
if (user_info) {
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
    $.cookie('user_info', null)
    // $('.unlogin').removeClass('hidden')
    // $('.logined').addClass('hidden')
    console.log("3")
})