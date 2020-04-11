<template lang="pug">
  view.event-item(@click="$emit('click')")
    img(:src="item.posterUrl" mode="aspectFill").img
    view {{item.title}}
    view {{moment(item.date).format("YYYY.MM.DD")}}
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
    z-index -1
    position absolute
    top 0
    left 0
    border-radius 80upx
    background #666
    height 100%
</style>
