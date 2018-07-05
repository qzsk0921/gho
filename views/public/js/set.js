module.exports = userInfoSet

var tools = require('./tools.js')

var reload = require('./load.js')

var ghoapi = require('./api.js')

// var ghoapi = 'http://192.168.1.166/team/earth/'
// var ghoapi = '../../'
// var ghoapi = 'http://www.guihuao.com/earth/'
// var ghoapi = '/ghoapi/'
// var api = 'http://cloud.guihuao.com:8080/team/earth'

function userInfoSet (passwordType) {

  var PhoneNum = $.cookie('usernum')

  // var name = $('#username').val()

  // var email = $('#mail').val()

  // var company = $('#company').val()

  // var address = $('#address').val()

  var onePsd = $.trim($('#one-psd').val())

  var twoPsd = $.trim($('#two-psd').val())

  var type = null

  // function infoSend() {

  //   $.ajax({
  //     url: ghoapi + 'User_QinxiePHP/user_saveAlterInfo.php',
  //     type: 'post',
  //     data: {
  //       'username': name, 
  //       'email': email,
  //       'company': company,
  //       'address': address,
  //       'usernum': PhoneNum
  //     },
  //     dataType: 'json',
  //     success: function (data) {

  //       console.log(data)

  //       // 后台返回字符串false
  //       if(data == 'false') {

  //         alert('用户信息设置失败')

  //         return false

  //       } else {

  //         // alert('用户信息设置设置成功')

          // reload()

  //       }

  //     },
  //     error: function(error) {
        
  //       console.log(error)

  //     }

  //   })

  // }
  // console.log(passwordType)
  // 1代表修改密码,2代表设置密码
  if(passwordType == 1) {
    // 修改密码
    type = 2
    
    if (onePsd == '' && twoPsd == '') {

      tools.infoSend()

      // alert('设置成功')

      $('.info-set-popup').hide('')

      $('.popup').hide('')

      reload()

    } else if (onePsd != '' && twoPsd != '') {

      if(onePsd == twoPsd) {

        alert('不能与原密码一致')

      } else {

        tools.infoSend()

        $.ajax({
          url: ghoapi.ghoapi + 'User_QinxiePHP/user_password.php',
          type: 'post',
          data: {
            'password1': onePsd,
            'password2': twoPsd,
            'type': type,
            'usernum': PhoneNum
          },
          dataType: 'json',
          success: function (data) {

            console.log(data)

            if (data == false) {

              alert('密码修改失败')

              return false

            } else if(data == true) {

              // $('.info-set-popup').hide('')

              // $('.popup').hide('')

              // $('#look').attr({'fill':'#bbb'})

              // $('#time').attr({'fill':'#bbb'})

              // $('#address').attr({'fill':'#bbb'})

              // reload()

            }

          }

        })

        $('.info-set-popup').hide('')

        $('.popup').hide('')

        reload()

      }

    }

  } else {
    // 设置密码
    type = 1

    if (onePsd == '' && twoPsd == '') {

      tools.infoSend()

      // alert('设置成功')

      $('.info-set-popup').hide('')

      $('.popup').hide('')

      reload()

    } else if (onePsd != '' && twoPsd != '') {

      if(onePsd != twoPsd) {

        alert('请输入相同密码')

        return false
        
      } else {

        tools.infoSend()

        $.ajax({
          url: ghoapi.ghoapi + 'User_QinxiePHP/user_password.php',
          type: 'post',
          data: {
            'password1': onePsd,
            'password2': twoPsd,
            'type': type,
            'usernum': PhoneNum
          },
          dataType: 'json',
          success: function (data) {

            console.log(data)

            if(data == false) {

              alert('密码设置失败')

              return false

            } else if (data == true) {

              // alert('密码设置成功')

              // alert('设置成功')

            }

          }

        })

        $('.info-set-popup').hide('')

        $('.popup').hide('')

        reload()

      }

    }

  }

}

