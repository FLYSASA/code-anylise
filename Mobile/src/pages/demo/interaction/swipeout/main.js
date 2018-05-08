// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Swipeout, SwipeoutItem, SwipeoutButton, XButton },
    data: {
        disabled: false
    },
    methods: {
        onButtonClick (type) {
            alert('on button click ' + type)
        },
        handleEvents (type) {
            console.log('event: ', type)
        }
    }
})
