module.exports = common

var popupHandle = require('./popup.js')

var ghoapi = require('./api.js')

// 全屏设定

function common() {

  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

  window.addEventListener(resizeEvt, recalcHight, false)

  document.addEventListener('DOMContentLoaded', recalcHight, false)

  $('img.lazy').lazyload()

  popupHandle()

  function recalcHight() {

    var h = document.documentElement.clientHeight

    var w = document.documentElement.clientWidth

    
    if($('.head-fenlei-box').css('display') == 'block') {

      $('.head-fenlei').css('height', h)

    } else {

      $('.head-fenlei').css('height', 40)

    }

    $('.introduce-pic-bg').css('height', h)

  }

  // $(function() {

    // 侧边导航栏
    $('.head-fenlei-box').click(function() {

      console.log($('#gho-header-main--trigger').prop('checked'))

      if($('#gho-header-main--trigger').prop('checked')){

             $('.head-fenlei').animate({right:"-50%"})

        }else{

             $('.head-fenlei').animate({right:"0%"})

        }

    })

    // 固定导航栏
    $(window).scroll(function() {

      if($(document).scrollTop() > 0) {

        $('.user-header').addClass('fixednav')

      } else {

        $('.user-header').removeClass('fixednav')

      }

    })
    // 手机号tip
    $('[data-toggle="tooltip"]').tooltip()

    // 头部导航切换变色
    if(/cloudmdl/.test(location.href)) {

      $('.cloudmdl').css('color', '#f6c946')

    } else if(/introduce/.test(location.href)) {

      $('.introduce').css('color', '#f6c946')

    } else if(/cloudshow/.test(location.href)) {

      $('.cloudshow').css('color', '#f6c946')

    }

    var PhoneNum = $.cookie('usernum')

    if(PhoneNum) {
      // $('.loginBtn').attr('src', './views/index_user/imgs/icons/06.png')
      $('.login .iconfont').css('color', 'rgb(246, 200, 42)')

      $('.profile').text('您好！ ' + PhoneNum)

      // 鼠标经过离开账号
      $('.user-header .loginBtn').unbind().mouseenter(function () {

        $('.hover-menu').stop(true, true).slideDown()

      }).mouseleave(function() {

        $('.hover-menu').stop(true, true).slideUp()

      })
      // 鼠标经过下拉菜单
      $('.hover-menu').unbind().mouseenter(function () {

        $(this).stop(true, true).show()

      }).mouseleave(function () {

        $(this).stop(true, true).slideUp()

      })

    }

    // 滚动到顶端
    $(window).scroll(function() {

      var yheight = window.pageYOffset

      if(yheight >= 1500) {

        $('.goto-top').fadeIn()

      } else {

        $('.goto-top').fadeOut()

      }

    })

    $('.goto-top').on('click', function() {

      $('html,body').animate({scrollTop: '0px'}, 500)

    })

  // })

}
// var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

// window.addEventListener(resizeEvt, recalcHight, false)

// document.addEventListener('DOMContentLoaded', recalcHight, false)

// $('img.lazy').lazyload()

// popupHandle()

// function recalcHight() {

//   var h = document.documentElement.clientHeight

//   var w = document.documentElement.clientWidth

  
//   if($('.head-fenlei-box').css('display') == 'block') {

//     $('.head-fenlei').css('height', h)

//   } else {

//     $('.head-fenlei').css('height', 40)

//   }

//   $('.introduce-pic-bg').css('height', h)

// }

// $(function() {

//   // 侧边导航栏
//   $('.head-fenlei-box').click(function() {

//     console.log($('#gho-header-main--trigger').prop('checked'))

//     if($('#gho-header-main--trigger').prop('checked')){

//            $('.head-fenlei').animate({right:"-50%"})

//       }else{

//            $('.head-fenlei').animate({right:"0%"})

//       }

//   })

//   // 固定导航栏
//   $(window).scroll(function() {

//     if($(document).scrollTop() > 0) {

//       $('.user-header').addClass('fixednav')

//     } else {

//       $('.user-header').removeClass('fixednav')

//     }

//   })
//   // 手机号tip
//   $('[data-toggle="tooltip"]').tooltip()

//   // 头部导航切换变色
//   if(/cloudmdl/.test(location.href)) {

//     $('.cloudmdl').css('color', '#f6c946')

//   } else if(/introduce/.test(location.href)) {

//     $('.introduce').css('color', '#f6c946')

//   } else if(/cloudshow/.test(location.href)) {

//     $('.cloudshow').css('color', '#f6c946')

//   }

//   var PhoneNum = $.cookie('usernum')

//   if(PhoneNum) {
//     // $('.loginBtn').attr('src', './views/index_user/imgs/icons/06.png')
//     $('.login .iconfont').css('color', 'rgb(246, 200, 42)')

//     $('.profile').text('您好！ ' + PhoneNum)

//     // 鼠标经过离开账号
//     $('.user-header .loginBtn').mouseenter(function () {

//       $('.hover-menu').stop(true, true).slideDown()

//     }).mouseleave(function() {

//       $('.hover-menu').stop(true, true).slideUp()

//     })
//     // 鼠标经过下拉菜单
//     $('.hover-menu').mouseenter(function () {

//       $(this).stop(true, true).show()

//     }).mouseleave(function () {

//       $(this).stop(true, true).slideUp()

//     })

//   }
//   // 滚动到顶端
//   $(window).scroll(function() {

//     var yheight = window.pageYOffset
//     console.log(yheight)

//     if(yheight >= 1500) {

//       $('.goto-top').fadeIn()

//     } else {

//       $('.goto-top').fadeOut()

//     }

//   })

//   $('.goto-top').on('click', function() {

//     $('html,body').animate({scrollTop: '0px'}, 500)

//   })

// })