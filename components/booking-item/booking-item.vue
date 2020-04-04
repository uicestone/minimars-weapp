<template lang="pug">
  view.bg-white.booking-item(@click="handleClick" :class="[withShadow? 'with-shadow shadow': '']")
    img.img(:src="img" :mode='mode')
    view.center
      view.title {{title}}
      view.sub-title {{item.date}}
    slot.action(v-if="withAction" name="action")
      text.arrow(class='cuIcon-right')

</template>

<script>
import { _ } from "@/utils/lodash";
import { utils } from "@/utils/index";
import { sync } from "vuex-pathify";
export default {
  props: ["item", "withAction", "withShadow"],
  computed: {
    img() {
      return utils.booking.getImage(this.item);
    },
    title() {
      return utils.booking.getTitle(this.item);
    },
    mode() {
      if (this.item.type == "play") {
        return "widthFix";
      } else {
        return "scaleToFit";
      }
    },
    bookingStore: sync("booking")
  },
  methods: {
    handleClick() {
      this.bookingStore.curBooking = this.item;
      this.bookingStore.showBooking = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.booking-item
  display flex
  background transparent
  border-radius 30upx
  min-height 150upx
  align-items center
  padding 14upx 20upx 14upx 14upx
  &.with-shadow
    box-shadow 0px 2px 12px 0px rgba(0, 0, 0, 0.1)
  .img
    height 124upx
    width 124upx
    border-radius 20upx
    // background #c8c7cc
  .center
    flex 1
    margin-left 30upx
    font-family Helvetica
    .title
      font-size 32upx
      font-family Helvetica
      color var(--text-primary)
      line-height 36upx
    .sub-title
      margin-top 20upx
      font-size 26upx
      line-height 22upx
      font-family Helvetica
      color var(--gray)
  .action
    .arrow
      font-size 40upx
</style>
