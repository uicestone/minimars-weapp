<template lang="pug">
  view.user-giftlist
    cu-custom(isBack @back="uni.navigateBack")
    user-profile-head
    stripe.stripe(withTail)
      view.content
        view.cu-list.grid.col-2
          view.item(v-for="(item, index) in tabs" :key="index" @click="switchTab(item)" :class="[currentTabKey == item.key? 'active': '']") 
            button.cu-btn
              img.icon(:src="item.img")
            view.stat
              view.title {{item.label}}
            view.line(v-if="item.line")
    card.card(withShape)
      view.content
        view.title.with-padding {{currentTab.label}}
        view(v-if="currentTabKey==0")
          view.cu-list.grid.col-2
            view.cu-item(v-for="(item,index) in events" :key="index" @click="goEventDetail(item)")
              gift-item.flex.justify-center(:item="item")
        view(v-else)
          view.cu-list.grid.col-2
            view.cu-item(v-for="(item,index) in gifts" :key="index" @click="goGiftDetail(item)")
              gift-item.flex.justify-center(:item="item")
</template>

<script>
export default {
  data() {
    return {
      currentTabKey: 0,
      tabs: [
        { key: 0, label: "积分兑换活动", img: "/static/icon/point.svg", line: true },
        { key: 1, label: "积分报名活动", img: "/static/icon/gift.svg" }
      ],
      events: [
        {
          name: "公主下午茶",
          price: 900
        },
        {
          name: "甜甜圈大作战",
          price: 1300
        },
        {
          name: "公主下午茶",
          price: 900
        },
        {
          name: "甜甜圈大作战",
          price: 1300
        }
      ],
      gifts: [
        {
          name: "迷你毛毛小袜子",
          price: 1600
        },
        {
          name: "森林宝贝毛绒玩具",
          price: 5600
        },
        {
          name: "迷你毛毛小袜子",
          price: 1600
        },
        {
          name: "森林宝贝毛绒玩具",
          price: 5600
        }
      ]
    };
  },
  computed: {
    currentTab() {
      return this.tabs[this.currentTabKey];
    }
  },
  onLoad(data) {
    console.log(data);
    if (data.tab) {
      this.currentTabKey = data.tab;
    }
  },
  methods: {
    switchTab(item) {
      this.currentTabKey = item.key;
    },
    goEventDetail(item) {
      this.navigateTo("/pages/event/detail");
    },
    goGiftDetail(item) {
      this.navigateTo("/pages/user/giftDetail");
    }
  }
};
</script>


<style lang="stylus" scoped>
.user-giftlist
  .stripe
    .content
      padding 50upx 24upx 50upx 0
      .cu-list
        background inherit
      .item
        display flex
        text-align left
        align-items center
        padding-left 56upx
        color #303133
        &.active
          color white
        .cu-btn
          border-radius 50%
          background var(--primary)
          width 70upx
          height 70upx
          padding 0
          .icon
            width 40upx
            height 40upx
        .stat
          margin-left 20upx
          font-family PingFangSC-Medium, PingFang SC
          flex 1
          .title
            font-size 26upx
            line-height 40upx
            font-weight 600
        .line
          height 40upx
          width 1px
          background white
  .card
    .content
      padding 32upx 0 100upx 0
      min-height 1000upx
      .with-padding
        padding 0 40upx
      .title
        font-size 30upx
        font-family PingFangSC-Medium, PingFang SC
        font-weight 500
        color var(--text-primary)
        line-height 40upx
</style>