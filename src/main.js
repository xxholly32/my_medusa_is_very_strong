// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

// 引入axios后是无法直接在其他组件里使用的，将axios改为Vue的属性即可调用
Vue.http = axios.create({
  timeout: 10000,
  withCredentials: true
})

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else if (to.path !== '/login' && !window.localStorage.medusaUser) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
