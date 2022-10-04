<template>
  <AppTopNav>顶部通栏</AppTopNav>
  <AppHeader></AppHeader>
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <AppFooter></AppFooter>
  <AppHeaderSticky></AppHeaderSticky>

</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import AppTopNav from '@/components/App-top-nav.vue'
import AppHeader from '@/components/App-header.vue'
import AppFooter from '@/components/App-footer.vue'
import AppHeaderSticky from '@/components/App-header-sticky.vue'

export default {
  name: 'xtx-layout',
  components: {
    AppTopNav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getCategoryDetail')
    onMounted(() => {

    })
  }
}
</script>

<style scoped lang='less'>
  main{
  }

</style>
