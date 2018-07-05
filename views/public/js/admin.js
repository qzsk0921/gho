require('../css/index.css')

require('../css/bootstrap.min.css')

require('../css/base.css')

require('../css/admin.css')

require('../css/popup.css')

require('../css/common.css')

require('../css/animate.css')

var common = require('./common.js')

var login = require('./login.js')

var moduleEdit = require('./moduleEdit.js')

var reload = require('./load.js')

var popupHandle = require('./popup.js')

// var ghoapi = require('./api.js')

// ---------------------------------

var PhoneNum = $.cookie('usernum')

var param = location.search.split('=')[1]

var usernum = null

var Guid = null

var type = null

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

// // 编辑
  // $('.modules').on('click', '#edit', function() {

  //   // e.stopPropagation()

  //   usernum = $(this).attr('data-admin')

  //   Guid = $(this).attr('data-Guid')

  //   // $('#Guid').val(Guid)

  //   console.log(Guid)

  //   var checkbox = document.querySelectorAll('.item-box')

  //   for (var i = checkbox.length - 1; i >= 0; i--) {
      
  //     // checkbox[i].addEventListener('click', classHandle)

  //     checkbox[i].onclick = function() {

  //       this.classList.toggle('checked')

  //     }

  //   }

  // })

$(function() {

  reload()

  login()

  common()

  // popupHandle()

  // $('[data-toggle="tooltip"]').tooltip()

  // $(window).scroll(function() {

  //   if($(document).scrollTop() > 0) {

  //     $('.user-header').addClass('fixednav')

  //   } else {

  //     $('.user-header').removeClass('fixednav')

  //   }

  // })

  // 滑动导航
  // $('.head-fenlei-box').unbind().click(function() {

  //   console.log($('#gho-header-main--trigger').prop('checked'))

  //   if($('#gho-header-main--trigger').prop('checked')) {

  //       $('.head-fenlei').animate({right:"-50%"})

  //     } else {

  //       $('.head-fenlei').animate({right:"0%"})

  //     }
  // })

  // // 编辑
  // $('.modules').on('click', '#edit', function() {

  //   // e.stopPropagation()

  //   usernum = $(this).attr('data-admin')

  //   Guid = $(this).attr('data-Guid')

  //   // $('#Guid').val(Guid)

  //   console.log(Guid)

  //   var checkbox = document.querySelectorAll('.item-box')

  //   for (var i = checkbox.length - 1; i >= 0; i--) {
      
  //     // checkbox[i].addEventListener('click', classHandle)

  //     checkbox[i].onclick = function() {

  //       this.classList.toggle('checked')

  //     }

  //   }

  // })

  $('body').on('click', '.edit-keep', function(e) {

    // e.stopPropagation()

    // moduleEdit(Guid)
    Guid = $('#Guid-pop').val()

    moduleEdit.moduleEdit(Guid)

  })

  // // 删除
  // $('.modules').on('click', '#delete', function() {

  //   usernum = $(this).attr('data-admin')

  //   Guid = $(this).attr('data-Guid')

  //   // e.stopPropagation()

  //   if(PhoneNum != usernum) {

  //     type = 2

  //     // moduleDel(usernum, Guid, type)

  //     moduleEdit.moduleDel(usernum, Guid, type)

  //   } else {

  //     type = 1

  //     // moduleDel(usernum, Guid, type)

  //     moduleEdit.moduleDel(usernum, Guid, type)

  //   }

  // })
  // // 上报
  // $('.modules').on('click', '#report', function() {

  //   Guid = $(this).attr('data-Guid')

  //   $('#Guid-pop').val(Guid)

  // })

  $('body').on('click', '#rep-btn', function() {

    Guid = $('#Guid-pop').val()

    // report(Guid)

    moduleEdit.report(Guid)

  })
  // // 易主
  // $('.modules').on('click', '#change', function() {

  //   Guid = $(this).attr('data-Guid')

  //   $('#Guid-pop').val(Guid)

  // })

  $('body').on('click', '#cha-btn', function() {

    Guid = $('#Guid-pop').val()

    // change(Guid)

    moduleEdit.change(Guid)

  })

})


