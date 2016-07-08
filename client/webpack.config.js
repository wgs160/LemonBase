var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path:path.resolve(__dirname, './dist'),
    publicPath: '/dist/', //�滻path�ĵ�ַ
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test:/\.vue$/,loader:'vue'},
      {test:/\.css$/,loader:'style!css'},
      {test:/\.js$/,loader:'babel',exclude:/node_modules/},
      {test:/\.json$/,loader:'json'},
      {test:/\.html$/,loader:'vue-html'},
      {test:/\.(png|jpg|gif|svg)$/,loader:'url',
        query:{
            limit:10000,//С��8k��base64
            name:'[name].[ext]?[hash]'
        }
      }
    ]
  },
  devtool: '#eval-source-map',

  resolve: {
    //root:  path.resolve('./public/'), //����·��
    extensions: ['', '.js', '.json','.vue'],
    alias: {
     // AppAction : 'js/actions/AppAction.js'
    }
  },
  //�ⲿcdn������requireʱ�ı���
  externals: {
    jquery: "jQuery"
  },
  plugins: [
/*    new webpack.ProvidePlugin({//���ر�����ȫ�ֵĲ��
      // Automtically detect jQuery and $ as free var in modules
      // and inject the jquery library
      // This is required by many jquery plugins
      jQuery: "jquery",
      $: "jquery"
    })*/
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
