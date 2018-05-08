// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Previewer, TransferDom } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Previewer, TransferDom },
    data: {
        list: [{
            src: require('../../static/images/18.jpg'),
            mini: require('../../static/images/18_mini.png'),
            w: 800,
            h: 400
        },
        {
            src: require('../../static/images/19.jpg'),
            mini: require('../../static/images/19_mini.png'),
            w: 1200,
            h: 900
        }],
        options: {
            getThumbBoundsFn (index) {
                // find thumbnail element
                let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                // get window scroll Y
                let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                // optionally get horizontal scroll
                // get position of element relative to viewport
                let rect = thumbnail.getBoundingClientRect()
                // w = width
                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
                // Good guide on how to get element coordinates:
                // http://javascript.info/tutorial/coordinates
            }
        }
    },
    directives: {
        TransferDom
    },
    methods: {
        show (index) {
            this.$refs.previewer.show(index)
        }
    }
})
