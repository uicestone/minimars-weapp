<template lang="pug">
  scroll-view(scroll-y).bg-white.page
    //- swiper
    view.banner-container(:class="{'has-new-booking':newBooking}")
      swiper.screen-swiper.h-full(class='round-dot'  indicator-color="white" indicator-active-color="white" :indicator-dots='true' :circular='true' :autoplay='true' interval='7000' duration='700' easing-function='easeInOutCubic')
        swiper-item(v-for='(item,index) in posts' :key='index' @click="handlePost(item)")
          img(:src='item.posterUrl' mode='aspectFill')
    //- content
    view.content
      booking-item(v-if="newBooking" :item="newBooking" withAction withShadow)
      //- view.shadow.bg-white.new-booking(v-if="newBooking")
      //-   img.img(src="/static/img/booking.png" mode='aspectFit')
      //-   view.center(@click="showModal=true")
      //-     view.title 您有一个新预约
      //-     view.sub-title {{newBooking.date}}
      //-   view.action
      //-     text.arrow(class='cuIcon-right')
      view.menus
        view.button
          menu-link(title="线下活动" subTitle="Events" @click="navigateTo('/pages/event/index')")
        view.button
          menu-link(title="预约/购票" subTitle="Book" @click="goBooking")
      view.store
        view.h3 门店介绍
        img.cover(:src="currentStore ? currentStore.posterUrl : '/static/img/booking-record.png'" mode='aspectFill' @click="navigateTo('/pages/store/detail')")
        view.h3 品牌介绍
        img.cover(:src="brand.posterUrl ? brand.posterUrl : '/static/img/about.png'" mode='aspectFill' @click="navigateTo('/pages/about')")
          

    
</template>

<script>
import { sync } from "vuex-pathify";
import { getPost, getBrand } from "../../common/vmeitime-http";
import * as service from "@/services";
export default {
  data() {
    return {
      showModal: false,
      posts: [],
      brand: {}
    };
  },
  computed: {
    token: sync("auth/token"),
    currentTab: sync("currentTab"),
    bookings: sync("booking/bookings"),
    currentStore: sync("store/currentStore"),
    newBooking() {
      return this.bookings.find(i => i.type == "play" && ["pending", "booked", "in_service"].includes(i.status));
    }
  },
  async mounted() {
    uni.showLoading();
    this.loadPost();
    this.loadBrand();
    if (this.token) {
      service.loadBookings();
    }
    uni.hideLoading();
  },
  methods: {
    async goBooking() {
      this.navigateTo("/pages/booking/create", { checkMobile: true });
    },
    async loadBrand() {
      const res = await getBrand();
      if (res.data) {
        this.brand = res.data;
      }
    },
    async loadPost() {
      const res = await getPost({ tag: "home-banner" });
      this.posts = res.data;
    },
    async handlePost(item) {
      if (item.target) {
        uni.navigateTo({
          url: `/pages/${item.target}`
        });
      } else {
        uni.navigateTo({
          url: `/pages/post/detail?id=${item.id}`
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.banner-container
  height 75vh
  &.has-new-booking
    height 65vh
.content
  padding 80upx 60upx 200upx
  .new-booking
    display flex
    background #f0eeef
    border-radius 20upx
    min-height 120upx
    align-items center
    margin 0 10upx
    margin-bottom 50upx
    --ShadowSize 0 0rpx 20rpx
    .img
      height 120rpx
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
        line-height 40upx
        color var(--gray)
  .menus
    margin-top 50upx
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
      border 1px solid #f0eeef
</style>
