<template lang="pug">
  view.box.flex.justify-between.align-center
    button(class="cu-btn icon " @click="$emit('update:value', value <=min ? min : value-1)")
      text(class="cuIcon-move")
    text {{value}}
    button(class="cu-btn icon bg-primary radius shadow shadow-lg" @click="$emit('update:value', value >= max? max:  value+1)")
      text(class="cuIcon-add")
    slot
</template>

<script>
export default {
  props: {
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 1000000 }
  }
};
</script>


<style lang="stylus" scoped>
.box
  font-size 38upx
  border 2px solid #ddd
  width 260upx
  border-radius 200upx
  padding 10upx 20upx
  .cu-btn[disabled]
    background #c5c5c5
</style>


