import Vue from "vue";
import App from "./App";
import store from "./store";

import home from "./pages/Home/index.vue";

import TabBar from "./components/TabBar.vue";
import MenuLink from "./components/MenuLink.vue";

Vue.config.productionTip = false;

Vue.component("tab-bar", TabBar);
Vue.component("home", home);
Vue.component("menu-link", MenuLink);

App.mpType = "app";
global.store = store; // for debug

const app = new Vue({
  store,
  ...App
});
app.$mount();
