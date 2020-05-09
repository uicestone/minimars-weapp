<template lang="pug">
  scroll-view(scroll-y).profile
    user-profile-head
    stripe.stripe(withTail)
      view.content
        view.cu-list.grid.col-3
          view.item(@click="navigateTo('/pages/gift/list?tab=0')")
            button.cu-btn
              img.icon(src="/static/icon/point2.svg")
            view.stat
              view.count {{user.points ? Number(user.points.toFixed(2)) : ""}}
              view.label 我的积分
            view.line
          view.item(@click="navigateTo('/pages/payment/list')")
            button.cu-btn
              img.icon(src="/static/icon/cost.svg")
            view.stat
              view.count {{user.balance}}
              view.label 我的余额
            view.line
          view.item(@click="showQrCode")
            button.cu-btn
              img.icon(src="/static/icon/code.svg")
            view.stat.flex
              img.icon(src="/static/icon/qr.png" style="width:64upx;height:64upx")
    //- mi-modal(:visible.sync="isShowBooking" :item="curBooking")
    card.card(withShape :withClose="status=='userQR'" @close="status='normal'")
      view.content
        view.normal(v-if="status=='normal'")
          view.with-padding(@click="navigateTo('/pages/booking/list')")
            card-title(title="我的预约" action="所有预约")
          swiper.card-swiper(:circular='true' @change="cardSwiper" :autoplay='false' interval='5000' duration='500'  indicator-color='#8799a3' indicator-active-color='#0081ff')
            swiper-item(v-for='(item,index) in activeBookings'  :class="cardCur==index?'cur':''" :key='index')
              view.swiper-item
                booking-item.w-full(:item="item")

          view.with-padding(@click="navigateTo('/pages/card/sell')")
            card-title(title="我的卡券包" action="购买更多")
          view.card-list.with-padding
            img.w-full.get-more(v-if="userCards && !userCards.length" src="/static/img/no-card.png" mode='widthFix' @click="navigateTo('/pages/card/sell')")
            view.card-list-item(v-for="(item,index) in userCards" :key="index" )
              card-list-item(:item="item" withAction @click="goCardSelling(item)")
        view.user-qr(v-if="status == 'userQR'")
          view.title {{user.name}}
          view.flex.justify-center
            canvas.img(canvas-id="qrcode") 
          view.text 会员二维码
          img.img1(src="/static/img/qrcode-bottom.png" mode="widthFix" style="width: 200upx; margin-top: 100upx")
        
        
</template>

<script>
import { loadCard, fetchUser } from "../../services";
import { sync } from "vuex-pathify";
import uQRCode from "../../common/uqrcode";
import * as service from "@/services";
export default {
  data() {
    return {
      cardCur: 0,
      status: "normal",
      isShowBooking: false,
      curBooking: null,
      cards: [],
      swiperList: [],
    };
  },
  computed: {
    user: sync("auth/user"),
    userCards: sync("auth/userCards"),
    bookings: sync("booking/bookings"),
    activeBookings() {
      return this.bookings.filter((i) => ["pending", "booked", "in_service"].includes(i.status));
    },
  },
  async mounted() {
    uni.showLoading();
    await Promise.all([loadCard(), fetchUser(), service.loadBookings()]);
    uni.hideLoading();
  },
  methods: {
    showQrCode() {
      this.status = "userQR";
      this.makeQRCode();
    },
    makeQRCode() {
      uQRCode.make({
        canvasId: "qrcode",
        componentInstance: this,
        text: this.user.id,
        size: 200,
        margin: 10,
        backgroundColor: "#ffffff",
        foregroundColor: "#000000",
        fileType: "jpg",
        correctLevel: uQRCode.defaults.correctLevel,
        success: (res) => {
          console.log(res);
        },
      });
    },
    cardSwiper(e) {
      this.cardCur = e.detail.current;
    },
    goCardSelling(item) {
      uni.navigateTo({
        url: `/pages/card/detail?id=${item.id}`,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.profile
  height 100vh
  display flex
  flex-direction column
  .stripe
    .content
      padding 50upx 24upx 50upx 0
      .cu-list
        background inherit
      .item
        display flex
        text-align left
        align-items center
        padding-left 24upx
        .cu-btn
          border-radius 50%
          background var(--primary)
          width 70upx
          height 70upx
          padding 0
          .icon
            width 48upx
            height 48upx
        .stat
          margin-left 20upx
          font-family PingFangSC-Medium, PingFang SC
          flex 1
          .count
            font-size 30upx
            color #303133
            line-height 40upx
            font-weight 600
          .label
            font-size 26upx
            color white
            line-height 26upx
        .line
          height 40upx
          width 1px
          background white
  .card
    .content
      min-height 1000upx
      .normal
        padding 24upx 0 100upx 0
        .with-padding
          padding 0 60upx
        .card-swiper
          height 200upx !important
          margin 16upx 0 30upx
          .swiper-item
            display flex
            align-items center
            border-radius 30upx
            border 3px solid #121212
            padding 0 20upx
            .img1
              width 180upx
              height 140upx
              border-radius 30upx
            .info
              margin-left 20upx
              .title
                font-size 30upx
                font-family PingFangSC-Semibold, PingFang SC
                font-weight 600
                color #1E2635
                line-height 40upx
              .date
                font-size 26upx
                font-family Helvetica
                color #969698
                line-height 32upx
        .card-list
          margin-top 20upx
          .get-more
            border-radius 60upx
          .card-list-item
            margin-bottom 30upx
      .user-qr
        text-align center
        padding 100upx 0
        .title
          margin 0 0 30upx
          font-size 62upx
          font-family PingFangSC-Semibold, PingFang SC
          font-weight 600
          color #080040
          line-height 80upx
        .img
          width 200px
          height 200px
          border-radius 20upx
          display block !important
        .text
          margin-top 20upx
          font-size 26upx
          font-family PingFangSC-Medium, PingFang SC
          font-weight 500
          color #909399
          line-height 36upx
</style>
