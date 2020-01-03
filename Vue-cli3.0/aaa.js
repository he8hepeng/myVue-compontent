首页
下载APP
搜索
webpack进阶——DllPlugin优化打包性能（基于vue-cli）

yozosann
webpack进阶——DllPlugin优化打包性能（基于vue-cli）

yozosann
0.513
2017.08.09 20:21:51
字数 1,769
阅读 5,402
本文主要介绍两个插件：DllPlugin和DllReferencePlugin，后者配合前者使用。

Github地址：dll-test
介绍：
打包会输出一个类dll包（dll包源于windows的动态链接库），这些代码本身不会执行，主要是提供给我们的业务代码引用。（比如dll中有一个工具方法为时间格式化，这个方法本身并不会执行，但是当我们的业务中需要执行时间格式化时，就会引用这个方法在我们的业务中执行时间格式化）。

简言之：
将静态资源文件（运行依赖包）与源文件分开打包，先使用DllPlugin给静态资源打包，再使用DllReferencePlugin让源文件引用资源文件。

作用：
当我们一个项目引入了多个较大的包以后，这些包本身并不会运行，我们也不会修改这些包的代码，但是每当我们修改了业务代码之后，这些包也会被重新打包。极大的浪费了时间，这时我们就需要使用这个工具预先把静态资源提前打包，以后修改源文件再打包时就不会打包这些静态资源文件了。

我们以最简单的vue-cli生成的项目为例：

step 1：基础安装
## 全局安装vue-cli脚手架
npm install vue-cli -g

## 初始化项目
vue init webpack-simple dll-test
cd dll-test

## 安装基础配置包
npm install

## 安装依赖模块（静态资源）
npm install vuex vue-router axios lodash element-ui -S
目录结构：



step 2：使用依赖及打包测试
我们进入main.js，引入我们所安装的静态资源，结果为：

import Vue from 'vue'
import App from './App.vue'
import _ from 'lodash'
import vuex from 'vuex'
import ElementUI from 'element-ui'
import axios from 'axios'
import vueRouter from 'vue-router'

new Vue({
  el: '#app',
  render: h => h(App)
})
为了看到我们打包了哪些模块，我们进入package.json改下scripts：

  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  },
去掉build的 --hide-modules 结果为 "build": "cross-env NODE_ENV=production webpack --progress"

## 编译打包
npm run build

可以看见Time：13769ms，打包花费了近14秒，element全套以及刚才我们引入的各种包全部被打包了。
我们才引入了六个包而已，就已经花费了14秒，如果以后还要加上各种包及其他行为，打包时间难以想象。
这也就是我们为什么要引入dllPlugin的原因！
step 3：预打包依赖模块
我们知道，我们刚才所引入的vue或者vuex之类的，我们只是使用它们，并不会改变它们的源码，它们本身也不会运行，那么我们就可以把这些模块拆分出来提前打包。
那么如何提前打包它们呢？ 我们在这根目录再创建一个webpack配置文件（webpack.dll.config.js），既然这个文件是webpack配置文件，那么它的格式肯定也和普通的webpack一样：

var path = require("path");
var webpack = require("webpack");

module.exports = {
  // 你想要打包的模块的数组
  entry: {
    vendor: ['vue', 'lodash', 'vuex', 'axios', 'vue-router', 'element-ui']
  },
  output: {
    path: path.join(__dirname, './static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library' 
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library', 
      context: __dirname
    }),
    // 压缩打包的文件，与该文章主线无关
    new webpack.optimize.UglifyJsPlugin({ 
      compress: {
        warnings: false
      }
    })
  ]
};
重点：这里引入的Dllplugin插件，该插件将生成一个manifest.json文件，该文件供webpack.config.js中加入的DllReferencePlugin使用，使我们所编写的源文件能正确地访问到我们所需要的静态资源（运行时依赖包）。

path：manifest.json生成的文件夹及名字，该项目让它生成在了根目录下。
name：和output. library保持一致即可。
context：选填，manifest文件中请求的上下文，默认为该webpack文件上下文。（！！！我在学习这个插件时一直没有成功的坑点之一！！，这个上下文必须必须同webpack.config.js中DllReferencePlugin插件的context所指向的上下文保持一致！！）
编写该webpack配置之后，我们就可以预打包资源文件了！！
## 以指定webpack文件执行webpack打包
webpack --config ./webpack.dll.config.js
咦？？这句话是不是有点难记，我们加入package.json里吧。

  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress",
    "dll": "webpack --config ./webpack.dll.config.js"
  },
打包：


可见花费了8s，dll已经创建成功！！

可见我们的目录结构中多生成了static目录，打包好的dll文件（js/vendor.dll.js）就放在该目录下，除此之外根目录中还生成了vendor-manifest.json。
现在我们已经不再需要将使用的那些包同源文件一起打包了，但是这也需要在源文件的webpack中配置DllReferencePlugin使用vendor-manifest.json来引用这个dll。
step 4：打包源文件
这一步我们只需要改写vue-cli为我们生成好的webpack.config.js即可：

var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    // ...（省略未复制，并不是删除了module里的东西）
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    })
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
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
该文件里主要是添加了plugins配置：

plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    })
  ]
context：与Dllplugin里的context所指向的上下文保持一致，这里都是指向了根目录。
manifest：引入Dllplugin所生成的的manifest。
你以为完了？ 其实还没有。
我们需要手动在根目录的index.html里引入所生成的dll库。

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>dll-test</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./static/js/vendor.dll.js"></script>
    <script src="/dist/build.js"></script>
  </body>
</html>
这里也很讲究，也是我之前失败的原因之一！！我之前直接把<script src="./static/js/vendor.dll.js"></script>写到了<script src="/dist/build.js"></script>的后面，导致一直报错！其实这里稍微动动脑筋就能明白，我们在main.js中引入的各种包，而main.js最终被打包为了build.js，那么我们肯定要先把包引进来才能正确使用build.js啊！所以vendor.dll.js必须放在build.js之前引入。

激动人心的时刻到来了！！我们只需要npm run dev！

！！！看时间Time：3528ms，比起之前的14秒我们整整缩短了10秒！节约时间就是节约生命啊！！
你以为完了？？其实还没有，注意看图片的小伙伴都注意到了一个问题：
 [2] ./~/vue/dist/vue.esm.js 268 kB {0} [built]
注意到了这一行，vue好像还是和源文件打包到了一起，通过了一番寻找，发现问题出现在这里：
webpack.config.js中：

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
不太了解到可以去看看：resolve中文文档

这就代表main.js中的import Vue from 'vue' 其实是引用的'vue/dist/vue.esm.js'，而webpack.dll.config.js并不知道vue指代的是'vue/dist/vue.esm.js'，所以我们需要修改webpack.dll.config.js配置：
将

  entry: {
    vendor: ['vue', 'lodash', 'vuex', 'axios', 'vue-router', 'element-ui']
  },
改为

  entry: {
    vendor: ['vue/dist/vue.esm.js', 'lodash', 'vuex', 'axios', 'vue-router', 'element-ui']
  },
由于我们修改了webpack.dll.config.js，所以我们需要重新打包：

## 重新打包dll
npm run dll
## 重新打包源文件
npm run build
最终结果：

Time：1426ms超神了！！！我们只需要 1.5秒就能打包成功了！！
到这里优化就结束了，但是有个小麻烦，我们每次上线的时候需要新建文件夹，然后把index.html复制粘贴进去，再把dist目录粘贴进去，还要把static粘贴进去再上线，我们不希望那么麻烦。

step 5：提取整个文件夹
首先安装几个插件：

npm install html-webpack-plugin copy-webpack-plugin clean-webpack-plugin --save-dev
然后我们修改webpack.config.js配置：

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'build.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: path.join(__dirname, 'dist')
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'static', to: 'static' }
    ]),
    new CleanWebpackPlugin(['dist'])
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
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
差别一：
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'build.[hash].js'
  },
加了hash值，清除浏览器缓存
publicPath: '/': 由于index.html需要打包到dist目录下，故'build.[hash].js'的引用路径由/dist/变为/
差别二：
主要是在plugins新添加了三个插件(千万不能加在if里，否则开发环境会出错)：

    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    }),
    new CopyWebpackPlugin([
      {from: 'static', to:'static'}
    ]),
    new CleanWebpackPlugin(['dist'])
html-webpack-plugin：我们要index.html生成在dist目录里，故引用html-webpack-plugin，它默认将生成的index.html打包在output的文件夹下，由于index.html需要引用打包好的静态dll，且vue需要挂载在根组件div#app上，故需要引入模版，模版为根目录下index.html：
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>dll-test</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./static/js/vendor.dll.js"></script>
  </body>
</html>
inject:true：将打包好的js文件注入在该html的body底部，保证了script的加载顺序。
copy-webpack-plugin：由于我们要引入static/js/中的dll，且是在dist文件下，故用该插件将打包好的静态文件夹拷贝到打包目录dist下。
clean-webpack-plugin：打包前清除dist目录
差别三：
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: path.join(__dirname, 'dist')
  },
contentBase: path.join(__dirname, 'dist')，这是为了在dev环境下，提供index.html的目录改为dist，与生产环境的访问文件路径保持一致。

最后：
npm run dev就可以愉快的开发啦，npm run build就可以以极速打包好dist目录且上线啦。！！！

参考资料：
提高 webpack 构建 Vue 项目的速度
怎样令webpack的构建加快十倍、DllPlugin的用法
LIST OF PLUGINS
build performance

"小礼物走一走，来简书关注我"
还没有人赞赏，支持一下
  
yozosann
学习才能赚钱
总资产4 (约0.45元)共写了9.1W字获得233个赞共107个粉丝


写下你的评论...
全部评论
3

死宅程序员
3楼 2018.12.31 18:12
dll 是不是也应该带上 hash。

yozosann
2019.01.31 11:39
可以带上 这些就是按项目需求来

飞呀飞_fd1d
2楼 2018.07.05 18:57
element-ui 没有引用css样式, 很纠结DllPlugin怎么把element-ui的css一起打包进去
被以下专题收入，发现更多相似内容

Web前端之路

让前端飞

前端开发那些事

webpack学习

vue+web...
推荐阅读
更多精彩内容
如何写一手漂亮的 Vue
前几日听到一句生猛与激励并存，可怕与尴尬同在，最无奈也无解的话：“90后，你的中年危机已经杀到”。这令我很受触动。...

晚晴幽草
阅读 8,619
评论 23
赞 176

webpack 2 打包实战
写在开头 先说说为什么要写这篇文章, 最初的原因是组里的小朋友们看了webpack文档后, 表情都是这样的: (摘...

Lefter
阅读 2,835
评论 2
赞 30
细说前端自动化打包工具--webpack
记得2004年的时候，互联网开发就是做网页，那时也没有前端和后端的区分，有时一个网站就是一些纯静态的html，通过...

IT且听风吟
阅读 1,639
评论 0
赞 5

基于 webpack 的前后端分离开发环境实践
背景 随着互联网应用工程规模的日益复杂化和精细化，我们在开发一个标准web应用的早已开始告别单干模式，为了提升开发...

我有故事乄你有酒吗
阅读 1,711
评论 0
赞 5

Vue.js学习系列四 —— Webpack学习实践
这两周一直想写webpack的知识点，却发现webpack其实要将webpack说的具体内容还是挺多的。而且稀土掘...

VioletJack
阅读 10,840
评论 1
赞 51

广告

yozosann
总资产4 (约0.45元)
Javascript Import maps
阅读 66
深入webpack4源码（三）—— complier
阅读 110
推荐阅读
var 与 let 区别
阅读 16,011
vs code添加open with code功能，实现右键打开文件夹
阅读 769
添加数字千分位逗号正则分析
阅读 58
JS 中的IIFE 和闭包
阅读 221
Vue-cli v4 正式版来啦
阅读 318
广告
写下你的评论...
