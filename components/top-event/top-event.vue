<template lang="pug">
  view.top-event
    img.bg.w-full.absolute(src="/static/img/profile-bg.png" mode='widthFix')
    view.content
      button.action.cu-btn.round 
        view.icon(class="cuIcon-likefill")
        text 精选
      //- view.text Shake
      //- view.text & Shake
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.top-event
  position relative
  .bg
    position absolute
    top 0
    left 0
    width 100%
    height 120%
  .content
    padding 200upx 40upx 20upx
    .action
      position relative
      background rgba(87, 255, 154, 0.3)
      height 48upx
      width 150upx
      color white
      margin-bottom 10upx
      font-size 26upx
      .icon
        position absolute
        left 15upx
        font-size 20upx
        color white
    .text
      color #000
      font-size 76upx
      line-height 90upx
      font-weight bold
</style>
