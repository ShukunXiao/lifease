<template>
  <div class="home-banner">
    <XtxCarousel :CarouselData="CarouselData" autoPlay/>
  </div>
</template>
<script>
import { findBanner } from '@/api/getCategory.js'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    const CarouselData = ref([])
    findBanner().then((data) => {
      CarouselData.value = data.result
      console.log(data)
    })
    return { CarouselData }
  }
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
.xtx-carousel {
  :deep .carousel-btn.prev {
    left: 270px;
  }
  :deep .carousel-indicator {
    padding-left: 275px;
  }
}
</style>
