<template>
    <cell-group :group-list="groups" :showIcon="false" @on-item-click="onClickItem">
    </cell-group>
</template>

<script>
import CellGroup from '../../../../components/control/CellGroup.vue'
import { getUser } from '../../config/apiConfig'
import utils from '../../../../static/js/utils.js'
import request from '../../../../static/js/request.js'
import Emitter from '@/mixins/emitter.js'

export default {
    name: 'detailOnce',
    mixins: [Emitter],
    components: {
        CellGroup
    },

    data () {
        return {
            groups: [],
            userId: '',
            title: ''
        }
    },
    watch: {
        userId (id, prevId) {
            if (id && id !== prevId) {
                this.getUserInfo()
            }
        },
        title (val) {
            this.dispatch('on-dispatch-update-title', val)
        }
    },
    methods: {
        getUserInfo () {
            const _this = this
            request({
                data: { userId: this.userId },
                loading: true
            }, getUser).then(function (data) {
                if (data) {
                    _this.setGroups(data.Data)
                    _this.title = data.Data.UserName
                } else {
                    _this.groups = []
                    _this.title = '不存在账号信息'
                }
            })
        },
        setGroups (data) {
            const result = [{
                title: '用户基本信息',
                menus: [{
                    title: '用户名称',
                    value: data.UserName,
                    link: false
                }, {
                    title: '用户别名',
                    value: data.AliasName,
                    link: false
                }, {
                    title: '是否可用',
                    value: data.Enabled ? '可用' : '不可用',
                    link: false
                }, {
                    title: '创建日期',
                    value: utils.formatDate(data.CreateDate, 'yyyy-MM-dd'),
                    link: false
                }]
            }]

            if (data.Roles && data.Roles.length > 0) {
                result.push({
                    title: '用户角色',
                    menus: []
                })

                data.Roles.forEach((role) => {
                    result[1].menus.push({
                        title: '角色名称',
                        value: role.RoleName,
                        link: false
                    })
                })
            }

            this.groups = result
        },
        onClickItem (item, groupIndex, index) {
            this.$vux.toast.text(JSON.stringify(item))
        }
    },

    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.userId = to.params.id
        })
    }
}
</script>

