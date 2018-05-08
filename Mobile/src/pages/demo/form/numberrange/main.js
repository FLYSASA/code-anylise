// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { XButton, Range, Group, GroupTitle, Cell } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { XButton, Range, Group, GroupTitle, Cell },
    data: {
        data1: 0,
        data2: 0,
        data3: 20,
        data4: 18,
        data5: 28,
        data6: 37,
        data7: 17,
        data8: 25,
        data9: 50,
        data10: 14,
        data11: 30,
        data12: 0,
        data13: 10,
        showData13: false,
        min: 0,
        max: 100,
        step: 1,
        dynamiValue: 0
    },
    methods: {
        onChange (val) {
            console.log('change', val)
        },
        update () {
            this.min = Math.floor(Math.random() * 30)
            this.max = Math.floor(50 + Math.random() * 100)
            this.step = 1 + Math.floor(Math.random() * 10)
        }
    },
    mounted () {
        setTimeout(() => {
            this.showData13 = true
        }, 2000)
    }
})
