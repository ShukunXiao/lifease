import request from '@/utils/request'
export const getCategorys = () => {
  return request('/home/category/head', 'get')
}

export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}
