import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {BootstrapVue} from "bootstrap-vue";
import 'bootstrap'
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import VoerroTagsInput from '@voerro/vue-tagsinput';
import store from "@/store/store";

Vue.config.productionTip = false;
Vue.use(BootstrapVue, VoerroTagsInput, BootstrapVueIcons);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
