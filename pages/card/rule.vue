<template lang="pug">
  view.card-rule
    view.head
      img.cu-avatar.round.lg(:src="curTypeData.img")
      view.desc
        text {{curTypeData.text}} 售价{{data.price}}元\n （可叠加购买）
      view.icon-list
        view.icon(v-for="(item,index) in imgs" :key="index" )
          img(:src="item")
    view.content
      view.title
        text 您享有的会员权益
        text.prompt 开通会员后，立即发放
      view
        text 1.会员享VIP优惠门票价格； \n2.会员可定期收到Mini Mars最新优惠活动咨询;\n 3.会员可享会员生日礼遇； \n4.会员可享会员日专属福利； \n5.会员可定期获得积分，兑换指定商品;\n 6.会员可受邀免费参加活动。
      view.title.margin-top 会员卡使用规则
      view
        text 1. 此卡为Mini Mars Kids Club 5次卡，单次最多可入场2大1小， 当日最多使用2次，持卡人须同时到店使用；\n 2. 此卡为实名制，仅限开卡人使用； \n3. 开卡人自行选择门店进行实名登记，此卡仅限开卡人开 卡门店使用； \n4. 会员卡使用规则以办理当日门店所签办卡协议为准； \n5. 此卡自开卡即被激活，激活后一年内有效，请于有效期内使用； \n6. 一经售出，不退不换，不挂失、不找零、不可兑现； \n7. 请妥善保管并合理使用此卡，因任何非合理使用或保 管不善导致的损坏、遗失或不可使用的责任均有持卡人自行承担。
    view.flex.justify-center.bottom
      img.img1(src="/static/img/card-rule-bottom.png" mode="widthFix" style="width: 400upx")
      
      
          
</template>

<script>
import { getItem } from "../../common/vmeitime-http/index";
export default {
  data() {
    return {
      avatar: "",
      data: null,
      typeMapping: {
        times: {
          text: "次卡",
          img: "/static/img/card-times-circle.png"
        },
        period: {
          text: "时效卡",
          img: "/static/img/card-period-circle.png"
        },
        credit: {
          text: "充值卡",
          img: "/static/img/card-credit-circle.png"
        }
      },
      imgs: ["/static/icon/cost.svg", "/static/icon/pointmain.svg", "/static/icon/bday.svg", "/static/icon/gift.svg"]
    };
  },
  computed: {
    curTypeData() {
      if (!this.data) return this.typeMapping.times;
      return this.typeMapping[this.data.type];
    }
  },
  onLoad(data) {
    console.log(data);
    if (data.id) {
      this.loadCard(data.id);
    }
  },
  methods: {
    async loadCard(id) {
      const res = await getItem({ id, type: "card-type" });
      if (res.data) {
        this.data = res.data;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.card-rule
  .head
    text-align center
    padding 70upx 0 20upx
    .cu-avatar
      width 120upx
      height 120upx
    .desc
      font-size 34upx
      font-family PingFangSC-Medium, PingFang SC
      font-weight 500
      color #636465
      line-height 48upx
    .icon-list
      display flex
      justify-content space-around
      width 70%
      margin 40upx auto
      .icon
        padding 14upx
        background var(--primary)
        border-radius 50%
        height 70upx
        width 70upx
        img
          width 42upx
          height 42upx
  .content
    padding 0 0 0 38upx
    font-size 24upx
    font-family PingFangSC-Semibold, PingFang SC
    font-weight 600
    color var(--text-primary)
    line-height 40upx
    .title
      font-size 28upx
      margin-bottom 20upx
    .prompt
      margin-left 10upx
      font-size 26upx
      color #a9aaac
</style>
