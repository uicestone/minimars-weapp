<template lang="pug">
  view.card-selling
    view.text
      view.title Hello,
      view.title 毛毛饿了!
      view.subtitle1 购买M尊享会员卡选择你喜欢的卡面吧
      view.subtitle2 你可以从每个类型的权益卡中选择你喜欢的！
    view.card-selector
      view(v-for="(item,index) in cards" :key="index" @click="selectCard(item)" :class="[curCard == item.value ? 'active': '', 'card']")
        img.img
        view.label {{item.label}}
    view.prompt(@click="goCardRule") (点击查看会员权益及使用规则)
    gift-card.gift-card
    view
      mi-input-number(:value.sync="form.amount" suffix="数量")
    view.confirm
      menu-link(title="确认购买" subTitle="Confirm" @click="handlePayment")
</template>

<script>
export default {
  data() {
    return {
      form: {
        amount: 2
      },
      curCard: "次卡",
      cards: [
        { label: "次卡", value: "次卡" },
        { label: "时效卡", value: "时效卡" },
        { label: "礼品卡", value: "礼品卡" }
      ]
    };
  },
  methods: {
    selectCard(item) {
      console.log(item);
      this.curCard = item.value;
    },
    goCardRule() {
      uni.navigateTo({
        url: "/pages/user/cardRule"
      });
    },
    handlePayment() {
      uni.navigateTo({
        url: "/pages/user/cardSuccess"
      });
    }
  }
};
</script>


<style lang="stylus" scoped>
.card-selling
  padding 120upx 36upx 0
  display flex
  flex-direction column
  text-align center
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
        background #666
        border-radius 28upx
  .gift-card
    margin-top 50upx
  .confirm
    text-align center
    width 440upx
    margin 26upx auto 0
</style>