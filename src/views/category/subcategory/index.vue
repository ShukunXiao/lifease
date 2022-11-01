<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="changeFilter" />
      <div class="goods-list">
        <SubSort @sort-change="changeSort" />
        <ul>
          <li v-for="item in goodsList" :key="item.id" >
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <xtxInfiniteLoading :key="show" @loadmore="loadmore" :loading="loading" :finished="finished" >

        </xtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '../components/goods-item.vue'
import SubSort from './components/sub-sort-condition'
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import { findSubCategoryGoods } from '@/api/category'
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup () {
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const route = useRoute()
    const loadmore = () => {
      loading.value = true // 获取数据开始 滚动不再加载 显示加载动画
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(
        ({ result }) => {
          if (result.items.length) {
            console.log(result)
            goodsList.value.push(...result.items)
            reqParams.page++
          } else {
            finished.value = true // 若全部数据加载完 接口返回result 为空数组 滚动到底动画
          }
        }, (error) => {
          console.log(error)
          finished.value = true
          loading.value = false
        }
      )
      loading.value = false
    }
    watch(() => route.params.id, (newVal) => {
      if (newVal && route.path === ('/category/sub/' + newVal)) {
        goodsList.value = []
        reqParams = {
          page: 1,
          pageSize: 20
        }
        finished.value = false
      }
    })
    // 子组件触发父组件更新
    // 监听筛选区改变
    const show = ref(false)
    const changeFilter = (filterParams) => {
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
      nextTick(() => {
        show.value = !show.value
      })
    }
    // 监听排序改变
    const changeSort = (sortParams) => {
      console.log('emitssss')
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
      nextTick(() => {
        show.value = !show.value
      })// 刷新无限滚动组件
    }
    return { loadmore, loading, finished, goodsList, reqParams, changeFilter, changeSort, show }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
