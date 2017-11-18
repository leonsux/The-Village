// 加入购物车
$('.add-cart').click(function () {
    // 获取存在cookie中的用户信息，如果存在则获取，否则给个空值
    var user_info = $.cookie('user_info') ? JSON.parse($.cookie('user_info')) : null

    if (user_info) {
        // here，用户id， 番剧 id
        console.log(user_info, user_info.uid, $(this).data('id'))
        $.ajax({
            url: "/comic/addComic",
            data: {user_id: user_info.uid, comic_id: $(this).data('id')},
            success: function(results){
                
            }
        })
    } else {
        alert("先去登陆吧！")
        window.location.href = '/login'
    }
})