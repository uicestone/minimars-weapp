
<template lang="pug">
  view.booking-create
    view.vip
      .switcher.with-padding
        store-switcher
      view.vip-card
        view.cu-form-group
            view.title 选择我的权益卡
            switch(@change='onUseCard' :class="useCard?'checked':''" :checked='useCard?true:false')
        mi-card-selecter(v-if="useCard" :items="cards" :curItem.sync="curCard")
    view.content
      card.card(withShape)
        view.form
          view.form-input
            view
              view.label 日期
              picker(mode='date' :value='date' @change='DateChange' :start='validDateStart' :end='validDateEnd')
                view.date.flex.justify-center {{moment(form.date).format("MMM Do")}}
            view.margin-top
              view.label 人数
              view.flex.justify-between
                mi-input-number(:value.sync="form.adultsCount" suffix="成人")
                mi-input-number(:value.sync="form.kidsCount" suffix="儿童" :min="1")
          view.submit(@click="showBookingConfirm")
            button.cu-btn.round.bg-primary.w-full.margin-top(style="height:80upx" :disabled="!payable")
              view.title 
                text 确认支付/预约
                text.margin-right.text-orange(v-if="price>0" style="font-size:40upx;font-weight:bold") ￥{{price}}
    booking-modal(@close="onCloseModal")


      
</template>

<script>
import { moment } from "../../utils/moment";
import { createBooking, getBookingPrice, getAuthUser } from "../../common/vmeitime-http";
import { sync } from "vuex-pathify";
import { handlePayment } from "../../services";
import { _ } from "../../utils/lodash";

export default {
  data() {
    return {
      useCard: true,
      loadingPrice: false,
      price: 0,
      curCard: {},
      form: {
        date: moment().format("YYYY-MM-DD"),
        adultsCount: 1,
        kidsCount: 1
      },
      bookingRes: null
    };
  },
  mounted() {
    if (this.cards.length > 0) {
      this.onUseCard({ detail: { value: true } });
    }
    if (!this.currentStore.id && this.currentLocalStore.id) {
      this.currentStore = this.currentLocalStore;
    }
    this.getPirce();
  },
  computed: {
    user: sync("auth/user"),
    userCards: sync("auth/userCards"),
    currentStore: sync("store/currentStore"),
    currentLocalStore: sync("store/currentLocalStore"),
    cards() {
      return this.userCards.filter(i => i.type == "times" && i.status == "activated" && (!i.store || i.store === this.currentStore.id));
    },
    payable() {
      return !!this.currentStore.id;
    },
    validDateStart() {
      // book starts tommorrow if its 16:00 or later
      return moment()
        .add(moment().hours() > 16 ? 1 : 0, "day")
        .format("YYYY-MM-DD");
    },
    validDateEnd() {
      return moment().add(7, "days");
    }
  },
  watch: {
    currentStore() {
      this.onUseCard({ detail: { value: true } });
      this.getPirce();
    },
    form: {
      async handler() {
        this.getPirce();
      },
      deep: true
    },
    useCard() {
      this.getPirce();
    },
    curCard() {
      this.getPirce();
    },
    cards() {
      this.onUseCard({ detail: { value: true } });
      this.getPirce();
    }
  },
  methods: {
    async getPirce(force) {
      if (this.loadingPrice) return;
      this.loadingPrice = true;
      const { id: store } = this.currentStore;
      const { date, adultsCount, kidsCount } = this.form;
      const { curCard: card, useCard } = this;
      const res = await getBookingPrice({ store, date, adultsCount, kidsCount, card: useCard ? card.id : null, paymentGateway: "wechatpay" });
      console.log(res);
      this.price = res.data.price;
      this.loadingPrice = false;
    },
    async showBookingConfirm() {
      const { date, adultsCount, kidsCount } = this.form;
      uni.showModal({
        title: "确认",
        content: `请确认${this.currentStore.name}${this.form.date} ${adultsCount}大 ${kidsCount}小的预约`,
        success: () => {
          this.handleBooking();
        }
      });
    },
    async handleBooking() {
      const { id: store } = this.currentStore;
      const { date, adultsCount, kidsCount } = this.form;
      const { curCard: card, useCard } = this;
      const res = await createBooking({ store, date, adultsCount, kidsCount, card: useCard ? card.id : null, paymentGateway: "wechatpay" });
      const payArgs = _.get(res, "data.payments.0.payArgs");
      if (payArgs) {
        await handlePayment(payArgs);
      }
      this.bookingRes = res.data;
      await getAuthUser();
      this.service.toggleBooking(this.bookingRes);
    },
    DateChange(data) {
      this.form.date = data.detail.value;
      console.log(data);
    },
    onCloseModal() {
      uni.navigateBack();
    },
    onUseCard(e) {
      this.useCard = e.detail.value;
      this.curCard = this.cards[0] || {};
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
  .with-padding
    padding 0 40upx
  >.vip
    .cu-form-group
      background transparent
      padding 0 40upx
    .vip-card
      margin-top 40upx
      .title
        // margin-left 10upx
        color #535353
        font-size 32upx
  .content
    flex 1
    margin-top 20upx
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
