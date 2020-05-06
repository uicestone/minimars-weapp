<template lang="pug">
  view.top-event(@click="goDetail")
    img.bg.w-full.absolute(src="/static/img/event-bg.png" mode='aspectFill')
    //- view.content
      //- button.action.cu-btn.round 
      //-   view.icon(class="cuIcon-likefill")
      //-   text 精选
      //- view.text {{_.get(item, "title")}}
</template>

<script>
export default {
  props: ["item"],
  methods: {
    goDetail() {
      uni.navigateTo({
        url: `/pages/event/detail?id=${this.item.id}`
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.top-event
  position relative
  height 530upx
  .bg
    position absolute
    top 0
    left 0
    width 100%
    height 400upx
  .content
    padding 350upx 40upx 0
    // height 400upx
    .action
      position relative
      background rgba(87, 255, 154, 0.3)
      height 48upx
      width 150upx
      color white
      margin-bottom 10upx
      font-size 26upx
      .icon
        position absolute
        left 15upx
        font-size 20upx
        color white
    .text
      color #000
      font-size 76upx
      line-height 90upx
      font-weight bold
</style>
