const path = require('path');
const webpack = require('webpack');
const config = require('../config/index');

module.exports = {
    entry: {
        index: ''
    },
    output: {
        path: __dirname + "/dist/",
        filename: 'js/[name]-[hash:5].js',
        publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
    },
    loader: [
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
}