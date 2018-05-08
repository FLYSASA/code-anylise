// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Scroller, Divider, Spinner } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Scroller, Divider, Spinner },
    data: {
        n1: 10,
        status: {
            pulldownStatus: 'default'
        },
        status1: {
            pulldownStatus: 'default'
        },
        status2: {
            pulldownStatus: 'default'
        }
    },
    methods: {
        load1 () {
            this.n1 += 10
            this.$nextTick(() => {
                setTimeout(() => {
                    this.$refs.demo1.donePulldown()
                }, 1000)
            })
        },
        load2 () {
            setTimeout(() => {
                this.status1.pulldownStatus = 'default'
            }, 1000)
        },
        load3 () {
            setTimeout(() => {
                this.$refs.demo3.donePulldown()
            }, 1000)
        }
    }
})
