// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Flexbox, FlexboxItem, Blur } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Flexbox, FlexboxItem, Blur },
    data: {
        images: [
            require('../../static/images/tulips.jpg'),
            require('../../static/images/waterway.jpg'),
            require('../../static/images/hot-chocolate.jpg')
        ],
        url: ''
    },
    created () {
        this.url = this.images[0]
    }
})
