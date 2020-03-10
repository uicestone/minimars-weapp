import Vue from "vue";
import App from "./App";
import store from "./store";

import home from "./pages/home/index.vue";
import StoreDetail from "./pages/store/detail.vue";
import eventPage from "./pages/event/index.vue";
import createBooking from "./pages/booking/create.vue";
import user from "./pages/user/index.vue";
import userBooking from "./pages/user/booking.vue";

import TabBar from "./components/TabBar.vue";
import Card from "./components/Card.vue";
import StoreSwitcher from "./components/StoreSwitcher.vue";
import MenuLink from "./components/MenuLink.vue";
import TopEvent from "./components/TopEvent.vue";
import Stripe from "./components/Stripe.vue";
import EventItem from "./components/EventItem.vue";
import UserProfileHead from "./components/UserProfileHead.vue";
import CardTitle from "./components/CardTitle.vue";
import CardListItem from "./components/CardListItem.vue";
import HeaderBar from "./components/HeaderBar.vue";
import uniNoticeBar from "./components/uni-notice-bar/uni-notice-bar.vue";
import cuCustom from "./common/colorui/components/cu-custom.vue";

Vue.config.productionTip = false;

Vue.component("tab-bar", TabBar);
Vue.component("store-switcher", StoreSwitcher);
Vue.component("card", Card);
Vue.component("menu-link", MenuLink);
Vue.component("top-event", TopEvent);
Vue.component("stripe", Stripe);
Vue.component("event-item", EventItem);
Vue.component("user-profile-head", UserProfileHead);
Vue.component("card-title", CardTitle);
Vue.component("card-list-item", CardListItem);
Vue.component("uni-notice-bar", uniNoticeBar);
Vue.component("header-bar", HeaderBar);
Vue.component("cu-custom", cuCustom);

Vue.component("home", home);
Vue.component("store-detail", StoreDetail);
Vue.component("event", eventPage);
Vue.component("create-booking", createBooking);
Vue.component("user", user);
Vue.component("user-booking", userBooking);

App.mpType = "app";
global.store = store; // for debug

Vue.prototype.goHome = () => {
  store.state.currentTab = "home";
  uni.navigateBack({ delta: 10 });
};

Vue.prototype.navigateTo = url => {
  const tab = store.state.configs.tabMap[url];
  if (tab) {
    store.state.currentTab = url;
  } else {
    uni.navigateTo({ url });
  }
};

const app = new Vue({
  store,
  ...App
});
app.$mount();
