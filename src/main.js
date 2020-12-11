import Vue from 'vue'

import Vuelidate from 'vuelidate'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
