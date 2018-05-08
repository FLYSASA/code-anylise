/**
 * v-orientaion="landscape" v-orientaion="portrait"
 */
import Orientation from './orientation'
export default {
    bind (el, binding, vnode) {
        const value = binding.value
        const _value = value.toString()[0].toUpperCase() + value.toString().slice(1)

        el.style.display = Orientation['is' + _value]() ? 'block' : 'none'

        Orientation.change(function (e) {
            let info = Orientation.getInfo()
            el.style.display = info[value] ? 'block' : 'none'
        })
    },
    update () {
    },
    unbind () {
    }
}
