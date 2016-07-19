var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlwebpackPlugin = require("html-webpack-plugin");

//源码地址
var SRC_PATH = path.resolve(__dirname, './client/src');
//编译地址
var DIST_PATH = path.resolve(__dirname, './client/dist');

//存放公共css
var libCss = new ExtractTextPlugin("./css/lib.css");
//存放项目css
var lemonCss = new ExtractTextPlugin("./css/lemon.[hash].css");

module.exports = {
  entry:{
    app:[SRC_PATH+'/main.js'],
    vendors: ['vue','vue-router'] //单独分离的库
  } ,
  output: {
    path:DIST_PATH,
    //publicPath: '/dist/', //替换path的地址
    filename: '/js/[name].[hash].js'
  },
  module: {
    loaders: [
      {test:/\.vue$/,loader:'vue'},
      {test:/\.css$/,loader:libCss.extract("style", 'css-loader')},
      {test:/\.less/,loader:lemonCss.extract("style", 'css-loader!less-loader')},
      {test:/\.js$/,loader:'babel',exclude:/node_modules/},
      {test:/\.json$/,loader:'json'},
      {test:/\.html$/,loader:'vue-html'},
      {test: /\.(png|jpg|gif)$/, loader: 'url',
        query: {
          limit: 10000,//小于8k用base64,不写这个参数就会被直接输出
          name: 'images/[name].[ext]?[hash]'
        }
      }
      ,
      {test:/\.(woff|woff2|svg|eot|ttf)$/,loader:'url',
        query:{
            limit: 10000,//小于8k用base64
            name:'font/[name].[ext]?[hash]'
        }
      }
    ]
  },
  devtool: '#cheap-source-map',

  resolve: {
    //root:  path.resolve('./public/'), //绝对路径
    extensions: ['', '.js', '.css','.json','.vue','.less'],
    modulesDirectories: [
      'node_modules'
    ],
    alias: {
      //mPath : 'js/actions/AppAction.js'
    }
  },
  //外部cdn引用在require时的别名
  externals: {
    jquery: "jQuery"
  },
  plugins: [
/*    new webpack.ProvidePlugin({//挂载变量到全局的插件,key对应的val是可以为模块名或alias的别名地址
      // Automtically detect jQuery and $ as free var in modules
      // and inject the jquery library
      // This is required by many jquery plugins
      jQuery: "jquery",
      $: "jquery"
    })*/

    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
      //独立css文件
    libCss,lemonCss,
      //对自定义模板载入模块
    new HtmlwebpackPlugin({
      template: './client/index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['app', 'vendors'],
      inject: 'body'
    })
  ]
}

/*
if (process.env.NODE_ENV === 'production') {
}
*/
