<template lang="pug">
  view
    cu-custom(isBack @back="uni.navigateBack()")
    scroll-view(scroll-y).user-booking
      view.flex.justify-center
        img.img1(src="/static/img/booking-record.png" mode='aspectFit')
      card.card
        view.content
          view.tabs
            view.tab(:class="[item.value== curStatus? 'active': '']" v-for="(item,index) in tabs" :key="index" @click="switchTab(item)")
              view {{item.label}}
              view.circle(v-if="item.value== curStatus")
          view.card-list
            view.card-list-item(v-for="(item,index) in booking" :key="index")
              booking-item(:item="item" withShadow)

</template>

<script>
import { getBookings } from "../../common/vmeitime-http";
export default {
  data() {
    return {
      curStatus: "booked",
      loadStatus: "more",
      tabs: [
        { label: "全部", value: "all" },
        { label: "已预约", value: "booked" },
        { label: "已完成", value: "finished" },
        { label: "已取消", value: "canceled" }
      ],
      bookings: {
        all: [],
        booked: [],
        finished: [],
        canceled: []
      }
    };
  },
  computed: {
    booking() {
      return this.bookings[this.curStatus];
    }
  },
  mounted() {
    this.switchTab({ value: "booked" });
  },
  onReachBottom() {
    this.loadBooking();
  },
  methods: {
    switchTab(item) {
      this.curStatus = item.value;
      this.loadBooking();
    },
    async loadBooking() {
      const res = await getBookings({ status: this.curStatus == "all" ? null : this.curStatus, skip: this.booking.length, limit: 10 });
      if (res.data) {
        this.bookings[this.curStatus] = [...this.booking, ...res.data];
      }
    }
  }
};
</script>


<style lang="stylus" scoped>
.user-booking
  padding 120upx 0 0
  display flex
  flex-direction column
  .img1
    height 150upx
    width 350upx
    text-align center
  .card
    .content
      min-height calc(100vh - 230upx)
      padding 60upx 40upx
      .tabs
        display flex
        justify-content space-between
        font-size 30upx
        font-family PingFangSC-Semibold, PingFang SC
        font-weight 600
        color var(--text-primary)
        line-height 40upx
        .tab
          text-align center
          .circle
            width 4px
            height 4px
            border-radius 50%
            margin 0 auto
          &.active
            color var(--primary)
            .circle
              background var(--primary)
    .card-list
      margin-top 60upx
      .card-list-item
        margin-bottom 30upx
</style>