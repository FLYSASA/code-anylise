// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Scroller, Divider, XSwitch, Group, Spinner } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Scroller, Divider, XSwitch, Group, Spinner },
    data: {
        n: 10,
        n1: 10,
        pullupEnabled: true,
        status: {
            pullupStatus: 'default',
            pulldownStatus: 'default'
        }
    },
    methods: {
        loadMore () {
            setTimeout(() => {
                this.n += 10
                setTimeout(() => {
                    this.$refs.scroller.donePullup()
                }, 10)
            }, 2000)
        },
        refresh () {
            setTimeout(() => {
                this.n = 10
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$refs.scroller.donePulldown()
                        this.pullupEnabled && this.$refs.scroller.enablePullup()
                    }, 10)
                })
            }, 2000)
        },
        changePullupStatus (enabled) {
            if (enabled) {
                this.$refs.scroller.enablePullup()
                this.pullupEnabled = true
            } else {
                this.$refs.scroller.disablePullup()
                this.pullupEnabled = false
            }
        },
        loadMore1 () {
            setTimeout(() => {
                this.n1 += 10
                this.$nextTick(() => {
                    this.$refs.scroller1.donePullup()
                    if (this.n1 >= 30) {
                        this.$refs.scroller1.disablePullup()
                        console.log('No more data, Pullup disabled!')
                    }
                })
            }, 2000)
        }
    }
})
