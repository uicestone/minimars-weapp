<template lang="pug">
  view.event-item(@click="$emit('click')")
    img(:src="item.posterUrl" mode="aspectFill").img
    view.store(v-if="item.store") {{ item.store.name.substr(0,2)+"店" }}
    view.desc
      view {{item.title}}
      view {{moment(item.date).format("YYYY.MM.DD")}}
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
  border-radius 80upx
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
    border-radius 80upx
    background #666
    height 100%
  .store
    position absolute
    right 30rpx
    top 10rpx
    background rgba(8, 243, 60, 0.7)
    border-radius 10rpx
    padding 5rpx
  .desc
    position absolute
    bottom 0
    width 100%
    background rgba(8, 243, 60, 0.7)
    display block
    padding-left 40upx
    padding-bottom 10upx
    border-radius 60upx
    padding-top 10upx
    // color: #000;
    min-height 82upx
    font-size 26rpx
</style>
