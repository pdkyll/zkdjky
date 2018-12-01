// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import { createStore } from './store'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
import 'element-ui/lib/theme-chalk/index.css'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)
const store = createStore()
/* eslint-disable no-new */
/*router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (!sessionStorage.getItem('isOk')) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})*/

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
