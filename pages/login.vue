<template lang="pug">
  view.cu-modal.bottom-modal(:class="[auth.showLogin ? 'show':'']")
    view.cu-dialog.no-bg
      view.cu-bar.flex
        button.bg-grey.round.flex-sub.margin-sm(v-if="auth.showLogin!=='FORCE'" @click="cancelLogin()") 暂不登录
        button.bg-primary.round.flex-sub.margin-sm(open-type='getUserInfo', @getuserinfo='wechatGetUserInfo', withcredentials='true') 微信登录
 
</template>

<script>
import { wechatGetUserInfo } from "../services";
import { sync } from "vuex-pathify";
import { event } from "../services/event";

export default {
  computed: {
    currentTab: sync("currentTab"),
    auth: sync("auth")
  },
  methods: {
    async wechatGetUserInfo(data) {
      if(!data.detail.encryptedData) return
      try {
        // debug
        let firstTime = new Date().valueOf();
        const res = await wechatGetUserInfo();
        let secondTime = new Date().valueOf();
        console.log('getuserInfo: ' + (secondTime - firstTime) + 'ms');
        this.auth.showLogin = false;
        event.emit("login");
        this.$emit("success");
      } catch (err) {
        console.log(err);
        this.$emit("fail");
      }
    },
    cancelLogin() {
      this.auth.showLogin = false;
      event.removeAllListeners("login");
      this.$emit("fail");
    }
  }
};
</script>

<style lang="stylus"></style>
