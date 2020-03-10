<template lang="pug">
  scroll-view(scroll-y).user-booking.page
    img.img
    card.card
      view.content
        view.tabs
          view.tab(:class="[item.value== curTab? 'active': '']" v-for="(item,index) in tabs" :key="index" @click="switchTab(item)")
            view {{item.label}}
            view.circle(v-if="item.value== curTab")
        view.card-list
          view.card-list-item(v-for="(item,index) in booking" :key="index")
            card-list-item(:item="item")

</template>

<script>
export default {
  data() {
    return {
      curTab: "已预约",
      tabs: [
        { label: "全部", value: "全部" },
        { label: "已预约", value: "已预约" },
        { label: "已完成", value: "已完成" },
        { label: "已取消", value: "已取消" }
      ],
      booking: [
        { img: "", title: "游玩一次", subTitle: "今日" },
        { img: "", title: "亲子下午茶", subTitle: "2022.12.31" },
        { img: "", title: "Ballon Time", subTitle: "2020年6月6日 上午11时 小派对房" }
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
  .card
    .content
      min-height calc(100vh - 230upx)
      padding 60upx 40upx
      .tabs
        display flex
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
</style>