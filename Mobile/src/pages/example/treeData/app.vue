<template>
    <layout-router :title="title" @on-click-more="showMenus = !showMenus">
        <actionsheet slot="bottom" v-history-state="showMenus" v-model="showMenus" :menus="menus" @on-click-menu="changeMenus">
        </actionsheet>
    </layout-router>
</template>

<script>
import { Actionsheet } from 'vux'
import LayoutRouter from '@/components/master/layoutRouter.vue'
import historyState from '@/directives/history-state'

export default {
    components: {
        Actionsheet,
        LayoutRouter
    },
    directives: {
        historyState
    },

    data () {
        return {
            menus: {
                '2': 'treeData（非嵌套数据）',
                '1': 'treeData（嵌套数据）'
            },
            showMenus: false,
            title: ''
        }
    },
    watch: {
        $route (route) {
            switch (route.name) {
                case 'list':
                    this.title = '嵌套树形数据'
                    break
                case 'other':
                    this.title = '非嵌套树形数据'
                    break
            }
        }
    },
    methods: {
        changeMenus (key) {
            if (key === '1') {
                this.$router.push({ name: 'list' })
            } else {
                this.$router.push({ name: 'other' })
            }
        }
    }
}
</script>
