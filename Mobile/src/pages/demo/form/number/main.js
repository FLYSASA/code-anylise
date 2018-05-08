// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Group, XNumber, XSwitch } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Group, XNumber, XSwitch },
    data: {
        roundValue: 0
    },
    methods: {
        change (val) {
            console.log('change', val)
        }
    }
})
