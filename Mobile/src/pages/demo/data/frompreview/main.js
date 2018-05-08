// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { FormPreview } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { FormPreview },
    data: {
        list: [{
            label: '商品',
            value: '电动打蛋机'
        }, {
            label: '标题标题',
            value: '名字名字名字'
        }, {
            label: '标题标题',
            value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
        }],
        buttons1: [{
            style: 'default',
            text: '辅助操作'
        }, {
            style: 'primary',
            text: '跳转到首页',
            link: '/'
        }],
        buttons2: [{
            style: 'primary',
            text: '点击事件',
            onButtonClick: (name) => {
                alert(`clicking ${name}`)
            }
        }]
    }
})
