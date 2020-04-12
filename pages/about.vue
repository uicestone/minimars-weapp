<template lang="pug">
  view.about
    //- img.img1(src="/static/img/about-us.png" mode='aspectFill')
    view.text
      html-parser(v-if="item" :html="item.content")
      //- text Mini Mars Kids Club由原创自有设计团队设计，\n “用好的设计陪伴孩子成长”\n 是Mini Mars一贯秉承的理念，\n 展现品牌延续性和一致性的基础上，\n 每家门店的设计主题都会不同，\n 对设计概念和空间设计的把握也有着极高的要求，\n 帮助孩子建立良好的审美观。\n Mini Mars Kids Club于2016年在上海创立， \n以“Stay With U-陪伴，是生活更美妙” \n作为品牌理念。\n 在探索创新时将立足点放在亲子间的陪伴上，\n 致力于以全新角度和全新的风格，\n 使每一位客户感受到陪伴时光的美妙， \n一起玩一起跳，一起吃饭，\n 一起记录孩子成长的那一刻，\n 重新赋予了亲子陪伴的意义。\n 也许生活只是载体，\n 希望每个家庭都能享受简单温馨的亲子时光！\n 自2016年起，Mini Mars Kids Club的品牌文化推出 \n“新型多元化家庭体验中心”一站式服务的概念，\n 打造出兼具亲子游乐+时尚餐厅+主题派对的系列场所。
    //- img.img2(src="/static/img/join-us.png" mode='aspectFill')
    //- img.img3(src="/static/img/qrcode-minimars.png" mode='aspectFill')


    
   
</template>

<script>
import { getBrand } from "../common/vmeitime-http";
export default {
  data() {
    return {
      item: null
    };
  },
  async created() {
    uni.showLoading();
    const res = await getBrand();
    if (res.data) {
      this.item = res.data;
    }
    uni.hideLoading();
  }
};
</script>

<style lang='stylus' scoped>
.about
  background white
  padding 20upx 0 100upx
  display flex
  flex-direction column
  align-items center
  min-height 100vh
  width 100vw
  .text
    text-align center
    color #343434
    font-family PingFangSC-Semibold, PingFang SC
    font-weight 600
    font-size 24upx
    line-height 40upx
  .img1
    width 100%
    height 300upx
  .img2
    width 100%
    height 350upx
  .img3
    width 200upx
    height 200upx
</style>