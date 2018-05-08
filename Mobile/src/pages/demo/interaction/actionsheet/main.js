// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Actionsheet, Group, XSwitch, Toast } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Actionsheet, Group, XSwitch, Toast },
    data: {
        show1: false,
        menus1: {
            menu1: 'Share to friends',
            menu2: 'Share to timeline'
        },
        show2: false,
        menus2: {
            menu1: 'Take Photo',
            menu2: 'Choose from photos'
        },
        show3: false,
        show4: false,
        show5: false,
        menus5: [{
            label: 'Are you sure?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>',
            type: 'info'
        }, {
            label: 'Primary',
            type: 'primary',
            value: 'primary'
        }, {
            label: 'Warn',
            type: 'warn'
        }, {
            label: 'Disabled',
            type: 'disabled'
        }, {
            label: 'Default'
        }],
        showSuccess: false,
        menus3: {
            'title.noop': 'Are you sure?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>',
            delete: '<span style="color:red">Delete</span>'
        },
        show6: false
    },
    methods: {
        click (key) {
            console.log(key)
        },
        onDelete () {
            this.showSuccess = true
        }
    }
})
