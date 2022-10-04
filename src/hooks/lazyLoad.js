import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

// outcome： loading file when Element inside the viewport
export const lazyLoading = (dom, request) => {
  const target = ref(null)
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        console.log(observerElement)
        stop()
        request().then(data => { result.value = data.result })
      }
    }
  )
  return { target, result }
}
