<template lang="pug">
  view.booking-cancel-status
    login
    view.content
      view.section-title 进度详情
      view.section-content.no-padding-tb
        view.refund-item 退回金额 {{ amountRefund }}元
        view.refund-item 退回次数 {{ timesRefund }}次
      view.section-title 订单流程
      view.section-content.no-padding
        view.cu-timeline.margin-top
          //- view.cu-time
          view.cu-item.cur.cuIcon-radioboxfill.text-primary
            view.bg-white
              view.status-name.text-black 人工审核处理中
              view.status-date.text-grey.text-sm 2020-06-15 14:00
          view.cu-item.cur.cuIcon-radioboxfill.text-primary
            view.bg-white
              view.status-name.text-black 人工审核处理中
              view.status-date.text-grey.text-sm 2020-06-15 14:00
          view.cu-item.cur.cuIcon-radioboxfill.text-primary
            view.bg-white
              view.status-name.text-black 人工审核处理中
              view.status-date.text-grey.text-sm 2020-06-15 14:00
        

</template>

<script>
import { moment } from "../../utils/moment";
import { getBooking } from "../../common/vmeitime-http";
import { sync } from "vuex-pathify";
import { wechatLogin } from "../../services";
import { _ } from "../../utils/lodash";

export default {
  data() {
    return {
      booking: {}
    };
  },
  async onLoad({ id }) {
    await wechatLogin();
    console.log(`load booking ${id}`);
    const { data } = await getBooking({ id });
    this.booking = data;
  },
  computed: {
    user: sync("auth/user"),
    amountRefund() {
      return 0;
    },
    timesRefund() {
      return 0;
    }
  },
  methods: {}
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
