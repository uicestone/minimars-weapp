import Vue from "vue";
import App from "./App";
import store from "./store";

import home from "./pages/index/home.vue";

import tabbar from "./components/tabbar.vue";

Vue.config.productionTip = false;

Vue.component("tab-bar", tabbar);
Vue.component("home", home);

App.mpType = "app";
global.store = store; // for debug

const app = new Vue({
  store,
  ...App
});
app.$mount();
