<template lang="pug">
  scroll-view(scroll-y).gift-detail
    login
    get-phonenumber
    cu-custom(isBack @back="uni.navigateBack()")
      text(slot="backText") 商品详情
    mi-dialog.payment-dialog(:visible.sync="showPayment" withClose)
      view.cotent
        view.head
          img.img(:src="item.posterUrl" mode="aspectFill")
          view.info
            view.text
              view.name {{item.title}}
            view.price
              view.credit(v-if="item.priceInPoints")
                img.icon(src="/static/icon/pointmain.svg")
                text {{item.priceInPoints}}
              view(v-if="item.price") ￥ {{item.price}}
        view.form
          view.label 数量
          mi-input-number(:value.sync="form.quantity")
        view.action
          view.w-full.flex.justify-between(v-if="item.price && item.priceInPoints")
            button.cu-btn.bg-primary.round.action-button(@click="handleBooking({paymentGateway: 'points'})" :disabled="!payAble") 积分兑换
            button.cu-btn.bg-primary.round.action-button(@click="handleBooking({paymentGateway: 'wechatpay'})" :disabled="!payAble")  {{item.useBalance ? "余额/" : ""}} 微信支付
          view.w-full(v-else-if="item.priceInPoints")
            button.cu-btn.bg-primary.round.action-button.full(@click="handleBooking({paymentGateway: 'points'})" :disabled="!payAble") 确认兑换
          view.w-full(v-else)
            button.cu-btn.bg-primary.round.action-button.full(@click="handleBooking({paymentGateway: 'wechatpay'})" :disabled="!payAble") {{item.useBalance ? "余额/" : ""}} 微信支付


    img.bg.w-full.absolute(:src="item.posterUrl" mode='aspectFill')
    view.placeholder
    card.card(withGreenShape)
      view.content
        view.name {{item.title || "-"}} (剩余 {{item.quantity || "-"}})
        view.price 
          img.icon(src="/static/icon/pointmain.svg")
          text {{item.priceInPoints || "-"}} / ￥ {{item.price || '-'}}
        view.prompt （请凭兑换码或“我的”会员码至门店前台核销并领取商品）
    view.cu-card.no-card
      view.cu-item.content
        view.title 商品详情
        view.content-detail
          html-parser(:html="item.content")
          view.name {{item.title}}
          view.feature(v-for="(item,index) in item.props" :key="key")
            view.key 
              button.cu-btn.round {{item.key}}
            view.value 
              view.text {{item.value}}
    view.bottom-fixed
      button.cu-btn.round.action-button.bg-primary(@click="back")
        view.normal 返回首页
      button.cu-btn.round.action-button.bg-primary(@click="handleShowPayment")
        view.normal 立即兑换
    
</template>

<script>
import { getItem, createBooking } from "../../common/vmeitime-http";
import { sync } from "vuex-pathify";
import { handlePayment, checkUserInfo, checkMobile } from "../../services";
import { _ } from "../../utils/lodash";
export default {
  data() {
    return {
      showPayment: false,
      form: {
        quantity: 1
      },
      item: {}
    };
  },
  computed: {
    payAble() {
      return this.form.quantity !== 0;
    },
    currentStore: sync("store/currentStore")
  },
  onLoad(data) {
    if (data.id) {
      console.log(data.id);
      this.loadGift(data.id);
    }
  },
  methods: {
    async loadGift(id) {
      uni.showLoading();
      const res = await getItem({ id, type: "gift" });
      if (res.data) {
        this.item = res.data;
      }
      uni.hideLoading();
    },
    switchType(item) {
      this.form.currentType = item.value;
    },
    async handleShowPayment() {
      await checkMobile();
      this.showPayment = true;
    },
    async handleBooking({ paymentGateway }) {
      const { id: store } = this.currentStore;
      const { quantity } = this.form;
      const { id: gift, useBalance = false } = this.item;
      console.log({ useBalance });
      const res = await createBooking({ store, adultsCount: 0, quantity, paymentGateway, type: "gift", gift, store: this.item.store, useBalance });
      const payArgs = _.get(res, "data.payments.0.payArgs");
      if (payArgs) {
        await handlePayment(payArgs);
      }
      this.showPayment = false;
      uni.navigateTo({
        url: `/pages/booking/success?id=${res.data.id}`
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.gift-detail
  .bg
    height 750upx
  .placeholder
    padding-top 600upx
  .payment-dialog
    font-family PingFangSC-Regular, PingFang SC
    color var(--text-primary)
    .head
      display flex
      .img
        height 220upx
        width 220upx
        border-radius 50upx
        background #eee
      .info
        text-align left
        margin 6upx 0 6upx 30upx
        display flex
        flex-direction column
        .text
          flex 1
          .name
            font-size 28upx
            font-weight 400
            line-height 40upx
          .prompt
            font-family PingFangSC-Semibold, PingFang SC
            font-size 24upx
            line-height 38upx
            color #aeabac
        .price
          font-size 38upx
          font-family PingFangSC-Medium, PingFang SC
          font-weight 500
          .credit
            display flex
            align-items center
            .icon
              width 40upx
              height 40upx
              margin-right 8upx
    .form
      text-align left
      margin 50upx 0 80upx
      .label
        font-size 24upx
        line-height 34upx
        margin 30upx 0
      .slector
        .cu-btn
          background var(--primary-light)
          margin 0 12upx 30upx
          &.active
            background var(--primary)
    .action
      display flex
      justify-content space-between
      .action-button
        width 220upx
        height 80upx
        border-radius 50upx
        font-size 30upx
        font-family PingFangSC-Medium, PingFang SC
        font-weight 500
        &.full
          width 100%
  .card
    .content
      display flex
      flex-direction column
      align-items center
      font-size 30upx
      font-family PingFangSC-Medium, PingFang SC
      font-weight 500
      color var(--text-primary)
      line-height 48upx
      text-align center
      padding 100upx 0 40upx
      view
        margin 5upx 0
      .name
        font-size 34upx
      .price
        font-size 38upx
        display flex
        align-items center
        .icon
          width 40upx
          height 40upx
          margin-right 8upx
      .prompt
        font-size 26upx
        color #606266
  .cu-card
    margin-top 20upx
    font-family PingFangSC-Semibold, PingFang SC
    .content
      min-height 800upx
      padding 80upx 0 200upx
      .title
        text-align center
        font-size 30upx
        font-weight 600
        color var(--text-primary)
        line-height 40upx
      .content-detail
        margin 40upx 50upx 0 50upx
        .name
          margin-bottom 34upx
          font-size 30upx
          font-weight 600
          color #606266
          line-height 40upx
        .feature
          display flex
          align-items center
          margin-bottom 20upx
          .key
            width 50%
            .cu-btn
              width 120upx
              height 50upx
              color white
              font-weight 500
              font-size 26upx
              background #C5C3C0
          .value
            width 50%
            font-size 28upx
            font-weight 600
            line-height 40upx
            text-align left
            color var(--text-primary)
  .bottom-fixed
    display flex
    align-items center
    justify-content space-between
    padding 30upx 40upx
    background white
    border-top 1px solid #f3f4f5
</style>
