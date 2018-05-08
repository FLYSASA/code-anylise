// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Toast, ToastPlugin, Group, XSwitch, XButton } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

Vue.use(ToastPlugin)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Toast, Group, XSwitch, XButton },
    data: {
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show8: false,
        show9: false,
        show10: false,
        position: 'default',
        showPositionValue: false
    },
    methods: {
        showPosition (position) {
            this.position = position
            this.showPositionValue = true
        },
        onHide () {
            console.log('on hide')
        },
        onChange (val) {
            const _this = this
            if (val) {
                this.$vux.toast.show({
                    text: 'Hello World',
                    onShow () {
                        console.log('Plugin: I\'m showing')
                    },
                    onHide () {
                        console.log('Plugin: I\'m hiding')
                        _this.show9 = false
                    }
                })
            } else {
                this.$vux.toast.hide()
            }
        }
    }
})
