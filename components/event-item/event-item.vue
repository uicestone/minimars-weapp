<template lang="pug">
  view.event-item(@click="$emit('click')")
    img(:src="item.posterUrl" mode="aspectFill").img
    view.desc
      //- view.store {{ _.get(item, "store.name") ? item.store.name.substr(0,2)+"店" : "门店通用" }}
      view.title {{item.title}}
      view.date {{moment(item.date).format("YYYY.MM.DD")}}
      view.notice {{item.kidAgeRange}}
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style lang="stylus" scoped>
.event-item
  height 420upx
  width 316upx
  background transparent
  border-radius 50upx
  text-align center
  text-align left
  color white
  // padding 0 40upx
  font-size 28upx
  display flex
  flex-direction column
  position relative
  overflow hidden
  .img
    flex 1
    z-index -1
    position absolute
    top 0
    left 0
    border-radius 50upx
    background #666
    height 100%
  .desc
    position absolute
    bottom 0
    width 100%
    font-family PingFangSC-Medium, PingFang SC
    background rgba(0, 0, 0, 0.5)
    display block
    padding-left 40rpx
    padding-bottom 0
    border-radius 50rpx
    padding-top 6rpx
    min-height 120rpx
    font-size 30rpx
    line-height 1.2
    .title
      font-weight bold
    .notice
      margin-top 6rpx
      font-size 20rpx
</style>
