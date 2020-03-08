import Vue from "vue";
import App from "./App";
import store from "./store";

import home from "./pages/home/index.vue";
import createBooking from "./pages/booking/create.vue";

import TabBar from "./components/TabBar.vue";
import Card from "./components/Card.vue";
import StoreSwitcher from "./components/StoreSwitcher.vue";
import MenuLink from "./components/MenuLink.vue";

Vue.config.productionTip = false;

Vue.component("tab-bar", TabBar);
Vue.component("store-switcher", StoreSwitcher);
Vue.component("card", Card);
Vue.component("menu-link", MenuLink);

Vue.component("home", home);
Vue.component("create-booking", createBooking);

App.mpType = "app";
global.store = store; // for debug

const app = new Vue({
  store,
  ...App
});
app.$mount();
