// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { XDialog, XButton, Group, XSwitch, TransferDomDirective as TransferDom } from 'vux'
import '@/pages/demo/static/js/loadcss.js'
import 'vux/src/styles/close.less'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { XDialog, XButton, Group, XSwitch },
    data: {
        show: false,
        showNoScroll: false,
        showHideOnBlur: false,
        showScrollBox: false,
        showDialogStyle: false,
        url: require('../../static/images/01.jpg')
    },
    directives: {
        TransferDom
    }
})
