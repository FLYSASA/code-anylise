// 记录浏览器历史状态，例如左侧菜单滑出显示后，点击“返回”自动隐藏左侧菜单
// 绑定值必须是boolean（需vue组件实例的data属性），表示组件的显示隐藏状态
const nodeList = []
export default {
    bind: function (el, binding, vnode) {
        el._historyHandler = function (event) {
            // 排第一位的元素触发
            if (nodeList.length > 0 && nodeList[0] === el &&
                vnode.context[binding.expression]) {
                el._historyState = true
                vnode.context[binding.expression] = false
                nodeList.shift()
            }
        }
        window.addEventListener('popstate', el._historyHandler, true)
    },
    update: function (el, binding, vnode) {
        if (binding.value !== binding.oldValue) {
            if (binding.value) {
                nodeList.unshift(el)
                window.history.pushState(null, '')
            } else {
                if (el._historyState) {
                    el._historyState = false
                } else {
                    window.history.go(-1)
                }
            }
        }
    },
    unbind: function (el) {
        window.removeEventListener('popstate', el._historyHandler, true)
        el._historyHandler = null
    }
}
