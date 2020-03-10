<template lang="pug">
  view
    tab-bar
    home(v-if="currentTab=='/pages/home/index'")
    store-detail(v-if="currentTab=='/pages/store/detail'")
    create-booking(v-if="currentTab=='/pages/booking/create'")
    event(v-if="currentTab=='/pages/event/index'")
    user(v-if="currentTab=='/pages/user/index'")
    user-booking(v-if="currentTab=='/pages/user/booking'")


</template>

<script>
import { sync } from "vuex-pathify";
import { wechatLogin, wechatGetUserInfo } from "../../services";
import login from "../login";
import { getStores, getConfigs, getBookings } from "../../common/vmeitime-http";
export default {
  coπmponents: {
    login
  },
  data() {
    return {};
  },
  computed: {
    currentTab: sync("currentTab"),
    tabs: sync("configs@tabs")
  },
  async onLoad({ tab }) {
    if (tab) {
      setTimeout(() => {
        this.currentTab = tab;
      }, 1000);
    }
  },
  methods: {
    async loadInitData() {
      const res = await getConfigs();
      this.configs = res.data;
    },
    async checkLogin() {
      try {
        const user = await wechatLogin();
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    },
    async wechatGetUserInfo(force = false) {
      if (this.auth.user.name) return;
      this.auth.showLogin = force ? "FORCE" : true;
      return new Promise((resolve, reject) => {
        this.wechatGetUserInfoSuccess = resolve;
        this.wechatGetUserInfoFail = reject;
      });
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
    },
    async navigateTo(url) {
      try {
        await this.wechatGetUserInfo(url === "/pages/booking/index");
      } catch (err) {
        console.error("用户拒绝授权用户信息");
      }
      uni.navigateTo({
        url
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
