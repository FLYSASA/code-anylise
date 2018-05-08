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
                    <td style="text-align:left;" v-html="d.$relationChain + '<span class=m-l-5>'+ d.StruName + '</span>'">
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
    data () {
        return {
            data: [],
            showMenus: false,
            menus: {
                '1': 'treeData（嵌套数据）'
            }
        }
    },
    methods: {
        changeMenus () {
            this.$router.replace({ name: 'list' })
        },
        generatePrefix (relationSign) {
            return new Array(relationSign.length).join('<span class="whitespace"></span>')
        },
        fetchData () {
            const _this = this
            request({
                data: { withDept: true },
                loading: true,
                mock: 'mock/json/example/noNestStructure.json'
            }, getStructuresList).then(function (data) {
                _this.dataProxy = treeDataProxy({
                    data: data.Data,
                    id: 'StruId',
                    parentId: 'ParentStruId',
                    rootValue: null,
                    relationSign: {
                        bros: '<span class="node node-bros"></span>',
                        brosAndFather: '<span class="node node-bros-father"></span>',
                        lastBros: '<span class="node node-last-bros"></span>',
                        lastBrosAndFather: '<span class="node node-last-bros-father"></span>',
                        brosParent: '<span class="node node-line"></span>',
                        lastBrosParent: '<span class="node node-blank"></span>'
                    }
                })
                _this.data = _this.dataProxy.get()
            })
        }
    },
    created () {
        this.fetchData()
    },
    beforeDestroy () {
        if (this.dataProxy) {
            this.dataProxy.destroy()
        }
    },
    components: {
        XTable
    }
}
</script>
<style>
.node {
    display: block;
    float: left;
    width: 20px;
    height: 30px;
    margin-top: 5px;
    background-repeat: no-repeat;
    background-position: center center;
}

.node-bros {
    background-image: url(../../../../static/images/example/node-bros.png);
}

.node-last-bros {
    background-image: url(../../../../static/images/example/node-last.png);
}

.node-bros-father {
    background-image: url(../../../../static/images/example/node-bros-child-collapse.png);
}

.node-last-bros-father {
    background-image: url(../../../../static/images/example/node-last-child-collapse.png);
}

.node-line {
    background-image: url(../../../../static/images/example/node-line-small.png)
}
</style>
