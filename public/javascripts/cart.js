// 加入购物车
$('.caption').delegate('.add-cart', 'click', function(e){
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


    var $elem = document.createElement("b");
    $elem.style.color = '#' + Math.floor(Math.random() * 0xffffff).toString(16); //"#E94F06";
    $elem.style.zIndex = 9999;
    $elem.style.position = "absolute";
    $elem.style.select = "none";
    var x = e.pageX;
    var y = e.pageY;
    $elem.style.left = (x - 10) + "px";
    $elem.style.top = (y - 20) + "px";
    clearInterval(anim);
    $elem.innerText = "❤";
    $elem.style.fontSize = Math.random() * 10 + 12 + "px";
    var increase = 0;
    var anim;
    setTimeout(function() {
      anim = setInterval(function() {
          if (++increase == 150) {
              clearInterval(anim);
                document.body.removeChild($elem);
          }
          $elem.style.top = y - 20 - increase + "px";
          $elem.style.opacity = (150 - increase) / 120;
      }, 8);
    }, 70);
    document.body.appendChild($elem);
})
// $('.add-cart').click(function () {
    
// })