module.exports = reload

var popupHandle = require('./popup.js')

var readFile = require('./uploadavatar.js')

var userInfoSet = require('./set.js')

var sort = require('./sort.js')

var template = require('../assets/template-web.js')

var tools = require('./tools.js')

var ghoapi = require('./api.js')

var addPage = 1

function reload () {

  var addPage = 1

  var PhoneNum = $.cookie('usernum')

  var page = 1

  var password = null

  var param = location.search.split('=')[1]

  if(location.search.split('=')[0].substr(1) === 'id') {

    // var param = location.search.split('=')[1]
    // console.log(param)

    $.ajax({
      url: ghoapi.ghoapi + 'User_QinxiePHP/huoquInfo.php',
      type: 'post',
      data: {'Phonenum': param},
      dataType: 'json',
      success: function(data) {

        console.log(data)

        if(data.Touxiang) {

          data.Touxiang = ghoapi.ghoapi + data.Touxiang

        }

        $('.user-info').html(template('infoTpl', data))

        if(PhoneNum && PhoneNum == param) {

          $('.profile').text('您好！ ' + param)

          $('.info-set-popup').html(template('setInfoTpl', data))

          if(!data.Touxiang) {

            $('.avatar-container img').attr('src', '../public/images/avatar.jpeg')

          } else {

            $('.avatar-container img').attr('src', data.Touxiang)

          }

          $('.info-set').css('display', 'inline-block')

          // // 鼠标经过离开账号
          // $('.user-header .loginBtn').mouseenter(function () {

          //   $('.hover-menu').stop(true, true).slideDown()

          // }).mouseleave(function() {

          //   $('.hover-menu').stop(true, true).slideUp()

          // })
          // // 鼠标经过下拉菜单
          // $('.hover-menu').mouseenter(function () {

          //   $(this).stop(true, true).show()

          // }).mouseleave(function () {

          //   $(this).stop(true, true).slideUp()

          // })
          var input = $('#avatar_upload')
          // 开启监听上传文件(头像)
          input.unbind().on('change', readFile)

          // 1代表有密码,2代表没有密码
          $('.info-set-popup').unbind().submit(function (e) {

            e.stopPropagation()

            var password = $('.info-set').attr('data-password')

            userInfoSet(password)

            return false

          })

        }
        // 加载模块
        $.ajax({
          beforeSend: function () {

            $('.before-send').css('display', 'block')

            $('.modules').html($('.before-send'))

          },
          url: ghoapi.ghoapi + 'User_QinxiePHP/user_listScene.php',
          // url: '/ghoapi/User_QinxiePHP/user_listScene.php',
          type: 'post',
          data: {'page2': page,
                 'Phonenum': param
          },
          dataType: 'json',
          success: function(data) {

            console.log(data)

            $('.before-send').css('display', 'none')

            if(data.data == []) {

              if(PhoneNum && PhoneNum == param) {

                // $('.loginBtn').attr('src', ghoapi + $.cookie('avatar'))

                popupHandle()

              }

              $('.modules').html('')

            } else {

              $.each(data.data, function(i, v) {

                if(v.Touxiang) {

                  v.Touxiang = ghoapi.ghoapi + v.Touxiang

                  // v.Touxiang = base64Code

                }
                
                if(v.coverImg) {

                  v.coverImg = ghoapi.ghoapi + v.coverImg

                }

              })

              tools.btnVisible(data.sumPage, addPage)

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

              // // 鼠标经过头像

              // $('.modules').on('mouseenter', '.avatar-box', function(e) {

              //   // e.stopPropagation()

              //   $(this).parent().parent().parent().parent().next().stop(true, true).show()

              // })
              // // 鼠标离开头像
              // $('.modules').on('mouseleave', '.avatar-box', function(e) {

              //   // e.stopPropagation()

              //   $(this).parent().parent().parent().parent().next().stop(true, true).hide()

              // })
              // // 鼠标经过对话框
              // $('.modules').on('mouseenter', '.user-summary', function(e) {

              //   // e.stopPropagation()

              //   $(this).show().mouseleave(function() {

              //     $(this).hide()

              //   })

              // })

              // 根据url参数和cookie判断是否为本人
              // var mobileid = window.location.pathname.substr(1)
              // var mobileid = location.search.split('=')[1]
              // var PhoneNum = $.cookie('phonenum')

              if(PhoneNum && PhoneNum === param) {

                // $('.loginBtn').attr('src', ghoapi + $.cookie('avatar'))

                // $('.info-set').css('display', 'inline-block')

                $('.set').show()

                $('.modules').unbind().on('click','.set', PhoneNum, function(e) {

                  e.stopPropagation()

                  $('.set-box').not($(this)).hide('')

                  $(this).next().stop(true, true).toggle('slow')

                  usernum = $(this).attr('data-admin')

                  Guid = $(this).attr('data-Guid')

                  if(PhoneNum != usernum) {

                    // console.log($(this).next().children('.set-list').children('#edit'))

                    // $(this).next().children('.set-list').children('#edit').prop('disabled', true)

                    // $(this).next().children('.set-list').children('#change').prop('disabled', true)

                    // $(this).next().children('.set-list').children('#load').prop('disabled', true)

                    $(this).next().children('.set-list').children('#edit').css('display', 'none')

                    $(this).next().children('.set-list').children('#change').css('display', 'none')

                    $(this).next().children('.set-list').children('#load').css('display', 'none')

                  }

                })

                popupHandle()

              }

              // 懒加载
              // console.log($('img.lazy'))
              $('img.lazy').lazyload()

              // 默认加载时间排序的某块，时间svg变色
              $('#time').attr({'fill':'#6495ED'})

              // 点击加载更多(普通加载)
              $('.btn-load').unbind().click(function() {

                addPage += page

                tools.loadHandle(addPage, param)

              })
              
              // 点击搜索
              $('.search').click(function() {
                
                tools.search(param)

              })
              // 回车键搜索
              $('.module-search input').change(function() {

                tools.search(param)

              })

              // 按地址排序
              $('.module-yun .address').click(function() {

                sort(page, param, '.address', 'position')

              })

              // 按浏览量排序
              $('.look').click(function() {

                sort(page, param, '.look', 'view')

              })

              // 按时间排序
              $('.time').click(function() {

                sort(page, param, '.time', 'time')

              })

            }
          
          },
          error: function(e) {

            console.log(e)

          }

        })

      },
      error: function(e) {

        console.log(e)

      }

    })
  
  } else if (PhoneNum && location.search == ''&& /User\/$/.test(location.pathname)) {

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

    $.ajax({
      url: ghoapi.ghoapi + 'User_QinxiePHP/huoquInfo.php',
      type: 'post',
      data: {'Phonenum': PhoneNum},
      dataType: 'json',
      success: function(data) {

        console.log(data)

        if(data.Touxiang) {

          data.Touxiang = ghoapi.ghoapi + data.Touxiang

        }

        $('.user-info').html(template('infoTpl', data))

        if(!param) {

          $('.info-set-popup').html(template('setInfoTpl', data))

          if(!data.Touxiang) {

            $('.avatar-container img').attr('src', '../public/images/avatar.jpeg')

          } else {

            $('.avatar-container img').attr('src', data.Touxiang)

          }

          $('.info-set').css('display', 'inline-block')

          var input = $('#avatar_upload')
          // 开启监听上传文件(头像)
          input.unbind().on('change', readFile)

          // 1代表有密码,2代表没有密码
          $('.info-set-popup').unbind().submit(function (e) {

            e.stopPropagation()

            var password = $('.info-set').attr('data-password')

            userInfoSet(password)

            return false

          })

        }
        // 加载模块
        $.ajax({
          beforeSend: function () {

            $('.before-send').css('display', 'block')

            $('.modules').html($('.before-send'))

          },
          url: ghoapi.ghoapi + 'User_QinxiePHP/user_listScene.php',
          // url: '/ghoapi/User_QinxiePHP/user_listScene.php',
          type: 'post',
          data: {'page2': page,
                 'Phonenum': PhoneNum
          },
          dataType: 'json',
          success: function(data) {

            console.log(data)

            $('.before-send').css('display', 'none')

            if(data.data == []) {

              if(PhoneNum) {

                // $('.loginBtn').attr('src', ghoapi + $.cookie('avatar'))

                popupHandle()

              }

              $('.modules').html('')

            } else {

              $.each(data.data, function(i, v) {

                if(v.Touxiang) {

                  v.Touxiang = ghoapi.ghoapi + v.Touxiang

                  // v.Touxiang = base64Code

                }
                
                if(v.coverImg) {

                  v.coverImg = ghoapi.ghoapi + v.coverImg

                }

              })

              tools.btnVisible(data.sumPage, addPage)

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

              // // 鼠标经过头像
              // $('.modules').on('mouseenter', '.avatar-box', function(e) {

              //   // e.stopPropagation()

              //   $(this).parent().parent().parent().parent().next().stop(true, true).show()

              // })
              // // 鼠标离开头像
              // $('.modules').on('mouseleave', '.avatar-box', function(e) {

              //   // e.stopPropagation()

              //   $(this).parent().parent().parent().parent().next().stop(true, true).hide()

              // })
              // // 鼠标经过对话框
              // $('.modules').on('mouseenter', '.user-summary', function(e) {

              //   // e.stopPropagation()

              //   $(this).show().mouseleave(function() {

              //     $(this).hide()

              //   })

              // })

              // 根据url参数和cookie判断是否为本人
              // var mobileid = window.location.pathname.substr(1)
              // var mobileid = location.search.split('=')[1]
              // var PhoneNum = $.cookie('phonenum')

              if(PhoneNum && (!param)) {

                // $('.loginBtn').attr('src', ghoapi + $.cookie('avatar'))

                // $('.info-set').css('display', 'inline-block')

                $('.set').show()

                $('.modules').unbind().on('click','.set', PhoneNum, function(e) {

                  e.stopPropagation()

                  $('.set-box').not($(this)).hide('')

                  $(this).next().stop(true, true).toggle('slow')

                  usernum = $(this).attr('data-admin')

                  Guid = $(this).attr('data-Guid')

                  if(PhoneNum != usernum) {

                    // console.log($(this).next().children('.set-list').children('#edit'))

                    // $(this).next().children('.set-list').children('#edit').prop('disabled', true)

                    // $(this).next().children('.set-list').children('#change').prop('disabled', true)

                    // $(this).next().children('.set-list').children('#load').prop('disabled', true)

                    $(this).next().children('.set-list').children('#edit').css('display', 'none')

                    $(this).next().children('.set-list').children('#change').css('display', 'none')

                    $(this).next().children('.set-list').children('#load').css('display', 'none')

                  }

                })

                popupHandle()

              }

              // 懒加载
              // console.log($('img.lazy'))
              $('img.lazy').lazyload()

              // 默认加载时间排序的某块，时间svg变色
              $('#look').attr({'fill':'#bbb'})

              $('#address').attr({'fill':'#bbb'})

              $('#time').attr({'fill':'#6495ED'})

              // 点击加载更多(普通加载)
              $('.btn-load').unbind().click(function() {

                addPage += page

                tools.loadHandle(addPage, PhoneNum)

              })
              
              // 点击搜索
              $('.search').click(function() {
                
                tools.search(PhoneNum)

              })
              // 回车键搜索
              $('.module-search input').change(function() {

                tools.search(PhoneNum)

              })

              // 按地址排序
              $('.module-yun .address').click(function() {

                sort(page, PhoneNum, '.address', 'position')

              })

              // 按浏览量排序
              $('.look').click(function() {

                sort(page, PhoneNum, '.look', 'view')

              })

              // 按时间排序
              $('.time').click(function() {

                sort(page, PhoneNum, '.time', 'time')

              })

            }
          
          },
          error: function(e) {

            console.log(e)

          }

        })

      },
      error: function(e) {

        console.log(e)

      }

    })

  } else if(PhoneNum) {

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

  } else {

    return false

  }

}
