<template lang="pug">
  view.cu-modal.bottom-modal(:class="visible?'show':''" @tap="tooggleModal")
    view.cu-dialog.no-bg(@tap.stop="")
      card.card-dialog(withClose @close="tooggleModal")
        view.content(v-if="item")
          img.img1(src="/static/img/create-success.png" mode='aspectFill')
          view.title 您已成功预约
          view.code 预约码
          canvas.qrcode(canvas-id="qrcode")
          view.hint (请在到店时出示)
          view.info
            view 时间: {{_.get(item, "payments.0.title")}}
            view 人数：{{item.adultsCount}}位成人, {{item.kidsCount}}名儿童
            view 支付方式: {{_.get(item, "payments.0.gateway")}}
            view 共计金额: {{item.price}}元
</template>

<script>
import uQRCode from "../common/uqrcode";
import { _ } from "../utils/lodash";

export default {
  props: ["visible", "item"],
  methods: {
    tooggleModal() {
      this.$emit("update:visible", false);
    },
    makeQRCode() {
      uQRCode.make({
        canvasId: "qrcode",
        componentInstance: this,
        text: _.get(this, "item.customer.id", "test"),
        size: 128,
        margin: 10,
        backgroundColor: "#ffffff",
        foregroundColor: "#000000",
        fileType: "jpg",
        correctLevel: uQRCode.defaults.correctLevel,
        success: res => {
          console.log(res);
        }
      });
    }
  },
  watch: {
    visible() {
      this.makeQRCode();
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
    .qrcode
      width 240upx
      height 240upx
      border-radius 50upx
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