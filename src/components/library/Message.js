import { h, render } from 'vue'
import XtxMessage from './xtx-message.vue'

const div = document.createElement('div')
div.setAttribute('class', 'message-container')
document.body.appendChild(div)
const timer = null

// 实现：根据xtx-message.vue渲染消息提示
// 1. 导入组件
// 2. 根据组件创建虚拟节点
export default ({ type, text }) => {
  clearTimeout(timer)
  const vNode = h(XtxMessage, { type, text }, ['div'])
  // 3. 准备一个DOM容器
  // 4. 把虚拟节点渲染DOM容器中
  render(vNode, document.body)
  // 5. 开启定时，移出DOM容器内容
  setTimeout(() => {
    render(null, document.body)
  }, 3000)
}
