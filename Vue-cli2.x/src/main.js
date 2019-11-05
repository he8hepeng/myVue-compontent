import Vue from 'vue'
import App from './App.vue'
import 'babel-polyfill'
import router from './router/index.js'
import store from './store/index.js'
import axios from './package/axios.js'
// 引入全局mixin 方法
import globalMixin from './assets/js/mixin/globalMinxin.js'
// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局 less
import './assets/css/index.js'
// 引入lodash
import _ from 'lodash'
// 引入自定义
import '@/assets/js/directive/index.js'
// 引入Mock数据
import './package/mock/mock'
// 在公共文件 维护所有接口
import _url from './package/config/url.js'
// 引入公共的util工具
import util from './package/util/util.js'

Vue.use(globalMixin)
Vue.prototype._ = _
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.url = _url
Vue.prototype.util = util

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
