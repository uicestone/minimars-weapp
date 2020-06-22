<template lang="pug">
  view.shadow.bg-white.card-list-item(@click="$emit('click')")
    img.img(v-if="item.type=='times'" src="/static/img/card-times-round.png")
    img.img(v-else-if="item.type=='period'" src="/static/img/card-period.round.png")
    img.img(v-else-if="item.type=='balance'" src="/static/img/card-credit-round.png")
    img.img(v-else-if="item.type=='coupon'" src="/static/img/card-credit-round.png")
    view.center
      view.title {{item.title}}
      view.sub-title {{_.get(item, 'payments[0].title')}}
    slot.action(v-if="withAction" name="action")
      text.arrow(class='cuIcon-right')

</template>

<script>
export default {
  props: ["item", "withAction"]
};
</script>

<style lang="stylus" scoped>
.card-list-item
  display flex
  background #fffeff
  border-radius 30upx
  align-items center
  height 140upx
  align-items center
  box-shadow 0px 2px 12px 0px rgba(0, 0, 0, 0.1)
  padding 14upx 20upx 14upx 14upx
  .img
    height 124upx
    width 124upx
    border-radius 20upx
    background #c8c7cc
  .center
    flex 1
    margin-left 50upx
    font-family Helvetica
    .title
      font-size 32upx
      font-family Helvetica
      color var(--text-primary)
      line-height 36upx
    .sub-title
      margin-top 20upx
      font-size 26upx
      line-height 22upx
      font-family Helvetica
      color var(--gray)
  .action
    .arrow
      font-size 40upx
</style>
