// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Tabbar, TabbarItem, Group, Cell } from 'vux'
require('@/pages/demo/static/js/loadcss.js')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Tabbar, TabbarItem, Group, Cell },
    data: {
        url1: require('../../static/images/icon_nav_button.png'),
        url2: require('../../static/images/icon_nav_msg.png'),
        url3: require('../../static/images/icon_nav_article.png'),
        url4: require('../../static/images/icon_nav_cell.png')
    }
})
