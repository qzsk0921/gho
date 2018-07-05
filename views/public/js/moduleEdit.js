module.exports = {
  moduleEdit: moduleEdit,
  moduleDel: moduleDel,
  report: report,
  change: change
}

var reload = require('./load.js')

var ghoapi = require('./api.js')

function moduleEdit(Guid) {

  var keywords = null

  // $('#module-edit-form .GuidHidden').val(Guid)

  // $('#module-edit-form').submit(function() {

    keywords = $("input[type='checkbox']:checked").serializeArray()

    var keywordsArr = []

    $.each(keywords, function(i, v) {

      keywordsArr.push(v.value)

    })

    console.log(keywordsArr)

    // $('#module-edit-form .keywordsHidden').val(keywordsArr)

    // $(this).ajaxSubmit({
    //   url: ghoapi + 'User_QinxiePHP/user_sceneEdit.php',
    //   type: 'post',
    //   data: {
    //     keywords: keywordsArr,
    //     // Guid: Guid,
    //     // title: $('#displayName').val(),
    //     // discript: $('#description').val(),
    //   },
    //   dataType: 'json',
    //   success: function(data) {

    //     console.log(data)

    //     if(data === true) {

    //       $('#module-edit-popup').hide('slow')

    //       $('.popup').hide('slow')

    //       console.log('模块编辑成功')

    //       reload()

    //     }

    //   },
    //   error: function(error){

    //     console.log(error)
    //   }

    // })

    $.ajax({
      url: ghoapi.ghoapi + 'User_QinxiePHP/user_sceneEdit.php',
      type: 'post',
      data: {
        keywords: keywordsArr,
        Guid: Guid,
        title: $('#displayName').val(),
        discript: $('#description').val(),
      },
      dataType: 'json',
      success: function(data) {

        console.log(data)

        if(data == true) {

          $('.module-edit-popup').hide('')

          $('.popup').hide('')

          console.log('模块编辑成功')

          reload()

        }

      },
      error: function(error){

        console.log(error)

      }

    })

  // })

}

// function moduleTip (modEditTitle, modEditDes, keyword) {



// }

function moduleDel(usernum, Guid, type) {

  $.ajax({
    url: ghoapi.ghoapi + 'User_QinxiePHP/user_delScene.php',
    type: 'post',
    data: {
      Guid: Guid,
      usernum: usernum,
      type: type
    },
    dataType: 'json',
    success: function(data) {

      console.log(data)
      if(data == true) {

        console.log('删除成功')

        reload()

      } else if(data == false) {

        alert('删除失败')

      } else {

        return false

      }

    },
    error: function(error) {

      console.log(error)

    }

  })

}

function report(Guid) {

  var phonenum = $('#report-input').val()

  var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/

  console.log(phonenum)

  // var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/

  if(!phonereg.test(phonenum)) {

    alert('账号错误')

    return false

  } else {

    $.ajax({
      url: ghoapi.ghoapi + 'User_QinxiePHP/user_sceneShangbao.php',
      data: {
        phonenum: phonenum,
        Guid: Guid
      },
      type: 'post',
      dataType: 'json',
      success: function(data) {

        console.log(data)

        if(data == true) {

          $('.module-report-popup').hide('')

          $('.popup').hide('')

          alert('上报成功')

        } else if(data == false) {

          alert('上报失败')

        } else if(data == 'chongfu') {

          alert('重复')

        } else {

          return false

        }

      },
      error: function(e) {

        console.log(e)

      }
      
    })

  }

}

function change(Guid) {
  
  var phonenum = $('#change-input').val()
  // console.log(phonenum)

  $.ajax({
    url: ghoapi.ghoapi + 'User_QinxiePHP/user_sceneYizhu.php',
    data: {
      phonenum: phonenum,
      Guid: Guid
    },
    type: 'post',
    dataType: 'json',
    success: function(data) {

      console.log(data)

      if(data.code == true) {

        console.log('易主成功')

        $('.module-change-popup').hide('')

        $('.popup').hide('')

        alert('易主成功')
        // console.log($("div[data-summary=" + Guid + "]").find('.avatar-min'))

        // $("div[data-summary=" + Guid + "]").chidlren('.summary-right p:first').text(data.data.UserName)
        // console.log($("div[data-summary=" + Guid + "]").chidlren('.summary-right p:second').text(data.data.UserName))

        // $("div[data-summary=" + Guid + "]").chidlren('.summary-right').last().text(data.data.UserName)

        // $("div[data-summary=" + Guid + "]").find('.avatar-min').attr('src', data.data.Touxiang)
        reload()

      } else if(data.code == false) {

        console.log('易主失败')

        alert('没有此用户')

      } else {

        return false

      }

    }
    
  })

}