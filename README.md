<!--
 * @Description: In User Settings Edit
 * @Author: your Hepeng
 * @Date: 2019-09-11 15:24:24
 * @LastEditTime: 2019-09-16 21:55:55
 * @LastEditors: Please set LastEditors
 -->

# vue3

## 使用步奏
```
npm i
npm i add-asset-html-webpack-plugin clean-webpack-plugin uglifyjs-webpack-plugin
npm run dll
npm run serve
```
## DLL优化说明
```
减少静态资源打包时间 将不常用的第三方在webpack.dll.js中配置引用
打包 npm run dll
打包结束后 npm run serve 体验快速的热更新吧~
```

### 更新说明
#### 0.2.0
```
BATE版本
增加dll优化 减少打包速度
增加打包自动去除debug及console
增加全局组件自动挂接功能 使用方式参考 Vue-cli3.0\src\components\common\README.md
修改axios封装 令人头疼的双数据参数 直接传入一个即可
丰富了less封装的代码块
增加ie版本的兼容性 解决IE下白屏现象
```
## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### GIT

```
https://github.com/he8hepeng/myVue-compontent.git
```

### by 何鹏

```
 首先 欢迎使用大数据 vue摸板1.0 有很多都是个人使用的经验和习惯 也参考了网上和很多身边人的经验和习惯
 如发现有不足 bug 以及反人类的情况 请及时与我提建议 我会及时修改
```

### 文件目录如下~

```
C:.
│  .editorconfig   统一不同编辑器 代码格式
│  .gitignore    忽略提交
│  babel.config.js
│  node_modules.zip
│  package-lock.json
│  package.json
│  README.md
│  tree.txt
│  vue.config.js  webpack配置 代理 第三方插件维护等
│  大数据前端规范.docx
│
├─dist  打包之后的文件
│  │  favicon.ico
│  │  index.html
│  │
│  ├─css
│  │      app.9640e964.css
│  │
│  ├─img
│  │      logo.82b9c7a5.png
│  │
│  └─js
│          about.9cae4cc2.js
│          about.9cae4cc2.js.map
│          app.18a724dc.js
│          app.18a724dc.js.map
│          chunk-vendors.aa607577.js
│          chunk-vendors.aa607577.js.map
│

├─public  免打包文件以及插件
│  │  favicon.ico
│  │  index.html
│  │
│  └─lib
└─src
    │  App.vue
    │  example.vue  // 演示文件
    │  main.js
    │
    ├─assets  静态资源目录，公共的静态资源，图片，字体
    │  ├─css
    │  │  │  index.js  main.js 全局入口文件
    │  │  │
    │  │  └─common
    │  │          common.less   项目公共样式 => 可复用的样式 通过BEM约定 类似common-component_header 命名规范命名 虽然看起来很长 但打包后很短
    │  │          element.less  饿了么UI的公共覆盖样式 一种模块一种即可 如果多种,大概率为设计样式不统一 怼他！css约定如上
    │  │          reset.less    去除基础样式 引入即可 不可对此文件进行修改
    │  │          variable.less   Less的全局变量 以及全局样式模块(暂未维护) 引入vue.config.js 删除或弃用此文件 需同步修改config文件
    │  │
    │  │
    │  ├─img
    │  │      logo.png
    │  │
    │  └─js
    │      │  README.md
    │      │
    │      └─mixin
    │              globalMinxin.js   全局的mixin文件 放入公用的方法 或者卸载global.js中 **(注意 此文件方法 会混入所有vue实例中，不可在vue实例中覆盖相同名称的方法)**
    │
    ├─components  视图级模块以及复用模块文件夹
    │  └─Modify-name  演示模块
    │          element.less  演示单一模块引入less文件
    │          exampleCont.vue
    │          README.md
    │          transmit.vue
    │
    ├─config
    │      config.js  网关维护文件
    │      url.js  请求 Url通一维护文件 可模块维护
    │
    ├─layouts  最高级全局模块（仅需项目负责人进行维护）
    │      header.vue
    │      home.vue
    │      nav.vue
    │      README.md
    │
    ├─mock  假数据依赖 仅限开发版本
    │      mock.js
    │      mock.json
    │
    ├─package  全局文件
    │  │  axios.js   axios封装
    │  │  cookie.js  cookie封装 用来存放token等
    │  │
    │  └─util  全局工具
    │          timeUtil.js  封装时间类工具
    │          match.js  封装正则类工具
    │          tool.js  封装操作类工具
    │          util.js  全局工具文件入口（暂未维护 希望各位提供）
    │
    ├─router
    │      index.js  全局路由文件
    │
    ├─store  vuex文件夹
    │  │  index.js  vuex 入口文件
    │  │
    │  └─modules  vuex模块文件夹
    │          public.js  全局vuex（仅限全局 项目负责人进行维护）这里有很多人和我提 希望吧state active getter等 继续划分,但参考在华宇的各个项目 这样细化反而会更加麻烦,按照页面或者模块进行划分 也方便开发者书写
    │
    └─views  路由级模块
```

### 




### 整理了一份 vscode 的插件 有兴趣的小伙伴可以安装一下

```
Auto Close Tag
Beautify
Bracket Pair Colorizer 2
Brackets Light Pro
CSS Peek
Document This
ESLint
GitLens — Git supercharged
HTML CSS Support
JavaScript (ES6) code snippets
Path Intellisense
Prettier - Code formatter
Trailing Spaces
Vetur
vscode-icons

可能会有一些美化插件 有个蛋用啊！~ 总的来说 对代码一如了然 减少阅读成本 节约的时间 上个神儿..睡一会.. 也可观的...对吧
```

### 常见报错

### 文件编译错误
```
These relative modules were not found:

* ./common/reset.less in ./src/assets/css/index.js
* ./common/common.less in ./src/assets/css/index.js
* ./common/element.less in ./src/assets/css/index.js
```
#### 解决方法
```
npm install stylus-loader css-loader style-loader less-loader --save-dev
```

### 调用导出 乱码错误
```
首先排除后台问题后 查看是否引入mock 引入mock会导致下载错误
```