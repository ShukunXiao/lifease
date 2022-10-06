<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a @click="previous" :class="{disabled: page === 1 }" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a @click="next" :class="{disabled: page >= brandList.length/5}" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box">
      <ul v-if="brandList.length" class="list" :style="{transform: `translateX(${1240*pagechange}px)`}">
        <li v-for="item in brandList" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
          </RouterLink>
        </li>
      </ul>
  </div>
  </HomePanel>
</template>

<script>
import HomePanel from './goods-panel'
import { findBrand } from '@/api/getCategory'
import { ref, watch } from 'vue'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup () {
    const page = ref(1)
    const brandList = ref([])
    findBrand(15).then((data) => {
      brandList.value = data.result
    }
    )
    const next = () => {
      if (page.value < brandList.value.length / 5) {
        page.value++
      }
    }
    const previous = () => {
      if (page.value > 1) {
        page.value--
      }
    }
    const pagechange = ref(0)
    watch(page, (newpage, old) => {
      pagechange.value = 1 - newpage // 第一页为参照物 改变translateX
      console.log(newpage, pagechange.value, brandList)
    })
    return { brandList, page, next, previous, pagechange }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
