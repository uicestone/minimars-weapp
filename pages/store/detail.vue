<template lang="pug">
  view.store-detail
    //- store-switcher
    //- view.alert
    //-   img.icon(src="/static/icon/dog.svg")
    //-   uni-notice-bar.w-full(:show-icon='true' :speed="100" :scrollable='true' :single='true' text='我们在疫情期间, 工作人员清洁消毒30分钟/次，设施 …')
    img.img.w-full(src="/static/img/logo1.png" mode='aspectFill')
    view.info(v-if="item")
    html-parser(:html="item.content")
      //- view.name 门店信息
      //- view 地址：静安区江宁路428号
      //- view 电话：61555725
      //- view 营业时间：09:30-20:00
      //- view 交通沿线：地铁1/12/13号线汉中路站10号口步行1.1km
    img.cover(:src="currentStore.posterUrl" mode='aspectFill')
    view.bottom-bar(v-if="!item.open")
      text 本店已休息
    

</template>

<script>
import { sync } from "vuex-pathify";
import { getItem } from "../../common/vmeitime-http";
export default {
  data() {
    return {
      item: null
    };
  },
  watch: {
    currentStore() {
      this.loadStore();
    }
  },
  computed: {
    currentStore: sync("store/currentStore")
  },
  onLoad(data) {
    if (data.id) {
      uni.showLoading();
      this.loadStore(data.id);
      uni.hideLoading();
    }
  },
  methods: {
    async loadStore(id) {
      uni.showLoading();
      const res = await getItem({ type: "store", id });
      if (res.data) {
        this.item = res.data;
      }
      uni.hideLoading();
    }
  }
};
</script>


<style lang="stylus" scoped>
.store-detail
  padding 40upx 40upx 100upx
  width 100vw
  min-height 100vh
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