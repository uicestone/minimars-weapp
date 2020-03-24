<template lang="pug">
  view
    login
    tab-bar
    home(v-if="currentTab=='/pages/home/index'")
    store-detail(v-if="currentTab=='/pages/store/detail'")
    //- create-booking(v-if="currentTab=='/pages/booking/create'")
    event(v-if="currentTab=='/pages/event/index'")
    event-success(v-if="currentTab=='/pages/event/success'")
    user(v-if="currentTab=='/pages/user/index'")
    user-booking(v-if="currentTab=='/pages/user/booking'")
    //- user-gift-list(v-if="currentTab=='/pages/user/giftlist'")
    user-cost-record(v-if="currentTab=='/pages/user/costRecord'")


</template>

<script>
import { sync } from "vuex-pathify";
import { wechatLogin, wechatGetUserInfo } from "../../services";
import login from "../login";
import { getStores, getConfigs, getBookings } from "../../common/vmeitime-http";
import * as service from "../../services";
export default {
  coπmponents: {
    login
  },
  data() {
    return {};
  },
  computed: {
    currentTab: sync("currentTab"),
    tabs: sync("configs@tabs"),
    configs: sync("configs"),
    stores: sync("store/stores")
  },
  async onLoad({ tab }) {
    if (tab) {
      setTimeout(() => {
        this.currentTab = tab;
      }, 1000);
    }
    await this.checkLogin();
    await Promise.all([this.loadConfig(), service.loadStore(), service.loadBookings()]);
  },
  methods: {
    async loadConfig() {
      const res = await getConfigs();
      this.configs = { ...this.configs, ...res.data };
    },
    async checkLogin() {
      try {
        const user = await wechatLogin();
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    },
    async checkLocation() {
      console.log("checkLocation");
      const stores = await getStores();
      this.nearStores = stores.data;
      this.currentStore = stores.data[0];
    },
    async getBookings() {
      const res = await getBookings();
      this.bookings = res.data;
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
