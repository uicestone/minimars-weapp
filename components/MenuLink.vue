<template lang="pug">
  button.cu-btn.round.bg-primary.action-button(@click="$emit('click')")
    view.title {{title}}
    view.sub-title {{subTitle}}
</template>

<script>
export default {
  props: ["title", "subTitle"]
};
</script>

<style lang="stylus">
.action-button
  flex-direction column
  height 110upx
  width 100%
  .title
    font-size 36upx
    margin-top 10upx
    color var(--darkGray)
  .sub-title
    font-size 36upx
    margin-top 5upx
    color #66be5f
    font-weight bold
</style>