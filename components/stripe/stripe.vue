<template lang="pug">
  view.stripe(:class="theme")
    slot.raidus
    view.tail(v-if="withTail" :class="theme")
</template>

<script>
export default {
  props: {
    withTail: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: "dark"
    }
  }
};
</script>

<style lang="stylus" scoped>
.stripe
  position relative
  min-height 70upx
  background #b2b2b2
  border-top-right-radius 80upx
  &.light
    background #00ffa2
  .tail
    z-index -1
    position absolute
    bottom -198upx
    left 0
    width 100%
    height 200upx
    background #b2b2b2
    &.light
      background #00ffa2
</style>
