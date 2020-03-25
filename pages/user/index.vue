<template lang="pug">
  scroll-view(scroll-y).profile
    user-profile-head
    stripe.stripe(withTail)
      view.content
        view.cu-list.grid.col-3
          view.item(@click="navigateTo('/pages/user/giftlist?tab=0')")
            button.cu-btn
              img.icon(src="/static/icon/point2.svg")
            view.stat
              view.count {{user.balanceReward}}
              view.label 我的积分
            view.line
          view.item(@click="navigateTo('/pages/user/costRecord')")
            button.cu-btn
              img.icon(src="/static/icon/cost.svg")
            view.stat
              view.count {{user.balanceDeposit}}
              view.label 我的消费
            view.line
          view.item
            button.cu-btn(@click="status='userQR'")
              img.icon(src="/static/icon/code.svg")
    card.card(withShape :withClose="status=='userQR'" @close="status='normal'")
      view.content
        view.normal(v-if="status=='normal'")
          view.with-padding(@click="navigateTo('/pages/user/booking')")
            card-title(title="我的预约" action="所有预约")
          swiper.card-swiper(:circular='true' @change="cardSwiper" :autoplay='true' interval='5000' duration='500'  indicator-color='#8799a3' indicator-active-color='#0081ff')
            swiper-item(v-for='(item,index) in bookings'  :class="cardCur==index?'cur':''" :key='index' @click="navigateTo('/pages/user/booking')")
              view.swiper-item
                img.img1(src="/static/img/booking.png" mode='aspectFit' )
                view.info
                  view.title {{item.title}}
                  view.date {{item.date}}

          view.with-padding(@click="go('/pages/user/cardSelling')")
            card-title(title="我的卡券包" action="购买更多")
          view.card-list.with-padding
            view.card-list-item(v-for="(item,index) in user.cards" :key="index" )
              card-list-item(:item="item" withAction @click="goCardSelling(item)")
        view.user-qr(v-if="status == 'userQR'")
          view.title 毛毛回家吧 ！
          view.flex.justify-center
            canvas.img(canvas-id="qrcode")
          view.text 会员二维码
        
        
</template>

<script>
import { loadCard } from "../../services";
import { sync } from "vuex-pathify";
import uQRCode from "../../common/uqrcode";
export default {
  data() {
    return {
      cardCur: 0,
      status: "normal",
      cards: [
        { img: "", title: "BOBO", subTitle: "剩余3次" },
        { img: "", title: "BOBO", subTitle: "有效期至2022.12.31" },
        { img: "", title: "BOBO", subTitle: "未激活 (可转赠)" },
        { img: "", title: "BOBO", subTitle: "其他" },
        { img: "", title: "BOBO", subTitle: "其他" },
        { img: "", title: "BOBO", subTitle: "其他" }
      ],
      swiperList: [
        {
          id: 0,
          title: "辛迪瑞拉的下午茶约会",
          date: "2020/03/01"
        },
        {
          id: 1,
          title: "辛迪瑞拉的下午茶约会",
          date: "2020/03/01"
        },
        {
          id: 2,
          title: "辛迪瑞拉的下午茶约会",
          date: "2020/03/01"
        }
      ]
    };
  },

  computed: {
    user: sync("auth/user"),
    bookings: sync("booking/bookings"),
    bookedBookings() {
      return this.bookings.filter(i => i.status == "booked");
    }
  },
  async created() {
    await Promise.all([loadCard()]);
    this.makeQRCode();
  },
  methods: {
    makeQRCode() {
      uQRCode.make({
        canvasId: "qrcode",
        componentInstance: this,
        text: "uQRCode",
        size: 150,
        margin: 10,
        backgroundColor: "#ffffff",
        foregroundColor: "#000000",
        fileType: "jpg",
        correctLevel: uQRCode.defaults.correctLevel,
        success: res => {
          console.log(res);
        }
      });
    },
    cardSwiper(e) {
      this.cardCur = e.detail.current;
    },
    goCardSelling(item) {
      uni.navigateTo({
        url: `/pages/user/cardSelling?type=${item.type}`
      });
    }
  }
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
            .img1
              width 180upx
              height 140upx
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
          width 150px
          height 150px
          border-radius 20upx
        .text
          margin-top 20upx
          font-size 26upx
          font-family PingFangSC-Medium, PingFang SC
          font-weight 500
          color #909399
          line-height 36upx
</style>
