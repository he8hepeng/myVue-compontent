import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config/config'
import axios from './package/axios'
import cookies from './package/cookie'

Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$cookies = cookies
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
