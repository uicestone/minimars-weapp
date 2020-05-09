<template lang="pug">
  view.cu-bar.bg-white.tabbar.bottom-fixed
    view.action(v-for="(item,index) in routes" :key="item.key" @click="handleRouteChange(item)" )
      img.icon(:src="curTabConfig.active == item.key ? item.iconActive :item.icon")
      view {{item.name}}
</template>

<script>
import { sync, get } from "vuex-pathify";
import { checkLogin } from "../../services";
export default {
  props: ["redirect"],
  data() {
    return {
      routes: [
        {
          icon: "/static/icon/home.svg",
          iconActive: "/static/icon/home-active.svg",
          name: "首页",
          key: "/pages/home/index"
        },
        {
          icon: "/static/icon/events.svg",
          iconActive: "/static/icon/events-active.svg",
          name: "活动",
          key: "/pages/event/index"
        },
        {
          icon: "/static/icon/mall.svg",
          iconActive: "/static/icon/mall-active.svg",
          name: "商城",
          // page: true,
          key: "/pages/mall/index"
        },
        {
          icon: "/static/icon/food.svg",
          iconActive: "/static/icon/food-active.svg",
          name: "点餐",
          key: "FOOD"
        },
        {
          icon: "/static/icon/profile.svg",
          iconActive: "/static/icon/profile-active.svg",
          name: "我的",
          requireAuth: true,
          key: "/pages/user/index"
        }
      ]
    };
  },
  computed: {
    currentTab: sync("currentTab"),
    curTabConfig: get("curTabConfig"),
    user: sync("auth/user")
  },
  methods: {
    async handleRouteChange(item) {
      if (item.requireAuth) {
        await checkLogin();
      }
      // if (item.page) {
      //   uni.navigateTo({ url: item.key });
      // }
      if (item.key === "FOOD") {
        console.log("navigateToMiniProgram: food");
        wx.navigateToMiniProgram({
          appId: "wx0b9a05ad7c33f761",
          path: "/pages/self-service-branches/self-service-branches",
          fail: err => {
            console.error(err);
          }
        });
        return;
      }
      this.currentTab = item.key;
      if (this.redirect) {
        uni.navigateBack({
          delta: 5
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.tabbar
  border-top 1px solid #f3f4f5
  z-index 10
  width 100vw
.icon
  width 20px
  height 20px
</style>
