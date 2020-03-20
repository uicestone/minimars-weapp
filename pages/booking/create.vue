
<template lang="pug">
  view.booking-create
    view.vip
      store-switcher
      view.vip-card
        view.title 选择VIP权益卡
        gift-card.gift-card
    view.content
      card.card(withShape)
        view.form
          view.form-input
            view
              view.label 日期
              picker(mode='date' :value='date' @change='DateChange')
                view.date.flex.justify-center {{moment(form.date).format("MMM Do")}}
            view.margin-top
              view.label 人数
              view.flex.justify-between
                mi-input-number(:value.sync="form.adultsCount" suffix="成人")
                mi-input-number(:value.sync="form.kidsCount" suffix="儿童")
          view.submit(@click="handlePayment")
            button.cu-btn.round.bg-primary.w-full.margin-top(style="height:80upx")
              view.title 确认支付/预约
    view.cu-modal.bottom-modal(:class="showModal?'show':''" @tap="showModal=false")
      view.cu-dialog.no-bg(@tap.stop="")
        card.card-dialog(withClose @close="showModal = false")
          view.content
            img.img1(src="/static/img/create-success.png" mode='aspectFill')
            view.title 您已成功预约
            view.code 预约码
            img.img
            view.hint (请在到店时出示)
            view.info
              view 时间: 2020年2月2日 上午 10:00
              view 人数：2位成人, 2名儿童
              view 支付方式: 微信支付
              view 共计金额: 690元


      
      
</template>

<script>
import { moment } from "../../utils/moment";
import { createBooking } from "../../common/vmeitime-http";
import { sync } from "vuex-pathify";

export default {
  data() {
    return {
      showModal: false,
      form: {
        date: moment().format("YYYY-MM-DD"),
        adultsCount: 2,
        kidsCount: 2
      }
    };
  },
  computed: {
    currentStore: sync("store/currentStore")
  },
  methods: {
    async handlePayment() {
      const { id: store } = this.currentStore;
      const { date, adultsCount, kidsCount } = this.form;
      const res = createBooking({ store, date, adultsCount, kidsCount });
      this.showModal = true;
    },
    DateChange(data) {
      this.form.date = data.detail.value;
      console.log(data);
    }
  }
};
</script>

<style lang="stylus">
.booking-create
  padding 40upx 0 0
  height 100vh
  display flex
  flex-direction column
  >.vip
    margin 0 40upx
    .vip-card
      margin-top 30upx
      .title
        margin-left 10upx
        color #535353
        font-size 32upx
    .gift-card
      margin 0 20upx
  .content
    flex 1
    .card
      height 100%
      .form
        height 100%
        padding 50upx 50upx 140upx
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
  .card-dialog
    .content
      text-align center
      display flex
      width 100vw
      flex-direction column
      align-items center
      font-family PingFangSC-Semibold, PingFang SC
      padding 0upx 0 90upx
      .img
        width 240upx
        height 240upx
        border-radius 50upx
        background #22242A
      .title, .code
        font-size 30upx
        font-weight 600
        color var(--text-primary)
        line-height 40upx
        margin 10upx 0
      .hint
        font-size 24upx
        margin-top 4upx
        font-weight 600
        color #b1b0b5
        line-height 32upx
      .info
        margin-top 34upx
        text-align left
        font-size 28upx
        font-weight 500
        color #78757a
        line-height 40upx
      .img1
        width 300upx
        height 200upx
</style>
