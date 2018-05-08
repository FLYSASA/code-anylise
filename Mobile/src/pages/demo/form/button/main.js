// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { XButton, Box, GroupTitle, Group, Flexbox, FlexboxItem, Divider } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { XButton, Box, GroupTitle, Group, Flexbox, FlexboxItem, Divider },
    data: {
        submit001: 'click me',
        disable001: false
    },
    methods: {
        change (value) {
            console.log('change:', value)
        },
        processButton001 () {
            this.submit001 = 'processing'
            this.disable001 = true
        }
    }
})
