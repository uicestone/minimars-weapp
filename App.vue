<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style lang="stylus">
@import 'common/colorui/main.css'
@import 'common/colorui/icon.css'
@import 'common/colorui/animation.css'

body {
  --primary #57ff9a
}

$color-primary = #57ff9a

.page
  min-height 100vh
  min-width 100vw
.logo
  width 100%
  height 100upx
  text-align center
  object-fit contain
.bg
  position fixed
  top 0
  left 0
  z-index -100
.bg-bottom
  position fixed
  bottom 0
  left 0
  z-index -100
.bg-purple
  background-color #361936
.text-purple
  color #361936
.bg-orange
  background-color #e08631
.text-orange
  color #e08631
.absolute
  position absolute
.relative
  position relative
.color-quartz
  color #e1e1e1
.color-magnetit
  color #bbb
.color-hematite
  color #7d7d7d
.color-basalt
  color #252525
.color-primary
  color $color-primary
.bg-primary
  background $color-primary
.bottom-fixed
  position fixed
  bottom 0
  width 100%
.flex-1
  flex 1
.top-fixed
  position fixed
  top 0
  width 100%
.h-full
  height 100%
.w-full
  width 100%
.action-button
  background $color-primary
  height 70upx
</style>
