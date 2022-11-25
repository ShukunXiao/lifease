<template>
  <!-- 一级路由 -->
  <router-view></router-view>
</template>
<script>
export default {
  name: 'xtx-root'
}
// store.dispatch('cart/deleteCart', skuId)
</script>

<style scoped lang='less'>
.cx{
  color: @warnColor;
  .hoverShadow();
}
</style>
