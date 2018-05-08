// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Group, Cell, DevicePlugin } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

Vue.use(DevicePlugin)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Group, Cell }
})
