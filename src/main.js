import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '../static/web-fonts-with-css/css/fontawesome-all.css'
// import './theme/index.css'
import Element from 'element-ui'
import V_Echarts from 'vue-echarts-directive'
import 'element-ui/lib/theme-chalk/index.css'
import Http from '@/utils/httpUtil'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: 'medium'
})

Vue.prototype.$http = Http

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

const install = function(Vue) {
  Vue.directive('echarts', V_Echarts)
}
window.echarts = V_Echarts
Vue.use(install); // eslint-disable-line

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
