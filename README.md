<!--
 * @Description: In User Settings Edit
 * @Author: your Hepeng
 * @Date: 2019-09-11 15:24:24
 * @LastEditTime: 2019-09-16 21:52:22
 * @LastEditors: Please set LastEditors
 -->
# vue3

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
dwadawwa
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### by 何鹏
### 首先 欢迎使用大数据 vue摸板1.0 有很多都是个人使用的经验和习惯 也参考了网上和很多身边人的经验和习惯
### 如发现有不足 bug 以及反人类的情况 请及时与我提建议 我会及时修改


#### 卷 Windows 的文件夹 PATH 列表
#### 卷序列号为 1685-153D
#### 文件目录如下~
C:.
#### │  .editorconfig  统一不同编辑器 代码格式
#### │  .gitignore  忽略提交
#### │  babel.config.js
#### │  node_modules.zip
#### │  package-lock.json
#### │  package.json
#### │  README.md
#### │  tree.txt
#### │  vue.config.js
#### │
#### ├─dist 打包之后的文件
#### │  │  favicon.ico
#### │  │  index.html
#### │  │
#### │  ├─css
#### │  │      app.9640e964.css
#### │  │
#### │  ├─img
#### │  │      logo.82b9c7a5.png
#### │  │
#### │  └─js
#### │
#### ├─node_modules
#### │
#### ├─public  vue3.0 入口文件以及免打包的文件 exe 插件等文件放在这里
#### │  │  favicon.ico
#### │  │  index.html
#### │  │
#### │  └─lib
#### └─src
####    │  App.vue
####    │  example.vue
####    │  main.js
####    │
####    ├─api
####    ├─assets 静态资源目录，公共的静态资源，图片，字体
####    │  ├─css
####    │  │      common.less  项目公共样式 => 可复用的样式 通过BEM约定 类似common-component_header 命名规范命名 虽然看起来很长 但打包后很短
####    │  │      element.less  饿了么UI的公共覆盖样式 一种模块一种即可 如果多种,大概率为设计样式不统一 怼他！css约定如上
####    │  │      reset.less  去除基础样式 引入即可 不可对此文件进行修改
####    │  │      variable.less  Less的全局变量 以及全局样式模块(暂未维护) 引入vue.config.js 删除或弃用此文件 需同步修改config文件
####    │  │
####    │  └─js
####    │  ####    │  README.md
####    │  ####    │
####    │      └─mixin
####    │              globalMinxin.js 全局的mixin文件 放入公用的方法 或者卸载global.js中 **(注意 此文件方法 会混入所有vue实例中，不可在vue实例中覆盖相同名称的方法)**
####    │
####    ├─components
####    │  │  README.md
####    │  │
####    │  └─Configuration_information  视图模块以及公用模块存放文件 注意文件名称参照引入模块相同 文件夹格式按照页面引入序列维护
####    │          definition.vue
####    │          list.less  视图模块的 外链less文件
####    │          ruleList.vue
####    │          statistics.vue
####    │
####    ├─layouts  全局模块以及外层摸板 参照nuxt.js 仅需一人维护即可
####    │      header.vue  头部组件
####    │      home.vue  入口文件
####    │      nav.vue  测导航
####    │      README.md
####    │
####    ├─mock  前端假数据 具体方法看实例
####    │      mock.js
####    │      mock.json
####    │
####    ├─public  公共脚本 配置的存放文件夹 过去一直放在api文件夹中
####    │      axios.js  Axios 的封装
####    │      cookie.js  cookie的封装
####    │      global.js  用来放网关地址等 全局配置变量 方便维护
####    │
####    ├─router
####    │      index.js  路由文件
####    │
####    ├─store
####    │  │  index.js  vuex的入口文件
####    │  │
####    │  └─modules  vuex 按模块进行划分 方便各页面以及功能的维护 尽量减少git或变量重复的情况
####    │          Configuration_information.js  按照模块进行维护 命名应尽量细致 方便区分
####    │          public.js 全局 一般用来维护 导航,用户信息,token等全局数据
####    │    这里有很多人和我提 希望吧state active getter等 继续划分,但参考在华宇的各个项目 这样细化反而会更加麻烦,按照页面或者模块进行划分 也方便开发者书写
####    └─views  放置主路由组件 注意命名规范
####       ├─BaseTableAudit
####       │      visualization.vue
####       │
####        └─Configuration_information
####                configuration.vue


整理了一份 vscode的插件 有兴趣的小伙伴可以安装一下
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
