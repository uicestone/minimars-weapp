<template lang="pug">
  scroll-view(scroll-y).event-detail
    cu-custom(isBack @back="uni.navigateBack()")
      text(slot="backText") 活动详情
    mi-dialog.payment-dialog(:visible.sync="showPayment" withClose)
      view.cotent
        view.head
          img.img(:src="item.posterUrl")
          view.info
            view.text
              view.name {{item.title}}
              view.prompt （*入场门票需另购）
            view.price
              view.credit
                img.icon(src="/static/icon/pointmain.svg")
                text {{item.priceInPoints}}
              view(v-if="item.price") ￥ {{item.price}}
        view.form
          view.label 报名人数（儿童）
          mi-input-number(:value.sync="form.kidsCount")
        view.action
          button.cu-btn.bg-primary.round.action-button(@click="handleBooking({paymentGateway: 'points'})" :disabled="!payAble") 积分兑换
          button.cu-btn.bg-primary.round.action-button(@click="handleBooking({paymentGateway: 'wechatpay'})" :disabled="!payAble") 微信支付

    img.bg.w-full.absolute(:src="item.posterUrl" mode='widthFix')
    view.placeholder
    card.card(withGreenShape)
      view.content
        view.name {{item.title}} (剩余{{item.kidsCountLeft || 0}})
        view.price 
          img.icon(src="/static/icon/pointmain.svg")
          text {{item.priceInPoints}}
          text(v-if="item.price")  / ￥40
        view.date 日期: {{moment(item.date).format("MMM Do")}} 
        view.address 门店： {{item.store.name}}
        view.prompt （兑换后请凭兑换码至前台核销并领取入场券）
    view.cu-card.no-card
      view.cu-item.content
        view.title 活动详情
        view.event-detail
          html-parser(:html="item.content")
          view.feature(v-for="(val,key) in item.props" :key="key")
            view.key 
              button.cu-btn.round {{val}}
            view.value 
              view.text {{key}}
    view.bottom-fixed
      button.cu-btn.round.action-button.bg-primary(@click="back")
        view.normal 返回首页
      button.cu-btn.round.action-button.bg-primary(@click="showPayment = true")
        view.normal 立即兑换
    
</template>

<script>
import { getItem, createBooking } from "../../common/vmeitime-http";
import { sync } from "vuex-pathify";
import { _ } from "../../utils/lodash";
import { handlePayment } from "../../services";
export default {
  data() {
    return {
      showPayment: false,
      form: {
        kidsCount: 1
      },
      item: {
        name: "甜甜圈大作战",
        feature: [
          {
            key: "地点",
            value: "小派厨房"
          },
          { key: "材料", value: "商家提供" },
          { key: "特点", value: "锻炼宝贝的动手能力" }
        ]
      }
    };
  },
  onLoad(data) {
    if (data.id) {
      console.log(data.id);
      this.loadEvent(data.id);
    }
  },
  computed: {
    payAble() {
      return this.form.kidsCount !== 0;
    },
    currentStore: sync("store/currentStore")
  },
  methods: {
    async loadEvent(id) {
      const res = await getItem({ id, type: "event" });
      if (res.data) {
        this.item = res.data;
      }
    },
    async handleBooking({ paymentGateway }) {
      const { id: store } = this.currentStore;
      const { kidsCount } = this.form;
      const { id: event } = this.item;
      const res = await createBooking({ store, adultsCount: 0, kidsCount, paymentGateway, type: "event", event });
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
.event-detail
  .placeholder
    padding-top 420upx
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
    min-height 800upx
    background white
    .content
      padding 80upx 0 200upx
      .title
        text-align center
        font-size 30upx
        font-weight 600
        color var(--text-primary)
        line-height 40upx
      .event-detail
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
          margin 20upx 0
          .key
            width 50%
            .cu-btn
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