// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Loading, InlineLoading, LoadMore, Group, XSwitch, XButton, LoadingPlugin, TransferDomDirective as TransferDom } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

Vue.use(LoadingPlugin)

function tick (i, cb) {
    setTimeout(function () {
        i++
        cb(i)
        if (i < 100) {
            tick(i, cb)
        }
    }, 10)
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Loading, InlineLoading, LoadMore, Group, XSwitch, XButton },
    data: {
        show1: false,
        text1: 'Processing'
    },
    directives: {
        TransferDom
    },
    methods: {
        showLoading () {
            this.$vux.loading.show({
                text: 'Loading'
            })
            setTimeout(() => {
                this.$vux.loading.hide()
            }, 2000)
        },
        show1change (val) {
            if (val) {
                tick(0, (percent) => {
                    if (percent === 100) {
                        this.show1 = false
                        return
                    }
                    this.text1 = `${percent}%`
                })
            }
        }
    }
})
