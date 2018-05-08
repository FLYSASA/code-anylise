<template>
    <pull-list @on-load="onLoad" :get-post-data="getPostData" :api-config="apiConfig">
        <group class="group-no-m-t">
            <cell v-for="data in dataList" :key="data.UserId" @click.native="browse(data)">
                <img slot="icon" :src="data.HeadIconPath || require('../../../../static/images/example/user.gif')" style="width:60px;margin-right:10px;" />
                <span slot="title">{{data.UserName}}</span>
                <span slot="inline-desc" style="color:#666;font-size:14px;">{{data.UsedByCorpName}}</span>
                <span slot="default" style="color:#666;font-size:14px;">{{data.CreateDate|dateFormat('yyyy-MM-dd')}}</span>
            </cell>
        </group>
    </pull-list>
</template>

<script>
import { Group, Cell } from 'vux'
import PullList from '../../../../components/control/PullList.vue'
import { getUserList } from '../../config/apiConfig'
import utils from '../../../../static/js/utils.js'

export default {
    components: {
        PullList,
        Group,
        Cell
    },
    filters: {
        dateFormat (value, fmt) {
            return utils.formatDate(value, fmt)
        }
    },

    data () {
        return {
            dataList: [],
            apiConfig: getUserList
        }
    },
    methods: {
        browse (item) {
            this.$router.push({ path: `/user/${item.UserId}` })
        },
        onLoad (data) {
            this.dataList = data
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
                isEnabled: false
            }
        }
    }
}
</script>
