// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Confirm, Group, XSwitch, XButton, ConfirmPlugin, TransferDomDirective as TransferDom } from 'vux'
import '@/pages/demo/static/js/loadcss.js'
Vue.use(ConfirmPlugin)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Confirm, Group, XSwitch, XButton },
    data: {
        show: false,
        show2: false,
        show3: false,
        show4: false
    },
    directives: {
        TransferDom
    },
    methods: {
        onCancel () {
            console.log('on cancel')
        },
        onConfirm (msg) {
            console.log('on confirm')
            if (msg) {
                alert(msg)
            }
        },
        onConfirm4 () {
            console.log('on confirm')
            this.$vux.loading.show({
                transition: '',
                text: 'processing'
            })
            setTimeout(() => {
                this.$vux.loading.hide()
                this.show4 = false
            }, 1000)
        },
        onHide () {
            console.log('on hide')
        },
        onShow () {
            console.log('on show')
        },
        showPlugin () {
            this.$vux.confirm.show({
                title: 'Title',
                content: 'Content',
                onShow () {
                    console.log('plugin show')
                },
                onHide () {
                    console.log('plugin hide')
                },
                onCancel () {
                    console.log('plugin cancel')
                },
                onConfirm () {
                    console.log('plugin confirm')
                }
            })
        },
        showPlugin2 () {
            this.showPlugin()
        },
        showPlugin3 () {
            this.$vux.confirm.prompt('123', {
                title: 'Title',
                onShow () {
                    console.log('promt show')
                },
                onHide () {
                    console.log('prompt hide')
                },
                onCancel () {
                    console.log('prompt cancel')
                },
                onConfirm (msg) {
                    alert(msg)
                }
            })
        }
    }
})
