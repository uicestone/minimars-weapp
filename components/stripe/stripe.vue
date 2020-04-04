<template lang="pug">
  view.stripe
    slot.raidus
    view.tail(v-if="withTail")
</template>

<script>
export default {
  props: ["withTail"]
};
</script>

<style lang="stylus" scoped>
.stripe
  position relative
  min-height 100upx
  background #b2b2b2
  border-top-right-radius 80upx
  .tail
    z-index -1
    position absolute
    bottom -198upx
    left 0
    width 100%
    height 200upx
    background #b2b2b2
</style>
