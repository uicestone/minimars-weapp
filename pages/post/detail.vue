<template lang="pug">
  view.post-detail
    text.text-lg.text-bold {{data.title}}
    html-parser(:html="data.content")
</template>

<script>
import { getItem } from "../../common/vmeitime-http";
export default {
  data() {
    return {
      data: null
    };
  },
  onLoad(data) {
    if (data.id) {
      uni.showLoading();
      this.loadPost(data.id);
      uni.hideLoading();
    }
  },
  methods: {
    async loadPost(id) {
      const res = await getItem({ type: "post", id });
      this.data = res.data;
    }
  }
};
</script>


<style lang="stylus" scoped>
.post-detail
  text-align center
  padding 40upx
</style>