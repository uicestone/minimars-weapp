<template lang="pug">
  view.store-switcher.flex.align-center
    button.cu-btn.round.bg-primary.button
      view.title {{currentStore.name}}
    picker.action(@change="selectStore" :range="stores" range-key="name")
      text.arrow(class='cuIcon-right')
      text.text 切换门店
      
</template>

<script>
import { sync } from "vuex-pathify";
import * as service from "@/services";
export default {
  computed: {
    currentStore: sync("store/currentStore"),
    stores: sync("store/stores")
  },
  async created() {
    if (!this.stores || this.stores.length == 0) {
      await service.loadStore();
    }
  },
  methods: {
    selectStore(e) {
      this.currentStore = this.stores[e.detail.value];
      uni.setStorageSync("storeId", this.currentStore.id);
    }
  }
};
</script>


<style lang="stylus" scoped>
.store-switcher
  .button
    width 60%
    height 70upx
  .action
    font-size 30upx
    margin-left 20upx
    color #6e7073
    .arrow
      margin-right 5upx
</style>