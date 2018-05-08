// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vux'
require('@/pages/demo/static/js/loadcss.js')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Tabbar, TabbarItem },
    data: {
        img1: require('../../static/images/icon_nav_button.png'),
        img2: require('../../static/images/icon_nav_msg.png'),
        img3: require('../../static/images/icon_nav_article.png'),
        img4: require('../../static/images/icon_nav_cell.png')
    }
})
