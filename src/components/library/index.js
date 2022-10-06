// global components
import skeleton from './xtx-skeleton.vue'
import carousel from './xtx-carousel'
import XtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png'
export default {
  install (app) {
    app.component('XtxSkeleton', skeleton)
    app.component('XtxCarousel', carousel)
    app.component('XtxMore', XtxMore)
    app.directive('lazy', lazyloadDerect)
  }
}
const lazyloadDerect = {
  mounted (el, binding) {
    // @params entries :[{isIntersecting, target, rootBounds, time}]
    // @params  options : {}
    console.log(el, binding.value)
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        console.log(el, binding.value)
        observer.unobserve(el)
        el.src = binding.value // 如进入视口 赋值src
        el.addEventListener('error', function () {
          el.src = defaultImg // 监听失败 处理失败图片src
        }) // loading加载成功
      } // keep ob till enter viewport
    }, { threshold: 0.01 })

    observer.observe(el)
  }
}
// global derects
