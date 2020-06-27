<template lang="pug">
  view.event-success
    img.bg.w-full.absolute(src="/static/img/success-bg.png" mode='widthFix')
    view.content
      view.title(v-if="item.type==='event'") 您已成功登记报名活动！
      view.title(v-else-if="item.type==='gift'") 您已成功登记兑换礼品！
      view.title(v-else) 您已成功登记预约！
      view.code 兑换码
      img.qrcode.margin-bottom(v-show="qrcodeUrl" :src="qrcodeUrl")
      canvas.qrcode(v-show="!qrcodeUrl" canvas-id="qrcode" style="opacity:0")
      view.hint （请凭兑换码或“我的”会员码至前台核销）
      view.info
        view 时间：{{_.get(item,  "payments.0.title", "")}}
        view(v-if="_.get(item, 'store.nam')") 门店：{{_.get(item, "store.name","")}}
        view(v-if="item.kidsCount") 人数：{{item.kidsCount||""}}
        view(v-if="_.get(item, 'payments.0.amount')") 支付金额：{{_.get(item, "payments.0.amount","")||""}}
        
        view(v-if="item.priceInPoints") 抵扣积分：{{item.priceInPoints||""}}
        view(v-if="_.get(item, 'gift.title')") 商品：{{_.get(item, "gift.title","")}}
        view(v-if="item.quantity") 数量：{{item.quantity||""}}
        view(v-if="user.points") 剩余积分：{{user.points ? Number(user.points.toFixed(2)) : ""}}



</template>

<script>
import { getItem } from "../../common/vmeitime-http";
import { wechatLogin, fetchUser } from "../../services";
import { sync } from "vuex-pathify";
import uQRCode from "../../common/uqrcode";
import { _ } from "../../utils/lodash";

export default {
  data() {
    return {
      qrcodeUrl: "",
      item: {}
    };
  },
  async onLoad(data) {
    uni.showLoading();
    if (process.env.NODE_ENV == "development") {
      await wechatLogin();
    }
    if (data.id) {
      this.loadBooking(data.id);
    }
    uni.hideLoading();
  },
  computed: {
    user: sync("auth/user")
  },
  methods: {
    async loadBooking(id) {
      const res = await getItem({ id, type: "booking" });
      if (res.data) {
        this.item = res.data;
      }
      this.makeQRCode();
    },
    makeQRCode() {
      uQRCode.make({
        canvasId: "qrcode",
        componentInstance: this,
        text: _.get(this, "item.customer.id", ""),
        size: 110,
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
    }
  }
};
</script>

<style lang="stylus" scoped>
.event-success
  .content
    margin-top 350upx
    text-align center
    display flex
    width 100vw
    flex-direction column
    align-items center
    font-family PingFangSC-Semibold, PingFang SC
    padding 40upx 0 90upx
    .qrcode
      width 130px
      height 130px
      border-radius 50upx
      background #22242A
      display flex
      align-items center
      justify-content center
      margin-top 10upx
      .qrcode
        width 110px
        height 110px
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
