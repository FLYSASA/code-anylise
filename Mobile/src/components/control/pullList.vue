<template>
    <div>
        <slot name="list-top">
            <search v-if="showSearch" :placeholder="searchPlaceholder" :auto-fixed="false" v-model="keyword" @on-submit="reload" @on-cancel="onSearchCancel"></search>
        </slot>
        <div class="pull-load-wrapper" v-height-to-bottom="{bottom: bottom}">
            <pull-panel ref="pullPanel" :lock-x="lockX" :load-more-bgc="loadMoreBgc" :auto-fill="autoFill" :api-config="apiConfig" :page-size="pageSize" :get-post-data="setPostData" @on-load="onLoad" @on-click-item="onClickItem" :panel-type="panelType" :match-props="matchProps" @load-status-change="loadStatusChange" @translate-change="translateChange">
                <template>
                    <slot name="default">
                    </slot>
                </template>
            </pull-panel>
        </div>
        <slot name="list-bottom">
        </slot>
    </div>
</template>

<script>
import { Search } from 'vux'
import heightToBottom from '../../directives/height-to-bottom'
import PullPanel from './PullPanel.vue'
import { pageSize } from '../../static/js/config.js'
import utils from '../../static/js/utils'

export default {
    name: 'pull-list',

    components: {
        Search,
        PullPanel
    },
    directives: {
        heightToBottom
    },

    props: {
        // 是否显示搜索框
        showSearch: {
            type: Boolean,
            default: true
        },
        // 列表是否自动加载填满
        autoFill: {
            type: Boolean,
            default: true
        },
        // 调用接口名称
        apiConfig: {
            type: Object,
            required: true
        },
        // 设置每次加载条数
        pageSize: {
            type: Number,
            default: pageSize
        },
        // 指定函数返回请求参数
        getPostData: Function,
        panelType: {
            type: String,
            default: '1'
        },
        // Object:title, desc, src, url
        matchProps: Object,
        bottom: {type: Number, defualt: 0},
        loadMoreBgc: {
            type: String,
            default: '#fff'
        },
        // 锁定X轴滚动，默认锁定X轴
        lockX: {
            type: Boolean,
            default: true
        },
        searchPlaceholder: {
            type: String,
            default () {
                return this.$t('base.btns.search')
            }
        }
    },
    data () {
        return {
            keyword: ''
        }
    },
    methods: {
        reload () {
            this.$refs.pullPanel.reload()
        },
        loadStatusChange (status, direction) {
            this.$emit('load-status-change', status, direction)
        },
        translateChange (translate, eventName) {
            this.$emit('translate-change', translate, eventName)
        },
        onSearchCancel () {
            this.keyword = ''
            if (this.oldKeyword && this.oldKeyword !== this.keyword) {
                this.reload()
            }
        },
        setPostData (postData) {
            this.oldKeyword = this.keyword
            let data = {
                pageIndex: postData.pageIndex,
                pageSize: postData.pageSize,
                keyword: this.keyword
            }

            if (utils.isFunction(this.getPostData)) {
                data = this.getPostData(data)
            }

            return data
        },
        onLoad (data) {
            this.$emit('on-load', data)
        },
        onClickItem (data) {
            this.$emit('on-click-item', data)
        }
    }
}
</script>
