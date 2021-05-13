import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {BootstrapVue} from "bootstrap-vue";
import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'
import VoerroTagsInput from '@voerro/vue-tagsinput';

Vue.config.productionTip = false;
Vue.use(BootstrapVue, VoerroTagsInput);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
