import Vue from "vue";
import App from "./App";
import store from "./store";
import { moment } from "./utils/moment";
import { _ } from "./utils/lodash";

import home from "./pages/home/index.vue";
// import StoreDetail from "./pages/store/detail.vue";
import eventPage from "./pages/event/index.vue";
// import createBooking from "./pages/booking/create.vue";
import user from "./pages/user/index.vue";
// import userBooking from "./pages/user/booking.vue";
// import userGiftList from "./pages/user/giftlist.vue";
// import userCostRecord from "./pages/user/costRecord.vue";
// import eventSuccess from "./pages/event/success.vue";
import login from "./pages/login.vue";

import cuCustom from "./common/colorui/components/cu-custom.vue";
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
import GiftItem from "./components/GiftItem.vue";
import MiDialog from "./components/MiDialog.vue";
import MiInputNumber from "./components/MiInputNumber.vue";
import giftCard from "./components/giftCard.vue";
import MiModal from "./components/MiModal.vue";
import MiCardSelecter from "./components/MiCardSelecter.vue";
import htmlParser from "./components/jyf-parser/jyf-parser.vue";

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
Vue.component("gift-item", GiftItem);
Vue.component("mi-dialog", MiDialog);
Vue.component("mi-input-number", MiInputNumber);
Vue.component("gift-card", giftCard);
Vue.component("mi-modal", MiModal);
Vue.component("mi-card-selecter", MiCardSelecter);

Vue.component("home", home);
Vue.component("login", login);
// Vue.component("store-detail", StoreDetail);
Vue.component("event", eventPage);
// Vue.component("create-booking", createBooking);
Vue.component("user", user);
// Vue.component("user-booking", userBooking);
// Vue.component("user-gift-list", userGiftList);
// Vue.component("user-cost-record", userCostRecord);
// Vue.component("event-success", eventSuccess);

Vue.component("html-parser", htmlParser);

App.mpType = "app";
global.store = store; // for debug

Vue.prototype.back = () => {
  uni.navigateBack({
    delta: 1
  });
};

Vue.prototype.navigateTo = (url, opt = {}) => {
  const tab = store.state.configs.tabMap[url];
  if (opt.checkAuth) {
    if (!store.state.auth.user.name) {
      return (store.state.auth.showLogin = true);
    }
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
Vue.prototype._ = _;

const app = new Vue({
  store,
  ...App
});
app.$mount();
