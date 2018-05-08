<template>
    <layout :show-header="showHeader" :show-more="false" :show-back="false" :title="title" 
        :body-padding-top="bodyPaddingTop" :body-padding-bottom="bodyPaddingBottom">
        <template slot="header-right" v-if="$slots['header-right']">
            <slot name="header-right"></slot>
        </template>
        <template slot="header-left" v-if="$slots['header-left']">
            <slot name="header-left"></slot>
        </template>

        <keep-alive :exclude="/(?!Once)$/">
            <router-view class="router-view"></router-view>
        </keep-alive>

        <tabbar slot="bottom" :class="[tabbarClass, {'tabbar-frosted': tabbarFrosted}]" @on-index-change="tabbarIndexChange">
            <tabbar-item v-for="(item, index) in tabbarItems" :link="item.link" 
                :selected="$route.name === item.link.name" :badge="item.badge" :key="item.key"
                @on-item-click="tabbarItemClick">
                <img slot="icon" v-if="tabbarShowIcon" :src="item.icon" />
                <img slot="icon-active" v-if="tabbarShowIcon" :src="item.iconActive" />
                <span slot="label" v-if="tabbarShowLabel">{{item.label}}</span>
            </tabbar-item>
        </tabbar>
    </layout>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import Layout from './Layout.vue'
import utils from '@/static/js/utils.js'
import {useFrosted} from '@/static/js/config.js'

export default {
    name: 'home',

    components: {
        Layout,
        Tabbar,
        TabbarItem
    },

    props: {
        bodyPaddingTop: { type: String, default: '0' },
        // 底部填充，用显示tabbar，默认是50px
        bodyPaddingBottom: { type: String, default: '50px' },
        // 指定tabbaritem icon样式类
        tabbarClass: {
            type: Object,
            default () {
                return {}
            }
        },
        tabbarFrosted: {
            type: Boolean,
            default: useFrosted
        },
        // 是否显示tabbar-item icon
        tabbarShowIcon: { type: Boolean, default: true },
        // 是否显示tabbar-item label
        tabbarShowLabel: { type: Boolean, default: true },
        title: {type: String, defualt: ''},
        // 底部tabbaritems对象数组,item格式如下：
        //  {
        //      key // 唯一标识
        //      label // 选项卡名称
        //      icon // 选项卡图标
        //      icon-active // 选中状态图标
        //      link // 普通url或者用vue-link；object写法指定replace为true可实现replace跳转
        //      badge // 徽标文字
        //      title // 指定标题
        //  }
        tabbarItems: {
            type: Array,
            default () {
                return []
            }
        },
        showHeader: {type: Boolean, defualt: false}
    },
    methods: {
        tabbarIndexChange (index, prevIndex) {
            if (!utils.isNumber(prevIndex)) {
                prevIndex = -1
            }
            this.$emit('on-tabbar-index-change', index, prevIndex)
        },
        tabbarItemClick (currentIndex) {
            this.$emit('on-tabbar-item-click', currentIndex, this.tabbarItems[currentIndex])
        }
    }
}
</script>
