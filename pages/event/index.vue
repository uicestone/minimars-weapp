<template lang="pug">
  view
    scroll-view(scroll-y).with-tab-bar.event
      top-event(:item="eventsRecommend")
      stripe.stripe(withTail theme="light")
        view.content(v-if="newBooking" )
          booking-item.booking-item(:item="newBooking" withAction)
            button.cu-btn.round.action-button(slot="action")
              view.icon(class="cuIcon-attentionfill")
              view.text 您的预约
      card.card(withShape)
        view.content
          view.cu-list.grid.col-2.no-bg
            view.cu-item(v-for="(item,index) in events" :key="index")
              event-item.flex.justify-center(:item="item" @click="goDetail(item)")
  </template>

<script>
import { getEvents } from "../../common/vmeitime-http";
import { sync } from "vuex-pathify";
import { event } from "../../services/event";
export default {
  data() {
    return {
      showModal: false,
      avatar: "",
      events: [],
      eventsRecommend: null,
      loading: false
    };
  },
  computed: {
    currentTab: sync("currentTab"),
    bookings: sync("booking/bookings"),
    newBooking() {
      return this.bookings.find(i => i.type == "event");
    }
  },
  async mounted() {
    uni.showLoading();
    this.loadEvent();
    uni.hideLoading();

    event
    .removeAllListeners("index.onReachBottom")
    .on("index.onReachBottom", () => {
      if (this.currentTab == "/pages/event/index") {
        this.loadEvent();
      }
    });
  },
  methods: {
    async loadEvent() {
      if (this.loading) return;
      this.loading = true;
      getEvents({ limit: 10, skip: this.events.length })
        .then(res => {
          if (res.data) {
            this.events = [...this.events, ...res.data];
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    goDetail(item) {
      uni.navigateTo({
        url: `/pages/event/detail?id=${item.id}`
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.event
  display flex
  flex-direction column
  .stripe
    .content
      display flex
      align-items center
      padding 20upx 25upx
      .booking-item
        width 100%
      .img
        height 100rpx
        width 100upx
        border-radius 20upx
      .center
        margin-left 20upx
        flex 1
        .title
          font-size 32upx
          line-height 38upx
        .subTitle
          font-size 28upx
          line-height 34upx
      .action-button
        background #acffe6
        height 48upx
        width 208upx
        color #484746
        font-size 28upx
        position relative
        .icon
          position absolute
          left 14upx
          font-size 20upx
          color white
  .card
    .content
      min-height calc(100vh - 400upx)
      padding 20upx 20upx 100upx
      .cu-list
        .grid
          background transparent
</style>
