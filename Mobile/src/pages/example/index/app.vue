<template>
    <drawer width="200px;" v-history-state="drawerVisibility" :show.sync="drawerVisibility" :drawer-style="{'background-color':'#35495e', width: '200px'}">
        <div slot="drawer">
            <group title="Drawer展示" style="margin-top:20px;">
                <cell title="企业用户(列表刷新)" @click.native="browseUser"></cell>
                <cell title="系统用户(tab列表)" @click.native="browseSystemUser"></cell>
                <cell title="组织架构（treeData)" @click.native="browseStructure"></cell>
                <cell title="表单" @click.native="browseForm"></cell>
                <cell title="页面路由" @click.native="browseRouter"></cell>
                <cell title="退出当前账号" @click.native="confirmSignOut"></cell>
            </group>
        </div>

        <home :body-padding-top="bodyPaddingTop" :title="title" :tabbar-items="tabbarItems" 
            :showBack="showBack" :header-style="headerStyle" @on-tabbar-index-change="onTabbarIndexChange">
            <img slot="header-right" v-if="showScan" style="width:30px;margin-top:-5px;" src="../../../static/images/example/scan.png" />
            <span slot="header-left" v-if="showDrawerIcon" @click="drawerVisibility = !drawerVisibility">
                <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
            </span>
        </home>
    </drawer>
</template>

<script>
import Home from '../../../components/master/home.vue'
import { Drawer, Group, Cell } from 'vux'
import * as filenames from '../config/filenames'
import { signOut } from '../common/sign'
import historyState from '../../../directives/history-state'

export default {
    components: {
        Home,
        Drawer,
        Group,
        Cell
    },
    directives: {
        historyState
    },

    data () {
        return {
            tabbarItems: [{
                key: '首页',
                label: '首页',
                link: { name: 'index' },
                icon: require('../../../static/images/example/home.png'), // 为了打包
                iconActive: require('../../../static/images/example/home-active.png'),
                headerStyle: { backgroundColor: 'transparent' },
                bodyPaddingTop: '0'
            }, {
                key: '业务',
                label: '业务',
                link: { name: 'operation' },
                icon: require('../../../static/images/example/operation.png'),
                iconActive: require('../../../static/images/example/operation-active.png')
            }, {
                key: '我的',
                label: '我的',
                link: { name: 'mine' },
                icon: require('../../../static/images/example/mine.png'),
                iconActive: require('../../../static/images/example/mine.png'),
                showDrawerIcon: true
            }],
            headerStyle: {},
            showDrawerIcon: false,
            drawerVisibility: false,
            title: '',
            showBack: false,
            showScan: false
        }
    },
    watch: {
        $route (route) {
            switch (route.name) {
                case 'index':
                    this.title = ''
                    break
                case 'operation':
                    this.title = '业务'
                    break
                case 'mine':
                    this.title = 'mine'
                    break
                case 'secondMenu':
                    this.title = '二级菜单'
                    break
            }
        }
    },
    methods: {
        changeDrawerVisibility (val) {
            this.drawerVisibility = val
        },
        onTabbarIndexChange (index, prevIndex) {
            this.headerStyle = this.tabbarItems[index]['headerStyle'] || {}
            this.bodyPaddingTop = this.tabbarItems[index]['bodyPaddingTop'] || '46px'
            this.showDrawerIcon = this.tabbarItems[index]['showDrawerIcon'] || false
        },
        confirmSignOut () {
            // var _this = this
            this.$vux.confirm.show({
                title: '询问',
                content: '确认要退出吗？',
                onConfirm () {
                    // _this.$store.dispatch(type.SIGN_OUT)
                    signOut()
                }
            })
        },
        browseUser () {
            window.location.href = '../' + filenames.PULL_LIST
        },
        browseSystemUser () {
            window.location.href = '../' + filenames.TAB_LIST
        },
        browseStructure () {
            window.location.href = '../' + filenames.TREE_DATA
        },
        browseForm () {
            window.location.href = '../' + filenames.FORM
        },
        browseRouter () {
            window.location.href = '../' + filenames.ROUTER
        }
    }
}
</script>
