import Vue from "vue";

import Vuelidate from "vuelidate";
import axios from "axios";
import vueTopprogress from "vue-top-progress";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(vueTopprogress);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  axios,
  render: (h) => h(App),
}).$mount("#app");
