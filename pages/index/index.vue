<template lang="pug">
  view
    login
    get-phonenumber
    tab-bar
    home(v-if="currentTab=='/pages/home/index'")
    event(v-if="currentTab=='/pages/event/index'")
    mall(v-if="currentTab=='/pages/mall/index'")
    user(v-if="currentTab=='/pages/user/index'")
    booking-modal


</template>

<script>
import { sync } from "vuex-pathify";
import { wechatLogin, wechatGetUserInfo } from "../../services";
import login from "../login";
import { getStores, getConfigs, getBookings, postCard } from "../../common/vmeitime-http";
import * as service from "../../services";
import { event } from "../../services/event";
export default {
  coπmponents: {
    login
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
    bookingStore: sync("booking")
  },
  async onLoad({ tab, giftCode }) {
    if (giftCode) {
      this.giftCode = giftCode;
    }
    uni.showLoading();
    await this.wechatLogin();
    await Promise.all([this.loadConfig(), this.handleGiftCode(), service.loadStore(), service.loadBookings(), service.loadUserCard()]);
    if (tab) {
      setTimeout(() => {
        this.currentTab = tab;
      }, 1000);
    }
    uni.hideLoading();
  },
  onShow() {
    if (this.token) {
      service.loadBookings();
    }
  },
  onReachBottom() {
    event.emit("index.onReachBottom");
  },
  methods: {
    async loadConfig() {
      const res = await getConfigs();
      this.configs = { ...this.configs, ...res.data };
    },
    async wechatLogin() {
      try {
        const user = await wechatLogin();
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    },
    async handleGiftCode() {
      if (!this.giftCode) return;
      const res = await postCard({ card: { giftCode: this.giftCode } });
      if (res.data) {
        uni.navigateTo({ url: `/pages/card/detail?id=${res.data.id}` });
      }
    },
    selectStore() {
      return;
      uni.navigateTo({
        url: "/pages/store/list"
      });
    }
  }
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
