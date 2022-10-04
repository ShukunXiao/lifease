<template>
  <div class='xtx-carousel' @mouseleave='replay' @mouseenter="stop">
    <!-- 轮播容器 -->
    <ul class="carousel-body">
      <li class="carousel-item" :class="{fade:index===i}" v-for="(item,i) in CarouselData" :key=i>
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <!-- 上一张 -->
    <a @click="change(-1)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <!-- 下一张 -->
    <a @click="change(1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span v-for="(item,i) in CarouselData.length" :key="i" :class="{active: i === index}"  ></span>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    autoPlay: {
      type: Boolean,
      default: false
    },
    CarouselData: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  setup (props) {
    const index = ref(0)
    let timer = null
    const startPlay = () => {
      timer = setInterval(() => {
        if (index.value + 1 > props.CarouselData.length - 1) {
          index.value = 0
        } else {
          index.value = index.value + 1
        }
      }, 3000)
    }
    // 自动轮播
    watch(() => props.CarouselData, (newValue) => {
      if (newValue.length && props.autoPlay) {
        clearInterval(timer)
        startPlay()
      }
    }, { immediate: true })
    // 鼠标进入暂停播放， 离开继续
    const stop = () => { clearInterval(timer) }
    const replay = () => {
      if (props.CarouselData.length) {
        clearInterval(timer)
        startPlay()
      }
    }
    // next previous
    const change = (payload) => {
      const newIndex = index.value + payload
      if (newIndex > props.CarouselData.length - 1) {
        index.value = 0
      } else if (newIndex < 0) {
        index.value = props.CarouselData.length - 1
      } else { index.value = index.value + payload }
    }

    return { index, startPlay, stop, replay, change }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
