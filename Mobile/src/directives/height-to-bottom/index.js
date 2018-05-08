let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
const els = [] // 缓存元素
var resizeEvtObj // 触发resizeEvt事件对象

function unbind (el) {
    window.removeEventListener(resizeEvt, el.handler, true)
    el.handler = null
    for (var i = 0; i < els.length; i++) {
        if (els[i] === el) {
            els.splice(i, 1)
            return
        }
    }
}

export default {
    inserted: function (el, binding) {
        let bottom = binding.value && binding.value.bottom || 0
        els.push(el)
        el.handler = function () {
            if (document.documentElement.clientHeight - el.getBoundingClientRect().top - bottom > 0) {
                el.style.height = (document.documentElement.clientHeight - el.getBoundingClientRect().top - bottom) + 'px'

                unbind(el)
            }
        }
        window.addEventListener(resizeEvt, el.handler, false)
        el.handler()
    },
    unbind: unbind
}

// 低版本的安卓在flex布局中不支持height:100%，需手动设置具体高度
// 存在路由动画时，需在动画完成后重新设置高度
export function triggerHTBResize () {
    if (els.length > 0) {
        // 动画完成重新出发resize事件
        if (!resizeEvtObj) {
            resizeEvtObj = document.createEvent('HTMLEvents')
            resizeEvtObj.initEvent(resizeEvt, true, false)
        }

        for (var i = 0; i < els.length; i++) {
            els[i].dispatchEvent(resizeEvtObj)
        }
    }
}
