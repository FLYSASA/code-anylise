<template>
    <popup :value="visible" @on-hide="$emit('on-hide')" @on-show="$emit('on-show')" @on-first-show="$emit('on-first-show')" :hide-on-blur="hideOnBlur" position="bottom" :height="popupHeight + 'px'">
        <div v-if="$slots['header']">
            <slot name="header"></slot>
        </div>
        <div :style="{height: (contentHeight + 'px')}">
            <slot>
            </slot>
        </div>
        <div v-if="$slots['footer']">
            <slot name="footer"></slot>
        </div>
    </popup>
</template>

<script>
/**
 * 自定义底部弹出层
 * 1. 默认高度为屏幕80%，可设置百分比和具体像素值
 * 2. 可自定义头部、尾部
 */
import { Popup } from 'vux'

export default {
    name: 'custom-popup',

    components: {
        Popup
    },

    model: {
        prop: 'value',
        event: 'value-change'
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        height: {
            type: String,
            default: '80%'
        },
        headerHeight: {
            type: Number,
            default: 0
        },
        footerHeight: {
            type: Number,
            default: 0
        },
        hideOnBlur: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            visible: this.value
        }
    },
    computed: {
        popupHeight () {
            if (this.height.indexOf('%') > -1) {
                return document.documentElement.clientHeight * parseFloat(this.height) / 100
            }

            return parseFloat(this.height)
        },
        contentHeight () {
            return this.popupHeight - this.headerHeight - this.footerHeight
        }
    },
    watch: {
        value (val, prev) {
            this.visible = val

            if (val && val !== prev) {
                this.$emit('value-change', val)
            }
        }
    }
}
</script>
