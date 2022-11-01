/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
import request from '@/utils/request'
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

export const findSubCategoryGoods = (params) => {
  return request('/category/goods', 'post', params)
}
