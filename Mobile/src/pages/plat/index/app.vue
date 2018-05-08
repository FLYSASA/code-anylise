<template>
    <home :body-padding-top="bodyPaddingTop" :title="title" :tabbar-items="tabbarItems" 
        :show-back="showBack" :header-style="headerStyle"
        @on-tabbar-index-change="onTabbarIndexChange" :show-header="showHeader">
    </home>
</template>

<script>
import Home from '@/components/master/home.vue'
import { Drawer, Group, Cell } from 'vux'
import { signOut } from '@/static/js/sign'

export default {
    components: {
        Home,
        Drawer,
        Group,
        Cell
    },

    data () {
        return {
            tabbarItems: [{
                key: '首页',
                label: '首页',
                link: { name: 'index' },
                icon: require('@/static/images/example/home.png'), // 为了打包
                iconActive: require('@/static/images/example/home-active.png'),
                headerStyle: { backgroundColor: 'transparent' },
                bodyPaddingTop: '0',
                showHeader: false
            }, {
                key: '业务',
                label: '业务',
                link: { name: 'operation' },
                icon: require('@/static/images/example/operation.png'),
                iconActive: require('@/static/images/example/operation-active.png'),
                bodyPaddingTop: '46px',
                showHeader: true
            }, {
                key: '我的',
                label: '我的',
                link: { name: 'mine' },
                icon: require('@/static/images/example/mine.png'),
                iconActive: require('@/static/images/example/mine.png'),
                bodyPaddingTop: '46px',
                showHeader: true
            }],
            headerStyle: {},
            title: '',
            showBack: false,
            showHeader: false,
            bodyPaddingTop: '0'
        }
    },
    methods: {
        onTabbarIndexChange (index, prevIndex) {
            this.headerStyle = this.tabbarItems[index]['headerStyle'] || {}
            this.bodyPaddingTop = this.tabbarItems[index]['bodyPaddingTop'] || '46px'
            this.title = this.tabbarItems[index]['label']
            this.showHeader = this.tabbarItems[index]['showHeader']
        },
        confirmSignOut () {
            this.$vux.confirm.show({
                title: '询问',
                content: '确认要退出吗？',
                onConfirm () {
                    signOut()
                }
            })
        }
    }
}
</script>
