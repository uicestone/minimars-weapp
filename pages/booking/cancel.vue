<template lang="pug">
  view.booking-cancel
    login
    view.content
      card.card
        view.form
          view.form-input
            view
              view.label 取消日期
              picker(mode='date' :value='date' disabled)
                view.date.flex.justify-center {{moment(booking.date).format("MMM Do")}}
            view.margin-top
              view.label 取消人数
              view.flex.justify-between
                mi-input-number(:value.sync="booking.adultsCount" disabled suffix="成人")
                mi-input-number(:value.sync="booking.kidsCount" disabled suffix="儿童" :min="1")
      view.cancel-options
        view.title 退款方式
        view.content
          text 原路退回（1-3个工作日退款到原支付方）
          view
            text.hint.text-grey 退款将退至您的支付账户
        view.title 取消原因
          text.text-primary （必选）
        view.content.has-radio-group
          radio-group.block(@change="chooseReason")
            view.cu-form-group(v-for="reason in ['订单有误，重新预约','重复预约','临时有事，计划有变','其他原因']" :key="reason")
              view.title {{ reason }}
              radio(:value="reason")
      view.margin-top.text-center
        view
          text.cuIcon-info.text-primary
          text(style="font-size:24upx") 取消预约申请一经提交不可撤销
        button.cu-btn.round.bg-primary.margin-top(style="height:100upx;width:250upx" :disabled="!cancelable" @click="showCancelConfirm")
          view.title 确认取消

</template>

<script>
import { moment } from "../../utils/moment";
import { cancelBooking } from "../../common/vmeitime-http";
import { sync } from "vuex-pathify";

export default {
  data() {
    return {
      form: {
        reason: null
      }
    };
  },
  computed: {
    user: sync("auth/user"),
    bookingStore: sync("booking"),
    booking() {
      return this.bookingStore.curBooking || {};
    },
    cancelable() {
      return this.booking.id && this.booking.status === "booked" && this.form.reason;
    }
  },
  methods: {
    async showCancelConfirm() {
      const {
        store: { name: storeName },
        date,
        adultsCount,
        kidsCount
      } = this.booking;
      uni.showModal({
        title: "确认",
        content: `取消${storeName}${date} ${adultsCount}大 ${kidsCount}小的预约`,
        success: res => {
          if (res.confirm) {
            this.handleCancelBooking();
          }
        }
      });
    },
    async handleCancelBooking() {
      const { id } = this.booking;
      const { reason } = this.form;
      const { data: booking } = await cancelBooking({ id, reason });
      this.bookingStore.curBooking = booking;
      console.log(this.bookingStore.curBooking);
      uni.redirectTo({ url: "/pages/booking/cancel-status" });
    },
    chooseReason(e) {
      this.form.reason = e.detail.value;
    }
  }
};
</script>

<style lang="stylus">
.booking-cancel
  height 100vh
  background #fff
  display flex
  flex-direction column
  .content
    flex 1
    .card
      // height 100%
      border-top-right-radius 0
      .form
        height 100%
        padding 50upx 50upx 100upx
        display flex
        flex-direction column
        .form-input
          flex 1
          .label
            color #5b5b5b
            margin-bottom 20upx
        .date
          font-size 46upx
          width 260upx
          border-radius 200upx
          padding 10upx 20upx
          border 2px solid #ddd
    .cancel-options
      >.title, >.content
        padding 20upx 50upx
      >.title
        background #f1f1f1
      >.content
        &.has-radio-group
          padding 0 0 0 20upx
</style>
