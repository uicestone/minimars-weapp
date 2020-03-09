<template lang="pug">
  view
    tab-bar
    home(v-if="currentTab=='首页'")
    create-booking(v-if="currentTab=='首页/创建预约'")
    event(v-if="currentTab=='活动'")
    user-profile(v-if="currentTab=='我的'")

</template>

<script>
import { sync } from "vuex-pathify";
import { wechatLogin, wechatGetUserInfo } from "../../services";
import login from "../login";
import { getStores, getConfigs, getBookings } from "../../common/vmeitime-http";
export default {
  components: {
    login
  },
  data() {
    return {};
  },
  computed: {
    currentTab: sync("currentTab")
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
