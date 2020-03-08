<template lang="pug">
  view.store-switcher.flex.align-center
    button.cu-btn.round.bg-primary.button
      view.title 天山路长宁店
    view.action
      text.arrow(class='cuIcon-right')
      text.text 切换门店
      
</template>

<script>
export default {};
</script>


<style lang="stylus" scoped>
.store-switcher
  .button
    width 60%
    height 70upx
  .action
    font-size 30upx
    margin-left 20upx
    color #6e7073
    .arrow
      margin-right 5upx
</style>