<template>
    <layout :title="title" @on-click-more="showTabType = !showTabType">
        <tab-pull-list :panel-list="panelList" :tab-type="tabType" @on-click-item="browse" :get-post-data="getPostData">
        </tab-pull-list>

        <actionsheet slot="bottom" v-history-state="showTabType" v-model="showTabType" :menus="tabTypes" @on-click-menu="changeType">
        </actionsheet>
    </layout>
</template>

<script>
import { Actionsheet } from 'vux'
import Layout from '@/components/master/layout.vue'
import TabPullList from '@/components/control/TabPullList.vue'
import { getUserList, getPositionList, getEmployeeList } from '@/pages/example/config/apiConfig'
import historyState from '@/directives/history-state'

export default {
    components: {
        Actionsheet,
        Layout,
        TabPullList
    },
    directives: {
        historyState
    },

    data () {
        return {
            index: 0,
            showTabType: false,
            tabType: '1',
            tabTypes: {
                '1': '切换到底部线条tab'
            },
            panelList: [{
                title: '用户',
                apiConfig: getUserList,
                panelType: '1',
                matchProps: {
                    title: 'UserName',
                    desc: 'UsedByCorpName',
                    src: 'HeadIconPath'
                }
            }, {
                title: '职位',
                apiConfig: getPositionList,
                panelType: '1',
                matchProps: {
                    title: 'PositionName',
                    desc: 'Description',
                    src: ''
                }
            }, {
                title: '员工',
                apiConfig: getEmployeeList,
                panelType: '1',
                matchProps: {
                    title: 'EmployeeName',
                    desc: 'CorpName',
                    src: ''
                }
            }],
            title: 'tabLis页面'
        }
    },
    methods: {
        changeType (key) {
            this.$router.replace({
                name: 'radius'
            })
        },
        /**
         * @param postData {object} 请求参数对象，默认有三个字段：pageIndex/pageSize/keyword
         *  @param postData.pageIndex {number}请求页码
         *  @param postData.pageSize {number} 每页条数
         *  @param postData.keyword {string} 关键字查询
         */
        getPostData (postData, index) {
            // 如果只需要pageIndex/pageSize/keyword参数，可忽略getPostData
            return {
                pageIndex: postData.pageIndex,
                pageSize: postData.pageSize,
                keyword: postData.keyword || ''
            }
        },
        browse (data, index) {
            this.$vux.toast.text(JSON.stringify(data) + ':clicked')
        }
    }
}
</script>

