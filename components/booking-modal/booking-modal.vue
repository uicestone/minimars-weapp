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
            view 日期：{{_.get(item,  "date", "")}}
            view 门店：{{_.get(item,  "store.name", "")}}
            view(v-if="item.adultsCount") 成人数：{{item.adultsCount||""}}
            view(v-if="item.kidsCount") 儿童数：{{item.kidsCount||""}}
            view(v-if="_.get(item, 'payments.0.amount')") 已付款：{{_.get(item, "payments.0.amount","")||""}}
            
            view(v-if="_.get(item, 'gift.title')") 商品：{{_.get(item, "gift.title","")}}
            view(v-if="item.quantity") 数量：{{item.quantity||""}}
            view(v-if="item.priceInPoints") 抵扣积分：{{item.priceInPoints||""}}
            view(v-if="user.points") 剩余积分：{{user.points||""}}
</template>

<script>
import uQRCode from "../../common/uqrcode";
import { _ } from "../../utils/lodash";
import { sync } from "vuex-pathify";

export default {
  computed: {
    booking: sync("booking"),
    visible() {
      return this.booking.showBooking;
    },
    item() {
      return this.booking.curBooking;
    }
  },
  methods: {
    tooggleModal() {
      this.booking.showBooking = !this.visible;
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
      width 128px
      height 129px
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