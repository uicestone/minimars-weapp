<template lang="pug">
  view.cu-modal(:class="visible?'show':''" @tap="$emit('update:visible', !visible)")
    view.cu-dialog(@tap.stop="")
      view.box
        slot
      view.close(v-if="withClose" class="cuIcon-roundclose" @click="$emit('update:visible', false)")

</template>

<script>
export default {
  props: ["visible", "withClose"]
};
</script>


<style lang="stylus" scoped>
.cu-dialog
  border-radius 90upx
  padding 50upx 60upx
  position relative
  .close
    position absolute
    right 40upx
    top 40upx
    font-size 20px
</style>

