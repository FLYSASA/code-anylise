<template>
    <pull-list @on-load="onLoad" :get-post-data="getPostData" :api-config="apiConfig">
        <swipeout>
            <swipeout-item v-for="data in dataList" :key="data.UserId" @click.native="browse(data)">
                <div slot="right-menu">
                    <swipeout-button type="primary" @click.native.stop="confirmEnabled(data)">{{data.Enabled ? '禁用':'启用'}}</swipeout-button>
                    <swipeout-button type="warn" @click.native.stop="confirmDelete(data)">删除</swipeout-button>
                </div>
                <div slot="content" style="padding:12px;border-bottom:1px solid #c7c7c7;">{{data.UserName}}</div>
            </swipeout-item>
        </swipeout>
    </pull-list>
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import PullList from '../../../../components/control/PullList.vue'
import request from '../../../../static/js/request.js'
import { getUserList, updateUser, deleteUser } from '../../config/apiConfig'
import utils from '../../../../static/js/utils.js'
// import * as constants from '../../../../static/js/constants.js'

export default {
    components: {
        Swipeout,
        SwipeoutItem,
        PullList,
        SwipeoutButton
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
        confirmEnabled (data) {
            const _this = this
            this.$vux.confirm.show({
                title: '询问',
                content: `确认要${data.Enabled ? '禁用' : '启用'}吗？`,
                onConfirm () {
                    request({
                        loading: true,
                        data: {
                            userModel: {
                                UserId: data.UserId,
                                UserName: data.UserName,
                                AliasName: data.AliasName,
                                UsedById: data.UserById,
                                Enabled: !data.Enabled,
                                RowIndex: data.RowIndex,
                                HeadIconPath: data.HeadIconPath
                            }
                        }
                    }, updateUser).then(function (r) {
                        if (r) {
                            _this.$vux.toast.text('操作成功')
                            data.Enabled = !data.Enabled
                        }
                    })
                }
            })
        },
        confirmDelete (data) {
            const _this = this
            this.$vux.confirm.show({
                title: '询问',
                content: `确认要删除吗？`,
                onConfirm () {
                    request({
                        data: {
                            userId: data.UserId
                        },
                        loading: true
                    }, deleteUser).then(function (r) {
                        if (r) {
                            _this.$vux.toast.text('删除成功')
                            setTimeout(function () {
                                // 刷新
                                // _this.$refs.pullList.reload()
                                // 删除该项
                                _this.dataList.splice(_this.dataList.indexOf(data), 1)
                            }, 2000)
                        }
                    })
                }
            })
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
