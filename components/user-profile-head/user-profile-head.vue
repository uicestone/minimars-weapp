<template lang="pug">
  view.user-profile-head
    view
      img.bg.w-full.absolute(src="/static/img/profile-bg.png" mode='widthFix')
      img(:src="user.avatarUrl").cu-avatar.round.lg
      view.name-bar
        text.name {{user.name}}
        text.vip(v-if="userCards.length") 尊享会员
      view.mobile 
        view(v-if="user.mobile") {{user.mobile}}
        button.cu-btn.bg-primary.get-mobile(v-else open-type='getPhoneNumber' @getphonenumber="getPhoneNumber") 获取手机号

</template>

<script>
import { sync } from "vuex-pathify";
import { updateMobile } from "@/common/vmeitime-http";
import { fetchUser } from "@/services";
import { getPhoneNumber } from "../../services";
export default {
  data() {
    return {
      avatar: ""
    };
  },
  computed: {
    user: sync("auth/user"),
    auth: sync("auth"),
    userCards: sync("auth/userCards")
  },
  methods: {
    async getPhoneNumber(res) {
      uni.showLoading();
      this.auth.user = await getPhoneNumber(res);
      await fetchUser();
      uni.hideLoading();
    }
  }
};
</script>

<style lang="stylus" scoped>
.user-profile-head
  min-height 0upx
  display flex
  justify-content center
  text-align center
  padding 180upx 0 20upx
  .cu-avatar
    width 120upx
    height 120upx
    border 3px solid #050404
    background #666
  .name-bar
    position relative
    .name
      font-family Avenir-Heavy, Avenir
      font-size 32upx
      color #242833
      font-weight bold
    .vip
      // position absolute
      font-size 16upx
      // font-weight bold
      // right -50upx
      // bottom 8upx
      // line-height 22upx
      margin-left 10upx
  .mobile
    color #a7a7a7
    font-size 20upx
    margin-top -6upx
    font-weight bold
  .get-mobile
    height auto
    padding 10upx 30upx
    font-size 24upx
</style>
