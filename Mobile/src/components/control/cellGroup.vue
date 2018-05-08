<template>
    <div>
        <group v-for="(group, groupIndex) in groupList" :key="group.title" :title="group.title">
            <cell v-for="(item, index) in group.menus" :key="item.title" class="icon-cell" @click.native="itemClick(item, groupIndex, index)" :title="item.title" :value="item.value" :is-link="item.hasOwnProperty('link') ? item.link : true">
                <img v-if="showIcon" :src="item.icon" slot="icon" />
            </cell>
        </group>
    </div>
</template>
<script>
import { Group, Cell } from 'vux'
export default {
    name: 'cell-group',
    components: {
        Group,
        Cell
    },

    props: {
        /**
         *  [{
         *      title: '我的任务',     // group标题
         *      menus: [{
         *          title: '个人指派', // cell标题
         *          icon: '',         // cell左侧图标
         *          link: true|false  // 是否连接，右侧是否显示'>'
         *      }, {
         *          title: '任务指派',
         *          icon: '',
         *          link: true|false
         *      }]
         *  }]
         */
        groupList: {
            type: Array,
            default: []
        },
        showIcon: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        itemClick (item, groupIndex, index) {
            this.$emit('on-item-click', item, groupIndex, index)
        }
    }
}
</script>
