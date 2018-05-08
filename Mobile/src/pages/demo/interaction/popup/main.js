// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { TransferDom, Popup, Group, Cell, XButton, XSwitch, Scroller, Toast, XAddress, ChinaAddressData } from 'vux'
import '@/pages/demo/static/js/loadcss.js'
import 'vux/src/styles/close.less'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { TransferDom, Popup, Group, Cell, XButton, XSwitch, Scroller, Toast, XAddress },
    data: {
        addressData: ChinaAddressData,
        show: false,
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        title6: '默认空的',
        value6: [],
        show7: false,
        showToast: false,
        show8: false,
        show9: false,
        show10: false,
        show11: false
    },
    directives: {
        TransferDom
    },
    methods: {
        resetScroller () {
            this.$nextTick(() => {
                this.$refs.scroller.reset()
            })
        },
        log (str) {
            console.log(str)
        }
    },
    watch: {
        show10 (val) {
            if (val) {
                setTimeout(() => {
                    this.show10 = false
                }, 1000)
            }
        }
    }
})
