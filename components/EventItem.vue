<template lang="pug">
  view.event-item
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
  padding 308upx 40upx 36upx
  font-size 28upx
</style>
