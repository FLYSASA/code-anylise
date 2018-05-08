// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { ViewBox, XHeader, Tab, TabItem, Tabbar, TabbarItem, Sticky } from 'vux'
require('@/pages/demo/static/js/loadcss.js')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { ViewBox, XHeader, Tab, TabItem, Tabbar, TabbarItem, Sticky }
})
