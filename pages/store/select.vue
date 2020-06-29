<template lang="pug">
  .select-store
    img(style="width: 90vw" src="/static/img/store-selection.png" mode='widthFix')
    view.remind
      text.cuIcon-info.text-primary
      text.color-hematite.text-md 请先进行门店选择
    button.cu-btn.bg-primary.round.action-button(@click="selectStore") 选择门店
    
</template>

<script>
import { sync } from "vuex-pathify";
import * as service from "@/services";
export default {
  computed: {
    currentStore: sync("store/currentStore"),
    stores: sync("store/stores")
  },
  onLoad() {
    if (!this.stores || this.stores.length == 0) {
      service.loadStore();
    }
  },
  methods: {
    async selectStore() {
      await service.handleSelectStore();
      uni.redirectTo({ url: "/pages/index/index" });
    }
  }
};
</script>

<style lang="stylus" scoped>
.select-store
  display flex
  flex-direction column
  align-items center
  padding 200upx 0
  .remind
    margin-top 150upx
    margin-bottom 30upx
    display flex
    align-items center
    .cuIcon-info
      font-size 40upx
      margin-right 8upx
  .action-button
    width 600upx
    height 100upx
    font-size 36upx
</style>