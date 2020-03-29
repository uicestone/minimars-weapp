<template lang="pug">
  view.post-detail
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
      this.loadPost(data.id);
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
  padding 40upx
</style>