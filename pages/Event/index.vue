<template lang="pug">
  scroll-view(scroll-y).event
    top-event
    stripe.stripe(withTail)
      view.content(v-if="newBooking")
        img.img(:src="_.get(newBooking, 'event.posterUrl')")
        view.center
          view.title {{_.get(newBooking, "event.title")}}
          view.subTitle  {{_.get(newBooking, 'payments.0.title')}}
        button.cu-btn.round.action-button(@click="showModal = true")
          view.icon(class="cuIcon-attentionfill")
          view.text 您的预约
    card.card(withShape)
      view.content
        view.cu-list.grid.col-2
          view.cu-item(v-for="(item,index) in events" :key="index")
            event-item.flex.justify-center(:item="item" @click="goDetail(item)")
    mi-modal(:visible.sync="showModal" :item="newBooking")
</template>

<script>
import { getEvents } from "../../common/vmeitime-http";
import { sync } from "vuex-pathify";
export default {
  data() {
    return {
      showModal: false,
      avatar: "",
      events: []
    };
  },
  computed: {
    bookings: sync("booking/bookings"),
    newBooking() {
      return this.bookings.find(i => i.type == "event");
    }
  },
  created() {
    this.loadEvent();
  },
  onReachBottom() {
    this.loadEvent();
  },
  methods: {
    async loadEvent() {
      const res = await getEvents();
      if (res.data) {
        this.events = res.data;
      }
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
  .stripe
    .content
      display flex
      align-items center
      padding 40upx
      .img
        height 120rpx
        width 120upx
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
          color white
      .action-button
        background #91e2a7
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
      min-height calc(100vh - 450upx)
      padding 20upx 20upx 100upx
      .cu-list
        background transparent
</style>
