<template lang="pug">
  view.card-selling
    view.text
      view Hello
      view 毛毛饿了
      view 购买M尊享会员卡选择你喜欢的卡面吧
      view 你可以从每个类型的权益卡中选择你喜欢的！
    view.card-selector
      view(v-for="(item,index) in cards" :key="index")
        img.img
        view {{item.label}}
    view (点击查看会员权益及使用规则)
    gift-card
    view
      mi-input-number(:value.sync="form.amount" suffix="数量")
    view.confirm
      menu-link(title="确认购买" subTitle="Confirm")
</template>

<script>
export default {
  data() {
    return {
      form: {
        amount: 2
      },
      cards: [
        { label: "次卡", value: "次卡" },
        { label: "时效卡", value: "时效卡" },
        { label: "礼品卡", value: "礼品卡" }
      ]
    };
  }
};
</script>


<style lang="stylus" scoped>
.card-selling
  padding 120upx 36upx 0
  display flex
  flex-direction column
  text-align center
  .text
    text-align left
  .card-selector
    display flex
    justify-content space-around
    text-align center
    color var(--primary)
    .img
      width 120upx
      height 120upx
      background #666
      border-radius 28upx
  .confirm
    text-align center
    width 440upx
    margin 26upx auto 0
</style>