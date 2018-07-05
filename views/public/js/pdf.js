// var ghoapi = require('./api.js')

var gho3dapi = 'http://192.168.1.166/team/3dspace/PHP/pdfCalPrice.php'
// var gho3dapi = '../../../3dspace/PHP/pdfCalPrice.php'
// var gho3dapi = 'http://192.168.1.166/team/3dspace/PHP/pdfCalPrice.php'
// var ghoapi = 'http://www.guihuao.com/earth/'
// var ghoapi = '/ghoapi/'
// var api = 'http://cloud.guihuao.com:8080/team/earth'

function pdfLoad() {

    function getSearch() {

        var searchItemArr = location.search.substr(1).split('&')

        var searchArr = []

        searchItemArr.forEach(function(v) {

            searchArr.push(v.split('=')[1])

        })

        return searchArr

    }



    console.log(encodeURI(getSearch()[6]))

    if(getSearch()[9] == 'mi') {

        $('#distance span:nth-child(1)').text((Number(getSearch()[2]) + Number(getSearch()[3])) * 10000 + '平方米')

        $('#distance span:nth-child(2)').text(getSearch()[2] * 10000 + '平方米')

        $('#distance span:nth-child(3)').text(getSearch()[3] * 10000 + '平方米')

    } else if(getSearch()[9] == 'mu') {

        $('#distance span:nth-child(1)').text((Number(getSearch()[2]) + Number(getSearch()[3])) * 15 + '亩')

        $('#distance span:nth-child(2)').text(getSearch()[2] * 15 + '亩')

        $('#distance span:nth-child(3)').text(getSearch()[3] * 15+ '亩')

    } else if(getSearch()[9] == 'gq') {

        $('#distance span:nth-child(1)').text(Number(getSearch()[2]) + Number(getSearch()[3]) + '公顷')

        $('#distance span:nth-child(2)').text(getSearch()[2] + '公顷')

        $('#distance span:nth-child(3)').text(getSearch()[3] + '公顷')

    } else if(getSearch()[9] == 'pfgl') {

        $('#distance span:nth-child(1)').text((Number(getSearch()[2]) + Number(getSearch()[3])) / 100 + '平方公里')

        $('#distance span:nth-child(2)').text(getSearch()[2] / 100 + '平方公里')

        $('#distance span:nth-child(3)').text(getSearch()[3] / 100 + '平方公里')

    }
    
    $('#totalarea span:nth-child(1)').text(Number(getSearch()[4]) + Number(getSearch()[5]))

    $('#totalarea span:nth-child(2)').text(getSearch()[4])

    $('#totalarea span:nth-child(3)').text(getSearch()[5])

    $('#address span').text(decodeURI(getSearch()[6]))

    $('#point span').text(getSearch()[7]+'E,'+getSearch()[8]+'N')

    $.ajax({
        url: gho3dapi,
        data: {
          dis: getSearch()[0],
          totalarea: getSearch()[1]
        },
        type: 'post',
        dataType: 'json',
        success: function(data) {

            console.log(data)

            if(data.realCost >= 0.8) {

                // $('.suggest').html('提示: 本次项目的采集建模费占比已达到<span></span>%，性价较高。')
                $('.suggest').html('')             
                // $('.suggest span:nth-child(1)').text((data.realCost * 100).toFixed(0))
            
            } else {

                $('.suggest span:nth-child(1)').text((data.realCost * 100).toFixed(0))

                $('.suggest span:nth-child(2)').text(data.jianyiArea)

            }

            $('#totalPrice span:nth-child(1)').text(data.sumPrice)

            $('#totalPrice span:nth-child(2)').text((data.realCost * 100).toFixed(0))

            $('#totalPrice span:nth-child(3)').text((100 - data.realCost * 100).toFixed(0))

            $('#totalPrice span:nth-child(1)').text(data.sumPrice)

            $('.oneD td:nth-child(2)').text(data.junPrice['1'])

            $('.oneD td:nth-child(3)').text(data.junPrice['1d'])

            $('.twoD td:nth-child(2)').text(data.junPrice['2'])

            $('.twoD td:nth-child(3)').text(data.junPrice['2d'])

            $('.fiveD td:nth-child(2)').text(data.junPrice['5'])

            $('.fiveD td:nth-child(3)').text(data.junPrice['5d'])

            $('.tenD td:nth-child(2)').text(data.junPrice['10'])

            $('.tenD td:nth-child(3)').text(data.junPrice['10d'])

            $('.tenMore td:nth-child(2)').text(data.junPrice['other'])

            $('.tenMore td:nth-child(3)').text(data.junPrice['otherd'])

            $('.tfoot span:nth-child(1)').text(data.zuidi / 10000)

            if(getSearch()[9] == 'mi') {

                $('.tfoot span:nth-child(2)').text(data.zuidiforarea * 10000 + '平方米')

            } else if(getSearch()[9] == 'mu') {

                $('.tfoot span:nth-child(2)').text(data.zuidiforarea * 15 + '亩')

            } else if(getSearch()[9] == 'gq') {

                $('.tfoot span:nth-child(2)').text(data.zuidiforarea + '公顷')

            } else if(getSearch()[9] == 'pfgl') {

                $('.tfoot span:nth-child(2)').text(data.zuidiforarea / 100 + '平方公里')

            }

            // function getRandomColor() {

            //     return "rgb(" +
            //             parseInt((Math.random()*4+6)/10*256) +
            //             "," +
            //             parseInt((Math.random()*4+6)/10*256) +
            //             "," +
            //             parseInt((Math.random()*4+6)/10*256) +
            //             ")"
            // }
            var getColor = ['rgb(255, 127, 80)', '#f6c946']

            function angleToRadian(angle) {

                    return angle / 180 * Math.PI

            }
            // 数据
            var costRate = [data.realCost , 1-data.realCost]

            var sum = 0

            // 给数据求和
            // costRate.forEach(function(v) {

            //     sum += v

            // })
            // 根据数据总和算出比例，并且求出角度
            angleArr = costRate.map(function(v) {

                // var rate = v / sum

                var angle = 360 * v

                return angle

            })

            // arc(x, y, radius, startAngle, endAngle, antiClockwise)
            var cas = document.querySelector('#cas')

            var ctx = cas.getContext('2d')

            var x = cas.width / 2

            var y = cas.height / 2

            var r = cas.height / 2 - 10

            var startAngle = -90

            var startRectangleBottom = 0

            var text = ['采集与建模费','其他费用']

            // 弧度/2π = 角度/360

            angleArr.forEach(function(v, i) {

                ctx.beginPath()

                // ctx.fillStyle = getRandomColor()

                ctx.fillStyle = getColor[i]

                ctx.moveTo(x, y)

                ctx.arc(x, y, r, angleToRadian(startAngle), angleToRadian(startAngle+v))

                ctx.closePath()

                ctx.fill()

                // ctx.rect(x+100,y+45+startRectangleBottom,40,12)

                ctx.rect(x+100,y+45+startRectangleBottom,40,12)

                ctx.closePath()

                ctx.fill()

                ctx.font = "12px Arial"

                ctx.fillStyle = "#000"

                ctx.textAlign = 'left'

                ctx.textBaseline="top"

                ctx.fillText(text[i], x+100+50, y+45+startRectangleBottom)

                ctx.font = "bold 15px Arial"

                ctx.textAlign = 'center'

                ctx.textBaseline="middle"

                // ctx.fillText(Math.floor(v / 360 * 100) + '%', x+r/2*Math.cos((startAngle+v/2)/180*Math.PI), y+r/2*Math.sin((startAngle+v/2)/180*Math.PI))
                // Math.ceil(v / 360 * 100) + '%'
                ctx.fillText( (costRate[i] * 100).toFixed(0) + '%', x+r/2*Math.sin((startAngle+v/2+90)/180*Math.PI), y-r/2*Math.cos((startAngle+v/2+90)/180*Math.PI))

                startAngle += v

                startRectangleBottom += 23

            })

        }
    })

}

pdfLoad()

document.getElementById("btn-html2canvas").onclick = function() {

    // $('#container').scrollTop = 0
    $('html,body').animate({scrollTop: '0px'}, 1)

    var container = document.getElementById("container")

    container.style.background = "#FFFFFF"


    // 将 id 为 container 的 div 渲染成 canvas
    html2canvas(container, {
     
        // scale:2,
        // dpi:144,
        // 渲染完成时调用，获得 canvas
        onrendered: function(canvas) {

            // canvas.width = (canvas.width * 10)

            // canvas.height = (canvas.height * 10)

            var contentWidth = canvas.width

            var contentHeight = canvas.height

            //一页pdf显示html页面生成的canvas高度;
            var pageHeight = contentWidth / 595.28 * 841.89
            //未生成pdf的html页面高度
            var leftHeight = contentHeight
           // var leftHeight = 595.28 / contentWidth * contentHeight
            //页面偏移
            var position = 0
            // //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            var imgWidth = 595.28
            var imgHeight = 595.28/contentWidth * contentHeight

            // // 从 canvas 提取图片数据
            var imgData = canvas.toDataURL('image/png', 1.0)

            // imgData.width = canvas.width

            // imgData.height = canvas.height

            // var doc = new jsPDF("p", "mm", "a4")

            var doc = new jsPDF('', 'pt', 'a4')
            // 842×595                              |
            // |—————————————————————————————|                     
            // A0 841×1189                           
            // A1 594×841                            
            // A2 420×594                            
            // A3 297×420                            
            // A4 210×297                            
            // A5 148×210                            
            // A6 105×148                            
            // A7 74×105                             
            // A8 52×74                              
            // A9 37×52                              
            // A10 26×37             
            //     |——|———————————————————————————|
            //                                 |——|——|
            //                                 |     |      
            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            // if (leftHeight < pageHeight) {

            //     doc.addImage(imgData, 'png', 0, 0, imgWidth, imgHeight )

            // } else {

            //     while(leftHeight > 0) {

            //         doc.addImage(imgData, 'png', 0, position, imgWidth, imgHeight)

            //         leftHeight -= pageHeight

            //         position -= 841.89

            //         //避免添加空白页
            //         if(leftHeight > 0) {

            //           doc.addPage()

            //         }

            //     }

            // }

            if(leftHeight <= pageHeight) {

                doc.addImage(imgData, 'png', 0, 0, imgWidth, imgHeight)

            } else {

                while(leftHeight > 0) {

                    doc.addImage(imgData, 'png', 0, position, imgWidth, imgHeight)

                    // leftHeight -= (contentWidth / 595.28 * 841.89)

                    console.log(leftHeight)

                    leftHeight -= pageHeight

                    position -= 841.89

                    if(leftHeight > 0) {

                        doc.addPage()

                    }

                }

            }

            // doc.addHTML('<div>dfsgdfg</div>')

            // doc.addHTML($('.content-two'), function() {doc.save()})

            // doc.addImage(imgData, 'png', 0, 0, 595.28, 595.28/contentWidth * contentHeight)

            doc.save('规划圈报价单明细.pdf')
        }
    })

}

$('#container .today').text('(' + new Date().toLocaleDateString() + ')')

// function getRandomColor() {

//     return "rgb(" +
//             parseInt((Math.random()*4+6)/10*256) +
//             "," +
//             parseInt((Math.random()*4+6)/10*256) +
//             "," +
//             parseInt((Math.random()*4+6)/10*256) +
//             ")"
// }

// function angleToRadian(angle) {

//         return angle / 180 * Math.PI

// }

// // 数据
// var data = [30, 90]

// var sum = 0

// // 给数据求和
// data.forEach(function(v) {

//     sum += v

// })
// // 根据数据总和算出比例，并且求出角度
// angleArr = data.map(function(v) {

//     var rate = v / sum

//     var angle = 360 * rate

//     return angle

// })

// // arc(x, y, radius, startAngle, endAngle, antiClockwise)
// var cas = document.querySelector('#cas')

// var ctx = cas.getContext('2d')

// var x = cas.width / 2

// var y = cas.height / 2

// var r = cas.height / 2 - 10

// var startAngle = -90

// var startRectangleBottom = 0

// var text = ['采集与建模费','其他']

// // 弧度/2π = 角度/360

// angleArr.forEach(function(v, i) {

//     ctx.beginPath()

//     ctx.fillStyle = getRandomColor()

//     ctx.moveTo(x, y)

//     ctx.arc(x, y, r, angleToRadian(startAngle), angleToRadian(startAngle+v))

//     ctx.closePath()

//     ctx.fill()

//     // ctx.rect(x+100,y+45+startRectangleBottom,40,12)

//     ctx.rect(x+100,y+45+startRectangleBottom,40,12)

//     ctx.closePath()

//     ctx.fill()

//     ctx.font = "12px Arial"

//     ctx.fillStyle = "#000"

//     ctx.textAlign = 'left'

//     ctx.textBaseline="top"

//     ctx.fillText(text[i], x+100+50, y+45+startRectangleBottom)

//     ctx.font = "16px Arial"

//     ctx.textAlign = 'center'

//     ctx.textBaseline="middle"

//     // ctx.fillText(Math.floor(v / 360 * 100) + '%', x+r/2*Math.cos((startAngle+v/2)/180*Math.PI), y+r/2*Math.sin((startAngle+v/2)/180*Math.PI))
    
//     ctx.fillText(Math.floor(v / 360 * 100) + '%', x+r/2*Math.sin((startAngle+v/2+90)/180*Math.PI), y-r/2*Math.cos((startAngle+v/2+90)/180*Math.PI))

//     startAngle += v

//     startRectangleBottom += 23

// })




// var index = 0

// var endAngle = -90

// var step = 1

// var id = setInterval(function() {

//     ctx.moveTo(x, y)

//     if(startAngle > angleArr[index] + endAngle) {

//         ctx.beginPath()

//         ctx.fillStyle = getRandomColor()

//         endAngle += angleArr[index]

//         index ++

//         if(index >= angleArr.length) {

//             clearInterval(id)

//             return
//         }
//     }

//     if(startAngle >= 270) {

//         startAngle = 270
//     }

//     console.log(startAngle)

//     ctx.arc(x, y, r, angleToRadian(startAngle), angleToRadian(startAngle + step))

//     ctx.closePath()

//     // ctx.font = "18px scans-serif"

//     // ctx.fillText(Math.floor(v / 360 * 100) + '%', x + Math.sin(90 - startAngle / 2) * Math.sin(startAngle / 2) * (r / 2), y)

//     ctx.fill()

//     startAngle += step

// }, 17)
