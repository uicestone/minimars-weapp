<template lang="pug">
  view.content
    view.card-list.with-padding
      view.card-list-item(v-for="(item,index) in userCards" :key="index" )
        card-list-item(:item="item" withAction @click="goCardSelling(item)")
</template>

<script>
import { sync } from "vuex-pathify";

export default {
  computed: {
    userCards: sync("auth/userCards")
  },
  methods: {
    goCardSelling(item) {
      uni.navigateTo({
        url: `/pages/card/detail?id=${item.id}`
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.content
  background #fff
  padding 24upx 0 100upx 0
  min-height 100vh
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
</style>