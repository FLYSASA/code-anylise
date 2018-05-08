// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { ButtonTab, ButtonTabItem, Divider } from 'vux'
require('@/pages/demo/static/js/loadcss.js')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { ButtonTab, ButtonTabItem, Divider },
    data: {
        demo01: 0
    },
    methods: {
        consoleIndex () {
            console.log('click demo01', this.demo01)
        }
    }
})
