import Vue from 'vue'
// import 'normalize.css/normalize.css' // A modern alternative to CSS resets
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

Vue.prototype.formatStateSF = function(state) {
  if (state === 1) {
    return '是'
  } else if (state === 0) {
    return '否'
  }
  return '未知'
}

Vue.prototype.formatStateRZ = function(state) {
  if (state === 1) {
    return '认证'
  } else if (state === 0) {
    return '未认证'
  }
  return '未知'
}

Vue.prototype.filterKeys = function(raw, keys) {
  const data = {}
  for (const key in raw) {
    if (keys.indexOf(key) === -1) {
      data[key] = raw[key]
    }
  }
  return data
}

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
