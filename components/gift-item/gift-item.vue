<template lang="pug">
  view.gift-item
    img(:src="item.posterUrl" mode="aspectFill").img
    view.content
      view {{item.title}}
      button.cu-btn.bg-primary.action-button
        view.flex
          img.icon(src="/static/icon/pointmain.svg")
          view.price {{item.priceInPoints}}
        view.line
        view 兑换

</template>

<script>
export default {
  props: ["item"]
};
</script>

<style lang="stylus" scoped>
.gift-item
  height 480upx
  width 316upx
  border 1px solid rgba(87, 255, 154, 0.2)
  border-radius 80upx
  text-align left
  color white
  font-size 28upx
  color var(--text-primary)
  display flex
  flex-direction column
  .img
    flex 1
    border-top-left-radius 80upx
    border-top-right-radius 80upx
    background #666
  .content
    margin 20upx 16upx 36upx
    .action-button
      display flex
      justify-content space-between
      align-items center
      height 52upx
      width auto
      font-size 26upx
      font-family PingFangSC-Semibold, PingFang SC
      font-weight 600
      line-height 38upx
      margin 10upx 10upx 0
      border-radius 20upx
      padding 8upx 24upx 8upx 14upx
      .icon
        width 40upx
        height 40upx
      .price
        margin-left 15upx
        font-size 30upx
      .line
        width 2px
        height 13px
        background #38E97F
        border-radius 1px
</style>
