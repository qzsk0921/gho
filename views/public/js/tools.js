module.exports = {
  btnVisible: btnVisible,
  loadHandle: loadHandle,
  infoSend: infoSend,
  search: search
}

var template = require('../assets/template-web.js')

var popupHandle = require('./popup.js')

var ghoapi = require('./api.js')

var PhoneNum = $.cookie('usernum')

// 按钮显示隐藏
function btnVisible(sumPage, addPage) {

  if (sumPage > 1 && (sumPage != addPage)) {

    $('.btn-load').show()

  } else if(sumPage == addPage || sumPage == 0) {

    $('.btn-load').hide()

    // 还原
    addPage = 1
  }

}

// 按钮加载
function loadHandle(addPage, Phonenum, keyword, sort) {
  // var fragment = document.createDocumentFragment()
  var keyword = arguments[2] ? keyword : null

  var sort = arguments[3] ? sort : null

  // addPage += page

  $.ajax({
    beforeSend: function () {

      $('.before-send').css('display', 'block')

      $('.modules').append($('.before-send'))

    },
    url: ghoapi.ghoapi + 'User_QinxiePHP/user_listScene.php',
    // url: '/ghoapi/User_QinxiePHP/user_listScene.php',
    type: 'post',
    data: {
      'page2': addPage,
      'Phonenum': Phonenum,
      'keyword': keyword,
      'sort': sort
    },
    dataType: 'json',
    success: function(data) {

      $('.before-send').css('display', 'none')
      // console.log(data.sumPage, addPage)
      $.each(data.data, function(i, v) {

        if(v.Touxiang) {

          v.Touxiang = ghoapi.ghoapi + v.Touxiang

          // v.Touxiang = base64Code

        }
        
        if(v.coverImg) {

          v.coverImg = ghoapi.ghoapi + v.coverImg

        }

      })

      btnVisible(data.sumPage, addPage)

      $('.modules').append(template('modulesTpl', data))

      // 鼠标经过头像

      $('.avatar-box').on('mouseenter', function() {

        $(this).parent().parent().parent().parent().next().stop(true, true).show()

      })

      // 鼠标离开头像
      $('.avatar-box').on('mouseleave', function() {

        // e.stopPropagation()
        $(this).parent().parent().parent().parent().next().stop(true, true).hide()

      })
      // 鼠标经过对话框
      $('.user-summary').on('mouseenter', function() {

        // e.stopPropagation()

        $(this).show().mouseleave(function() {

          $(this).hide()

        })

      })

      if(PhoneNum && PhoneNum === Phonenum) {

        // $('.info-set').css('display', 'inline-block')

        $('.set').css('display', 'block')

        popupHandle()

      }

      $('img.lazy').lazyload()

    }

  })

}

function infoSend() {

  var PhoneNum = $.cookie('usernum')

  var name = $('#username').val()

  var email = $('#mail').val()

  var company = $('#company').val()

  var address = $('#address').val()

  $.ajax({
    url: ghoapi.ghoapi + 'User_QinxiePHP/user_saveAlterInfo.php',
    type: 'post',
    data: {
      'username': name, 
      'email': email,
      'company': company,
      'address': address,
      'usernum': PhoneNum
    },
    dataType: 'json',
    success: function (data) {

      console.log(data)

      // 后台返回字符串false
      if(data == 'false') {

        alert('用户信息设置失败')

        return false

      } else {

        console.log('用户信息设置成功')
        // alert('用户信息设置设置成功')

        // reload()

      }

    },
    error: function(error) {
      
      console.log(error)

    }

  })

}

// 搜索加载
function search(Phonenum) {

  var searchText = $('.module-search input').val()

  // 预备对象，用于存储匹配出的模块

  // var searchModule = ''

  page = 1

  addPage = 1

  // console.log(searchText)

  if(searchText != '') {

    // searchModule = $('.modules').find('span:contains(' + searchText + ')').parent().parent().parent()

    $.ajax({
      beforeSend: function () {

        $('.before-send').css('display', 'block')

        $('.modules').html($('.before-send'))

      },
      url: ghoapi.ghoapi + 'User_QinxiePHP/user_listScene.php',
      // url: '/ghoapi/User_QinxiePHP/user_listScene.php',
      type: 'post',
      data: {
        'page2': page,
        'Phonenum': Phonenum,
        'keyword': searchText,
        'sort': ''
      },
      dataType: 'json',
      success: function(data) {

        $('.before-send').css('display', 'none')

        // var data = JSON.parse(data)

        $.each(data.data, function(i, v) {

          if(v.Touxiang) {

            v.Touxiang = ghoapi.ghoapi + v.Touxiang

            // v.Touxiang = base64Code

          }
          
          if(v.coverImg) {

            v.coverImg = ghoapi.ghoapi + v.coverImg

          }

        })

        if(data.data.length > 0) {

          $('.modules').html(template('modulesTpl', data))

          if(PhoneNum && PhoneNum === Phonenum) {

            $('.info-set').css('display', 'inline-block')

            $('.set').css('display', 'block')

            popupHandle()

          }

          $('img.lazy').lazyload()

          // 默认加载时间排序的某块，时间svg变色,清除其他颜色
          $('#address').attr({'fill':'#bbb'})

          $('#look').attr({'fill':'#bbb'})

          $('#time').attr({'fill':'#6495ED'})

          btnVisible(data.sumPage, addPage)

          if($('.btn-load')) {

            $('.btn-load').unbind().click(function() {
              // console.log(page)
              loadHandle(page, Phonenum, searchText)

            })

          }

        } else {

          $('.modules').html('')

          btnVisible(data.sumPage, addPage)

        }
      }

    })
    
  } else {

    $.ajax({
      beforeSend: function () {

        $('.before-send').css('display', 'block')

        $('.modules').html($('.before-send'))

      },
      url: ghoapi.ghoapi + 'User_QinxiePHP/user_listScene.php',
      // url: '/ghoapi/User_QinxiePHP/user_listScene.php',
      type: 'post',
      data: {'page2': page,
             'Phonenum': Phonenum
      },
      dataType: 'json',
      success: function(data) {

        $('.before-send').css('display', 'none')

        console.log(data)

        $.each(data.data, function(i, v) {

          if(v.Touxiang) {

            v.Touxiang = ghoapi.ghoapi + v.Touxiang

            // v.Touxiang = base64Code

          }
          
          if(v.coverImg) {

            v.coverImg = ghoapi.ghoapi + v.coverImg

          }

        })

        btnVisible(data.sumPage, addPage)
        //设置按钮
        $('.modules').unbind().on('click', '.set', function (e) {

          e.stopPropagation()

          // $('.set-box').hide()

          $(this).next().stop(true, true).toggle('slow')

          // console.log(this)

        })

        // $('body').click(function () {

        //   $('.set-box').hide('slow')

        // })

        $('.modules').html(template('modulesTpl', data))

        if(PhoneNum && PhoneNum === Phonenum) {

          $('.info-set').css('display', 'inline-block')

          $('.set').css('display', 'block')

          popupHandle()

        }

        $('img.lazy').lazyload()

        // 默认加载时间排序的某块，时间svg变色
        $('#time').attr({'fill':'#6495ED'})

      }

    })

    if($('.btn-load')) {

      $('.btn-load').unbind().click(function() {

        addPage += page

        loadHandle(addPage, Phonenum)

      })

    }

  }

}

