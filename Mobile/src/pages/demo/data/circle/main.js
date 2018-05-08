// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { XCircle, Range, Icon } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { XCircle, Range, Icon },
    data: {
        percent1: 10,
        percent2: 30,
        strokeColor2: '#3FC7FA'
    },
    mounted () {
        setInterval(this.update2, 2000)
    },
    methods: {
        update2 () {
            const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A']
            this.percent2 = parseInt(Math.random() * 100, 10)
            this.strokeColor2 = colorMap[parseInt(Math.random() * 3, 10)]
        }
    }
})
