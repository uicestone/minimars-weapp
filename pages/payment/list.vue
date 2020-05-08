<template lang="pug">
  view
    cu-custom(isBack @back="uni.navigateBack")
    scroll-view(scroll-y).cost-record.page
      view.flex.justify-center
        img.img1(src="/static/img/cost-record.png" mode='aspectFit')
      card.card
        view.content
          view.tabs
            view.tab(:class="[item.value== curTab? 'active': '']" v-for="(item,index) in tabs" :key="index" @click="switchTab(item)")
              view {{item.label}}
              view.circle(v-if="item.value== curTab")
          view.card-list
            view.card-list-item(v-for="(item,index) in payment" :key="index")
              card-list-item(:item="item" withAction)
                view.price(slot="action") 
                  text {{item.paid ? "已付款" : "未付款"}}
                  text {{item.amount}}

</template>

<script>
import { getPayment, getPayments, getListData } from "../../common/vmeitime-http";
export default {
  data() {
    return {
      curTab: "card",
      tabs: [
        { label: "全部", value: "all" },
        { label: "充值", value: "card" },
        { label: "支付", value: "booking" }
      ],
      payments: {
        all: [],
        card: [],
        booking: []
      }
    };
  },
  onReachBottom() {
    this.loadPayment();
  },
  computed: {
    payment() {
      return this.payments[this.curTab];
    }
  },
  created() {
    this.switchTab({ value: "card" });
  },
  methods: {
    async loadPayment() {
      const curTab = this.curTab;
      const res = await getListData({ type: "payment", data: { attach: curTab == "all" ? null : curTab, limit: 10, skip: this.payment.length } });
      if (res.data) {
        this.payments[curTab] = [...this.payment, ...res.data];
      }
    },
    switchTab(item) {
      this.curTab = item.value;
      this.loadPayment();
    }
  }
};
</script>


<style lang="stylus" scoped>
.cost-record
  padding 120upx 0 0
  display flex
  flex-direction column
  .img1
    height 150upx
    width 350upx
    text-align center
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
        font-size 26upx
        font-family PingFangSC-Medium, PingFang SC
        font-weight 500
        line-height 48upx
</style>