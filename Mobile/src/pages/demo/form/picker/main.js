// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Cell, Group, Picker, GroupTitle, XButton } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

let years = []
for (var i = 2000; i <= 2030; i++) {
    years.push({
        name: i + '年',
        value: i + ''
    })
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Cell, Group, Picker, GroupTitle, XButton },
    data: {
        years: [years],
        years001: [],
        year001: [],
        years1: [years, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
        year1: [''],
        year2: ['2002'],
        year3: ['2005'],
        year4: ['2002', '4'],
        year5: '2005',
        year6: [
            ['你', '我', '他'],
            ['you', 'I', 'him'],
            ['ni', 'wo', 'ta'],
            [1, 2, 3, 4, 5],
            [5, 4, 3, 2, 1]
        ],
        year6Value: ['我', 'him', 'ni', '1', '2'],
        year7: [{
            name: '中国',
            value: 'china',
            parent: 0
        }, {
            name: '美国',
            value: 'USA',
            parent: 0
        }, {
            name: '广东',
            value: 'china001',
            parent: 'china'
        }, {
            name: '广西',
            value: 'china002',
            parent: 'china'
        }, {
            name: '美国001',
            value: 'usa001',
            parent: 'USA'
        }, {
            name: '美国002',
            value: 'usa002',
            parent: 'USA'
        }, {
            name: '广州',
            value: 'gz',
            parent: 'china001'
        }, {
            name: '深圳',
            value: 'sz',
            parent: 'china001'
        }, {
            name: '广西001',
            value: 'gz',
            parent: 'china002'
        }, {
            name: '广西002',
            value: 'sz',
            parent: 'china002'
        }, {
            name: '美国001_001',
            value: '0003',
            parent: 'usa001'
        }, {
            name: '美国001_002',
            value: '0004',
            parent: 'usa001'
        }, {
            name: '美国002_001',
            value: '0005',
            parent: 'usa002'
        }, {
            name: '美国002_002',
            value: '0006',
            parent: 'usa002'
        }],
        year7Value: [],
        year8Value: []
    },
    methods: {
        changeValue (value) {
            this.years001 = value
        },
        change (value) {
            console.log('new Value', value)
        },
        change3 (value) {
            this.year5 = value[0]
        },
        setData1 () {
            this.year7Value = ['USA', 'usa002', '0005']
        },
        setData2 () {
            this.year7Value = ['china', 'china002', 'gz']
        },
        setList () {
            this.year7.push({
                name: '美国002_003',
                value: '0007',
                parent: 'usa002'
            })
        }
    },
    watch: {
        year5: {
            handler (val) {
                this.year3[0] = val
                // this.year3.$set(0, val)
                this.$set(this.year3, 0, val)
            },
            deep: true
        },
        change3 (value) {
            this.year5 = value[0]
        }
    }
})
