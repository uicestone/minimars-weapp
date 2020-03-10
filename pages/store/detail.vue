<template lang="pug">
  view.store-detail.page
    store-switcher
    view.alert
      text
      uni-notice-bar(:show-icon='true' :scrollable='true' :single='true' text='我们在疫情期间, 工作人员清洁消毒30分钟/次，设施 …')
    view.img
    view.info
      view.name 门店信息
      view 地址: 静安区江宁路428号
      view 电话: 61555725
      view 营业时间: 09:30-20:00
      view 交通沿线: 地铁1/12/13号线汉中路站10号口步行1.1km
    img.cover(src="https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg" mode='aspectFill' @click="switchTab(tabs.storeDetail)")

    view.bottom-bar
      text 本店已休息
    

</template>

<script>
export default {};
</script>


<style lang="stylus" scoped>
.store-detail
  padding 200upx 40upx 0
  height calc(100vh - 100upx)
  display flex
  flex-direction column
  position absolute
  .alert
    margin-top 65upx
    color #909399
    font-size 24upx
  .img
    display flex
    justify-content cener
    height 60upx
    margin 56upx 0 30upx
  .info
    font-weight 500
    font-family PingFangSC-Medium, PingFang SC
    font-size 26upx
    color --var(text-primary)
    .name
      margin-bottom 20upx
      font-size 28upx
  .cover
    width 100%
    margin-top 85upx
    border-radius 70upx
  .bottom-bar
    position absolute
    bottom 20upx
    width 100%
    text-align center
    color white
</style>