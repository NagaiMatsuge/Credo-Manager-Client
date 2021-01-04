import Vue from "vue";

import Vuelidate from "vuelidate";
import axios from "axios";
import vueTopprogress from "vue-top-progress";
import DynamicSelect from 'vue-dynamic-select'
import Paginate from './utils/vuejs-paginate'

import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueEcho from 'vue-echo-laravel';


Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(vueTopprogress);
Vue.use(DynamicSelect)
Vue.use(Vuelidate);
Vue.use(VueEcho, {
  broadcaster: 'socket.io',
  host: process.env.VUE_APP_DOMAIN + ':6001',
});
Vue.component('paginate', Paginate)


new Vue({
  router,
  store,
  axios,
  render: (h) => h(App),
}).$mount("#app");
