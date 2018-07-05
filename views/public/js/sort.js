module.exports = sort

var template = require('../assets/template-web.js')

var tools = require('./tools.js')

var popupHandle = require('./popup.js')

var ghoapi = require('./api.js')

function sort(page, Phonenum, svgClass, sort) {

  var PhoneNum = $.cookie('usernum')

  var param = location.search.split('=')[1]

  var page = 1

  var addPage = 1

  if(svgClass === '.address') {

    $('#look').attr({'fill':'#bbb'})

    $('#time').attr({'fill':'#bbb'})

    $('#address').attr({'fill':'#ef7070'})

  } else if(svgClass === '.look') {

    $('#look').attr({'fill':'#f6c946'})

    $('#time').attr({'fill':'#bbb'})

    $('#address').attr({'fill':'#bbb'})

  } else if(svgClass === '.time') {

    $('#look').attr({'fill':'#bbb'})

    $('#time').attr({'fill':'#6495ED'})

    $('#address').attr({'fill':'#bbb'})

  }
  
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
      'keyword': null,
      'sort': sort
    },
    dataType: 'json',
    success: function(data) {

      $.each(data.data, function(i, v) {

        if(v.Touxiang) {

          v.Touxiang = ghoapi.ghoapi + v.Touxiang

        }
        
        if(v.coverImg) {

          v.coverImg = ghoapi.ghoapi + v.coverImg

        }

      })
      
      $('.before-send').css('display', 'none')

      $('.modules').html(template('modulesTpl', data))

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

      if(PhoneNum && PhoneNum === param) {

        // $('.info-set').css('display', 'inline-block')

        $('.set').css('display', 'block')

        popupHandle()

      } else if(Phonenum && (!param)) {

        $('.set').css('display', 'block')

        popupHandle()

      }

      $('img.lazy').lazyload()

      tools.btnVisible(data.sumPage, addPage)

    }

  })

  if($('.btn-load')) {

    $('.btn-load').unbind().click(function() {

      addPage += page

      tools.loadHandle(addPage, Phonenum, null, sort)

    })

  }

}