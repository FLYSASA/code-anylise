// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { XHeader, Actionsheet, TransferDom } from 'vux'
require('@/pages/demo/static/js/loadcss.js')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { XHeader, Actionsheet },
    data: {
        menus: {
            menu1: 'Take Photo',
            menu2: 'Choose from photos'
        },
        showMenus: false
    },
    directives: {
        TransferDom
    }
})
