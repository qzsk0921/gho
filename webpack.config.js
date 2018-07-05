// var HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入css 单独打包插件
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var packCSS = new ExtractTextPlugin('bundle-user.css')
// module.exports = {
//   entry: ['./views/public/js/rem.js',
//           './views/public/js/module.js'
//   ],
//   output: {
//     filename: 'bundle.min.js'
//   }
//   module: {
//     rules: [
//       { test: /\.css$/,
//         use: [
//               {loader: 'style-loader'},
//               {loader: 'css-loader'}
//         ]
//       }
//     ]
//   },
 // devServer:{
 //      contentBase:path.resolve(__dirname,'dist'), //最好设置成绝对路径
 //      host:'localhost',
 //      port:8090,
 //      open:true,
 //      hot:true
 //  },
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: 'My webpackPage',
//       filename: 'test.html',
//       template: './views/cloudshow/cloudshow.html'
//     })
//   ]
// }

// './views/public/assets/jquery-3.3.1.min.js',

// module.exports = {
//   entry: ['./views/public/assets/jquery.cookie.js',
//           './views/public/assets/jquery.lazyload.min.js',
//           './views/public/assets/bootstrap.min.js'
//   ],
//   output: {
//     filename: 'assets.min.js'
//   }
// }

// module.exports = {
//   entry: ['./views/public/assets/template-web.js',
//           './views/public/assets/jquery.cookie.js',
//           './views/public/assets/jquery.lazyload.min.js',
//           './views/public/assets/jquery.form.js',
//           './views/public/assets/bootstrap.min.js'
//   ],
//   output: {
//     filename: 'assets-user.min.js'
//   }
// }

// pdf js压缩

// module.exports = {
//   entry: ['./views/public/js/rem.js',
//           './views/public/js/filter.js',
//           './views/public/js/admin.js'
//   ],
//   output: {
//     filename: 'bundle-user.min.js'
//   }
// }

// module.exports = {
//   entry: ['./views/public/js/rem.js',
//           './views/public/js/module.js'
//   ],
//   output: {
//     filename: 'bundle.min.js'
//   }
// }

module.exports = {
  entry: ['./views/public/js/rem.js',
          './views/public/js/filter.js',
          './views/public/js/admin.js'
  ],
  output: {
    filename: 'bundle-user.min.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, { 
        test: /\.(jpg|png|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                limit: 8192
            }
          }
        ]
      }
    ]
  },
 // devServer:{
 //      contentBase:path.resolve(__dirname,'dist'), //最好设置成绝对路径
 //      host:'localhost',
 //      port:8090,
 //      open:true,
 //      hot:true
 //  },
  plugins: [
    packCSS
    // new HtmlWebpackPlugin({
    //   title: 'My webpackPage',
    //   filename: 'test.html',
    //   template: './views/User/admin.html'
    // })
  ]
}