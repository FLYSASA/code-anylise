<template>
    <div class="m-10">
        <x-table>
            <thead>
                <tr>
                    <th>公司名称</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="d in data">
                    <td style="text-align:left;" v-html="generatePrefix(d)">
                    </td>
                </tr>
            </tbody>
        </x-table>
    </div>
</template>

<script>
import { XTable } from 'vux'
import { getStructuresList } from '../../config/apiConfig'
import request from '../../../../static/js/request.js'
import treeDataProxy from '../../../../static/js/treeDataProxy'

export default {
    components: {
        XTable
    },

    data () {
        return {
            data: [],
            showMenus: false,
            menus: {
                '1': 'treeData（非嵌套数据）'
            }
        }
    },
    methods: {
        changeMenus () {
            this.$router.replace({ name: 'other' })
        },
        generatePrefix (data) {
            return new Array(data.$relationChain.length).join('<span class="whitespace"></span>') + '<span class="m-l-5">' + data.StruName + '</span>'
        }
    },

    beforeRouteEnter (to, from, next) {
        request({
            data: { withDept: true },
            loading: true,
            mock: 'mock/json/example/structure.json'
        }, getStructuresList).then(function (data) {
            if (data) {
                next(vm => {
                    let rowId = 0
                    vm.dataProxy = treeDataProxy({
                        data: data.Data,
                        id: 'StruId',
                        parentId: 'ParentStruId',
                        rootValue: null,
                        childrenIdName: 'Children',
                        // 可自定义其他属性
                        matchProps: {
                            RowId: function () {
                                rowId = rowId + 1
                                return rowId
                            },
                            StruId: 'StruId',
                            StruName: 'StruName',
                            ParentStruId: 'ParentStruId',
                            ParentStruName: 'ParentStruName'
                        }
                    })
                    vm.data = vm.dataProxy.get()
                })
            }
        })
    },
    beforeDestroy () {
        if (this.dataProxy) {
            this.dataProxy.destroy()
        }
    }
}
</script>
<style>
.whitespace {
    display: inline-block;
    width: 20px;
    height: 20px;
}
</style>
