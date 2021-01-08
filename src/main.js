import Vue from "vue";

import Vuelidate from "vuelidate";
import axios from "axios";
import vueTopprogress from "vue-top-progress";
import DynamicSelect from 'vue-dynamic-select'
import Paginate from './utils/vuejs-paginate'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Echo from 'laravel-echo';

window.Pusher = require("pusher-js")

Vue.config.productionTip = false;
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "time-manager-pusher-app-key",
  wsHost: "time_manager.credo",
  wsPort: 6001,
  forceTLS: false,
  disableStatus: true,
  authEndpoint: `http://time_manager.credo/broadcasting/auth`
})

Vue.use(vueTopprogress);
Vue.use(DynamicSelect)
Vue.use(Vuelidate);
Vue.component('paginate', Paginate)


new Vue({
  router,
  store,
  axios,
  render: (h) => h(App),
}).$mount("#app");
