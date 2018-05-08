// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { XImg, Scroller } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { XImg, Scroller },
    data: {
        render: false,
        list: [
            require('../../static/images/test1.jpg'),
            require('../../static/images/test2.jpg'),
            require('../../static/images/test3.jpg'),
            require('../../static/images/test4.jpg'),
            require('../../static/images/test5.jpg'),
            require('../../static/images/test6.jpg'),
            require('../../static/images/test7.jpg'),
            require('../../static/images/test8.jpg'),
            require('../../static/images/test9.jpg'),
            require('../../static/images/test10.jpg')
        ]
    },
    mounted () {
        this.$nextTick(() => {
            this.$refs.scroller.reset()
            this.render = true
        })
    },
    methods: {
        success (src, ele) {
            console.log('success load', src)
            const span = ele.parentNode.querySelector('span')
            ele.parentNode.removeChild(span)
        },
        error (src, ele, msg) {
            console.log('error load', msg, src)
            const span = ele.parentNode.querySelector('span')
            span.innerText = 'load error'
        }
    }
})
