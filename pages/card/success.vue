<template lang="pug">
  view.card-success
    view.text
      view.title Congrats,
      view.title 毛毛该吃饭了!
      view.subtitle1 您已购买成功
    gift-card.gift-card( :item="item")
    view.prompt （请至前台核销并兑换实体卡）
    view.info
      view 卡片类型: {{item.title}}
      view 有效期: 2020年6月26日——2021年6月26日
      //- view 会员电话: 1312666XXXX
      //- view 支付金额: XXXX元
</template>

<script>
import { getItem } from "../../common/vmeitime-http";
export default {
  data() {
    return {
      item: {}
    };
  },
  async onLoad(data) {
    if (data.id) {
      const res = await getItem({ type: "card", id: data.id });
      if (res.data) {
        this.item = res.data;
      }
    }
  },
  methods: {}
};
</script>


<style lang="stylus" scoped>
.card-success
  padding 120upx 36upx 0
  display flex
  flex-direction column
  text-align center
  .title
    font-size 54upx
    font-family Futura-Medium, Futura
    font-weight 500
    color var(--text-primary)
    line-height 80upx
  .subtitle1
    margin 12upx 0 0
    font-size 30upx
    font-family PingFangSC-Semibold, PingFang SC
    font-weight 600
    color var(--text-primary)
    line-height 40upx
  .prompt
    margin 20upx 0
    font-size 26upx
    font-family PingFangSC-Semibold, PingFang SC
    font-weight 600
    color #6C6C6C
    line-height 38upx
  .text
    text-align left
  .gift-card
    margin-top 50upx
  .info
    text-align left
    margin-top 80upx
    font-size 28upx
    font-family PingFangSC-Medium, PingFang SC
    font-weight 500
    color #818182
    line-height 40upx
</style>