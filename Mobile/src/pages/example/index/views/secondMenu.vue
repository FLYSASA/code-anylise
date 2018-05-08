<template>
    <cell-group :group-list="groups" @on-menu-click="menuClick">
    </cell-group>
</template>
<script>
import CellGroup from '../../../../components/control/CellGroup.vue'

export default {
    components: {
        CellGroup
    },

    data () {
        return {
            groups: [{
                title: '我的任务',
                menus: [{
                    title: '个人指派',
                    icon: ''
                }, {
                    title: '任务指派',
                    icon: ''
                }
                ]
            }, {
                title: '项目计划',
                menus: [{
                    title: '截止日期',
                    icon: ''
                }, {
                    title: '项目全景',
                    icon: ''
                }]
            }, {
                title: '计划考核',
                menus: [{
                    title: '项目考核',
                    icon: ''
                }, {
                    title: '部门考核',
                    icon: ''
                }, {
                    title: '岗位考核',
                    icon: ''
                }]
            }, {
                title: '专项计划',
                menus: [{
                    title: '截止日期',
                    icon: ''
                }, {
                    title: '项目全景',
                    icon: ''
                }]
            }]
        }
    },
    methods: {
        menuClick (item) {
            this.$vux.toast.text(JSON.stringify(item), 'center')
        }
    }
}
</script>
