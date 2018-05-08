<template>
    <pull-list @on-click-item="browse" @on-broadcast-panel-type="onChangeType" :panel-type="panelType" :match-props="matchProps" :get-post-data="getPostData" :api-config="apiConfig">
    </pull-list>
</template>

<script>
import PullList from '../../../../components/control/PullList.vue'
import { getUserList } from '../../config/apiConfig'

export default {
    components: {
        PullList
    },

    data () {
        return {
            apiConfig: getUserList,
            matchProps: {
                title: 'UserName',
                desc: 'UsedByCorpName',
                src: 'HeadIconPath'
            },
            panelType: '1'
        }
    },
    methods: {
        browse (item) {
            this.$router.push({ path: `/user/${item.UserId}` })
        },
        /**
         * @param postData {object} 请求参数对象，默认有三个字段：pageIndex/pageSize/keyword
         *  @param postData.pageIndex {number}请求页码
         *  @param postData.pageSize {number} 每页条数
         *  @param postData.keyword {string} 关键字查询
         */
        getPostData (postData) {
            // postData.isEnabled = true
            // return postData
            return {
                pageIndex: postData.pageIndex,
                pageSize: postData.pageSize,
                keyword: postData.keyword,
                isEnabled: true
            }
        },
        onChangeType (type) {
            this.panelType = type
        }
    }
}
</script>
