<template lang="pug">
  view.card
    slot
    view.shape-bar(v-if="withShape")
      view.shape
    view.green-shape-bar(v-if="withGreenShape")
      img.green-shape(src="/static/img/green-shape.png")
    view.close(v-if="withClose" class="cuIcon-roundclose" @click="$emit('close')")

</template>

<script>
export default {
  props: ["withShape", "withClose", "withGreenShape"]
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
  .green-shape-bar
    position absolute
    background transparent
    width 100%
    display flex
    justify-content center
    top 0
    left 0
    height 30upx
    z-index 1
    .green-shape
      width 56upx
      height 24upx
  .close
    position absolute
    right 40upx
    top 80upx
    font-size 20px
</style>
