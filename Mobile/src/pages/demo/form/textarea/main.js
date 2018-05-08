// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { XTextarea, Group, XInput } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { XTextarea, Group, XInput },
    methods: {
        onEvent (event) {
            console.log('on', event)
        }
    }
})
