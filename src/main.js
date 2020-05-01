import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false;

import "./assets/css/main.css";

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
