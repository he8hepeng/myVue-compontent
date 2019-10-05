import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 首页重定向
    {
      path: '/',
      name: '',
      redirect: '/index'
    },
    // 错误重定向
    {
      path: '*',
      name: '',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'entrance',
      component: () =>
          import('../layouts/home.vue'),
      children: [{
        path: '/index/example',
        name: 'example',
        component: () =>
            import(/* webpackChunkName: 'about' */ '../example.vue') // 仅作为 功能演示及方法查询 后期将会删除
      }]
    }
  ]
})
