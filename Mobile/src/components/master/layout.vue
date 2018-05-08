<template>
    <view-box ref="viewBox" @on-dispatch-scroll-top="onScrollTop" :body-padding-top="bodyPaddingTop" 
        :body-padding-bottom="bodyPaddingBottom">
        <x-header v-if="showHeader" :title="title" :left-options="{showBack: showBack, preventGoBack: true}" 
            :right-options="{showMore:showMore}" @on-click-more="$emit('on-click-more')" 
            @on-click-back="onClickBack" slot="header" class="abs-header" 
            :class="{'vux-1px-b': showHeaderBorderBottom, 'header-frosted':headerFrosted}" 
            :style="headerStyle">
            <span slot="right" v-if="$slots['header-right']">
                <slot name="header-right"></slot>
            </span>
            <span slot="overwrite-left" v-if="$slots['header-left']">
                <slot name="header-left"></slot>
            </span>
        </x-header>

        <slot name="default"></slot>

        <template slot="bottom">
            <slot name="bottom"></slot>
        </template>
    </view-box>
</template>

<script>
import { ViewBox, XHeader } from 'vux'
import utils from '@/static/js/utils.js'
import RouterDirection from '@/mixins/routerDirection.js'
import {showHeaderBorderBottom, useFrosted} from '@/static/js/config.js'

export default {
    name: 'layout',

    mixins: [RouterDirection],
    components: {
        ViewBox,
        XHeader
    },

    props: {
        // 标题，必填
        title: { type: String, default: '' },
        // 顶部样式：可设置透明属性等
        headerStyle: Object,
        // 是否显示头部
        showHeader: { type: Boolean, default: true },
        // 是否显示底部边框
        showHeaderBorderBottom: { type: Boolean, default: showHeaderBorderBottom },
        headerFrosted: { type: Boolean, default: useFrosted },
        // 顶部填充，用于显示XHeader，默认是46px
        bodyPaddingTop: { type: String, default: '44px' },
        // 底部填充，用显示tabbar，默认是55px
        bodyPaddingBottom: { type: String, default: '0' },
        // 是否显示返回，默认不显示，可指定@on-click-back事件
        showBack: { type: Boolean, default: true },
        // 是否阻止返回，默认为false，为true时指定@on-click-back事件触发
        preventGoBack: { type: Boolean, default: false },
        // 是否显示顶部右侧“更多”按钮，可指定@on-show-more事件
        showMore: { type: Boolean, default: true },
        autoScroll: { type: Boolean, default: true }
    },
    methods: {
        onClickBack () {
            // 返回默认设置为back
            this.goBack(function () {
                if (this.preventGoBack) {
                    this.$emit('on-click-back')
                } else {
                    this.$router ? this.$router.back() : window.history.back()
                }
            })
        },
        saveScrollTop () {
            if (this.scrollBox) {
                this.scrollTop = this.scrollBox.scrollTop
            }
        },
        setScrollTop () {
            if (this.scrollBox) {
                this.scrollBox.scrollTop = this.scrollTop
            }
        },
        onScrollTop (top) {
            this.scrollBox.scrollTop = this.scrollTop
        }
    },
    mounted () {
        this.scrollBox = this.$refs.viewBox.$el.querySelector('#vux_view_box_body')
        utils.addClass(this.$refs.viewBox.$refs.viewBoxBody, 'back-bg')
    },
    activated () {
        if (this.autoScroll) {
            // let forward = !this.isBack()
            // if (this.$route) {
            //     if (forward) {
            //         // 优先取缓存，再取query
            //         if (!utils.isEmpty(utils.localStorage.get('forwardScrollTop'))) {
            //             this.scrollTop = utils.localStorage.get('forwardScrollTop')
            //             utils.localStorage.remove('forwardScrollTop')
            //         } else if (this.$route.query.hasOwnProperty('forwardScrollTop')) {
            //             this.scrollTop = this.$route.query.enterScrollTop || 0
            //         }
            //     } else {
            //         if (!utils.isEmpty(utils.localStorage.get('backScrollTop'))) {
            //             this.scrollTop = utils.localStorage.get('backScrollTop')
            //             utils.localStorage.remove('backScrollTop')
            //         } else if (this.$route.query.hasOwnProperty('backScrollTop')) {
            //             this.scrollTop = this.$route.query.enterScrollTop || 0
            //         }
            //     }
            // }
            this.setScrollTop()
        }
    },
    // 缓存组件记录位置
    deactivated () {
        if (this.autoScroll) {
            this.saveScrollTop()
        }
    }
}
</script>

<style>
html,
body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}
</style>
