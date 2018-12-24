import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '../static/web-fonts-with-css/css/fontawesome-all.css'
// import './theme/index.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Http from '@/utils/httpUtil'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$http = Http

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
