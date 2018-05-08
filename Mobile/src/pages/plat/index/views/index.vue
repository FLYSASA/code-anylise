<template>
    <div>
        <div class="index-banner">
            <img :src="headIconPath" />
            <p>{{dealMsgTip}}</p>
        </div>

        <!-- <grid :cols="4" class="grid-noborder m-b-10 front-bg p-t-25">
            <grid-item :label="menu.label" v-for="(menu, i) in shortcutMenu" :key="menu.label">
                <svg v-if="!!menu.icon" slot="icon" class="icon icon-full" aria-hidden="true">
                    <use :xlink:href="menu.icon"></use>
                </svg>
            </grid-item>
        </grid> -->

        <!-- <group class="index-group" :title="messageTitle">
            <cell class="cell-icon-middle p-v-20" v-for="message in messageList" :key="message.title" is-link :title="message.title">
                <svg v-if="!!message.icon" slot="icon" class="icon icon-full" aria-hidden="true">
                    <use :xlink:href="message.icon"></use>
                </svg>
                <div v-if="!!message.count" slot="value">
                    <badge :text="message.count"></badge>
                </div>
            </cell>
        </group> -->

        <tab v-model="tabIndex">
            <tab-item :selected="tabIndex === 0">待处理</tab-item>
            <tab-item :selected="tabIndex === 1">待阅读</tab-item>
        </tab>

        <group class="group-no-m-t" v-show="tabIndex === 0">
            <transition-group name="staggered-fade"
                v-bind:css="false"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave">
                <cell v-show="dealType.$visible" v-for="dealType in dealTypes" :key="dealType.MsgTypeId" 
                    is-link 
                    :arrow-direction="dealType.$hasChildren ? (dealType.$childrenVisible ? 'up':'down') : ''" 
                    @click.native="onTypesClick(dealType)">
                    <span slot="title" :style="{'padding-left': (dealType.$relationChain.length -1)*20 + 'px' }">
                        {{dealType.MsgTypeName}}
                    </span>
                    <div v-if="!dealType.$hasChildren && !!dealType.MsgCount" slot="value">
                        <badge :text="dealType.MsgCount"></badge>
                    </div>
                </cell>
            </transition-group>
        </group>

        <group class="group-no-m-t" v-show="tabIndex === 1">
            <cell v-for="readType in readTypes" :key="readType.MsgTypeId" 
                :is-link="!readType.$hasChildren" :title="readType.MsgTypeName">
                <div v-if="!!readType.MsgCount" slot="value">
                    <badge :text="readType.MsgCount"></badge>
                </div>
            </cell>
        </group>
    </div>
</template>

<script>
import { Grid, GridItem, Group, Divider, Cell, Badge, Tab, TabItem } from 'vux'
import { getUserBrief } from '../../api/user.js'
import { getDealMsgTypes, getReadMsgTypes } from '../../api/notification.js'
import { getLoginInfo } from '@/static/js/sign.js'
import treeDataProxy from '@/static/js/treeDataProxy.js'
import Velocity from 'velocity-animate'

export default {
    name: 'index',

    components: {
        Grid,
        GridItem,
        Divider,
        Cell,
        Group,
        Badge,
        Tab,
        TabItem
    },

    data () {
        return {
            headIconPath: require('@/static/images/plat/avatar.png'),
            aliasName: '',
            totalCount: 0,
            tabIndex: 0,
            dealTypes: [],
            toDealCount: 0,
            readTypes: [],
            toReadCount: 0
        }
    },
    computed: {
        dealMsgTip () {
            let hour = new Date().getHours()
            let dayZone

            switch (hour) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    dayZone = 'plat.dayZone.weeHours'
                    break
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    dayZone = 'plat.dayZone.morning'
                    break
                case 11:
                case 12:
                case 13:
                    dayZone = 'plat.dayZone.noon'
                    break
                case 14:
                case 15:
                    dayZone = 'plat.dayZone.afternoon'
                    break
                case 16:
                case 17:
                    dayZone = 'plat.dayZone.evening'
                    break
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 23:
                    dayZone = 'plat.dayZone.night'
                    break
            }

            return this.$t('plat.dealMsgTip', {
                dayZone: this.$t(dayZone),
                aliasName: this.aliasName,
                count: this.totalCount
            })
        }
    },
    methods: {
        onTypesClick (t) {
            if (t.$hasChildren) {
                // 存在子集
                t.$childrenVisible = !t.$childrenVisible
                this.updateChildrenVisible(t, t.$childrenVisible)
            } else {
                console.log('跳轉待辦頁面')
            }
        },
        updateChildrenVisible (node, visible) {
            const _this = this
            let childrens = this.dealTypesProxy.prop('getChildren', node['MsgTypeId'])
            if (childrens && childrens.length > 0) {
                childrens.forEach(function (c) {
                    c.$visible = visible
                    if (c.$hasChildren && c.$childrenVisible) {
                        _this.updateChildrenVisible(c, visible)
                    }
                })
            }
        },
        beforeEnter: function (el) {
            el.style.opacity = 0
            el.style.height = 0
        },
        enter: function (el, done) {
            var delay = el.dataset.index * 150
            setTimeout(function () {
                Velocity(
                    el,
                    { opacity: 1, height: '1.6em' },
                    { complete: done }
                )
            }, delay)
        },
        leave: function (el, done) {
            var delay = el.dataset.index * 150
            setTimeout(function () {
                Velocity(
                    el,
                    { opacity: 0, height: 0 },
                    { complete: done }
                )
            }, delay)
        },

        getUserBrief () {
            const _this = this
            getUserBrief().then(function (data) {
                _this.aliasName = data.AliasName

                if (data.HeadIconPath) {
                    _this.headIconPath = data.HeadIconPath
                }
            })
        },
        getDealMsgTypes () {
            const _this = this
            getDealMsgTypes(this.loginInfo['userId']).then(function (data) {
                if (data && data.length > 0) {
                    _this.dealTypesProxy = treeDataProxy({
                        id: 'MsgTypeId',
                        parentId: 'ParentTypeId',
                        data: data,
                        rootValue: data[0]['ParentTypeId'],
                        childrenIdName: 'Children',
                        onNodeCreated (node, parentNode) {
                            node.$childrenVisible = true
                            node.$visible = true
                        }
                    })

                    _this.dealTypes = _this.dealTypesProxy.get()
                    console.log(_this.dealTypes)
                }
            })
        },
        getReadMsgTypes () {
            const _this = this
            getReadMsgTypes(this.loginInfo['userId']).then(function (data) {
                if (data && data.length > 0) {
                    _this.readTypesProxy = treeDataProxy({
                        id: 'MsgTypeId',
                        parentId: 'ParentTypeId',
                        data: data,
                        rootValue: data[0]['ParentTypeId'],
                        childrenIdName: 'Children',
                        onNodeCreated (node, parentNode) {
                            node.$childrenVisible = true
                            node.$visible = true
                        }
                    })

                    _this.readTypes = _this.readTypesProxy.get()
                }
            })
        }
    },

    created () {
        this.loginInfo = getLoginInfo()
        this.getUserBrief()
        this.getDealMsgTypes()
        this.getReadMsgTypes()
    }
}
</script>

<style scope lang="less">
@import '../../../../static/css/variable.less';

.index-banner {
    background: url(../../../../static/images/example/home-banner.png) no-repeat center center;
    background-size: cover;
    height: 200px;
    text-align: center;
    color: #FFF;
    font-size: 14px;
    position: relative;

    img {
        width: 80px;
        height: 80px;
        margin-top: 30px;
        margin-bottom: 10px;
        border-radius: 80px;
        border: 3px solid #fff;
    }
}

.index-group {
    .weui-cells__title {
        background-color: @front-bg-color;
        margin: 0;
        padding: 10px 15px;
        color: #222;
        font-size: 16px;
    }

    .vux-cell-bd {
        .vux-label {
            color: #4b5c64;
        }
    }
}

.icon-full{
    width:100%;
    height:100%;
    fill:#222222;
}

.list-item {
  display: inline-block;
}
.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
