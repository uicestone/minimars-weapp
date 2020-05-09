<template lang="pug">
  view.user-giftlist
    view.head
      img.bg.w-full.absolute(src="/static/img/mall-bg.png" mode='widthFix')
    stripe.stripe(withTail theme="light")
    card.card(withShape)
      view.content
        view.title.with-padding {{currentTab.label}}
          view.cu-list.grid.col-2
            view.cu-item(v-for="(item,index) in gifts" :key="index" @click="goGiftDetail(item)")
              gift-item.flex.justify-center(:item="item" size="small")
</template>

<script>
import { getEvents, getGifts } from "../../common/vmeitime-http";
import { event } from "../../services/event";
import { sync } from "vuex-pathify";
export default {
  data() {
    return {
      gifts: [],
    };
  },
  computed: {
    currentTab: sync("currentTab"),
  },
  mounted(data) {
    uni.showLoading();
    this.loadData();
    uni.hideLoading();
    event.removeAllListeners("index.onReachBottom").on("index.onReachBottom", () => {
      console.log(this.currentTabKey);
      if (this.currentTabKey == "/pages/mall/index") {
        this.loadData();
      }
    });
  },
  methods: {
    async loadData() {
      const res = await getGifts();
      if (res.data) {
        this.gifts = res.data;
      }
    },

    goEventDetail(item) {
      this.navigateTo(`/pages/event/detail?id=${item.id}`);
    },
    goGiftDetail(item) {
      this.navigateTo(`/pages/gift/detail?id=${item.id}`);
    },
  },
};
</script>

<style lang="stylus" scoped>
.user-giftlist
  .head
    min-height 350upx
    display flex
    justify-content center
    text-align center
    background white
    .bg
      z-index 0
      margin-top 20upx
      min-height 400upx
  .card
    .content
      padding 32upx 0 100upx 0
      min-height calc(100vh - 500upx)
      .with-padding
        padding 0 40upx
      .title
        font-size 30upx
        font-family PingFangSC-Medium, PingFang SC
        font-weight 500
        color var(--text-primary)
        line-height 40upx
</style>
