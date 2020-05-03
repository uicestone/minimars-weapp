import Vue from "vue";
import App from "./App";
import store from "./store";
import { moment } from "./utils/moment";
import { _ } from "./utils/lodash";
import { utils } from "./utils/index";
import * as service from "./services";

import home from "./pages/home/index.vue";
import eventPage from "./pages/event/index.vue";
import user from "./pages/user/index.vue";
import login from "./pages/login.vue";

import cuCustom from "./common/colorui/components/cu-custom.vue";
import { checkLogin, checkMobile } from "./services";

Vue.config.productionTip = false;
Vue.component("cu-custom", cuCustom);

Vue.component("home", home);
Vue.component("login", login);
Vue.component("event", eventPage);
Vue.component("user", user);

App.mpType = "app";
global.store = store; // for debug

Vue.prototype.back = () => {
  uni.navigateBack({
    delta: 1,
  });
};

Vue.prototype.navigateTo = async (url, opt = {}) => {
  const tab = store.state.configs.tabMap[url];
  if (opt.checkMobile) {
    await checkMobile();
  }
  if (opt.checkAuth) {
    await checkLogin();
  }
  if (tab) {
    store.state.currentTab = url;
    if (opt.back) {
      uni.navigateBack({ delta: opt.back });
    }
  } else {
    uni.navigateTo({ url });
  }
};
Vue.prototype.moment = moment;
Vue.prototype.uni = uni;
Vue.prototype.utils = utils;
Vue.prototype.service = service;
Vue.prototype._ = _;

console.log(service);

const app = new Vue({
  store,
  ...App,
});
app.$mount();
