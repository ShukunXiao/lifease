<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <HomeBanner></HomeBanner>
      </div>
      <!-- 另其通栏 -->
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner }
}
</script>
<style scoped lang="less"></style>
