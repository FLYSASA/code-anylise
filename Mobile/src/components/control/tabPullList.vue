<template>
    <div>
        <button-tab v-if="tabType === '1'" v-model="index" class="p-10" style="border-bottom:1px solid #e5e5e5">
            <button-tab-item v-for="(panel, i) in panelList" :key="i" :selected="i===index">{{panel.title}}</button-tab-item>
        </button-tab>
        <tab v-else v-model="index">
            <tab-item v-for="(panel, i) in panelList" :key="i" :selected="i===index">{{panel.title}}</tab-item>
        </tab>

        <swiper :show-dots="false" v-model="index" style="width:100%;" height="100%" v-height-to-bottom>
            <swiper-item v-for="(panel, i) in panelList" :key="i">
                <search v-if="showSearch" :auto-fixed="false" @on-submit="reload" @on-cancel="onSearchCancel" :ref="'search'+i"></search>
                <pull-panel :ref="'pullPanel'+i" :auto-fill="autoFill" :api-config="panel.apiConfig" :panelType="panel.panelType || '1'" :get-post-data="setPostData" @on-load="onLoad" @on-click-item="onClickItem" :match-props="panel.matchProps">
                    <template>
                        <slot name="default">
                        </slot>
                    </template>
                </pull-panel>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import { ButtonTab, Tab, TabItem, ButtonTabItem, Swiper, SwiperItem, Search } from 'vux'
import heightToBottom from '../../directives/height-to-bottom'
import PullPanel from './PullPanel.vue'
import utils from '../../static/js/utils'

export default {
    name: 'tab-pull-list',

    directives: {
        heightToBottom
    },
    components: {
        PullPanel,
        ButtonTab,
        ButtonTabItem,
        Swiper,
        SwiperItem,
        Tab,
        TabItem,
        Search
    },

    props: {
        tabType: String,
        getPostData: Function,
        showSearch: {
            type: Boolean,
            default: true
        },
        autoFill: {
            type: Boolean,
            default: true
        },
        /**
         * 对象数组，对象obj包含如下属性：
         * obj.title {string} button-tab-item 标题
         * obj.apiConfig {object} 接口名称
         * obj.panelType {string} panel组件type属性值，默认为'1'
         * obj.matchProps {object|function} 匹配返回数据属性 Object:title, desc, src, url
         */
        panelList: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            index: 0,
            keyword: ''
        }
    },
    watch: {
        index (i, prev) {
            if (this.$refs['pullPanel' + i] && !this.panelList[i].loaded) {
                this.panelList[i].loaded = true
                this.$refs['pullPanel' + i][0].reload()
            }

            this.$emit('on-tab-index-change', i, prev, this)
        }
    },
    methods: {
        /**
         * @param postData {object} 请求参数对象，默认有三个字段：pageIndex/pageSize/keyword
         *  @param postData.pageIndex {number}请求页码
         *  @param postData.pageSize {number} 每页条数
         *  @param postData.keyword {string} 关键字查询
         */
        setPostData (postData) {
            this['oldSearchVal' + this.index] = this.$refs['search' + this.index][0].currentValue

            let data = {
                pageIndex: postData.pageIndex,
                pageSize: postData.pageSize,
                keyword: this['oldSearchVal' + this.index]
            }

            if (utils.isFunction(this.getPostData)) {
                data = this.getPostData(data, this.index)
            }

            return data
        },
        onClickItem (data) {
            this.$emit('on-click-item', data, this.index)
        },
        onLoad (data) {
            this.$emit('on-load', data, this.index)
        },
        reload () {
            this.$refs['pullPanel' + this.index][0].reload()
        },
        onSearchCancel (val) {
            if (this['oldSearchVal' + this.index] && this['oldSearchVal' + this.index] !== val) {
                this.reload()
            }
        }
    },

    mounted () {
        if (this.panelList.length) {
            this.$refs['pullPanel0'][0].reload()
            this.panelList[0].loaded = true
        }
    }
}
</script>
<style>
.vux-slider>.vux-swiper>.vux-swiper-item {
    overflow: auto;
}
</style>
