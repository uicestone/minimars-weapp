<template lang="pug">
  view.store-detail.page
    store-switcher
    view.alert
      img.icon(src="/static/icon/dog.svg")
      uni-notice-bar.w-full(:show-icon='true' :speed="100" :scrollable='true' :single='true' text='我们在疫情期间, 工作人员清洁消毒30分钟/次，设施 …')
    img.img.w-full(src="/static/img/logo1.png" mode='aspectFill')
    view.info
      html-parser(:html="currentStore.content")
      //- view.name 门店信息
      //- view 地址：静安区江宁路428号
      //- view 电话：61555725
      //- view 营业时间：09:30-20:00
      //- view 交通沿线：地铁1/12/13号线汉中路站10号口步行1.1km
    img.cover(:src="currentStore.posterUrl" mode='aspectFill')
    view.bottom-bar
      text 本店已休息
    

</template>

<script>
import { sync } from "vuex-pathify";
export default {
  computed: {
    currentStore: sync("store/currentStore")
  }
};
</script>


<style lang="stylus" scoped>
.store-detail
  padding 40upx 40upx 0
  height calc(100vh - 100upx)
  display flex
  flex-direction column
  position absolute
  .alert
    margin-top 65upx
    color #909399
    font-size 24upx
    display flex
    align-items center
    .icon
      width 24upx
      height 24upx
      margin-right 6upx
  .img
    display flex
    justify-content cener
    height 150upx
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
    padding-right 40upx
</style>