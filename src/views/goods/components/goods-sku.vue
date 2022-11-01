<template>
  <div class="goods-sku">
    <dl v-for="(item,index) in goods.specs" :key="index">
      <dt>{{item.name}}</dt>
      <dd>
        <template  v-for="val in item.values" :key="val.name">
          <img :class="[{selected: val.selected}, {disabled: val.disabled}]" @click="clickSpecs(item,val)" v-if="val.picture" :src="val.picture" :title="val.name">
          <span :class="[{selected: val.selected},{disabled: val.disabled}]" v-else @click="clickSpecs(item,val)" >{{val.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import { reactive } from 'vue'
import getPowerSet from '@/vender/power-set'
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 初始化选中状态
    const initSelectedStatus = (goods, skuId) => {
      const sku = goods.skus.find(sku => sku.id === skuId)
      if (sku) {
        goods.specs.forEach((spec, i) => {
          const value = sku.specs[i].valueName
          spec.values.forEach(val => {
            val.selected = val.name === value
          })
        })
      }
    }
    initSelectedStatus(props.goods, props.skuId)

    const pathmap = reactive({})
    // const localGood = computed(() => {
    //   getPathMap(props.goods.skus, pathmap)
    //   return {
    //     specs: props.goods.specs,
    //     skus: props.goods.skus
    //   }
    // })
    const clickSpecs = (item, val) => {
      // 1. 选中与取消选中逻辑
      if (val.disabled) {
        return
      }
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(bv => { bv.selected = false })
        val.selected = true
      }
      updateDisabledStatus(pathmap, props.goods.specs)
      // 触发change事件将sku数据传递出去
      const selectedArr = getUserSelect(props.goods.specs).filter(v => v)
      if (selectedArr.length === props.goods.specs.length) {
        // 找到对应的SKU传入父组件
        const sku = props.goods.skus.find(sku => { return sku.specs.map(item => item.valueName).join('&') === selectedArr.join('&') })
        // 传递
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').replace(' ', '')
        })
      } else {
        emit('change', {})
      }
    }
    // const toggle = (item, val) => {
    //   localGood.value.specs.map((i) => {
    //     if (i.name === item.name) {
    //       i.values.map((ele) => {
    //         if (ele.name === val.name) {
    //           ele.selected = !ele.selected
    //         } else {
    //           ele.selected = false
    //         }
    //         return ele
    //       })
    //     }
    //     return i
    //   })
    // }

    // 禁用效果-路径字典
    const spliter = '&'
    const getPathMap = (skus, pathmap) => {
      skus.forEach(item => {
        if (item.inventory) { // 仅遍历有货SKU
          const skuSubset = getPowerSet(item.specs.map((attr) => attr.valueName)) // 获取SKU子集
          skuSubset.forEach(set => {
            if (!pathmap[set.join(spliter)]) {
              pathmap[set.join(spliter)] = item.inventory
            } else {
              pathmap[set.join(spliter)] = pathmap[set.join(spliter)] + item.inventory
            }
          })
        }
      })
    }
    getPathMap(props.goods.skus, pathmap)
    // 用户输入后动态禁用效果
    // 1.获取用户当前规格选中状态
    const getUserSelect = (specs) => {
      const userSelect = Array.from({ length: props.goods.specs.length })
      props.goods.specs.forEach((attr, index) => {
        attr.values.forEach((value) => {
          if (value.selected) {
            userSelect[index] = value.name
          }
        })
      })
      return userSelect
    }
    // 2.字典查询是否有货 更新按钮的禁用状态
    const initialDisabledStatus = (specs, pathmap) => {
      specs.forEach((attr) => {
        attr.values.forEach((value) => {
          value.disabled = !pathmap[value.name]
        })
      })
    }
    const updateDisabledStatus = (pathmap, specs) => {
      specs.forEach((attr, i) => {
        const userselect = getUserSelect(specs) // 只遍历可能的n+1组合 重置n
        // 已选中此行属性直接return
        attr.values.forEach((value) => {
          if (userselect[i] === value.name) return
          userselect[i] = value.name
          const key = userselect.filter(v => v).join(spliter)
          value.disabled = !pathmap[key]
        })
      })
    }
    initialDisabledStatus(props.goods.specs, pathmap)
    return { clickSpecs, getPathMap, getUserSelect }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin();
      }
    }
  }
}
</style>
