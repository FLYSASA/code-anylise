import Vue from 'vue'
import { XSwitch, Group } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { XSwitch, Group },
    data: {
        value1: true
    }
})
