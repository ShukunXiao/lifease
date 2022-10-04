<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <HomeBanner></HomeBanner>
      </div>
      <goodsRecommend></goodsRecommend>
      <!-- 另其通栏 -->
      <goodsHot></goodsHot>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
import goodsRecommend from './components/goods-recommend.vue'
import goodsHot from './components/goods-hot'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner, goodsRecommend, goodsHot }
}
</script>
<style scoped lang="less"></style>
