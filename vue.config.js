/*
 * @Author: HePeng
 * @Date: 2020-04-27 09:39:43
 * @Last Modified by: HePeng
 * @Last Modified time: 2020-05-19 10:26:27
 */
const webpack = require('webpack')
const path = require('path')
const IS_PRODUCTION = process.env.NODE_ENV == 'production' // 正式环境
const CompressionPlugin = require('compression-webpack-plugin') // 压缩css js html
const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV) // 修复热更新
const TerserPlugin = require("terser-webpack-plugin"); // 去除console debug
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin') // dll优化
module.exports = {
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  lintOnSave: true, // 是否lint错误
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://localhost:8080', // 代理接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/mock' // 代理的路径
        },
        onProxyReq: function (proxyReq, req, res) {
          // 实在不知道代理后的路径，可以在这里打印出出来看看2
          console.log('原路径：' + req.originalUrl, '代理路径：' + req.path)
        }
      }
    },
    host: 'localhost',
    port: '8080'
  },
  transpileDependencies: ['normalize-url', 'mini-css-extract-plugin', 'prepend-http', 'sort-keys'],
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    config.resolve.alias // 自定义目录别名 感谢 娄赫曦
      .set('@', resolvePath('src'))
      .set('@assets', resolvePath('src/assets'))
      .set('@common', resolvePath('src/components/common')) // 公共模块
    config.resolve.symlinks(true)
    // 解决ie11兼容ES6
    config.entry('main').add('babel-polyfill')
    if (IS_PRODUCTION) {
      /** gzip 压缩 */
      config
        .plugin('compressionPlugin')
        .use(CompressionPlugin)
        .tap(() => [
          {
            test: /\.js$|\.html$|\.css/, //匹配文件名
            threshold: 10240, //超过10k进行压缩
            deleteOriginalAssets: false //是否删除源文件
          }
        ]);
      /** 去掉console.log debugger sourceMap*/
      config.optimization.minimizer([
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            compress: {
            // 关键代码
              warnings: true,
              drop_debugger: true,
              drop_console: true
            }
          }
        })
      ])
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    extract: IS_PROD // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。 生产环境下是 true，开发环境下是 false
  },
  configureWebpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        Snap:
          'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js',
          'window.snapsvg':
          'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'
      }),
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendor-manifest.json')
      }),
      // 将 dll 注入到 生成的 html 模板中
      new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        // dll 引用路径
        publicPath: './vendor',
        // dll最终输出的目录
        outputPath: './vendor'
      })
    )
  }
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/assets/css/common/variable.less') // 需要全局导入的less
      ]
    })
}

function resolvePath (dir) {
  return path.join(__dirname, dir)
}
