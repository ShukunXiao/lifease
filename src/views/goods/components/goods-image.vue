<template>
  <div class="goods-image">
    <div class="large" v-if="!isOutside" :style="[{backgroundImage:`url(${images[currIndex]})`}, {backgroundPositionX: -offsetX * 2 + 200 + 'px' },{backgroundPositionY:-offsetY * 2 + 200 + 'px' } ]"></div>
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="">
      <div class="layer"  :style="[{left: `${offsetX-100}px`, top: `${offsetY-100}px`}]"></div>
    </div>
    <ul class="small">
      <li v-for="(img,i) in images" :key="img" :class="{active:i===currIndex}">
        <img @mouseenter="currIndex=i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const currIndex = ref(0)
    const target = ref(null)
    const showsmall = ref(true)
    const offsetX = ref(100)
    const offsetY = ref(100)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    watch([elementX, elementY, isOutside], (newValue) => {
      showsmall.value = !newValue[2]
      if (elementX.value >= 100 && elementX.value <= 300 && !isOutside.value) {
        offsetX.value = elementX.value
      }
      if (elementY.value >= 100 && elementY.value <= 300 && !isOutside.value) {
        offsetY.value = elementY.value
      }
    })

    return { currIndex, isOutside, offsetX, offsetY, target }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-repeat: no-repeat;
    background-size: 200% 200%;
    background-color: #f8f8f8;
  }

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0,0,0,.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
