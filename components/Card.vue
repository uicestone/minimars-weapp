<template lang="pug">
  view.card
    slot
    view.shape-bar(v-if="withShape")
      view.shape
</template>

<script>
export default {
  props: ["withShape"]
};
</script>

<style lang="stylus" scoped>
.card
  position relative
  min-height 200upx
  background white
  border-top-right-radius 80upx
  .shape-bar
    position absolute
    background transparent
    width 100%
    display flex
    justify-content center
    top -30upx
    left 0
    height 30upx
    z-index 1
    .shape
      width 4upx
      height 4upx
      position relative
      &:after
        position absolute
        height 14upx
        width 14upx
        left -30upx
        top 5upx
        content ''
        border-radius 50%
        border 20upx solid white
</style>
