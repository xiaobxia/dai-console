import Vue from 'vue'
// import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '../static/web-fonts-with-css/css/fontawesome-all.css'
// import './theme/index.css'
import Element from 'element-ui'
import V_Echarts from 'vue-echarts-directive'
import 'element-ui/lib/theme-chalk/index.css'
import Http from '@/utils/httpUtil'
import numberUtil from '@/utils/numberUtil'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters

import format from './format'

Vue.use(Element, {
  size: 'medium'
})

Vue.prototype.$http = Http

// 格式化
for (const key in format) {
  Vue.prototype[key] = format[key]
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

Vue.prototype.copyKeys = function(keys, raw) {
  const data = {}
  for (const key in keys) {
    if (raw[key] !== undefined) {
      data[key] = raw[key]
    } else {
      data[key] = keys[key]
    }
  }
  return data
}

Vue.prototype.formatExport = function(config, list) {
  const filterVal = []
  const tHeader = []
  for (const key in config) {
    filterVal.push(key)
    tHeader.push(config[key].name)
  }
  const data = list.map(v => filterVal.map(j => {
    if (config[j].count) {
      const params = []
      config[j].countKeys.map((countKey) => {
        params.push(v[countKey])
      })
      return config[j].count(params)
    }
    if (config[j].format) {
      return config[j].format(v[j], config[j].params)
    }
    return v[j] || ''
  }))
  return {
    tHeader,
    data
  }
}

for (const key in numberUtil) {
  Vue.prototype[key] = numberUtil[key]
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
