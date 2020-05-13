<template lang="pug">
  view.cu-modal.bottom-modal(:class="[auth.showGetPhone ? 'show':'']")
    view.cu-dialog.no-bg
      view.cu-bar.flex
        button.bg-grey.round.flex-sub.margin-sm(v-if="auth.showGetPhone!=='FORCE'" @click="cancel") 暂不获取
        button.bg-primary.round.flex-sub.margin-sm(open-type='getPhoneNumber' @getphonenumber="getPhoneNumber") 获取手机号
 
</template>

<script>
import { sync } from "vuex-pathify";
import { event } from "../../services/event";
import { getPhoneNumber } from "../../services";
import { getAuthUser } from "../../common/vmeitime-http";

export default {
  computed: {
    currentTab: sync("currentTab"),
    auth: sync("auth")
  },
  methods: {
    async getPhoneNumber(res) {
      if(!res.detail.encryptedData) return
      try {
        await getPhoneNumber(res);
        this.auth.showGetPhone = false;
        event.emit("mobile");
      } catch (err) {
        console.log(err);
      }
    },
    cancel() {
      this.auth.showGetPhone = false;
      event.removeAllListeners("mobile");
      this.$emit("fail");
    }
  }
};
</script>

<style lang="stylus"></style>
