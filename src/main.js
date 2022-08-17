// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BFVApp from './BFVApp'
import router from './router'

import * as echarts from 'echarts'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
Vue.prototype.$gloval = {}

/* eslint-disable no-new */
new Vue({
  el: '#BFVApp',
  router,
  vuetify,
  components: { BFVApp },
  template: '<BFVApp/>'
})
