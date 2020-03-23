
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
    mi-modal(:visible.sync="showModal")


      
      
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
</style>
