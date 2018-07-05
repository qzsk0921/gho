module.exports = readFile

var ghoapi = require('./api.js')

// var img = $('.avatar-container img')

// var input = $('#avatar_upload')

// 开启监听
// input[0].addEventListener('change', readFile, false)

function readFile() {

  var img = $('.avatar-container img')

  var file = this.files[0]

  var imageType = this.files[0].type

  var PhoneNum = $.cookie('usernum')

  console.log(file)
  //限定上传文件的类型，判断是否是图片类型
  if(!/image\/\w+/.test(file.type)) {

      alert("请检查图片格式")

      return false
  }

  if(this.files[0].size / 1024 >= 2048) {

    alert('请选择小于2M的图片')

    return false

  }

  var reader = new FileReader()

  // 将文件读取为 DataURL
  reader.readAsDataURL(file)

  // 文件读取成功触发
  reader.onload = function(e) {

    var base64Code = this.result
    // result.innerHTML = '<img src="'+this.result+'" alt=""/>'
    // result.html('<img src="'+ this.result + '" alt=""/>')

    img.attr('src', base64Code)

    $('.avatar-popup .keep').unbind().on('click', function() {
      // PhoneNum=$.cookie('usernum');
      console.log(PhoneNum)
      
      $.ajax({

        url: ghoapi.ghoapi + 'User_QinxiePHP/Touxiang.php',
        // url: 'http://192.168.1.166/team/earth/User_QinxiePHP/Touxiang.php',
        type: 'post',
        data: {
          'image': base64Code,
          'PhoneNum': PhoneNum,
          'imageType': imageType
        },
        dataType: 'json',

        success: function (data) {

          // var data = JSON.parse(data)

          console.log(data)

          if(data.code == 1) {

            // console.log(ghoapi + data.data.Touxiang)

            $('.avatar-popup').hide()

            $('.popup').hide()

            // $('.user-info img').attr('src', ghoapi + data.data.Touxiang)

            $('.user-info img').attr('src', base64Code)

            // $.cookie('avatar', base64Code, { expires: 7, path: '/' })

            // $('.loginBtn').attr('src', ghoapi + $.cookie('avatar'))

            // $('.loginBtn').attr('src', base64Code)

            window.location.reload()

            // reload()

            console.log('保存头像成功')

          } else if(data.code == 0) {

            alert('保存头像失败')

          }

        },
        error:function(e){

          alert(e)

        }

      })

    })

  }

}
