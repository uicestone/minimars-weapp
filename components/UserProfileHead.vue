<template lang="pug">
  view.user-profile-head
    view
      img.bg.w-full.absolute(src="/static/img/profile-bg.PNG" mode='widthFix')
      view.cu-avatar.round.lg(:style="[{ background: avatar ? 'url(' + avatar + ')': '#666' }]")
      view.name-bar
        view.name HELLO MMZ
        view.vip 尊享会员
      view.mobile 18616161818

</template>

<script>
export default {
  data() {
    return {
      avatar: ""
    };
  }
};
</script>

<style lang="stylus" scoped>
.user-profile-head
  min-height 0upx
  display flex
  justify-content center
  text-align center
  padding 180upx 0 20upx
  .cu-avatar
    width 120upx
    height 120upx
    border 3px solid #050404
  .name-bar
    position relative
    margin-top 8upx
    .name
      font-family Avenir-Heavy, Avenir
      font-size 32upx
      color #242833
      font-weight bold
    .vip
      position absolute
      font-size 16upx
      font-weight bold
      right -70upx
      bottom 8upx
      line-height 22upx
  .mobile
    color #a7a7a7
    font-size 20upx
    margin-top -6upx
    font-weight bold
</style>
