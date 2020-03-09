<template lang="pug">
  scroll-view(scroll-y).profile
    user-profile-head
    stripe.stripe(withTail)
      view.content
        view.cu-list.grid.col-3
          view.item
            button.cu-btn
              img.icon(src="/static/icon/point2.svg")
            view.stat
              view.count 1608
              view.label 我的积分
            view.line
          view.item
            button.cu-btn
              img.icon(src="/static/icon/cost.svg")
            view.stat
              view.count 268
              view.label 我的消费
            view.line
          view.item
            button.cu-btn
              img.icon(src="/static/icon/code.svg")
    card.card(withShape)
      view.content
        view.with-padding
          card-title(title="我的预约" action="所有预约")
        swiper.card-swiper(:circular='true' :autoplay='true' interval='5000' duration='500'  indicator-color='#8799a3' indicator-active-color='#0081ff')
          swiper-item(v-for='(item,index) in swiperList' :key='index')
            view.swiper-item
              img(:src='item.url' mode='aspectFill' )
        view.with-padding
          card-title(title="我的卡券包" action="购买更多")
        view.card-list.with-padding
          view.card-list-item(v-for="(item,index) in cards" :key="index")
            card-list-item(:item="item")
        
</template>

<script>
export default {
  data() {
    return {
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
          font-family:PingFangSC-Medium,PingFang SC;
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
      padding 24upx 0 100upx 0
      .with-padding
        padding 0 60upx
      .card-swiper
        height 200upx!important
        padding 10upx 0 30upx
      .card-list
        margin-top 20upx
        .card-list-item
          margin-bottom 30upx
</style>
