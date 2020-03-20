<template lang="pug">
  scroll-view(scroll-y).event-detail
    cu-custom(isBack @back="uni.navigateBack()")
      text(slot="backText") 商品详情
    mi-dialog.payment-dialog(:visible.sync="showPayment" withClose)
      view.cotent
        view.head
          img.img
          view.info
            view.text
              view.name {{item.name}}
            view.price
              view.credit
                img.icon(src="/static/icon/pointmain.svg")
                text 1300
        view.form
          view.label 款式
          view.slector
            button.cu-btn.round.bg-primary(v-for="(i, index) in item.types" :key="index"  :class="[form.currentType == i.value ? 'active' : '']" @click="switchType(i)") {{i.label}}
          view.label 尺寸
          view.label 数量
          mi-input-number(:value.sync="form.amount")
        view.action
          button.cu-btn.bg-primary.round.action-button(@click="handlePayment") 确认兑换


    view.cover(:style="[{ background: avatar ? 'url(' + avatar + ')': '#666' }]")
    card.card(withGreenShape)
      view.content
        view.name {{item.name}} (剩余 {{item.remaning}})
        view.price 
          img.icon(src="/static/icon/pointmain.svg")
          text 1600
        view.prompt （请凭兑换码至门店前台核销并领取商品）
    view.cu-card.no-card
      view.cu-item.content
        view.title 商品详情
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
      button.cu-btn.round.action-button.bg-primary(@click="showPayment = true")
        view.normal 立即兑换
    
</template>

<script>
export default {
  data() {
    return {
      showPayment: false,
      form: {
        amount: 0,
        currentType: "小蛙蛙"
      },
      item: {
        name: "迷你毛毛小袜子",
        remaning: 26,
        types: [
          { label: "小蛙蛙", value: "小蛙蛙" },
          { label: "小狗子", value: "小狗子" },
          { label: "小喵喵", value: "小喵喵" },
          { label: "小猩猩", value: "小猩猩" }
        ],
        feature: [
          {
            key: "材质",
            value: "10cm*5cm"
          },
          { key: "尺寸", value: "100%纯棉" },
          { key: "特点", value: "可爱可爱可爱" }
        ]
      }
    };
  },
  methods: {
    handlePayment() {
      this.showPayment = false;
      uni.navigateTo({
        url: "/pages/user/giftSuccess"
      });
    },
    switchType(item) {
      this.form.currentType = item.value;
    }
  }
};
</script>


<style lang="stylus" scoped>
.event-detail
  .cover
    height 550upx
  .payment-dialog
    font-family PingFangSC-Regular, PingFang SC
    color var(--text-primary)
    .head
      display flex
      .img
        height 220upx
        width 220upx
        border-radius 50upx
        background #eee
      .info
        text-align left
        margin 6upx 0 6upx 30upx
        display flex
        flex-direction column
        .text
          flex 1
          .name
            font-size 28upx
            font-weight 400
            line-height 40upx
          .prompt
            font-family PingFangSC-Semibold, PingFang SC
            font-size 24upx
            line-height 38upx
            color #aeabac
        .price
          font-size 38upx
          font-family PingFangSC-Medium, PingFang SC
          font-weight 500
          .credit
            display flex
            align-items center
            .icon
              width 40upx
              height 40upx
              margin-right 8upx
    .form
      text-align left
      margin 50upx 0 80upx
      .label
        font-size 24upx
        line-height 34upx
        margin 30upx 0
      .slector
        .cu-btn
          background var(--primary-light)
          margin 0 12upx 30upx
          &.active
            background var(--primary)
    .action
      display flex
      justify-content space-between
      .action-button
        width 100%
        height 80upx
        border-radius 50upx
        font-size 30upx
        font-family PingFangSC-Medium, PingFang SC
        font-weight 500
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