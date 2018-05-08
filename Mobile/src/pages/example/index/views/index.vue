<template>
    <div>
        <div class="index-banner">
            <img src="../../../../static/images/example/avatar.png" />
            <p>下午好，Vivian!您今天有16条待办事项需要处理。</p>
            <div class="attendance">
                <a>考勤记录</a>
            </div>
        </div>

        <grid :cols="4" class="grid-noborder m-b-10 front-bg p-t-25">
            <grid-item :label="menu.label" v-for="(menu, i) in shortcutMenu" :key="menu.label">
                <svg v-if="!!menu.icon" slot="icon" class="icon icon-full" aria-hidden="true">
                    <use :xlink:href="menu.icon"></use>
                </svg>
            </grid-item>
        </grid>

        <group class="index-group" :title="messageTitle">
            <cell class="cell-icon-middle p-v-20" v-for="message in messageList" :key="message.title" is-link :title="message.title">
                <svg v-if="!!message.icon" slot="icon" class="icon icon-full" aria-hidden="true">
                    <use :xlink:href="message.icon"></use>
                </svg>
                <div v-if="!!message.count" slot="value">
                    <badge :text="message.count"></badge>
                </div>
            </cell>
        </group>
    </div>
</template>

<script>
import { Grid, GridItem, Group, Divider, Cell, Badge } from 'vux'

export default {
    name: 'index',

    components: {
        Grid,
        GridItem,
        Divider,
        Cell,
        Group,
        Badge
    },

    data () {
        return {
            shortcutMenu: [{
                label: '写邮件',
                icon: '#icon-write-email'
            }, {
                label: '合同发起',
                icon: '#icon-check'
            }, {
                label: '会议申请',
                icon: '#icon-calendar'
            }, {
                label: '请假申请',
                icon: '#icon-leave'
            }, {
                label: '出差申请',
                icon: '#icon-business'
            }, {
                label: '企业公告',
                icon: '#icon-notice'
            }, {
                label: '公司公文',
                icon: '#icon-doc'
            }, {
                label: '全部',
                icon: '#icon-more'
            }],
            messageTitle: '消息中心',
            messageList: [{
                title: '待办事项',
                icon: '#icon-check_fill',
                count: 0
            }, {
                title: '系统消息',
                icon: '#icon-sys-message',
                count: 7
            }, {
                title: '企业邮箱',
                icon: '#icon-company-email',
                count: 3
            }]
        }
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

.attendance {
    position: absolute;
    width: 160px;
    left: 50%;
    margin-left: -80px;
    background: linear-gradient(to right, #26c4fd 0%, #4499fe 100%);
    border-radius: 30px;
    text-align: center;
    bottom: 0;
    margin-bottom: -20px;
    z-index: 1;
    box-shadow: 0 2px 3px #ccc;
    a {
        color: #FFF;
        background: url(../../../../static/images/example/attendance.png) no-repeat center left;
        background-size: 16px;
        padding-left: 25px;
        display: inline-block;
        line-height: 40px;
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
</style>
