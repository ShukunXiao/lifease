import skeleton from './xtx-skeleton.vue'
import carousel from './xtx-carousel'
export default {
  install (app) {
    app.component('XtxSkeleton', skeleton)
    app.component('XtxCarousel', carousel)
  }
}
