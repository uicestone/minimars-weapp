<template lang="pug">
  view.cu-modal.bottom-modal(:class="visible?'show':''" @tap="tooggleModal")
    view.cu-dialog.no-bg(@tap.stop="")
      card.card-dialog(withClose @close="tooggleModal")
        view.content
          img.img1(src="/static/img/create-success.png" mode='aspectFill')
          view.title 您已成功预约
          view.code 预约码
          img.img
          view.hint (请在到店时出示)
          view.info
            view 时间: 2020年2月2日 上午 10:00
            view 人数：2位成人, 2名儿童
            view 支付方式: 微信支付
            view 共计金额: 690元
</template>

<script>
export default {
  props: ["visible"],
  methods: {
    tooggleModal() {
      this.$emit("update:visible", false);
    }
  }
};
</script>


<style lang="stylus" scoped>
.card-dialog
  .content
    text-align center
    display flex
    width 100vw
    flex-direction column
    align-items center
    font-family PingFangSC-Semibold, PingFang SC
    padding 0upx 0 90upx
    .img
      width 240upx
      height 240upx
      border-radius 50upx
      background #22242A
    .title, .code
      font-size 30upx
      font-weight 600
      color var(--text-primary)
      line-height 40upx
      margin 10upx 0
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
    .img1
      width 300upx
      height 200upx
</style>