import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

// outcome： loading file when Element inside the viewport
/**
 *
 * @param {Element} target -被检测的dom对象
 * @param {function} request
 * @returns resuilt 异步图片信息
 */
export const lazyLoading = (target, request) => {
  const result = ref([])
  // stop停止观察 target 监听目标元素 isIntersecting是否位于视口
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop()
        request().then(data => {
          console.log(12, data)
          result.value = data.result
        })
      }
    }, { threshold: 0.1 }
  )
  return result
}
// Intersection Observer API 允许你配置一个回调函数，当以下情况发生时会被调用

// 每当目标 (target) 元素与设备视窗或者其他指定元素发生交集的时候执行。设备视窗或者其他元素我们称它为根元素或根 (root)。
// Observer 第一次监听目标元素的时候
