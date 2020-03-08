<template lang="pug">
  view.booking-create
    tab-bar
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
      card.card
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
                    button(class="cu-btn icon bg-white")
                      text(class="cuIcon-move")
                    text 2
                    button(class="cu-btn icon bg-primary radius shadow shadow-lg")
                      text(class="cuIcon-add text-white")
                  view.text-center(style="color: #c5c8c8;") 成人
                view
                  view.box.flex.justify-between.align-center
                    button(class="cu-btn icon bg-white")
                      text(class="cuIcon-move")
                    text 2
                    button(class="cu-btn icon bg-primary radius shadow shadow-lg" disabled)
                      text(class="cuIcon-add text-white")
                  view.text-center(style="color: #c5c8c8;") 儿童
          view.submit
            button.cu-btn.round.bg-primary.w-full.margin-top(style="height:80upx")
              view.title 确认支付/预约
</template>

<script>
export default {
  data() {
    return {
      form: {
        date: ""
      }
    };
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
</style>