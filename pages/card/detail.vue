<template lang="pug">
  view
    cu-custom(isBack @back="uni.navigateBack()")
    view.card-selling
      view.with-padding
        img.img1(src="/static/img/buy-card.png" mode='aspectFill')
        view.text
          view.title Hello,
          view.title {{user.name}}
          view.subtitle1 购买M尊享会员卡选择你喜欢的卡面吧
          view.subtitle2 你可以从每个类型的权益卡中选择你喜欢的！
      view.card-selector
        view(v-for="(item,index) in cardTypes" :key="index" @click="selectCard(item)" :class="[curCardType == item.value ? 'active': '', 'card']")
          img.img(:src="item.img")
          view.label {{item.label}}
      //- view.prompt(@click="goCardRule") （点击查看会员权益及使用规则）
      .selector
        mi-card-selecter(:items="curCards" :curItem.sync="curCard")
      //- view
      //-   mi-input-number(:valu e.sync="form.amount" suffix="数量")
      view.confirm
        menu-link(title="确认分享" openType="share" subTitle="Confirm" :disabled="!shareAble")
        menu-link(title="确认激活" @click="handleActiveCard" subTitle="Confirm" :disabled="!activeAble")
</template>

<script>
import { sync } from "vuex-pathify";
import { postCard, getItem, postCardById } from "../../common/vmeitime-http";
import { _ } from "../../utils/lodash";
import { handlePayment, fetchUser, loadUserCard } from "../../services";
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
    if (data.id) {
      await loadUserCard();
      const card = this.userCards.find(i => i.id == data.id);
      if (card) {
        this.curCard = card;
        this.curCardType = card.type;
      }
    }
    this.setCard();
  },
  computed: {
    cards: sync("booking/cards"),
    userCards: sync("auth/userCards"),
    user: sync("auth/user"),
    curCards() {
      return this.userCards.filter(i => i.type == this.curCardType);
    },
    shareAble() {
      return !!this.curCard.id && this.curCard.isGift;
    },
    activeAble() {
      return !!this.curCard.id && this.curCard.status == "valid";
    }
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      console.log(res.target);
    }
    return {
      title: "分享卡片",
      // imageUrl: "/static/share.jpg",
      path: `/pages/index?giftCode=${this.curCard.gifyCode}`
    };
  },
  methods: {
    setCard() {
      if (!this.curCard.id && this.curCards.length > 0) {
        this.curCard = this.curCards[0];
      }
    },
    async handleActiveCard() {
      const res = await postCardById({ method: "PUT", card: { ...this.curCard, status: "activated" }, id: this.curCard.id });
      this.curCard = res.data;
      await Promise.all([fetchUser(), loadUserCard()]);
      this.$forceUpdate();
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
    display flex
    justify-content space-between
    text-align center
    width 440upx
    margin 26upx auto 0
</style>
