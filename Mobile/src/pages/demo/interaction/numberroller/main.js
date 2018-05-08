// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { NumberRoller, Divider } from 'vux'
import '@/pages/demo/static/js/loadcss.js'
import 'vux/src/styles/center.less'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { NumberRoller, Divider },
    data: {
        number: 123765,
        number1: 35,
        number2: 88
    },
    mounted () {
        setInterval(() => {
            this.number = 100000 + Math.round(Math.random() * 899999)
        }, 3000)
        setTimeout(() => {
            this.number2 = 333
        }, 3000)
        setTimeout(() => {
            this.number2 = 444
        }, 5000)
        setTimeout(() => {
            this.number2 = 88
        }, 8000)
    },
    computed: {
        length () {
            return String(this.number2).length
        }
    }
})
