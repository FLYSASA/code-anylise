<template>
    <layout-router ref="root" @on-dispatch-update-title="updateTitle" :title="title" @on-click-more="showMenus = !showMenus">
        <actionsheet slot="bottom" v-history-state="showMenus" v-model="showMenus" :menus="menus" @on-click-menu="changeMenus">
        </actionsheet>
    </layout-router>
</template>

<script>
import { Actionsheet } from 'vux'
import LayoutRouter from '@/components/master/layoutRouter.vue'
import historyState from '@/directives/history-state'
import Emitter from '@/mixins/emitter'

export default {
    mixins: [Emitter],
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
                '1': '默认PullList：type = 1',
                '2': '默认PullList：type = 2',
                '3': '默认PullList：type = 3',
                '4': '默认PullList：type = 4',
                '5': '默认PullList：type = 5',
                '6': '自定义PullList',
                '7': '自定义操作PullList'
            },
            showMenus: false,
            title: ''
        }
    },
    methods: {
        changeMenus (key) {
            if (key === '6') {
                this.$router.push({ name: 'customList' })
            } else if (key === '7') {
                this.$router.push({ name: 'customOperationList' })
            } else {
                this.$router.push({ name: 'list' })
                this.broadcast('on-broadcast-panel-type', key)
            }
        },
        updateTitle (title) {
            this.title = title
        }
    },
    watch: {
        $route (route) {
            switch (route.name) {
                case 'customList':
                    this.title = '自定义pullList'
                    break
                case 'customOperationList':
                    this.title = '自定义可操作pullList'
                    break
                case 'list':
                    this.title = '默认pullList'
                    break
                case 'detail':
                    this.title = '详细信息'
                    break
            }
        }
    }
}
</script>
