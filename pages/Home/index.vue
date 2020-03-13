<template lang="pug">
  scroll-view(scroll-y).bg-white.page
    //- swiper
    view(style="height: 1000upx")
      swiper.screen-swiper.h-full(class='round-dot' :indicator-dots='true' :circular='true' :autoplay='true' interval='5000' duration='500')
        swiper-item(v-for='(item,index) in swiperList' :key='index')
          img(:src='item.url' mode='aspectFill')
    //- content
    view.content
      view.shadow.bg-white.new-booking
        img.img(src="https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg")
        view.center
          view.title 您有一个新预约
          view.sub-title 2020.2.2 COOK曲奇曲奇
        view.action
          text.arrow(class='cuIcon-right')
      view.menus
        view.button
          menu-link(title="线下活动" subTitle="Events" @click="navigateTo('/pages/event/index')")
        view.button
          menu-link(title="预约/购票" subTitle="Book" @click="navigateTo('/pages/booking/create')")
      view.store
        view.h3 门店介绍
        img.cover(src="https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg" mode='aspectFill' @click="navigateTo('/pages/store/detail')")
        view.h3 品牌介绍
        img.cover(src="https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg" mode='aspectFill' @click="navigateTo('/pages/about')")

          

    
</template>

<script>
import { sync } from "vuex-pathify";
export default {
  data() {
    return {
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
        },
        {
          id: 3,
          type: "image",
          url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"
        },
        {
          id: 4,
          type: "image",
          url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg"
        },
        {
          id: 5,
          type: "image",
          url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg"
        },
        {
          id: 6,
          type: "image",
          url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg"
        }
      ]
    };
  },
  computed: {
    currentTab: sync("currentTab")
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.content
  padding 80upx 60upx 200upx
  .new-booking
    display flex
    background #f0eeef
    border-radius 20upx
    height 120upx
    align-items center
    margin 0 10upx
    margin-bottom 50upx
    --ShadowSize 0 0rpx 20rpx
    .img
      height 100%
      width 120upx
      border-radius 20upx
    .center
      flex 1
      margin-left 60upx
      .title
        font-size 38upx
        color var(--darkGray)
        font-weight bold
      .sub-title
        font-size 28upx
        line-height 22upx
        color var(--gray)
  .menus
    display flex
    justify-content space-between
    .button
      width 280upx
  .action
    padding 0 20upx
    .arrow
      font-size 40upx
  .store
    margin-top 80upx
    .h3
      font-size 38upx
      font-weight bold
    .cover
      margin 20upx 0
      border-radius 70upx
      height 360upx
      width 100%
</style>
