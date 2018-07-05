module.exports = login

var popupHandle = require('./popup.js')

var reload = require('./load.js')

var ghoapi = require('./api.js')

function login() {
  // 手机号
  var mobileid = null

  // 验证码
  var code = null

  var password = null

  var phonereg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/

  // 获取验证码
  $('.verification').click(function (e) {

    e.stopPropagation()

    mobileid = $('#mobileid-noreg').val()
    // 手机号校验
    if(!phonereg.test(mobileid)) {

      $('#mobileid-noreg').val('').attr('placeholder', '请输入有效的手机号码!')

      return false

    } else {

       $('#mobileid-noreg').attr('placeholder', '')
       console.log(mobileid)
       // 发送验证码
       $.ajax({
        url: ghoapi.ghoapi + 'login/sendyzm.php',
        type: 'post',
        data: {
          mobile: mobileid
        },
        dataType: 'json',
        success: function(data) {

          console.log(data)

          // 60s倒计时
          if(data == 1) {

            $('.verification').css('cursor', 'auto').prop('disabled', true)

            var second = 60

            var count = setInterval(function() {

              second --

              $('.second').text(second + 's')

              if(second <= 0) {

                clearInterval(count)

                $('.verification').css('cursor', 'pointer').prop('disabled', false)

                $('.second').text('获 取 验 证 码')

              }

            }, 1000)

          } else {

            return false

          }

        }

      })

    }

  })

  // 免注册登录

  $('#login-noreg').click(function (e) {

    e.stopPropagation()

    mobileid = $('#mobileid-noreg').val()

    code = $('#verification').val()

    console.log(mobileid, code)

    if(mobileid === '') {

      $('#mobileid-noreg').val('').attr('placeholder', '请输入手机号码!')


    } else if(!phonereg.test(mobileid)) {

      $('#mobileid-noreg').val('').attr('placeholder', '请输入有效的手机号码!')
      

    } else if(phonereg.test(mobileid) && !code) {

      $('#verification').val('').attr('placeholder', '请输入验证码!')


    } else {
      
      $.post(ghoapi.ghoapi + 'login/register.php', {mobileid: mobileid, yzm: code}, function (data) {

        console.log(data)

        if(data == 'false') {

          $('#verification').val('').attr('placeholder', '验证码错误!')

          console.log(data)

        } else {

          // 登录成功
          $('.login-popup').hide()

          $('.popup').hide()

          // $('.login .iconfont').css('color', 'rgb(246, 200, 42)')
   
          console.log(data)

          // 添加权限 设置cookie

          $('.info-set').css('display', 'inline-block')

          $('.set').css('display', 'block')

          // $('.loginBtn').attr('src', ghoapi + $.cookie('avatar'))

          popupHandle()

          // $.each(data.data[0], function (key, val) {

          //   $.cookie(key, val, { expires: 7, path: '/' })

          // })

          $.cookie('usernum', data[0].PhoneNum, { expires: 7, path: '/' })

          PhoneNum = $.cookie('usernum')

          // location.href = '?id=' + mobileid

          reload()

          // $.cookie('avatar', data.data[0].Touxiang, { expires: 7, path: '/' })

        }

      }, 'json')

    }
    
  })

  $(document).keyup(function(e) {
    
    // console.log(e.keyCode)

    if(e.keyCode == 13 && $('.login-popup').css('display') == 'block') {

      $('#login-noreg').click()

    } else if(e.keyCode == 13 && $('.loginpwd-popup').css('display') == 'block') {

      $('#login-reg').click()

    }
      
  })

  // 密码登录
  $('#login-reg').click(function () {

    mobileid = $('#mobileid-reg').val()

    password = $('#password').val()

    
    if(mobileid == '') {

      $('#mobileid-reg').val('').attr('placeholder', '请输入手机号码!')

      return false

    }
    // else if(!phonereg.test(mobileid)) {

    //   $('#mobileid-reg').val('').attr('placeholder', '请输入有效的手机号码!')

    //   return false

    // }
     else if(password == '') {

      $('#password').val('').attr('placeholder', '请输入密码!')

      return false

    } else {
      console.log(password)

      $.post(ghoapi.ghoapi + 'login/login.php', {mobile: mobileid, pwd: password}, function (data) {

        // var data = JSON.parse(data)

        console.log(data)

        if(data.code == 0) {

          $('#password').val('').attr('placeholder', '用户名或密码错误!')

          return false

        } else if(data.code == 1) {

          console.log(data)

          $('.loginpwd-popup').hide()

          $('.popup').hide()

          // $('.login .iconfont').css('color', 'rgb(246, 200, 42)')

          $('.info-set').css('display', 'inline-block')

          $('.set').css('display', 'block')

          // $('.loginBtn').attr('src', ghoapi + $.cookie('avatar'))

          popupHandle()

          // $.each(data.data[0], function (key, val) {

          //   $.cookie(key, val, { expires: 7, path: '/' })

          // })

          $.cookie('usernum', data.data[0].PhoneNum, { expires: 7, path: '/' })

          PhoneNum = $.cookie('usernum')

          // location.href = '?id=' + mobileid

          reload()

          // $.cookie('avatar', data.data[0].Touxiang, { expires: 7, path: '/' })

        }

      }, 'json')

    }

  })

  // 退出登录
  $('.logout').on('click', function() {

    $.cookie('usernum', '', { expires: 7, path: '/' })

    // location.href = "./"

  })

}




// $(function() {
//   // 手机号
//   var mobileid = null

//   // 验证码
//   var code = null

//   var password = null

//   var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/

//   // 获取验证码
//   $('.verification').click(function (e) {

//     e.stopPropagation()

//     mobileid = $('#mobileid-noreg').val()
//     // 手机号校验
//     if(!phonereg.test(mobileid)) {

//       $('#mobileid-noreg').val('').attr('placeholder', '请输入有效的手机号码!')

//       return false

//     } else {

//        $('#mobileid-noreg').attr('placeholder', '')
//        console.log(mobileid)
//        // 发送验证码
//        $.ajax({
//         url: ghoapi + 'login/sendyzm.php',
//         type: 'post',
//         data: {
//           mobile: mobileid
//         },
//         dataType: 'json',
//         success: function(data) {

//           console.log(data)

//           // 60s倒计时
//           if(data == 1) {

//             $('.verification').css('cursor', 'auto').prop('disabled', true)

//             var second = 60

//             var count = setInterval(function() {

//               second --

//               $('.second').text(second + 's')

//               if(second <= 0) {

//                 clearInterval(count)

//                 $('.verification').css('cursor', 'pointer').prop('disabled', false)

//                 $('.second').text('获 取 验 证 码')

//               }

//             }, 1000)

//           } else {

//             return false

//           }

//         }

//       })

//     }

//   })

//   // 免注册登录

//   $('#login-noreg').click(function (e) {

//     e.stopPropagation()

//     mobileid = $('#mobileid-noreg').val()

//     code = $('#verification').val()

//     console.log(mobileid, code)

//     if(mobileid === '') {

//       $('#mobileid-noreg').val('').attr('placeholder', '请输入手机号码!')


//     } else if(!phonereg.test(mobileid)) {

//       $('#mobileid-noreg').val('').attr('placeholder', '请输入有效的手机号码!')
      

//     } else if(phonereg.test(mobileid) && !code) {

//       $('#verification').val('').attr('placeholder', '请输入验证码!')


//     } else {
      
//       $.post(ghoapi + 'login/register.php', {mobileid: mobileid, yzm: code}, function (data) {

//         console.log(data)

//         if(data == 'false') {

//           $('#verification').val('').attr('placeholder', '验证码错误!')

//           console.log(data)

//         } else {

//           // 登录成功
//           $('.login-popup').hide()

//           $('.popup').hide()

//           // $('.login .iconfont').css('color', 'rgb(246, 200, 42)')
   
//           console.log(data)

//           // 添加权限 设置cookie

//           $('.info-set').css('display', 'inline-block')

//           $('.set').css('display', 'block')

//           // $('.loginBtn').attr('src', ghoapi + $.cookie('avatar'))

//           popupHandle()

//           // $.each(data.data[0], function (key, val) {

//           //   $.cookie(key, val, { expires: 7, path: '/' })

//           // })

//           $.cookie('usernum', data[0].PhoneNum, { expires: 7, path: '/' })

//           PhoneNum = $.cookie('usernum')

//           // location.href = '?id=' + mobileid

//           reload()

//           // $.cookie('avatar', data.data[0].Touxiang, { expires: 7, path: '/' })

//         }

//       }, 'json')

//     }
    
//   })

//   $(document).keyup(function(e) {
    
//     // console.log(e.keyCode)

//     if(e.keyCode == 13 && $('.login-popup').css('display') == 'block') {

//       $('#login-noreg').click()

//     } else if(e.keyCode == 13 && $('.loginpwd-popup').css('display') == 'block') {

//       $('#login-reg').click()

//     }
      
//   })

//   // 密码登录
//   $('#login-reg').click(function () {

//     mobileid = $('#mobileid-reg').val()

//     password = $('#password').val()

    
//     if(mobileid == '') {

//       $('#mobileid-reg').val('').attr('placeholder', '请输入手机号码!')

//       return false

//     }
//     // else if(!phonereg.test(mobileid)) {

//     //   $('#mobileid-reg').val('').attr('placeholder', '请输入有效的手机号码!')

//     //   return false

//     // }
//      else if(password == '') {

//       $('#password').val('').attr('placeholder', '请输入密码!')

//       return false

//     } else {
//       console.log(password)

//       $.post(ghoapi + 'login/login.php', {mobile: mobileid, pwd: password}, function (data) {

//         // var data = JSON.parse(data)

//         console.log(data)

//         if(data.code == 0) {

//           $('#password').val('').attr('placeholder', '用户名或密码错误!')

//           return false

//         } else if(data.code == 1) {

//           console.log(data)

//           $('.loginpwd-popup').hide()

//           $('.popup').hide()

//           // $('.login .iconfont').css('color', 'rgb(246, 200, 42)')

//           $('.info-set').css('display', 'inline-block')

//           $('.set').css('display', 'block')

//           // $('.loginBtn').attr('src', ghoapi + $.cookie('avatar'))

//           popupHandle()

//           // $.each(data.data[0], function (key, val) {

//           //   $.cookie(key, val, { expires: 7, path: '/' })

//           // })

//           $.cookie('usernum', data.data[0].PhoneNum, { expires: 7, path: '/' })

//           PhoneNum = $.cookie('usernum')

//           // location.href = '?id=' + mobileid

//           reload()

//           // $.cookie('avatar', data.data[0].Touxiang, { expires: 7, path: '/' })

//         }

//       }, 'json')

//     }

//   })

//   // 退出登录
//   $('.logout').on('click', function() {

//     $.cookie('usernum', '', { expires: 7, path: '/' })

//     // location.href = "./"

//   })

// })