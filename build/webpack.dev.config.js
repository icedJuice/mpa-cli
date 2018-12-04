const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');



module.exports = {
  entry: {
    index: './src/index/index.js',
    download: './src/download/download.js',
    open: './src/open/open.js',
  },
  output: {
    path: __dirname + "/dist/",
    filename: 'js/[name]-[hash:5].js',
    // publicPath: './static',
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  module: {
    loaders: [
      //解析.js
      {
        test: '/\.js$/',
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
        // query: {
        //     presets: ['env'] 
        // }
      },
      // css处理
      {
        test: /\.vue$/,
        loader: 'vue-loader'

      },
      // css处理
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'

      },
      // less处理
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      // 图片处理
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[name]-[hash:5].[ext]'
        },
      }, {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      }
    ]
  },
  plugins: [
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false
    //     }
    //   },
    //   sourceMap: false,
    //   parallel: true
    // }),
    new ExtractTextPlugin(__dirname + '/assert/css/common.less'),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: __dirname + '/dist/index.html',
      inject: 'head',
      template: 'html-withimg-loader!' + __dirname + "/src/index/index.html",
      chunks: ['index'],
      inlineSource: '.(js|css)$',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      filename: __dirname + '/dist/open.html',
      template: __dirname + "/src/open/open.html",
      chunks: ['open'],
      inlineSource: '.(js|css)$',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
    }),
    new CleanWebpackPlugin(
      ['dist/*', 'dist/*',],　                //匹配删除的文件
      {
        root: __dirname,       　　　　　　　//根目录
        verbose: true,        　　　　　　　 //开启在控制台输出信息
        dry: false        　　　　　　　　　　//启用删除文件
      }
    )
  ],
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
    inline: true,
    hot: true,
    host: 'localhost',
    port: 8888,
    // open: true
  }
}

// 接下来需要将入口使用fs自动读取，
// htmlwebpackplugin 也需要自动生成
// 将dev 与 prod模式分开，不同模式下使用不同的config

// extract-text-webpack-plugin 公共样式分离打包插件