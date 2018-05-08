// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Rater, Group, Cell, Range } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Rater, Group, Cell, Range },
    data: {
        data1: 0,
        data2: 5,
        data3: 5,
        data4: 3,
        data41: 3.7,
        data42: 3.5,
        data5: 3,
        data6: 3
    }
})
