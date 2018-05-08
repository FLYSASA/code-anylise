<template>
    <layout :title="title" :body-padding-top="bodyPaddingTop" :show-back="showBack" :prevent-go-back="true" :show-more="showMore" @on-click-more="$emit('on-click-more')" @on-click-back="onClickBack" :header-style="headerStyle" :body-padding-bottom="bodyPaddingBottom">
        <span slot="header-right" v-if="$slots['header-right']">
            <slot name="header-right"></slot>
        </span>
        <span slot="header-left" v-if="$slots['header-left']">
            <slot name="header-left"></slot>
        </span>

        <transition :name="transitionName">
            <keep-alive :exclude="/^(?!Once)/">
                <router-view class="router-view"></router-view>
            </keep-alive>
        </transition>

        <template slot="bottom">
            <slot name="bottom"></slot>
        </template>
    </layout>
</template>

<script>
import Layout from './Layout.vue'
import RouterDirection from '@/mixins/routerDirection.js'

export default {
    name: 'layout-router',
    mixins: [RouterDirection],
    components: {
        Layout
    },

    props: {
        title: String,
        bodyPaddingBottom: {
            type: String,
            default: '0'
        },
        bodyPaddingTop: { type: String, default: '46px' },
        headerStyle: Object,
        // 是否显示返回按钮
        showBack: {
            type: Boolean,
            default: true
        },
        showMore: {
            type: Boolean,
            default: true
        },
        // 是否阻止默认返回
        preventGoBack: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            transitionName: 'vux-pop-in'
        }
    },
    watch: {
        '$route' (to, from) {
            this.updateDirection()
            if (to.meta && to.meta.hasOwnProperty('transitionName')) {
                this.transitionName = to.meta.transitionName
                return
            }
            if (this.back) {
                this.back = false
                this.transitionName = 'vux-pop-out'
            } else {
                this.transitionName = 'vux-pop-in'
            }
        }
    },
    methods: {
        onClickBack () {
            // 返回默认设置为back
            this.goBack(function () {
                if (this.preventGoBack) {
                    this.$emit('on-click-back')
                } else {
                    this.$router.back()
                }
            })
        }
    }
}
</script>
