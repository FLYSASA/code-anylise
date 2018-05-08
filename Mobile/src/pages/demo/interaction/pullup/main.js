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
        demo4Value: {
            pullupStatus: 'default'
        },
        n1: 10,
        n2: 10,
        n3: 10,
        n4: 10,
        demo3Value: {
            pullupStatus: ''
        },
        pullupConfig2: {
            content: '上拉加载更多',
            downContent: '松开进行加载',
            upContent: '上拉加载更多',
            loadingContent: '加载中...'
        }
    },
    methods: {
        load1 () {
            setTimeout(() => {
                this.n1 += 10
                setTimeout(() => {
                    this.$refs.demo1.donePullup()
                }, 100)
            }, 1000)
        },
        load2 () {
            setTimeout(() => {
                this.n2 += 10
                setTimeout(() => {
                    this.$refs.demo2.donePullup()
                }, 100)
                if (this.n2 === 30) { // unload plugin
                    setTimeout(() => {
                        this.$refs.demo2.disablePullup()
                    }, 100)
                }
            }, 1000)
        },
        load3 () {
            setTimeout(() => {
                this.n3 += 10
                setTimeout(() => {
                    this.demo3Value.pullupStatus = 'default'
                }, 100)
                console.log('demo3value', JSON.stringify(this.demo3Value))
                if (this.n3 === 30) { // unload plugin
                    setTimeout(() => {
                        this.demo3Value.pullupStatus = 'disabled'
                    }, 100)
                }
            }, 1000)
        },
        load4 () {
            setTimeout(() => {
                this.n4 += 10
                setTimeout(() => {
                    this.demo4Value.pullupStatus = 'default'
                }, 10)
            }, 1000)
        }
    }
})
