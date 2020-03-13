<template lang="pug">
  view.box
    view.input-number.flex.justify-between.align-center
      button(class="cu-btn icon " @click="$emit('update:value', value <=min ? min : value-1)")
        text(class="cuIcon-move")
      text {{value}}
      button(class="cu-btn icon bg-primary radius shadow shadow-lg" @click="$emit('update:value', value >= max? max:  value+1)")
        text(class="cuIcon-add")
    view.suffix(v-if="suffix") {{suffix}}


</template>

<script>
export default {
  props: {
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 1000000 },
    suffix: { type: String }
  }
};
</script>


<style lang="stylus" scoped>
.box
  display inline-flex
  flex-direction column
  font-size 38upx
  width 260upx
  .input-number
    border-radius 200upx
    padding 10upx 20upx
    border 2px solid #ddd
  .cu-btn[disabled]
    background #c5c5c5
  .suffix
    color #c5c8c8
    text-align center
    font-size 28upx
    margin-top 6upx
</style>


