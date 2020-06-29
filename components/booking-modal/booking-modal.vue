<template lang="pug">
  view.cu-modal.bottom-modal(:class="visible?'show':''" @tap="toggleModal")
    view.cu-dialog.no-bg(@tap.stop="")
      card.card-dialog(withClose @close="toggleModal")
        view.content(v-if="item")
          img.img1(src="/static/img/create-success.png" mode='aspectFill')
          view.title 您已成功预约
          view.code 预约码
          img.qrcode(v-show="qrcodeUrl" :src="qrcodeUrl")
          canvas.qrcode(v-show="!qrcodeUrl" canvas-id="qrcode")
          view.hint (请在到店时出示)
          view.info
            view 日期：{{_.get(item,  "date", "")}}
            view 门店：{{_.get(item,  "store.name", "")}}
            view(v-if="item.adultsCount") 成人数：{{item.adultsCount||""}}
            view(v-if="item.kidsCount") 儿童数：{{item.kidsCount||""}}
            view(v-if="_.get(item, 'payments.0.amount')") 已付款：{{ paidAmount }}
            
            view(v-if="_.get(item, 'gift.title')") 商品：{{_.get(item, "gift.title","")}}
            view(v-if="item.quantity") 数量：{{item.quantity||""}}
            view(v-if="item.priceInPoints") 抵扣积分：{{item.priceInPoints||""}}
            view(v-if="user.points") 剩余积分：{{user.points ? Number((user.points||0).toFixed(2)) : ""}}
          view.cancel-buttons
            button.cu-btn.round.cancel(@click="cancelBooking()" v-if="item.type=='play'&&item.status=='booked'") 取消预约
            button.cu-btn.round.cancel(@click="goCancelStatus()" v-if="['pending_refund','canceled'].includes(item.status)") 查看取消进度
</template>

<script>
import uQRCode from "../../common/uqrcode";
import { _ } from "../../utils/lodash";
import { sync } from "vuex-pathify";

export default {
  data() {
    return {
      qrcodeUrl: ""
    };
  },
  computed: {
    booking: sync("booking"),
    user: sync("auth/user"),
    visible() {
      return this.booking.showBooking;
    },
    item() {
      return this.booking.curBooking || {};
    },
    paidAmount() {
      if (!this.item.payments) return 0;
      return this.item.payments.filter(p => p.paid).reduce((amount, payment) => amount + payment.amount, 0);
    }
  },
  methods: {
    toggleModal() {
      this.booking.showBooking = !this.visible;
      if (!this.booking.showBooking) {
        this.$emit("close");
      }
    },
    makeQRCode() {
      uQRCode.make({
        canvasId: "qrcode",
        componentInstance: this,
        text: _.get(this, "item.customer.id", ""),
        size: 128,
        margin: 10,
        backgroundColor: "#ffffff",
        foregroundColor: "#000000",
        fileType: "jpg",
        correctLevel: uQRCode.defaults.correctLevel,
        success: res => {
          console.log(res);
          this.qrcodeUrl = res;
        }
      });
    },
    cancelBooking() {
      // this.toggleModal();
      uni.navigateTo({ url: "/pages/booking/cancel" });
    },
    goCancelStatus() {
      // this.toggleModal();
      uni.navigateTo({ url: "/pages/booking/cancel-status" });
    }
  },
  watch: {
    visible() {
      if (this.visible) {
        this.makeQRCode();
      }
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
    padding 0upx 0 40upx
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
    .cancel-buttons
      margin-top 40upx
    .img1
      width 300upx
      height 200upx
</style>
