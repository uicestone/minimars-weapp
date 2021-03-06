<template lang="pug">
view
  get-phonenumber
  cu-custom(isBack, @back="uni.navigateBack()")
  view.card-selling
    view.with-padding
      img.img1(src="/static/img/buy-card.png", mode="aspectFill")
      view.text
        view.title Hello,
        view.title {{ user.name }}
        view.subtitle1 购买M尊享会员卡
        view.subtitle2 你可以从每个类型的权益卡中选择你喜欢的！
    view.card-selector
      view(v-for="(item, index) in cardTypes", :key="index", @click="selectCard(item)", :class="[curCardType == item.value ? 'active' : '', 'card']")
        img.img(:src="item.img")
        view.label {{ item.label }}
    view.prompt(@click="goCardRule", v-if="curCard.id") （点击查看会员权益及使用规则）
    .selector
      mi-card-selecter(:items="curCards", :curItem.sync="curCard")
    view
      text {{ curCard.title }}
    view(v-if="curCard.stores && curCard.stores.length")
      text {{ curCard.stores.map((s) => s.name).join('、') }}
    view.confirm
      menu-link(
        :title="curCard.price ? '确认购买' : '确认领取'",
        :subTitle="curCard.price ? '' : 'Confirm'",
        :disabled="!buyable",
        :open-type="user.mobile ? '' : 'getPhoneNumber'",
        @click="handleBuyCard",
        @getphonenumber="getPhoneNumber"
      )
        text.margin-right.text-orange(v-if="curCard.price", slot="append", style="font-size:40upx;font-weight:bold") ￥{{ curCard.price }}
</template>

<script>
import { sync } from "vuex-pathify";
import { postCard, getItem, getAuthUser } from "../../common/vmeitime-http";
import { _ } from "../../utils/lodash";
import { handlePayment, loadUserCard, checkMobile, fetchUser, getPhoneNumber, checkLogin } from "../../services";
import * as service from "../..//services";
export default {
  data() {
    return {
      curCard: {},
      form: {
        amount: 1
      },
      curCardType: "times",
      cardTypes: [
        { label: "次卡", value: "times", img: "/static/img/card-times-round.png" },
        { label: "时效卡", value: "period", img: "/static/img/card-period.round.png" },
        { label: "礼品卡", value: "balance", img: "/static/img/card-credit-round.png" }
      ]
    };
  },
  async onLoad(data) {
    await checkLogin();
    uni.showLoading();
    await service.loadCard({ id: data.id });
    if (data.id) {
      const card = this.cards.find(i => i.id == data.id);
      console.log({ card });
      if (card) {
        this.curCard = card;
        this.curCardType = card.type;
      }
    }

    this.setCard();
    uni.hideLoading();
  },
  computed: {
    cards: sync("booking/cardTypes"),
    curCards() {
      return this.cards.filter(i => (["times", "coupon"].includes(this.curCardType) ? ["times", "coupon"].includes(i.type) : i.type === this.curCardType) && !i.couponSlug);
    },
    buyable() {
      return !!this.curCard.id;
    },
    user: sync("auth/user"),
    atStore: sync("store/atStore")
  },
  methods: {
    setCard() {
      if (!this.curCard.id && this.curCards.length > 0) {
        this.curCard = this.curCards[0];
      }
    },
    selectCard(item) {
      this.curCardType = item.value;
      this.curCard = {};
      this.setCard();
    },
    goCardRule() {
      if (!this.curCard.id) return;
      uni.navigateTo({
        url: `/pages/card/rule?id=${this.curCard.id}`
      });
    },
    async getPhoneNumber(res) {
      uni.showLoading();
      getPhoneNumber(res);
      uni.hideLoading();
    },
    async handleBuyCard() {
      if (!this.user.mobile) return;
      const res = await postCard({ card: this.curCard, atStore: this.atStore });
      const payment = _.get(res, "data.payments.0");
      if (payment) {
        await handlePayment(payment.payArgs);
      }
      await loadUserCard();
      await fetchUser();
      uni.navigateTo({
        url: `/pages/card/success?id=${res.data.id}`
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.card-selling
  padding 200upx 0 100upx
  display flex
  flex-direction column
  text-align center
  background white
  min-height 100vh
  .selector
    margin 50upx 0 30upx
  .with-padding
    padding 0 36upx
  .img1
    position absolute
    top 160upx
    right 0upx
    width 350upx
    height 200upx
  .title
    font-size 54upx
    font-family Futura-Medium, Futura
    font-weight 500
    color var(--text-primary)
    line-height 80upx
  .subtitle1
    margin 12upx 0 0
    font-size 30upx
    font-family PingFangSC-Semibold, PingFang SC
    font-weight 600
    color var(--text-primary)
    line-height 40upx
  .subtitle2
    margin 10upx 0 20upx
    font-size 30upx
    font-family PingFangSC-Medium, PingFang SC
    font-weight 500
    color #606266
    line-height 40upx
  .prompt
    margin-top 10upx
    font-size 26upx
    font-family PingFangSC-Medium, PingFang SC
    font-weight 500
    color #606266
    line-height 40upx
  .text
    text-align left
  .card-selector
    display flex
    justify-content space-around
    text-align center
    color #606266
    font-size 26upx
    font-family PingFangSC-Medium, PingFang SC
    font-weight 500
    line-height 40upx
    margin-top 50upx
    .card
      &.active
        .label
          color var(--primary)
        .img
          transform scale(1.2)
      .label
        margin-top 16upx
      .img
        width 120upx
        height 120upx
  .confirm
    text-align center
    width 440upx
    margin 26upx auto 0
</style>
