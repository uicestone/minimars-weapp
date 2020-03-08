<template lang="pug">
  view
    tab-bar.bottom-fixed
    home(v-if="currentTab=='首页'")

      
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
    return {
      logo: "/static/logo.png",
      buttonBgUrl: "/static/button_bg_1.png",
      menus1: [
        {
          icon: "profile",
          color: "yellow",
          title: "个人资料",
          to: "/pages/user/detail"
        },
        {
          icon: "ticket",
          color: "red",
          title: "券码",
          to: "/pages/coupons/index"
        },
        {
          icon: "form",
          color: "purple",
          title: "所有预约",
          to: "/pages/booking/list"
        },
        {
          icon: "vipcard",
          color: "orange",
          title: "会员卡",
          to: "/pages/membership/index"
        }
      ],
      bannerImageUrls: [
        {
          url: "https://cdn.uice.lu/kanga/banner1.jpg"
        },
        {
          url: "https://cdn.uice.lu/kanga/banner2.jpg"
        },
        {
          url: "https://cdn.uice.lu/kanga/banner3.jpg"
        },
        {
          url: "https://cdn.uice.lu/kanga/banner4.jpg"
        },
        {
          url: "https://cdn.uice.lu/kanga/banner5.jpg"
        }
      ]
    };
  },
  computed: {
    currentTab: sync("currentTab"),
    session_key: sync("auth/session_key"),
    currentStore: sync("store/currentStore"),
    nearStores: sync("store/nearStores"),
    auth: sync("auth"),
    configs: sync("configs"),
    bookings: sync("booking/bookings")
  },
  async onLoad() {
    // this.loadInitData();
    // await this.checkLogin();
    // await this.checkLocation();
    // await this.getBookings();
  },
  async onShow() {
    if (!this.session_key) return;
    await this.getBookings();
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
      // uni.getLocation({
      //   success: async res => {
      //     const { latitude, longitude } = res;
      //     const stores = await getStores();
      //     this.nearStores = stores.data;
      //     this.currentStore = stores.data[0];
      //   },
      //   fail: async err => {
      //     uni.navigateTo({
      //       url: "/pages/store/list"
      //     });
      //     uni.showModal({
      //       title: "获取位置失败, 手动选择您最近的门店",
      //       showCancel: false,
      //       icon: "none"
      //     });
      //   }
      // });
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
