module.exports = popupHandle

function popupHandle () {

  var Guid = null

  // 设置列表框
  $('body').click(function () {

      $('.set-box').hide('slow')

  })

  var phoneNum = $.cookie('usernum')

  var param = location.search.split('=')[1]

  // 首次弹出免注册登录
  $('.loginBtn').on('click', function (e) {

    e.stopPropagation()
    // 登录状态不显示弹出窗
    if(phoneNum && phoneNum == param) {

      return false

    } else if(phoneNum && !param) {

      return false

    } else if(phoneNum && phoneNum != param){

      return false

    } else {

      $('.popup').show()

      $('.login-popup').show()

      $('.login-popup').addClass('fixed-popup')

    }
    
  })
  // 叉号关闭登录窗口
  $('.popup-close').on('click', function (e) {
    // alert('afd')
    e.stopPropagation()

    $('.login-popup').hide()

    $('.loginpwd-popup').hide()

    $('.info-set-popup').hide()

    $('.avatar-popup').hide()

    $('.module-change-popup').hide()

    $('.module-report-popup').hide() 

    $('.popup').hide()

  })
  // 取消关闭登录窗口
  $('.cancel').on('click', function (e) {

    e.stopPropagation()

    $('.login-popup').hide()

    $('.loginpwd-popup').hide()

    $('.info-set-popup').hide()

    $('.avatar-popup').hide()

    $('.popup').hide()

  })
  //弹窗外单击关闭窗口
  $('.transparent').on('click', function (e) {

    e.stopPropagation()

    $('.login-popup').hide()

    $('.loginpwd-popup').hide()

    $('.info-set-popup').hide()

    $('.avatar-popup').hide()

    $('.module-edit-popup').hide()

    $('.module-change-popup').hide()

    $('.module-report-popup').hide() 

    $('.popup').hide()

  })
  // 切换登录方式
  $('.switch-pwd').click(function (e) {

    e.stopPropagation()

    $('.login-popup').hide()

    $('.loginpwd-popup').show()

    $('.loginpwd-popup').addClass('fixed-popup')

  })

  $('.switch-nopwd').click(function (e) {

    e.stopPropagation()

    $('.loginpwd-popup').hide()

    $('.login-popup').show()

  })

  // 用户信息设置
  $('.info-set').on('click', function (e) {

    e.stopPropagation()

    var password = $(this).attr('data-password')

    console.log(password)

    if(password == 1) {

      $('.text').html('<label class="form-label text" for="one-psd">修 改 登 录 密 码</label>')

      $('#one-psd').attr('placeholder', '输入原始密码')

      $('#two-psd').attr('placeholder', '输入新密码')

    }

    $('.popup').show()

    $('.info-set-popup').show()

  })

  // 上传头像
  $('.user-info .avatar').on('click', function (e) {

    e.stopPropagation()

    if(phoneNum && phoneNum == param) {

      $('.popup').show()

      $('.avatar-popup').show()

    } else if (phoneNum) {

      $('.popup').show()

      $('.avatar-popup').show()

    } else {

      $(this).unbind()

    }

  })
  // 模块编辑
  $('.modules').on('click', '#edit', function(e) {

    // e.stopPropagation()

    Guid = $(this).attr('data-Guid')

    $('#Guid-pop').val(Guid)

    // console.log(Guid)

    var checkbox = document.querySelectorAll('.item-box')

    for (var i = checkbox.length - 1; i >= 0; i--) {
      
      // checkbox[i].addEventListener('click', classHandle)

      checkbox[i].onclick = function() {

        this.classList.toggle('checked')

      }

    }

    $('.popup').show()

    $('.module-edit-popup').show()

    $('.module-edit-popup').addClass('fixed-popup')

  })
  // 易主
  $('.modules').on('click', '#change', function(e) {

    // e.stopPropagation()
    Guid = $(this).attr('data-Guid')

    $('#Guid-pop').val(Guid)

    $('.popup').show()

    $('.module-change-popup').show()

    $('.module-change-popup').addClass('fixed-popup')

  })
  // 上报
  $('.modules').on('click', '#report', function(e) {

    // e.stopPropagation()

    Guid = $(this).attr('data-Guid')

    $('#Guid-pop').val(Guid)

    $('.popup').show()

    $('.module-report-popup').show()

    $('.module-report-popup').addClass('fixed-popup')

  })

  // 删除
  $('.modules').on('click', '#delete', function() {

    usernum = $(this).attr('data-admin')

    Guid = $(this).attr('data-Guid')

    // e.stopPropagation()

    if(PhoneNum != usernum) {

      type = 2

      // moduleDel(usernum, Guid, type)

      moduleEdit.moduleDel(usernum, Guid, type)

    } else {

      type = 1

      // moduleDel(usernum, Guid, type)

      moduleEdit.moduleDel(usernum, Guid, type)

    }

  })

}
