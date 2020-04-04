<template lang="pug">
  view.card-title
    view.title {{title}}
    view.action(@click="$emit('click')") {{action}}
      text.arrow(class='cuIcon-right')
</template>

<script>
export default {
  props: ["title", "action"]
};
</script>

<style lang="stylus" scoped>
.card-title
  display flex
  justify-content space-between
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight 600
  .title
    color #303133
    font-size 30upx
  .action
    color #606266
</style>
