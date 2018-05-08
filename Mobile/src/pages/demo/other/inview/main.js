// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Inview from './inview'
import '@/pages/demo/static/js/loadcss.js'
import InviewDemo from './inview.vue'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {
        InviewDemo
    }
})
