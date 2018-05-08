// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Grid, GridItem, GroupTitle } from 'vux'
require('@/pages/demo/static/js/loadcss.js')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Grid, GridItem, GroupTitle },
    data: {
        icon: require('../../static/images/grid_icon.png')
    },
    methods: {
        onItemClick () {
            console.log('on item click')
        }
    }
})
