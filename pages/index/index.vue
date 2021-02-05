<template lang="pug">
scroll-view(scroll-y)
  login
  get-phonenumber
  tab-bar
  home(v-if="currentTab == '/pages/home/index'")
  event(v-if="currentTab == '/pages/event/index'")
  mall(v-if="currentTab == '/pages/mall/index'")
  user(v-if="currentTab == '/pages/user/index'")
  booking-modal
</template>

<script>
import { sync } from "vuex-pathify";
import { wechatLogin, wechatGetUserInfo } from "../../services";
import login from "../login";
import { getStores, getConfigs, getBookings, postCard, getPost } from "../../common/vmeitime-http";
import * as service from "../../services";
import { event } from "../../services/event";
import { errorHandler } from "../../utils";
export default {
  coπmponents: {
    login,
  },
  data() {
    return {};
  },
  computed: {
    token: sync("auth/token"),
    currentTab: sync("currentTab"),
    currentLocalStore: sync("store/currentLocalStore"),
    currentStore: sync("store/currentStore"),
    tabs: sync("configs@tabs"),
    configs: sync("configs"),
    stores: sync("store/stores"),
    bookingStore: sync("booking"),
    banners: sync("banners"),
  },
  onLoad({ tab, giftCode, cardSell, coupon, route }) {
    this.loadBanners();
    this.loadConfig();
    service.loadStore();
    this.wechatLogin().then(() => {
      if (giftCode) {
        this.handleGiftCode(giftCode);
        return; // avoid below code executing
      }
      if (route) {
        return this.handleRoute(route);
      }
      if (cardSell) {
        return this.handleCardSell(cardSell);
      }
      if (coupon) {
        return this.handleCoupon(coupon);
      }
      // this.checkStore();
      service.loadBookings();
      service.loadUserCard();
    });
    if (tab) {
      this.currentTab = tab;
    }
  },
  onShow() {
    if (this.token) {
      service.loadBookings();
    }
  },
  onShareAppMessage(res) {
    return {
      title: "MINIMARS+",
      path: `/pages/index/index?tab=${this.currentTab}`,
    };
  },
  onReachBottom() {
    event.emit("index.onReachBottom");
  },
  methods: {
    async loadConfig() {
      const res = await getConfigs();
      this.configs = { ...this.configs, ...res.data };
    },
    async loadBanners() {
      const res = await getPost({ tag: "home-banner" });
      this.banners = res.data;
    },
    async wechatLogin() {
      try {
        const start = new Date();
        const user = await wechatLogin();
        console.log(`Wechat login took ${new Date() - start}ms.`);
      } catch (error) {
        errorHandler(error);
      }
    },
    async handleGiftCode(code) {
      if (!code) return false;
      // const res = await postCard({ card: { giftCode: code } });
      // console.log("handleGiftCode", res);
      // if (res.data) {
      uni.navigateTo({ url: `/pages/card/detail?code=${code}` });
      // }
      return true;
    },
    handleRoute(route) {
      if (!route) return;
      uni.navigateTo({ url: route });
    },
    handleCardSell(cardSell) {
      if (!cardSell) return;
      uni.navigateTo({ url: `/pages/card/sell?id=${cardSell}` });
    },
    handleCoupon(coupon) {
      if (!coupon) return;
      uni.navigateTo({ url: `/pages/card/coupon?coupon=${coupon}` });
    },
    checkStore() {
      const localStoreId = uni.getStorageSync("localStoreId");
      if (!localStoreId) {
        uni.redirectTo({ url: "/pages/store/select" });
      }
    },
    selectStore() {
      return;
      uni.navigateTo({
        url: "/pages/store/list",
      });
    },
  },
};
</script>

<style lang="stylus">
.page
  height 100vh
  widows 100vw
.banner
  background-size cover
  height 380upx
  z-index -1
.booking-icon
  background none
  img
    height 100%
    width 100%
    object-fit contain
    display block
.booking-button
  img
    right 0
    width 50%
</style>
