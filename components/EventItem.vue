<template lang="pug">
  view.event-item
    img(:src="item.posterUrl").img
    view {{item.title}}
    view {{item.date}}
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style lang="stylus" scoped>
.event-item
  height 420upx
  width 316upx
  background #666
  border-radius 80upx
  text-align center
  text-align left
  color white
  padding 308upx 40upx 0
  font-size 28upx
  display flex
  flex-direction column
  position relative
  .img
    flex 1
    position absolute
    top 0
    left 0
    border-radius 80upx
    background #666
</style>
