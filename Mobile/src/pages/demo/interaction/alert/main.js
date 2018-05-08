// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Alert, AlertPlugin, Group, XSwitch, Cell, TransferDomDirective as TransferDom } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

Vue.use(AlertPlugin)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Alert, Group, XSwitch, Cell },
    data: {
        show: false,
        show1: false,
        show2: false
    },
    directives: {
        TransferDom
    },
    methods: {
        onHide () {
            console.log('on hide')
        },
        onShow () {
            console.log('on show')
        },
        showPlugin () {
            this.$vux.alert.show({
                title: '中国人是好样的！',
                content: '你同意吗?',
                onShow () {
                    console.log('Plugin: I\'m showing')
                },
                onHide () {
                    console.log('Plugin: I\'m hiding now')
                }
            })
        },
        showPluginAuto () {
            this.showPlugin()
            setTimeout(() => {
                this.$vux.alert.hide()
            }, 3000)
        }
    }
})
