
<template lang="pug">
  swiper.card-swiper(v-if="items && items.length > 0" :circular='true' @change="onChange" indicator-color='#8799a3' indicator-active-color='#0081ff' :current-item-id="curItem.id")
    swiper-item(v-for='(item,index) in items' :item-id="item.id"  :class="curItem.id==item.id?'cur':''" :key='index' @click="onChange({detail:{current: index}})")
      view.swiper-item
        gift-card.gift-card(:checked="curItem.id==item.id && check" :item="item")
</template>

<script>
export default {
  props: ["items", "curItem", { check: { default: true } }],
  methods: {
    onChange(e) {
      this.$emit("update:curItem", this.items[e.detail.current]);
    }
  }
};
</script>


<style lang="stylus" scoped></style>
