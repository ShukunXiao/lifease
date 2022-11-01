// global components
// import skeleton from './xtx-skeleton.vue'
// import carousel from './xtx-carousel'
// import XtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png'
import Message from './Message'
// import XtxBread from './xtx-bread'
// import XtxBreadItem from './xtx-bread-item'
// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const requirefn = require.context(__dirname, false, /\.vue/)
export default {
  install (app) {
    // 自动导入当前目录下组件
    // require.context返回静态导入方法 2 .keys文件名数组
    const dirArray = requirefn.keys()
    dirArray.forEach((dir) => {
      const component = requirefn(dir).default
      app.component(component.name, component)
    })
    // app.component(skeleton.name, skeleton)
    // app.component(carousel.name, carousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)
    app.directive('lazy', lazyloadDerect)
    app.config.globalProperties.$message = Message// 原型函数挂载￥message
  }
}
const lazyloadDerect = {
  mounted (el, binding) {
    // @params entries :[{isIntersecting, target, rootBounds, time}]
    // @params  options : {}
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
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
