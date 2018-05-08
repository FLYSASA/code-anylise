<template>
    <div>
        <div class="oper-banner">
            <div class="banner-desc">
                <h3>赛普爱德</h3>
                <p>不动产领域“咨询+IT”管理大师</p>
            </div>
            <swiper :aspect-ratio="411/750" :list="imgList" :show-dots="false"></swiper>
        </div>

        <grid class="grid-noborder front-bg" :cols="4">
            <grid-item class="grid-icon-large" @on-item-click="onItemClick(index)" :label="operation.label" :icon="operation.icon" v-for="(operation, index) in operationList" :key="operation.label">
            </grid-item>
        </grid>
    </div>
</template>

<script>
import { Swiper, Grid, GridItem } from 'vux'

export default {
    name: 'operation',

    components: {
        Swiper,
        Grid,
        GridItem
    },

    data () {
        return {
            imgList: [{
                url: 'javascript:',
                img: require('../../../../static/images/example/bg_operation.png')
            }],
            operationList: [
                {
                    label: '我的工作',
                    icon: require('../../../../static/images/example/mine_work.png'),
                    link: ''
                }, {
                    label: '预警中心',
                    icon: require('../../../../static/images/example/warn-center.png'),
                    link: ''
                }, {
                    label: '移动审批',
                    icon: require('../../../../static/images/example/mobile-check.png'),
                    link: ''
                }, {
                    label: '形象进度',
                    icon: require('../../../../static/images/example/visual-progress.png'),
                    link: ''
                }, {
                    label: '通知公告',
                    icon: require('../../../../static/images/example/notification.png'),
                    link: ''
                }, {
                    label: '移动计划',
                    icon: require('../../../../static/images/example/mobile-plan.png'),
                    link: ''
                }, {
                    label: '知识库',
                    icon: require('../../../../static/images/example/knowledge.png'),
                    link: ''
                }, {
                    label: '会议中心',
                    icon: require('../../../../static/images/example/meeting-center.png'),
                    link: ''
                }, {
                    label: '邮件中心',
                    icon: require('../../../../static/images/example/email-center.png'),
                    link: ''
                }
            ]
        }
    },
    methods: {
        onItemClick (index) {
            this.$router.addRoutes([{
                path: '/operation/secondMenu',
                name: 'secondMenu',
                component (resolve) {
                    require.ensure(['./secondMenu.vue'], () => {
                        resolve(require('./secondMenu.vue'))
                    })
                }
            }])

            this.$router.push({ name: 'secondMenu' })
        }
    }
}
</script>
<style scoped>
.oper-banner {
    text-align: center;
    position: relative;
    overflow: hidden;
}

.oper-banner .banner-desc {
    position: absolute;
    width: 100%;
    z-index: 1;
    top: 30%;
    font-size: 20px;
}

.banner-desc h3 {
    margin-bottom: 10px;
}
</style>
