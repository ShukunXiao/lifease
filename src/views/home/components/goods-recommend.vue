<template>
  <div class="home-new" ref="target">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <!-- 面板内容 -->
      <transition name="fade">
      <ul v-if="goods.length" class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="">
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">&yen;{{item.price}}</p>
          </RouterLink>
        </li>
      </ul>
      <template v-else>
          <goodsSkeleton />
      </template>
    </transition>
    </HomePanel>
  </div>
</template>
<script>
import { ref } from 'vue'
import HomePanel from './goods-panel'
import { findNew } from '@/api/getCategory'
import goodsSkeleton from './goods-skeleton'
import { lazyLoading } from '@/hooks/lazyLoad'
export default {
  name: 'HomeNew',
  components: { HomePanel, goodsSkeleton },
  setup () {
    const target = ref(null)
    // findNew().then(data => {
    //   goods.value = data.result
    // })
    const goods = lazyLoading(target, findNew) // good已为响应式数据
    return { goods, target }
  }
}
</script>
<style scoped lang="less">
.fade{
    &-leave {
      &-active {
        position: absolute;
        width: 100%;
        transition: opacity 0.5s 0.2s;
        z-index: 1;
      }
      &-to {
        opacity: 0;
      }
    }
  }
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #e6f8ee;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
