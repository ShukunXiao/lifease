<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="item in cateList" :key="item.id" @mouseenter="show(item.id)" @mouseleave="hide(item.id)" >
      <RouterLink :to="`/category/${item.id}`" @click="hide(item.id)">{{item.name}}</RouterLink>
      <div class="layer" :class="{active:item.open}">
        <ul>
          <li v-for="childs in item.children" :key="childs.id"  @click="hide(item.id)">
            <RouterLink :to="`/category/sub/${childs.id}`">
              <img :src=childs.picture alt="">
              <p>{{childs.name}}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    const cateList = computed(() => {
      return store.state.category.list
    })
    const show = (id) => { store.commit('category/show', id) }
    const hide = (id) => { store.commit('category/hide', id) }
    return { cateList, show, hide }
  }
}
</script>
<style scoped lang='less'>
  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;
    > li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
      > a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover {
        > a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
      }
    }
    .layer {
      width: 1240px;
      background-color: #fff;
      position: absolute;
      left: -200px;
      top: 56px;
      height: 0;
      overflow: hidden;
      opacity: 0;
      box-shadow: 0 0 5px #ccc;
      transition: all .2s .1s;
      &.active{
        height: 132px;
        opacity: 1;
        }
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 70px;
        align-items: center;
        height: 132px;
        li {
          width: 110px;
          text-align: center;
          img {
            width: 60px;
            height: 60px;
          }
          p {
            padding-top: 10px;
          }
          &:hover {
            p {
              color: @xtxColor;
            }
          }
        }
      }
    }
  }

  </style>
