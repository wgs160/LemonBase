var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlwebpackPlugin = require("html-webpack-plugin");

//Դ���ַ
var SRC_PATH = path.resolve(__dirname, './client/src');
//�����ַ
var DIST_PATH = path.resolve(__dirname, './client/dist');

//��Ź���css
var libCss = new ExtractTextPlugin("./css/lib.css");
//�����Ŀcss
var lemonCss = new ExtractTextPlugin("./css/lemon.[hash].css");

module.exports = {
  entry:{
    app:[SRC_PATH+'/main.js'],
    vendors: ['vue','vue-router'] //��������Ŀ�
  } ,
  output: {
    path:DIST_PATH,
    //publicPath: '/dist/', //�滻path�ĵ�ַ
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
          limit: 10000,//С��8k��base64,��д��������ͻᱻֱ�����
          name: 'images/[name].[ext]?[hash]'
        }
      }
      ,
      {test:/\.(woff|woff2|svg|eot|ttf)$/,loader:'url',
        query:{
            limit: 10000,//С��8k��base64
            name:'font/[name].[ext]?[hash]'
        }
      }
    ]
  },
  devtool: '#cheap-source-map',

  resolve: {
    //root:  path.resolve('./public/'), //����·��
    extensions: ['', '.js', '.css','.json','.vue','.less'],
    modulesDirectories: [
      'node_modules'
    ],
    alias: {
      //mPath : 'js/actions/AppAction.js'
    }
  },
  //�ⲿcdn������requireʱ�ı���
  externals: {
    jquery: "jQuery"
  },
  plugins: [
/*    new webpack.ProvidePlugin({//���ر�����ȫ�ֵĲ��,key��Ӧ��val�ǿ���Ϊģ������alias�ı�����ַ
      // Automtically detect jQuery and $ as free var in modules
      // and inject the jquery library
      // This is required by many jquery plugins
      jQuery: "jquery",
      $: "jquery"
    })*/

    //������ļ��������������verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
      //����css�ļ�
    libCss,lemonCss,
      //���Զ���ģ������ģ��
    new HtmlwebpackPlugin({
      template: './client/index.html',
      //chunks����������߲��Ҫ����entry������ļ������
      chunks: ['app', 'vendors'],
      inject: 'body'
    })
  ]
}

/*
if (process.env.NODE_ENV === 'production') {
}
*/
