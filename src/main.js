import Vue from 'vue'
import App from './App.vue'
import 'babel-polyfill'
import router from './router/index.js'
import store from './store/index.js'
import axios from './public/axios.js'
// 引入全局mixin 方法
import globalMixin from './assets/js/mixin/globalMinxin.js'
// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.less'
import './assets/css/common.less'
import './assets/css/element.less'
// 引入lodash
import _ from 'lodash'
// 引入Mock数据
import './mock/mock'

Vue.use(globalMixin)
Vue.prototype._ = _
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
