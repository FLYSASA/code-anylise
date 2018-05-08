// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Group, Calendar, Cell } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Group, Cell, Calendar },
    data: {
        demo1: '',
        demo2: 'TODAY',
        demo3: 'TODAY'
    }
})
