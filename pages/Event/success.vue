<template lang="pug">
  view.event-success
    view.content
      view.title 您已成功报名活动！
      view.code 兑换码
      img.img
      view.hint （请凭兑换码至前台核销并领取入场券）
      view.info
        view 时间: 2020年2月2日 上午 10:00
        view 人数：2位成人, 2名儿童
        view 支付方式: 微信支付
        view 共计金额: 690元
</template>

<script>
export default {};
</script>


<style lang="stylus" scoped>
.event-success
  .content
    margin-top 400upx
    text-align center
    display flex
    width 100vw
    flex-direction column
    align-items center
    font-family PingFangSC-Semibold, PingFang SC
    padding 40upx 0 90upx
    .img
      width 240upx
      height 240upx
      border-radius 50upx
      background #22242A
    .title
      font-size 30upx
      font-weight 600
      color var(--text-primary)
      line-height 40upx
    .code
      font-size 30upx
      font-weight 600
      color #3a3a3a
      line-height 40upx
      margin-top 40upx
    .hint
      font-size 24upx
      margin-top 4upx
      font-weight 600
      color #b1b0b5
      line-height 32upx
    .info
      margin-top 34upx
      text-align left
      font-size 28upx
      font-weight 500
      color #78757a
      line-height 40upx
</style>