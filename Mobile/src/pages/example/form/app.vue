<template>
    <layout title="报告填写" :show-more="false">
        <group>
            <cell title="任务名称" :value="tastName"></cell>
            <cell title="登记类型" @click.native="showRegisterType = !showRegisterType" :value="registerTypeText" is-link></cell>
        </group>

        <group title="时间范围">
            <datetime title="开始时间" :end-date="maxStartDate" placeholder="请选择开始时间" format="YYYY-MM-DD HH:mm" v-model="startDate" @on-change="onStartDateChange"></datetime>
            <datetime title="结束时间" :start-date="minEndDate" placeholder="请选择结束时间" format="YYYY-MM-DD HH:mm" v-model="endDate" @on-change="onEndDateChange"></datetime>
        </group>

        <group>
            <cell title="完成进度" :inline-desc="completedProgress + '%'" primary="content">
                <range v-model="completedProgress"></range>
            </cell>
        </group>

        <checklist :max="1" title="进度风险" required :options="riskOptions" v-model="progressRisk"></checklist>

        <group>
            <x-switch title="添加照片" v-model="showAddPhoto"></x-switch>
        </group>

        <flexbox v-if="showAddPhoto" class="p-v-20 b-b vux-1px-b" :gutter="0" wrap="wrap">
            <flexbox-item v-for="(img, index) in photos" :key="index">
                <div class="photo-wrap">
                    <img :src="img" />
                    <i v-if="index !== photos.length-1"></i>
                </div>
            </flexbox-item>
        </flexbox>

        <group title="报告描述">
            <x-textarea :max="200" name="desc" placeholder="点击填写..." v-model="reportDesc" :autosize="true"></x-textarea>
        </group>

        <div class="p-10">
            <x-button type="primary" :disabled="btnDisabled">提交</x-button>
        </div>

        <template slot="bottom">
            <actionsheet v-model="showRegisterType" :menus="registerTypes" @on-click-menu="changeRegisterTypes"></actionsheet>
        </template>
    </layout>
</template>

<script>
import { Divider, Actionsheet, Flexbox, FlexboxItem, XTextarea, XButton, Group, XSwitch, Checklist, Cell, Datetime, Range } from 'vux'
import Layout from '@/components/master/layout.vue'

export default {
    components: {
        Actionsheet,
        Flexbox,
        FlexboxItem,
        XTextarea,
        XButton,
        Group,
        XSwitch,
        Checklist,
        Cell,
        Datetime,
        Range,
        Layout,
        Divider
    },

    data () {
        return {
            tastName: '7月份新增任务的执行报告',
            // 登记类型
            showRegisterType: false,
            registerTypes: {
                '1': '直接登记',
                '2': '正常申请'
            },
            registerTypeValue: '',
            registerTypeText: '请选择',
            // 时间范围
            startDate: '',
            endDate: '',
            maxStartDate: '',
            minEndDate: '',
            // 完成进度
            completedProgress: 0,
            // 进度风险
            riskOptions: [{ key: '1', value: '可控' }, { key: '2', value: '预计延期完成' }, { key: '', value: '取消' }],
            progressRisk: '',
            // 添加照片
            showAddPhoto: true,
            photos: [
                require('../../../static/images/example/photo1.png'),
                require('../../../static/images/example/photo2.png'),
                require('../../../static/images/example/photo3.png'),
                require('../../../static/images/example/addPhoto.png')
            ],
            // 报告描述
            reportDesc: '',
            btnDisabled: true
        }
    },
    watch: {
        registerTypeValue () {
            this.validate()
        },
        startDate () {
            this.validate()
        },
        endDate () {
            this.validate()
        },
        showAddPhoto () {
            this.validate()
        },
        photos () { this.validate() },
        reportDesc () { this.validate() }
    },
    methods: {
        changeRegisterTypes (key, text) {
            if (key === '1' || key === '2') {
                this.registerTypeValue = key
                this.registerTypeText = text
            } else {
                this.registerTypeValue = ''
                this.registerTypeText = '请选择'
            }
        },
        onStartDateChange (val) {
            this.minEndDate = val
        },
        onEndDateChange (val) {
            this.maxStartDate = val
        },
        validate () {
            if (this.registerTypeValue === '' ||
                this.startDate === '' || this.endDate === '' ||
                (this.showAddPhoto && this.photos.length === 0) || this.reportDesc === '') {
                this.btnDisabled = true
                return
            }

            this.btnDisabled = false
        },
        cancelRegisterType () {
            this.showRegisterType = false
        }
    }
}
</script>
<style lang="less">
.photo-wrap {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    position: relative;
    img {
        width: 100%;
        height: 100%;
    }
    i {
        position: absolute;
        display: block;
        width: 20px;
        height: 20px;
        background: url(../../../static/images/example/delete.png) no-repeat center center;
        background-size: 20px 20px;
        top: 0;
        margin-top: -10px;
        right: 0;
        margin-right: -10px;
    }
}
</style>
