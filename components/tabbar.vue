<template lang="pug">
  view.cu-bar.bg-white.tabbar.bottom-fixed
    view.action(v-for="(item,index) in routes" :key="index" @click="handleRouteChange(item)" )
      img.icon(:src="currentTab.includes(item.key) ? item.iconActive :item.icon")
      view {{item.name}}
</template>

<script>
import _ from "lodash";
import { sync } from "vuex-pathify";
export default {
  props: ["redirect"],
  data() {
    return {
      routes: [
        {
          icon: "/static/icon/home.svg",
          iconActive: "/static/icon/home-active.svg",
          key: "home",
          name: "首页"
        },
        {
          icon: "/static/icon/events.svg",
          iconActive: "/static/icon/events-active.svg",
          key: "event",
          name: "活动"
        },
        {
          icon: "/static/icon/food.svg",
          iconActive: "/static/icon/food-active.svg",
          key: "food",
          name: "点餐"
        },
        {
          icon: "/static/icon/profile.svg",
          iconActive: "/static/icon/profile-active.svg",
          key: "user",
          name: "我的"
        }
      ]
    };
  },
  computed: {
    currentTab: sync("currentTab"),
    user: sync("auth/user")
  },
  methods: {
    handleRouteChange(item) {
      this.currentTab = item.key;
      if (this.redirect) {
        uni.navigateBack({
          delta: 5
        });
      }
    }
  },
  mounted() {}
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
