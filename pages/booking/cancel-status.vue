<template lang="pug">
  view.booking-cancel-status
    login
    view.content
      view.section-title 退款详情
      view.section-content.no-padding-tb
        view.refund-item(v-if="amountRefund") 退回金额 {{ amountRefund }}元
        view.refund-item(v-if="timesRefund") 退回次数 {{ timesRefund }}次
      view.section-title 取消流程
      view.section-content.no-padding
        view.cu-timeline.margin-top
          //- view.cu-time
          view.cu-item.cur.cuIcon-radioboxfill.text-primary(v-for="refundStep in refundSteps")
            view.bg-white
              view.status-name.text-black {{ refundStep.message }}
              view.status-date.text-grey.text-sm {{ refundStep.time }}

</template>

<script>
import { sync } from "vuex-pathify";

export default {
  computed: {
    user: sync("auth/user"),
    bookingStore: sync("booking"),
    booking() {
      return this.bookingStore.curBooking || {};
    },
    amountRefund() {
      if (!this.booking.payments) return 0;
      return this.booking.payments.filter(p => p.paid && p.amount < 0 && !["card", "coupon"].includes(p.gateway)).reduce((amount, payment) => amount - payment.amount, 0);
    },
    timesRefund() {
      if (!this.booking.card) return 0;
      return this.booking.kidsCount;
    },
    refundSteps() {
      if (!this.booking.remarks) return [];
      return this.booking.remarks
        .split("\n")
        .filter(l => l.match && l.match(/\*小程序端可见\*/))
        .map(l => {
          const match = l.match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}) (.*)\*小程序端可见\*/);
          if (!match) return "";
          return { time: match[1], message: match[2] };
        });
    }
  }
};
</script>

<style lang="stylus">
.booking-cancel-status
  height 100vh
  background #fff
  display flex
  flex-direction column
  .content
    flex 1
    .section-title,.section-content
      padding 20upx 50upx
    .section-title
      background #f1f1f1
    .section-content
      &.no-padding-tb
        padding-top 0
        padding-bottom 0
      &.no-padding
        padding 0
    .refund-item
      padding 20upx 0
    .cu-timeline
      >.cu-item::after
        background-color var(--primary)
        width 6upx
</style>
