// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import { createStore } from './store'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(echarts)
const store = createStore()
/* eslint-disable no-new 判断是否登陆跳转路由*/
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (!sessionStorage.getItem('isOk')) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
