<template lang="pug">
  view
    cu-custom(isBack @back="navigateTo('/pages/user/index')")
    scroll-view(scroll-y).user-booking.page
      card.card
        view.content
          view.tabs
            view.tab(:class="[item.value== curTab? 'active': '']" v-for="(item,index) in tabs" :key="index" @click="switchTab(item)")
              view {{item.label}}
              view.circle(v-if="item.value== curTab")
          view.card-list
            view.card-list-item(v-for="(item,index) in booking" :key="index")
              card-list-item(:item="item" withAction)
                view.price(slot="action") 
                  text {{item.price}}

</template>

<script>
export default {
  data() {
    return {
      curTab: "充值",
      tabs: [
        { label: "全部", value: "全部" },
        { label: "充值", value: "充值" },
        { label: "支付", value: "支付" }
      ],
      booking: [
        { img: "", title: "长宁店十次卡", subTitle: "2020年6月6日", price: "-1680.00" },
        { img: "", title: "季卡", subTitle: "2020年1月22日", price: "-6688.00" },
        { img: "", title: "1000元礼品卡", subTitle: "2020年8月8日", price: "-928.00" }
      ]
    };
  },
  methods: {
    switchTab(item) {
      this.curTab = item.value;
    }
  }
};
</script>


<style lang="stylus" scoped>
.user-booking
  padding 120upx 0 0
  display flex
  flex-direction column
  .img
    height 110upx
    width 100%
  .card
    .content
      min-height calc(100vh - 230upx)
      padding 60upx 40upx
      .tabs
        display flex
        width 400upx
        justify-content space-between
        font-size 30upx
        font-family PingFangSC-Semibold, PingFang SC
        font-weight 600
        color var(--text-primary)
        line-height 40upx
        .tab
          text-align center
          .circle
            width 4px
            height 4px
            border-radius 50%
            margin 0 auto
          &.active
            color var(--primary)
            .circle
              background var(--primary)
    .card-list
      margin-top 60upx
      .card-list-item
        margin-bottom 30upx
      .price
        text-align left
        font-size 32upx
        font-family PingFangSC-Medium, PingFang SC
        font-weight 500
        line-height 48upx
</style>