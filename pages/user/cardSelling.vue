<template lang="pug">
  view
    cu-custom(isBack @back="uni.navigateBack()")
    view.card-selling
      view.with-padding
        img.img1(src="/static/img/buy-card.png" mode='aspectFill')
        view.text
          view.title Hello,
          view.title 毛毛饿了!
          view.subtitle1 购买M尊享会员卡选择你喜欢的卡面吧
          view.subtitle2 你可以从每个类型的权益卡中选择你喜欢的！
      view.card-selector
        view(v-for="(item,index) in cardTypes" :key="index" @click="selectCard(item)" :class="[curCardType == item.value ? 'active': '', 'card']")
          img.img(:src="item.img")
          view.label {{item.label}}
      view.prompt(@click="goCardRule") (点击查看会员权益及使用规则)
      .selector
        mi-card-selecter(:items="curCards" :curItem.sync="curCard")
      
      view
        mi-input-number(:value.sync="form.amount" suffix="数量")
      view.confirm
        menu-link(title="确认购买" subTitle="Confirm" @click="handleBuyCard" :disabled="!buyable")
</template>

<script>
import { sync } from "vuex-pathify";
import { postCard } from "../../common/vmeitime-http";
import { _ } from "../../utils/lodash";
import { handlePayment } from "../../services";
export default {
  data() {
    return {
      curCard: {},
      form: {
        amount: 1
      },
      curCardType: "times",
      cardTypes: [
        { label: "次卡", value: "times", img: "/static/img/card-times-round.PNG" },
        { label: "时效卡", value: "period", img: "/static/img/card-period.round.PNG" },
        { label: "礼品卡", value: "credit", img: "/static/img/card-credit-round.PNG" }
      ]
    };
  },
  onLoad(data) {
    if (data.type) {
      this.curCardType = data.type;
    }
  },
  computed: {
    cards: sync("booking/cards"),
    curCards() {
      return this.cards.filter(i => i.type == this.curCardType);
    },
    buyable() {
      return this.form.amount > 0 && this.curCard.id;
    }
  },
  created() {
    if (!this.curCard.id && this.curCards.length > 0) {
      this.curCard = this.curCards[0] || {};
    }
  },
  methods: {
    selectCard(item) {
      console.log(item);
      this.curCardType = item.value;
    },
    goCardRule() {
      if (!this.curCard.id) return;
      uni.navigateTo({
        url: `/pages/user/cardRule?id=${this.curCard.id}`
      });
    },
    async handleBuyCard() {
      const res = await postCard({ card: this.curCard });
      const payment = _.get(res, "data.payments.0");
      if (payment) {
        await handlePayment(payment.payArgs);
      }
      uni.navigateTo({
        url: "/pages/user/cardSuccess"
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