// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Scroller, XHeader } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Scroller, XHeader },
    mounted () {
        this.$nextTick(() => {
            this.$refs.scroller.reset()
        })
    }
})
