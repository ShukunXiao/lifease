import axios from 'axios'
import store from '@/store/index'
import router from '@/router'
const JSONBig = require('json-bigint')({ storeAsString: true })
// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise

export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000,
  transformResponse: [function (data) {
    // eslint-disable-next-line no-loss-of-precision
    // const obj = { a: 1, jason: 12312313123123123123333333333333333333123123231233333333333333333333 }
    // const obj2 = JSONBig.stringify(obj)
    // const res = JSONBig.parse(obj2)
    // console.log(res)
    try {
      return JSONBig.parse(data)
    } catch (e) {
      return data
    }
  }]
})

instance.interceptors.request.use((config) => {
  const { profile } = store.state.user
  if (profile.token) {
    config.headers.Authorization = `bearer ${profile.token}`
  }
  return config
}, (error) => Promise.reject(error))

// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
instance.interceptors.response.use((response) => response.data, (error) => {
  if (error.response && error.response.status === 401) {
    // 1. 清空无效用户信息
    store.commit('user/setUser', {
      id: '',
      avatar: '',
      nickname: '',
      account: '',
      mobile: '',
      token: ''
    })
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // encodeURIComponent 转换uri编码，防止解析地址出问题
    router.push('/login?redirectUrl=' + fullPath)
    // 2. 跳转到登录页
    // 3. 跳转需要传参（当前路由地址）给登录页码
  }
  return Promise.reject(error)
})

// export default instance
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
