<template lang="pug">
scroll-view.card-coupon(scroll-y)
  login
  get-phonenumber
  cu-custom(isBack, @back="back")
    text(slot="backText") {{ headerText }}
  view.cu-modal.bottom-modal(:class="showModal ? 'show' : ''", @tap="showModal = false")
    view.cu-dialog
      view.modal-list
        view.list1(v-for="(item, index) in coupons" :key="item.id", @click="selectCard(item)")
          view.with-padding.flex.justify-between.items-center
            view
              view.name {{ item.title }}
              view.date 有效期：{{ moment(item.start).format('YYYY/MM/DD') }}-{{ moment(item.end).format('YYYY/MM/DD') }}
            view
              text.color-primary ￥
              text.price {{ item.price }}
          view.divider(v-if="index !== coupons.length - 1")

  view.order-panel.list1(v-if="state == 'order'")
    view.with-padding
      view.name {{ curCard.title }}
      view.date 有效期：{{ moment(item.start).format('YYYY/MM/DD') }}-{{ moment(item.end).format('YYYY/MM/DD') }}
    view.divider-bar
    view.info
      view.flex.with-padding
        view.label 联系人信息
        view.text1 用于接收预约活动后的通知短信
      view.divider2
      view.flex.with-padding.align-center
        view.label1 姓名
        view.field {{ user.name }}
      view.divider2
      view.flex.with-padding.align-center
        view.label1 手机
        view.field {{ user.mobile }}
      view(style="margin: 40upx 0")
      view.divider-bar
      view.flex.with-padding.align-center.justify-between
        view.label 产品金额
        view.price ￥{{ curCard.price }}
      view.divider-bar
    view.action
      button.cu-btn.round.bg-primary.action-button(@click="handleBuyCard") 微信支付
  view.store-list(v-if="state == 'store'")
    view.list1(v-for="(item, index) in stores" :key="item.id")
      view.with-padding
        view.name {{ item.name }}
        view.date {{ item.address }}
      view.divider(v-if="index !== coupons.length - 1")
  view(v-if="state == 'init'")
    img.bg.w-full.absolute(:src="item.posterUrl", mode="aspectFill")
    view.placeholder
    card.card(withGreenShape)
      view.content
        view.with-padding.main-content
          view.title {{ item.title }}
          view.subTitle {{ item.content }}
          view.price 
            text ￥{{ couponsMinPrice }}
        view.divider-bar
        view.info-bar.flex.items-center.with-padding
          view.info.flex.items-center(v-if="coupons.some(c=>c.maxPerCustomer)")
            text.cuIcon-info.text-primary
            text.color-hematite.info-text 限购
          view.info.flex.items-center
            text.cuIcon-info.text-primary
            text.color-hematite.info-text 需在线预约
        view.divider-bar
        view.with-padding.store-bar(@click="showStores")
          view.label.flex.justify-between
            text 适用门店 ({{ stores.length }})
            text.cuIcon-right
          view.list1(v-for="(item, index) in stores.slice(0, 1)" :key="item.id")
            view
              view.name {{ item.name }}
              view.date {{ item.address }}
        view.divider-bar
        view.card-bar
          view.with-padding.label
            text 套餐
          view.list1(v-for="(item, index) in coupons" :key="item.id")
            view.with-padding.flex.justify-between.items-center
              view
                view.name {{ item.title }}
                view.date 有效期：{{ moment(item.start).format('YYYY/MM/DD') }}-{{ moment(item.end).format('YYYY/MM/DD') }}
              view
                text.price ￥{{ item.price }}
            view.divider(v-if="index !== coupons.length - 1")
          view.divider-bar(style="margin-top: 32upx")
          

        view.action(@click="showModal = true")
          button.cu-btn.round.bg-primary.action-button 立即购买
</template>

<script>
import { sync } from "vuex-pathify";
import { getItem, handleType, postCard } from "../../common/vmeitime-http";
import { fetchUser, handlePayment, loadUserCard } from "../../services";
import { utils } from "../../utils";
import { _ } from "@/utils/lodash";
export default {
  data() {
    return {
      state: "init",
      coupon: "",
      showModal: false,
      item: {},
      coupons: [],
      curCard: {}
    };
  },
  computed: {
    headerText() {
      if (this.state == "init") return "团购详情";
      if (this.state == "store") return "适用门店";
      if (this.state == "order") return "填写订单";
    },
    user: sync("auth/user"),
    stores: sync("store/stores"),
    allowStores() {
      if (this.coupons.some(i => !i.stores?.length)) {
        return this.stores;
      } else {
        return this.coupons.reduce((stores, coupon) => stores.concat(coupon.stores), []);
      }
    },
    couponsMinPrice() {
      return _.minBy(this.coupons, c => c.price)?.price;
    }
  },
  onLoad({ coupon }) {
    if (coupon) {
      this.coupon = coupon;
      this.loadItem(coupon);
    }
  },
  methods: {
    selectCard(item) {
      this.state = "order";
      this.curCard = item;
    },
    back() {
      if (this.state == "init") {
        uni.navigateBack();
      } else {
        this.state = "init";
      }
    },
    showStores() {
      this.state = "store";
    },
    async handleBuyCard() {
      if (!this.user.mobile) return;
      const res = await postCard({ card: this.curCard });
      const payment = _.get(res, "data.payments.0");
      if (payment) {
        await handlePayment(payment.payArgs);
      }
      await loadUserCard();
      await fetchUser();
      uni.redirectTo({
        url: `/pages/index/index?route=/pages/user/index`
      });
    },
    async loadItem(id) {
      uni.showLoading();
      const [itemRes, cardRes] = await Promise.all([getItem({ id, type: "post" }), handleType({ type: "card-type", method: "GET", data: { couponSlug: id } })]);
      if (itemRes.data) {
        itemRes.data.content = utils.html.convertHtmlToText(itemRes.data.content);
        this.item = itemRes.data;
      }
      if (cardRes.data) {
        this.coupons = cardRes.data;
      }
      uni.hideLoading();
    }
  }
};
</script>

<style lang="stylus" scoped>
.card-coupon
  .bg
    height 750upx
  .placeholder
    padding-top 600upx
  .with-padding
    margin 0 32upx
  .card
    .content
      display flex
      flex-direction column
      font-size 30upx
      font-family PingFangSC-Medium, PingFang SC
      font-weight 500
      color var(--text-primary)
      line-height 48upx
      padding 50upx 0 40upx
      min-height 1200upx
      .main-content
        .title
          font-size 30upx
          font-weight 600
          color var(--text-primary)
          line-height 42upx
        .subTitle
          font-size 24upx
          font-family PingFangSC-Regular, PingFang SC
          font-weight 400
          color #323232
          line-height 34upx
          margin 10upx 0 30upx
        .price
          font-family Helvetica
          font-size 40upx
          font-weight 500
          line-height 48upx
          color #57FF9A
      .info-bar
        .info
          margin-right 4upx
          .info-text
            font-size 22upx
            font-family PingFangSC-Regular, PingFang SC
            font-weight 400
            color #323232
            line-height 32upx
            margin-left 12upx
      .store-bar
        .label
          margin-bottom 24upx
          font-size 30upx
          font-weight 500
          line-height 42upx
        .cuIcon-right
          color #888
          font-size 34upx
      .card-bar
        margin-top 6upx
        .label
          margin-bottom 16upx
          font-size 30upx
          font-weight 500
          line-height 42upx
  .store-list
    padding-top 200upx
    width 100vw
    height 100vh
    background white
  .order-panel
    width 100vw
    height 100vh
    background white
    padding-top 200upx
    .info
      margin-top 76upx
      font-size 26upx
      color #020202
      font-weight 500
      line-height 36upx
      .label
        min-width 200upx
      .text1
        font-size 24upx
        color #646665
      .label1
        font-weight 400
        min-width 130upx
  .modal-list
    padding 20upx 0 50upx
    .price
      color #9c9c9c
      font-weight bold
      font-size 28upx
.action
  position fixed
  width 100%
  display flex
  justify-content center
  bottom 50upx
  .action-button
    width 570upx
    height 100upx
.divider-bar
  height 16upx
  background #F2F2F2
  margin 24upx 0
.list1
  text-align left
  .divider
    margin 16upx 0 18upx 0
    height 4upx
    background #c7c7c7
  .divider2
    margin 30upx 0 18upx 0
    height 4upx
    background #ececec
  .name
    font-size 28upx
    font-family PingFangSC-Medium, PingFang SC
    font-weight 500
    color #000000
    line-height 40upx
  .date
    margin-top 12upx
    font-size 24upx
    font-family PingFangSC-Medium, PingFang SC
    font-weight 500
    color #bdbec0
    line-height 34upx
  .price
    font-size 28upx
    line-height 34upx
</style>
