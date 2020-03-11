<template>
  <view class="cu-custom" :style="[{ height: CustomBar + 'px', background: 'transparent', position: 'fixed', zIndex: 10 }]">
    <view class="cu-bar" :style="style">
      <view class="action" @tap="BackPage" v-if="isBack">
        <text class="cuIcon-back"></text>
        <slot name="backText"></slot>
      </view>
      <view class="content" :style="[{ top: StatusBar + 'px' }]">
        <slot name="content"></slot>
      </view>
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar
    };
  },
  name: "cu-custom",
  computed: {
    style() {
      var StatusBar = this.StatusBar;
      var CustomBar = this.CustomBar;
      var bgImage = this.bgImage;
      var style = `height:${CustomBar}px;padding-top:${StatusBar}px; background: tranparent;position: fixed;`;
      return style;
    }
  },
  props: {
    bgColor: {
      type: String,
      default: ""
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ""
    }
  },
  methods: {
    BackPage() {
      this.$emit("back");
    }
  }
};
</script>

<style>
</style>
