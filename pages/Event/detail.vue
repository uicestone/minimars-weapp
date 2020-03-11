<template lang="pug">
  view.event-detail
    cu-custom(isBack)
      text(slot="backText") 活动详情
    view.cover(:style="[{ background: avatar ? 'url(' + avatar + ')': '#666' }]")
    card.card(withShape1)
      view.content
        view.name {{item.name}} (剩余13)
        view.price 
          img.icon(src="/static/icon/pointmain.svg")
          text 1300 / ￥40
        view.date 日期: 6月6日上午11点
        view.address 门店： 天山长宁店
        view.prompt （兑换后请凭兑换码至前台核销并领取入场券）
    view.cu-card.no-card
      view.cu-item.content
        view.title 活动详情
        view.event-detail
          view.name {{item.name}}
          view.feature(v-for="(item,index) in item.feature" :key="key")
            view.key 
              button.cu-btn.round {{item.key}}
            view.value 
              view.text {{item.value}}
    view.bottom-fixed
      button.cu-btn.round.action-button.bg-primary(@click="back")
        view.normal 返回首页
      button.cu-btn.round.action-button.bg-primary
        view.normal 立即兑换
</template>

<script>
export default {
  data() {
    return {
      item: {
        name: "甜甜圈大作战",
        feature: [
          {
            key: "地点",
            value: "小派厨房"
          },
          { key: "材料", value: "商家提供" },
          { key: "特点", value: "锻炼宝贝的动手能力" }
        ]
      }
    };
  }
};
</script>


<style lang="stylus" scoped>
.event-detail
  .cover
    height 550upx
  .card
    .content
      display flex
      flex-direction column
      align-items center
      font-size 30upx
      font-family PingFangSC-Medium, PingFang SC
      font-weight 500
      color var(--text-primary)
      line-height 48upx
      text-align center
      padding 100upx 0 40upx
      view
        margin 5upx 0
      .name
        font-size 34upx
      .price
        font-size 38upx
        display flex
        align-items center
        .icon
          width 40upx
          height 40upx
          margin-right 8upx
      .prompt
        font-size 26upx
        color #606266
  .cu-card
    margin-top 20upx
    font-family PingFangSC-Semibold, PingFang SC
    .content
      padding 80upx 0 46upx
      .title
        text-align center
        font-size 30upx
        font-weight 600
        color var(--text-primary)
        line-height 40upx
      .event-detail
        margin 40upx 50upx 0 100upx
        .name
          margin-bottom 34upx
          font-size 30upx
          font-weight 600
          color #606266
          line-height 40upx
        .feature
          display flex
          align-items center
          margin-bottom 20upx
          .key
            width 50%
            .cu-btn
              width 120upx
              height 50upx
              color white
              font-weight 500
              font-size 26upx
              background #C5C3C0
          .value
            width 50%
            font-size 28upx
            font-weight 600
            line-height 40upx
            text-align left
            color var(--text-primary)
  .bottom-fixed
    display flex
    align-items center
    justify-content space-between
    padding 30upx 40upx
    background white
    border-top 1px solid #f3f4f5
</style>