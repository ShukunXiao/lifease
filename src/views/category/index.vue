<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="top-category">
  <div class="container">
  <!-- 顶层面包屑 -->
  <XtxBread >
      <XtxBreadItem to="/">首页</XtxBreadItem>
    <transition name="dynamic" >
    <XtxBreadItem :key="topCategory.id">{{topCategory.name}}</XtxBreadItem>
    </transition>
  </XtxBread>
  <!-- 轮播i图 -->
  <XtxCarousel :style="{height: '500px'}" :CarouselData="slideData"></XtxCarousel>
  <!-- 二级类目 -->
  <div class="sub-list">
    <h3>全部分类</h3>
    <ul>
      <li v-for="sub in topCategory.children" :key="sub.id">
        <a href="javascript:;">
          <img :src="sub.picture" >
          <p>{{sub.name}}</p>
        </a>
      </li>
    </ul>
  </div>
  <div class="ref-goods" v-for="item in subList" :key="item.id">
    <div class="head">
      <h3>- {{item.name}} -</h3>
      <p class="tag">{{item.desc}}</p>
      <XtxMore />
    </div>
    <div class="body">
      <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
    </div>
  </div>

</div>
</div>
</template>

<script>
import { useRoute } from 'vue-router'
import { findBanner } from '@/api/getCategory'
import { findTopCategory } from '@/api/category'
import { useStore } from 'vuex'
import { ref, watch, computed } from 'vue'
import GoodsItem from './components/goods-item'
import XtxCarousel from '@/components/library/xtx-carousel.vue'
export default {
  components: { GoodsItem, XtxCarousel },
  props: {
    id: {
      type: String
    }
  },
  setup (props) {
    // 轮播图数据
    const slideData = ref([])
    findBanner().then(data => {
      slideData.value = data.result
    })
    // 处理面包屑
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      let cate = {}
      const item = store.state.category.list.find((e) => { return e.id === props.id })
      if (item) cate = item
      return cate
    })
    // const store = useStore()

    // watch监听路由path变化 动态理由不跳转
    const subList = ref([])
    const getSublist = () => {
      findTopCategory(props.id).then(data => {
        subList.value = data.result.children
      })
    }
    watch(() => props.id, (newVal, old) => {
      if (newVal && `/category/${newVal}` === route.path) getSublist()
    }, { immediate: true }) // 必须持续侦听时执行回调 由于路由id一定存在 、当导航到该组件
    return { subList, slideData, topCategory }
  }
}
</script>

<style scoped lang="less">

.dynamic-enter-from,.dynamic-leave-to{
  opacity: 0;
  transform: translateX(18px);
}
.dynamic-enter-active,.dynamic-leave-active {
  transition: all 0.3s linear
}
.dynamic-enter-to,.dynamic-leave-from {
  opacity:1;
  transform: none
}

.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      min-height: 160px;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  // 推荐商品
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
