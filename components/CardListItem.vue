<template lang="pug">
  view.shadow.bg-white.card-list-item
    img.img(:src="item.image")
    view.center
      view.title {{item.title}}
      view.sub-title {{item.subTitle}}
    view.action(v-if="withAction")
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
  height 140upx
  align-items center
  box-shadow 0px 2px 12px 0px rgba(0, 0, 0, 0.1)
  .img
    height 100%
    width 120upx
    border-radius 20upx
  .center
    flex 1
    margin-left 60upx
    font-family Helvetica
    .title
      font-size 38upx
      color var(--darkGray)
    .sub-title
      margin-top 20upx
      font-size 24upx
      line-height 22upx
      color var(--gray)
  .action
    padding 0 20upx
    .arrow
      font-size 40upx
</style>
