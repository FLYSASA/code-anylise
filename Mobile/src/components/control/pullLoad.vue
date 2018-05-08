<template>
    <div class="sapi-pull-load">
        <div class="sapi-pull-load-content" :class="{ 'is-dropped': loadStatus === 'loading'}" :style="{ 'transform': 'translate3d(0, ' + translate + 'px, 0)' }">
            <slot name="top">
                <div class="sapi-pull-load-top">
                    <span class="sapi-pull-load-text">{{ tipText }}</span>
                </div>
            </slot>
            <slot></slot>
            <slot name="bottom">
                <div class="text-center m-t-20" v-if="isAllLoaded && isDataEmpty">
                    <img src="../../static/images/nodata.png"/>
                    <p class="no-data">暂无数据</p>
                </div>
                <div class="sapi-pull-load-bottom" :style="{marginBottom: isAllLoaded ? '0' : '-50px'}" v-if="!isDataEmpty && (isShowBottomStatus || isAllLoaded)">
                    <span v-if="isShowBottomStatus && !isAllLoaded" class="sapi-pull-load-text">{{ tipText }}
                    </span>
                    <load-more v-if="isAllLoaded" :show-loading="false" :tip="allLoadedTipText" :background-color="loadMoreBgc"></load-more>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import { LoadMore } from 'vux'

/**
 * 下拉刷新组件
 * 根据mint-ui的loadmore组件修改
 * 指定属性loadMethod方法默认传两个参数：
 * @param direction {'down'/'up'} 指定pull方向
 * @param done {function} 数据加载完成执行方法
 */
export default {
    name: 'pull-load',

    components: {
        LoadMore
    },

    props: {
        loadMethod: {
            type: Function,
            required: true
        },
        maxDistance: {
            type: Number,
            default: 0
        },
        autoFill: {
            type: Boolean,
            default: true
        },
        distanceIndex: {
            type: Number,
            default: 2
        },
        topPullText: {
            type: String,
            default: '下拉可以刷新'
        },
        topDropText: {
            type: String,
            default: '释放立即刷新'
        },
        topLoadingText: {
            type: String,
            default: '加载中...'
        },
        topDistance: {
            type: Number,
            default: 70
        },
        bottomPullText: {
            type: String,
            default: '上拉可以刷新'
        },
        bottomDropText: {
            type: String,
            default: '释放立即刷新'
        },
        bottomLoadingText: {
            type: String,
            default: '加载中...'
        },
        bottomDistance: {
            type: Number,
            default: 70
        },
        // 是否全部加载，为true，下拉不再请求数据
        isAllLoaded: {
            type: Boolean,
            default: false
        },
        allLoadedTipText: {
            type: String,
            default: '没有更多数据'
        },
        isDataEmpty: {
            type: Boolean,
            default: false
        },
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
            translate: 0,
            scrollEventTarget: null,
            containerFilled: false,
            // 提示文字
            tipText: '',
            // 是否到达底部
            bottomReached: false,
            direction: '',
            startY: 0,
            startScrollTop: 0,
            currentY: 0,
            // 加载状态
            loadStatus: '',
            isShowBottomStatus: false,
            isInit: true
        }
    },
    watch: {
        loadStatus (val) {
            const isTop = this.direction === 'down'
            this.$emit('load-status-change', val, this.direction)
            // if (!isTop) {
            //     this.isShowBottomStatus = true
            // }
            switch (val) {
                case 'pull':
                    this.tipText = isTop ? this.topPullText : this.bottomPullText
                    break
                case 'drop':
                    this.tipText = isTop ? this.topDropText : this.bottomDropText
                    break
                case 'loading':
                    this.tipText = isTop ? this.topLoadingText : this.bottomLoadingText
                    break
            }
        },
        translate (val) {
            if (this.direction === 'up' && val !== 0) {
                if (!this.isShowBottomStatus) {
                    this.isShowBottomStatus = true
                }
            } else {
                if (this.isShowBottomStatus) {
                    this.isShowBottomStatus = false
                }
            }
        }
    },
    methods: {
        onLoaded (direction, fromFill) {
            if (direction === 'up') {
                this.loadStatus = 'pull'
                this.$nextTick(() => {
                    if (!fromFill) {
                        if (this.scrollEventTarget === window) {
                            document.body.scrollTop += 50
                        } else {
                            this.scrollEventTarget.scrollTop += 50
                        }
                    }
                    this.translate = 0
                })

                this.updateContainerFilled()
                if (!this.Failed && !this.isAllLoaded && !this.containerFilled) {
                    this.fillContainer()
                }
            } else {
                this.translate = 0
                setTimeout(() => {
                    this.loadStatus = 'pull'
                }, 200)
            }
        },

        getScrollEventTarget (element) {
            let currentNode = element
            while (currentNode && currentNode.tagName !== 'HTML' &&
                currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
                if (overflowY === 'scroll' || overflowY === 'auto') {
                    return currentNode
                }
                currentNode = currentNode.parentNode
            }
            return window
        },

        getScrollTop (element) {
            if (element === window) {
                return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
            } else {
                return element.scrollTop
            }
        },

        bindTouchEvents () {
            const _this = this
            this.touchStart = function (e) { _this.handleTouchStart(e) }
            this.touchMove = function (e) { _this.handleTouchMove(e) }
            this.touchEnd = function (e) { _this.handleTouchEnd(e) }

            this.$el.addEventListener('touchstart', this.touchStart, false)
            this.$el.addEventListener('touchmove', this.touchMove, false)
            this.$el.addEventListener('touchend', this.touchEnd, false)
        },

        init () {
            this.loadStatus = 'pull'
            this.isPullUp = true
            this.tipText = this.topPullText
            this.scrollEventTarget = this.getScrollEventTarget(this.$el)
            if (typeof this.loadMethod === 'function') {
                this.fillContainer()
                this.bindTouchEvents()
            }
        },

        fillContainer () {
            if (this.autoFill) {
                this.$nextTick(() => {
                    if (this.isInit) {
                        this.isInit = false
                    } else {
                        this.updateContainerFilled()
                    }

                    if (!this.containerFilled) {
                        this.triggerLoadMethod('up', true)
                    }
                })
            }
        },
        reload () {
            this.triggerLoadMethod('down', true)
        },
        triggerLoadMethod (direction, fromFill) {
            const _this = this
            if (direction) {
                this.direction = direction
            }
            this.loadStatus = 'loading'
            this.Failed = false
            this.loadMethod(this.direction, function (isFail) {
                if (isFail) {
                    _this.Failed = true
                }
                _this.onLoaded(_this.direction, fromFill)
            })
        },

        updateContainerFilled () {
            if (this.scrollEventTarget === window) {
                if (document.documentElement.getBoundingClientRect().bottom) {
                    this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                        document.documentElement.getBoundingClientRect().bottom
                }
            } else {
                this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                    this.scrollEventTarget.getBoundingClientRect().bottom
            }
        },

        checkBottomReached () {
            if (this.scrollEventTarget === window) {
                return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight
            } else {
                return this.$el.getBoundingClientRect().bottom >= this.$el.children[0].getBoundingClientRect().bottom
            }
        },

        handleTouchStart (event) {
            this.startY = event.touches[0].clientY
            this.startScrollTop = this.getScrollTop(this.scrollEventTarget)
            this.bottomReached = false
            if (this.loadStatus !== 'loading') {
                this.loadStatus = 'pull'
            }
        },

        handleTouchMove (event) {
            // 在区域外
            if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
                return
            }
            this.currentY = event.touches[0].clientY
            let distance = (this.currentY - this.startY) / this.distanceIndex
            this.direction = distance > 0 ? 'down' : 'up'
            this.isPullUp = this.direction === 'up'
            // 向上拉需确认是否到达底部
            if (this.isPullUp) {
                this.bottomReached = this.bottomReached || this.checkBottomReached()
            }

            if (typeof this.loadMethod === 'function' && this.loadStatus !== 'loading' &&
                (!this.isPullUp && this.getScrollTop(this.scrollEventTarget) === 0 ||
                    this.isPullUp && this.bottomReached)) {
                if (distance > 0 || this.lockX && distance === 0) {
                    event.preventDefault()
                    event.stopPropagation()

                    if (this.lockX && distance === 0) {
                        return
                    }
                }

                if (this.isPullUp) {
                    if (this.maxDistance > 0) {
                        this.translate = Math.abs(distance) <= this.maxDistance
                            ? this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance : this.translate
                    } else {
                        this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance
                    }

                    if (this.translate > 0) {
                        this.translate = 0
                    }

                    this.loadStatus = -this.translate >= this.bottomDistance && !this.isAllLoaded ? 'drop' : 'pull'
                } else {
                    if (this.maxDistance > 0) {
                        this.translate = distance <= this.maxDistance ? distance - this.startScrollTop : this.translate
                    } else {
                        this.translate = distance - this.startScrollTop
                    }

                    if (!this.isPullUp && this.translate < 0) {
                        this.translate = 0
                    }

                    this.loadStatus = this.translate >= this.topDistance ? 'drop' : 'pull'
                }
            }

            this.$emit('translate-change', this.translate, 'move')
        },

        handleTouchEnd () {
            if (this.isPullUp && this.bottomReached && this.translate < 0 ||
                !this.isPullUp && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
                if (this.isPullUp) {
                    this.bottomReached = false
                }

                if (this.loadStatus === 'drop') {
                    this.translate = this.direction === 'down' ? '50' : '-50'
                    this.triggerLoadMethod()
                } else {
                    this.translate = '0'
                    this.loadStatus = 'pull'
                }
            }

            this.$emit('translate-change', this.translate, 'end')
        }
    },

    mounted () {
        this.isInit = true
        this.init()
    },
    beforeDestory () {
        if (this.touchStart) {
            this.$el.removeEventListener('touchstart', this.touchStart)
            this.$el.removeEventListener('touchmove', this.touchMove)
            this.$el.removeEventListener('touchend', this.touchEnd)
        }
    }
}
</script>
<style lang="less">
.sapi-pull-load {
    height:100%;
    overflow:auto;
    overflow-y:scroll;
    &.min-height-50 {
        min-height: 50px;
    }
    .sapi-pull-load-content {
        &.is-dropped {
            transition: .2s;
        }
    }
    .sapi-pull-load-top,
    .sapi-pull-load-bottom {
        text-align: center;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
    }
    .sapi-pull-load-top {
        margin-top: -50px;
    }
    .sapi-pull-load-bottom {
        margin-bottom: -50px;
    }
    .sapi-pull-load-spinner {
        display: inline-block;
        margin-right: 5px;
        vertical-align: middle;
    }
    .sapi-pull-load-text {
        vertical-align: middle;
    }

    .weui-loadmore_line {
        margin-top:25px;
    }
}
</style>
