<template lang="pug">
  view.page
    user-profile-head
    stripe.stripe(withTail)
      view.content
    card.card(withShape)
      view.content
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped></style>
