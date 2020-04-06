<template lang="pug">
  view.gift-card
    img.img(:src="item.posterUrl")
    view.check(v-if="checked" class='cuIcon-check')
    view.name(v-if="item.title") {{item.title}}
</template>

<script>
export default {
  props: ["checked", "item"]
};
</script>


<style lang="stylus" scoped>
.gift-card
  position relative
  .img
    border-radius 80upx
    height 400upx
  .check
    position absolute
    right 40upx
    top 40upx
    background rgba(255, 255, 255, 1)
    padding 4upx 6upx
    color #e9bb41
    font-weight bold
    font-size 30upx
    border-radius 4px
  .name
    position absolute
    bottom 30upx
    right 45upx
    color white
    font-size 32upx
    font-family PingFangSC-Semibold, PingFang SC
    font-weight 600
    color rgba(255, 255, 255, 1)
    line-height 50upx
</style>