<template>
  <HomePanel ref="target" title="人气推荐" sub-title="人气爆款 不容错过">
    <ul v-if='goods.length' ref="pannel" class="goods-list">
      <li v-for="item in goods" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="">
          <p class="name">{{item.title}}</p>
          <p class="desc">{{item.alt}}</p>
        </RouterLink>
      </li>
    </ul>
    <goodSkeleton v-else > </goodSkeleton>
  </HomePanel>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './goods-panel'
import { findHot } from '@/api/getCategory'
import goodSkeleton from './goods-skeleton.vue'
import { lazyLoading } from '@/hooks/lazyLoad'
export default {
  name: 'HomeNew',
  components: { HomePanel, goodSkeleton },
  setup () {
    const target = ref(null)
    // const goods = ref([])
    const goods = lazyLoading(target, findHot)
    console.log(goods)
    // findHot().then(data => {
    //   goods.value = data.result
    // })
    return { goods, target }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
