// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore },
    data: {
        showList1: true,
        scrollTop: 0,
        onFetching: false,
        bottomCount: 20
    },
    methods: {
        onScrollBottom () {
            if (this.onFetching) {
                // do nothing
            } else {
                this.onFetching = true
                setTimeout(() => {
                    this.bottomCount += 10
                    this.$nextTick(() => {
                        this.$refs.scrollerBottom.reset()
                    })
                    this.onFetching = false
                }, 1000)
            }
        },
        onScroll (pos) {
            this.scrollTop = pos.top
        },
        onCellClick () {
            window.alert('cell click')
        },
        onClickButton () {
            window.alert('click')
        },
        changeList () {
            this.showList1 = false
            this.$nextTick(() => {
                this.$refs.scroller.reset({
                    top: 0
                })
            })
        }
    }
})
