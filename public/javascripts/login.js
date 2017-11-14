// 阻止表单默认跳转行为
$("#login-form").submit(function (e) {
    e.preventDefault()
    login()
})

function login() {
    let username = $("#username").val()
    let password = $("#password").val()

    $.ajax({
        url: '/users/login',
        data: {
            username: username,
            password: password
        },
        // 请求成功的回调函数
        success: function (result) {
            console.log("收到：", result)
            if (result.uid) {
                // 将登陆信息保存到cookie
                $.cookie("user_info", JSON.stringify(result), { expires: 7, path: "/" })
                // 跳转到主页
                window.location.href = '/'
            } else {
                alert("用户名或密码错误！")
            }
        }
    })
}