import { topCategory } from '@/api/constant'
import { getCategorys } from '@/api/getCategory'
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合
      list: topCategory.map((item) => {
        return {
          name: item
        }
      })
    }
  },
  mutations: {
    setCategory (state, payload) {
      state.list = payload
    },
    show (state, targetId) {
      state.list.find((item) => item.id === targetId
      ).open = true // find 对象引用传递
    },
    hide (state, targetId) {
      state.list.map((item) => {
        if (item.id === targetId) {
          item.open = false
        }
        return item
      }
      )
    }
  },
  actions: {
    async getCategoryDetail (context) {
      const { result } = await getCategorys()
      result.map((item) => {
        item.open = false
        return item
      })
      context.commit('setCategory', result)
    }
  }
}
