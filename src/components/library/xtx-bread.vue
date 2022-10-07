<!-- <template>
  <div class='xtx-bread'>
    <slot />
  </div>
</template> -->

<script>
// import App from './App.vue'
// new Vue({
//    render:h=>h(App)
// }).mount('#app')
// h() =====>  createElement()
// h(App) =====>  根据APP组件创建html结构
// render的返回值就是html结构，渲染到#app容器
// h() 函数参数，1.节点名称  2. 属性|数据 是对象  3. 子节点
import { h } from 'vue'

export default {
  name: 'XtxBread',
  render () {
    // 用法
    // 1. template 标签去除，单文件组件
    // 2. 返回值就是组件内容
    // 3. vue2.0 的h函数传参进来的，vue3.0 的h函数导入进来
    // 4. h 第一个参数 标签名字  第二个参数 标签属性对象  第三个参数 子节点
    // 需求
    // 1. 创建xtx-bread父容器
    // 2. 获取默认插槽内容
    // 3. 去除xtx-bread-item组件的i标签，因该由render函数来组织
    // 4. 遍历插槽中的item，得到一个动态创建的节点，最后一个item不加i标签
    // 5. 把动态创建的节点渲染再xtx-bread标签中
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, index) => {
      dymanicItems.push(item)
      if (index < items.length - 1) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
// <!-- :deep会向后递归
</script>

<style scoped lang='less'>
  .xtx-bread{
    display: flex;
    padding: 25px 10px;
  }
  :deep .xtx-bread-item {
      a {
        color: #666;
        transition: all .4s;
        &:hover {
          color: @xtxColor;
        }
      }

    i {
      font-size: 12px;
      margin-left: 5px;
      margin-right: 5px;
      line-height: 22px;
    }

  }
  </style>
<!-- :deep .xtx-bread-item{
    &:last-child i{
      display: none
    }
  } -->
