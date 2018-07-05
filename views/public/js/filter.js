// module.exports = {
//   template.defaults.imports.getDateDiff: template.defaults.imports.getDateDiff,
//   template.defaults.imports.blur: template.defaults.imports.blur
// }
var template = require('../assets/template-web.js')

template.defaults.imports.getDateDiff = function(startDate) {

  var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();

  var endTime = new Date().getTime();

  var minutes = Math.abs((startTime - endTime))/(1000*60);

  var dates = Math.abs((startTime - endTime))/(1000*60*60*24);

  var months = Math.abs((startTime - endTime))/(1000*60*60*24*30);

  if(parseInt(minutes) == 0) {

    return 1 + '分钟前'

  } else if(parseInt(minutes) > 0 && minutes < 60) {
  
    return Math.floor(minutes) + '分钟前'

  } else if(dates >= 0 && dates < 7) {

    return Math.floor(dates) + '天前'

  } else if(dates >= 7 && dates < 30) {

    return Math.floor(dates / 7) + '周前'

  } else if(months >= 1 && months < 4) {

    return Math.floor(months) + '个月前'

  } else {
    // return false
    return startDate.split(' ')[0]
  }
     
}

template.defaults.imports.blur = function(phonenum) {

  var blur = phonenum.substr(0, 3) + '****' + phonenum.substr(-3)

  return blur

}