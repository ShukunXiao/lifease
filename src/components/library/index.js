import skeleton from './xtx-skeleton.vue'
import carousel from './xtx-carousel'
import XtxMore from './xtx-more.vue'
export default {
  install (app) {
    app.component('XtxSkeleton', skeleton)
    app.component('XtxCarousel', carousel)
    app.component('XtxMore', XtxMore)
  }
}
