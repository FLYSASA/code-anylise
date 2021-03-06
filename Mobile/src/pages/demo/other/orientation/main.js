// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Orientation from '@/directives/orientation'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    directives: {
        Orientation
    },
    data: {
        horizontal: 'landscape',
        vertical: 'portrait'
    }
})
