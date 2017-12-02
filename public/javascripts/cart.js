// 加入购物车
$('.caption').delegate('.add-cart', 'click', function(){
    // 获取存在cookie中的用户信息，如果存在则获取，否则给个空值
    var user_info = $.cookie('user_info') ? JSON.parse($.cookie('user_info')) : null

    if (user_info) {
        // here，用户id， 番剧 id
        console.log(user_info, user_info.uid, $(this).data('id'))
        $.ajax({
            url: "/comic/addComic",
            // 不传数量的话代表1
            data: {uid: user_info.uid, comid: $(this).data('id')},
            success: function(results){
                console.log("返回值：", results)
            }
        })
    } else {
        alert("先去登陆吧！")
        window.location.href = '/login'
    }
})
// $('.add-cart').click(function () {
    
// })