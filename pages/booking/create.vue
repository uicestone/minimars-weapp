<template lang="pug">
  view.booking-create
    view.vip
      store-switcher
      view.vip-card
        view.title 选择VIP权益卡
        img.cover(src="https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg")
    view.content
      //- view.header
      //-   view 2020年 6月10号 
      //-   view.date-picker
      //-     picker(mode='date' :value='date' @change='DateChange')
      //-       text.text （展开选择到店日期）
      //-     text.down(class='cuIcon-triangledownfill')
      //-   text.add(class='cuIcon-add color-primary')
      card.card(withShape)
        view.form
          view.form-input
            view
              view.label 日期
              picker(mode='date' :value='date' @change='DateChange')
                view.box.flex.justify-center 6月10日
            view.margin-top
              view.label 人数
              view.flex.justify-between
                view
                  view.box.flex.justify-between.align-center
                    button(class="cu-btn icon ")
                      text(class="cuIcon-move")
                    text 2
                    button(class="cu-btn icon bg-primary radius shadow shadow-lg")
                      text(class="cuIcon-add text-white")
                  view.text-center(style="color: #c5c8c8;") 成人
                view
                  view.box.flex.justify-between.align-center
                    button(class="cu-btn icon ")
                      text(class="cuIcon-move")
                    text 2
                    button(class="cu-btn icon bg-primary radius shadow shadow-lg" disabled)
                      text(class="cuIcon-add text-white")
                  view.text-center(style="color: #c5c8c8;") 儿童
          view.submit(@click="handlePayment")
            button.cu-btn.round.bg-primary.w-full.margin-top(style="height:80upx")
              view.title 确认支付/预约
    view.cu-modal.bottom-modal(:class="showModal?'show':''" @tap="showModal=false")
      view.cu-dialog.no-bg(@tap.stop="")
        card.card-dialog(withClose @close="showModal = false")
          view.content
            view.title 您已成功预约
            view.code 预约码
            img.img
            view.hint (请在到店时出示)
            view.info
              view 时间: 2020年2月2日 上午 10:00
              view 人数：2位成人, 2名儿童
              view 支付方式: 微信支付
              view 共计金额: 690元


      
      
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      form: {
        date: ""
      }
    };
  },
  methods: {
    handlePayment() {
      this.showModal = true;
    }
  }
};
</script>

<style lang="stylus">
.booking-create
  padding 200upx 0 0
  height 100vh
  display flex
  flex-direction column
  >.vip
    margin 0 40upx
    .vip-card
      margin-top 30upx
      .title
        margin-left 10upx
        color #535353
        font-size 32upx
      .cover
        margin 20upx 0 30upx
        border-radius 80upx
        height 400upx
  .content
    flex 1
    // .header
    // display flex
    // border 1px solid #e5dfd4
    // padding 26upx 50upx
    // align-items center
    // border-top-left-radius 50px
    // border-top-right-radius 50px
    // .date-picker
    // display flex
    // align-items flex-end
    // flex 1
    // .text
    // font-size 20upx
    // margin-left 10upx
    // line-height 35upx
    // padding-right 20upx
    // .down
    // font-size 40upx
    // line-height 35upx
    // .add
    // font-size 40upx
    .card
      height 100%
      .form
        height 100%
        padding 50upx 50upx 140upx
        display flex
        flex-direction column
        .form-input
          flex 1
          .label
            color #5b5b5b
            margin-bottom 20upx
          .box
            font-size 38upx
            border 2px solid #ddd
            width 260upx
            border-radius 200upx
            padding 10upx 20upx
            .cu-btn[disabled]
              background #c5c5c5
  .card-dialog
    .content
      text-align center
      display flex
      width 100vw
      flex-direction column
      align-items center
      font-family PingFangSC-Semibold, PingFang SC
      padding 40upx 0 90upx
      .img
        width 240upx
        height 240upx
        border-radius 50upx
        background #22242A
      .title, .code
        font-size 30upx
        font-weight 600
        color var(--text-primary)
        line-height 40upx
        margin 10upx 0
      .hint
        font-size 24upx
        margin-top 4upx
        font-weight 600
        color #b1b0b5
        line-height 32upx
      .info
        margin-top 34upx
        text-align left
        font-size 28upx
        font-weight 500
        color #78757a
        line-height 40upx
</style>
