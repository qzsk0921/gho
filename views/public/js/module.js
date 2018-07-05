var load = require('./load.js')

var popup = require('./popup.js')

var login = require('./login.js')

var common = require('./common.js')

var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

window.addEventListener(resizeEvt, recalcHight, false)

document.addEventListener('DOMContentLoaded', recalcHight, false)

function recalcHight() {

  var h = document.documentElement.clientHeight

  var w = document.documentElement.clientWidth
  
  if($('.head-fenlei-box').css('display') == 'block') {

    $('.head-fenlei').css('height', h)

  } else {

    $('.head-fenlei').css('height', 40)

  }

}

$(function() {

  // 向下滚动
  var timer = setInterval(function() {

    $('.goto-bottom').fadeIn(600).fadeOut(1400)

  }, 2000)

  $(window).scroll(function() {

    var scrollTop = window.pageYOffset

    if(scrollTop == 0) {

      timer = setInterval(function() {

        $('.goto-bottom').fadeIn(600).fadeOut(1400)

      }, 2000)

    } else {

      clearInterval(timer)

      $('.goto-bottom').hide()

    }

  })

  $('.goto-bottom').click(function() {

    clearInterval(timer)

    $('html,body').animate({scrollTop: document.documentElement.clientHeight-40}, 500)

  })

})

common()

load()

popup()

login()

