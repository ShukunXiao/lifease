import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'// persisted原理 1 commit更新local storage刷新  2  vuex 加载 localstorage的值

import user from './modules/user'
import cart from './modules/car'
import category from './modules/category'

export default createStore({
  modules: {
    user,
    cart,
    category
  },
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']
    })
  ]
})
