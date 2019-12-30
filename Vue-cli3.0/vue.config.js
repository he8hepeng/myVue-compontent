const webpack = require('webpack')
const path = require('path')
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
          // 实在不知道代理后的路径，可以在这里打印出出来看看
          console.log('原路径：' + req.originalUrl, '代理路径：' + req.path)
        }
      }
    },
    host: 'localhost',
    port: '8080'
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    config.resolve.alias // 自定义目录别名 感谢 娄赫曦
      .set('@', resolvePath('src'))
      .set('@assets', resolvePath('src/assets'))
      .set('@common', resolvePath('src/components/common')) // 公共模块
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    extract: true // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。 生产环境下是 true，开发环境下是 false
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
        // snapsvg: 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js',
        // 'window.snapsvg': 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'  snapsvg 3.0插件引入写法
      })
    ]
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
