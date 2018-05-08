<template>
    <pull-load :lock-x="lockX" :is-data-empty="isDataEmpty" ref="pullLoad" :auto-fill="autoFill" 
            :is-all-loaded="isFinalPageIndex" :load-method="loadData" @load-status-change="loadStatusChange" 
            @translate-change="translateChange" :load-more-bgc="loadMoreBgc">
        <template>
            <slot name="default">
                <panel ref="panel" :list="dataList" @on-click-item="onClickItem" :type="panelType"></panel>
            </slot>
        </template>
    </pull-load>
</template>

<script>
import { Panel } from 'vux'
import PullLoad from './PullLoad.vue'
import request from '../../static/js/request'
import { pageSize } from '../../static/js/config.js'
import utils from '../../static/js/utils'

export default {
    name: 'pull-panel',

    components: {
        PullLoad,
        Panel
    },

    props: {
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
        loadMoreBgc: {
            type: String,
            defualt: '#fff'
        },
        // 锁定X轴滚动，默认锁定X轴
        lockX: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            isFinalPageIndex: false,
            dataList: []
        }
    },
    computed: {
        isDataEmpty () {
            return this.dataList.length === 0
        }
    },
    watch: {
        dataList (data) {
            this.$emit('on-load', data)
        }
    },
    methods: {
        reload () {
            this.$refs.pullLoad.reload()
        },
        loadStatusChange (status, direction) {
            this.$emit('load-status-change', status, direction)
        },
        translateChange (translate, eventName) {
            this.$emit('translate-change', translate, eventName)
        },
        loadData (direction, done) {
            const _this = this
            const pullDown = direction === 'down'
            if (!pullDown && this.isFinalPageIndex) {
                done()
                return
            }
            // 下拉重置取第一页，上拉加载下一页
            const currPageIndex = pullDown ? 1 : _this.currPageIndex + 1
            let postData = {
                pageIndex: currPageIndex,
                pageSize: this.pageSize,
                keyword: ''
            }

            if (typeof this.getPostData === 'function') {
                postData = this.getPostData(postData)
            }

            request({
                data: postData,
                loading: true,
                success: function (data) {
                    if (data && !data.hasOwnProperty('response')) {
                        if (utils.isString(data)) {
                            try {
                                data = JSON.parse(data)
                            } catch (e) {
                            }
                        }
                        done()
                        if (data.Data.Rows.length === 0) {
                            _this.dataList = []
                            if (currPageIndex === 1) {
                                _this.currPageIndex = 0
                                _this.isFinalPageIndex = true
                            }
                            return
                        }
                        _this.currPageIndex = currPageIndex
                        _this.isFinalPageIndex = _this.currPageIndex === Math.ceil(data.Data.Total / _this.pageSize)

                        // 上拉刷新，清空数据
                        if (pullDown) {
                            if (_this.dataList.length > 0) {
                                _this.dataList = []
                            }
                        }

                        for (let i = 0, len = data.Data.Rows.length; i < len; i++) {
                            if (_this.$refs.panel) {
                                _this.dataList.push(_this.getMatchData(data.Data.Rows[i]))
                            } else {
                                _this.dataList.push(data.Data.Rows[i])
                            }
                        }
                    } else {
                        done(true)
                    }
                }
            }, this.apiConfig)
        },
        getMatchData (data) {
            if (this.matchPropNames) {
                let d = {}

                this.matchPropNames.forEach((prop) => {
                    d[prop] = data[this.matchProps[prop]]
                })

                d['_data'] = data
                return d
            } else if (utils.isFunction(this.matchProps)) {
                let d
                d = this.matchProps(data)
                if (!utils.isPlainObject(d) || !utils.hasOwns(d, ['title', 'desc', 'src'])) {
                    utils.warn(`Panel组件指定属性matchProps函数返回值不是对象或者对象不包含title或desc或src属性`, d)
                } else {
                    d['_data'] = data
                }
                return d
            } else {
                return data
            }
        },
        onClickItem (item) {
            this.$emit('on-click-item', item['_data'])
        }
    },

    created () {
        this.currPageIndex = 0
        if (utils.isPlainObject(this.matchProps)) {
            this.matchPropNames = Object.keys(this.matchProps)
        }
    }
}
</script>
