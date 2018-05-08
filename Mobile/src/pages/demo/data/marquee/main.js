// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Group, Cell, Marquee, MarqueeItem, Divider } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Group, Cell, Marquee, MarqueeItem, Divider },
    data: {
        asyncCount: 0
    },
    mounted () {
        setTimeout(() => {
            this.asyncCount = 5
        }, 2000)
    },
    methods: {
        onClick (i) {
            console.log(i)
        }
    }
})
