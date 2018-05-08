// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Flexbox, FlexboxItem, VuxComponentListData as components } from 'vux'
import '../../static/css/demo-icon.css'
import '@/pages/demo/static/js/loadcss.js'

function camelCase (input) {
    let str = input.toLowerCase().replace(/-(.)/g, function (match, group1) {
        return group1.toUpperCase()
    })

    str = str.replace(/_(.)/g, function (match, group1) {
        return group1.toUpperCase()
    })
    return str.slice(0, 1).toUpperCase() + str.slice(1)
}

function split (array) {
    let chunks = []
    let count = Math.ceil(array.length / 3)
    while (count > 0) {
        chunks.push(array.slice((count - 1) * 3, count * 3))
        count--
    }
    chunks = chunks.reverse()
    const lastList = chunks[chunks.length - 1]
    const lastLength = lastList.length
    if (lastLength < 3) {
        for (let i = 0; i < 3 - lastLength; i++) {
            lastList.push({
                name: '----',
                icon: ''
            })
        }
    }
    return chunks
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Flexbox, FlexboxItem },
    data: {
        height: window.innerHeight - 46 - 53,
        components: split(components)
    },
    filters: {
        camelCase
    }
})
