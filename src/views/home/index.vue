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
      <HomeBrand></HomeBrand>
      <HomeProduct />
      <homeSpecial />
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
import goodsRecommend from './components/goods-recommend.vue'
import goodsHot from './components/goods-hot'
import HomeBrand from './components/home-brand'
import HomeProduct from './components/home-product'
import homeSpecial from './components/home-special.vue'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner, goodsRecommend, goodsHot, HomeBrand, HomeProduct, homeSpecial }
}
</script>
<style scoped lang="less"></style>
