<template lang="pug">
  scroll-view(scroll-y).event
    top-event
    stripe.stripe(withTail)
      view.content
        view.avatar(:style="[{ background: avatar ? 'url(' + avatar + ')': '#666' }]")
        view.center
          view.title Ballon Time
          view.subTitle 2022.2.22 16:00
        button.cu-btn.round.action-button
          view.icon(class="cuIcon-attentionfill")
          view.text 您的预约
    card.card(withShape)
      view.content
        view.cu-list.grid.col-2
          view.cu-item(v-for="(item,index) in events" :key="index")
            event-item.flex.justify-center(:item="item")
</template>

<script>
export default {
  data() {
    return {
      avatar: "",
      events: [
        { title: "P", date: "2020.2.2" },
        { title: "Flower Time", date: "2020.2.2" },
        { title: "P", date: "2020.2.2" },
        { title: "P", date: "2020.2.2" },
        { title: "P", date: "2020.2.2" },
        { title: "P", date: "2020.2.2" }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>

.event
  .stripe
    .content
      display flex
      align-items center
      padding 40upx
      .avatar
        height 100upx
        width 100upx
        border-radius 20upx
      .center
        margin-left 20upx
        flex 1
        .title
          font-size 32upx
          line-height 38upx
        .subTitle
          font-size 28upx
          line-height 34upx
          color white
      .action-button
        background #91e2a7
        height 48upx
        width 208upx
        color #484746
        font-size 28upx
        position relative
        .icon
          position absolute
          left 14upx
          font-size 20upx
          color white
  .card
    .content
      padding 40upx 20upx 100upx
</style>
