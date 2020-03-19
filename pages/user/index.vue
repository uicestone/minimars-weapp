<template lang="pug">
  scroll-view(scroll-y).profile
    user-profile-head
    stripe.stripe(withTail)
      view.content
        view.cu-list.grid.col-3
          view.item(@click="go('/pages/user/giftlist?tab=0')")
            button.cu-btn
              img.icon(src="/static/icon/point2.svg")
            view.stat
              view.count 1608
              view.label 我的积分
            view.line
          view.item(@click="navigateTo('/pages/user/costRecord')")
            button.cu-btn
              img.icon(src="/static/icon/cost.svg")
            view.stat
              view.count 268
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
          swiper.card-swiper(:circular='true' :autoplay='true' interval='5000' duration='500'  indicator-color='#8799a3' indicator-active-color='#0081ff')
            swiper-item(v-for='(item,index) in swiperList' :key='index' @click="navigateTo('/pages/user/booking')")
              view.swiper-item
                img(:src='item.url' mode='aspectFill' )
          view.with-padding(@click="go('/pages/user/cardSelling')")
            card-title(title="我的卡券包" action="购买更多")
          view.card-list.with-padding
            view.card-list-item(v-for="(item,index) in cards" :key="index" )
              card-list-item(:item="item" withAction @click="goCardSelling(item)")
        view.user-qr(v-if="status == 'userQR'")
          view.title 毛毛回家吧 ！
          img.img 
          view.text 会员二维码
        
        
</template>

<script>
export default {
  data() {
    return {
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
          type: "image",
          url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"
        },
        {
          id: 1,
          type: "image",
          url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg"
        },
        {
          id: 2,
          type: "image",
          url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg"
        }
      ]
    };
  },
  methods: {
    go(url) {
      uni.navigateTo({
        url
      });
    },
    goCardSelling(item) {
      uni.navigateTo({
        url: `/pages/user/cardSelling`
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
          padding 10upx 0 30upx
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
          width 300upx
          height 300upx
          background #D8D8D8
          border-radius 20upx
        .text
          margin-top 20upx
          font-size 26upx
          font-family PingFangSC-Medium, PingFang SC
          font-weight 500
          color #909399
          line-height 36upx
</style>
