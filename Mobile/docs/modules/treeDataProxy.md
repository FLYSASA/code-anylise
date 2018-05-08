## 树形数据代理（treeDataProxy.js）
### 目的
封装树形数据处理细节，提供代理操作接口和相关父子级属性。

* 一般用法

``` js
import treeDataProxy from 'src/static/js/treeDataProxy.js'

const data = [
    {ID:1, ParentID:0, Name:'1'}, 
    {ID:2, ParentID:0, Name:'2'}, 
    {ID:3, ParentID:1, Name:'1_1'}
]
const proxy = treeDataProxy({
    id:'ID', 
    parentId:'ParentID', 
    rootValue:0, 
    data:data,
    // 默认属性
    relationSign: {
        bros: '1', // 当前节点是非末节点且不含子集
        brosAndFather: '2', // 当前节点是非末节点且有子节点
        lastBros: '3', // 当前节点是最后一个兄弟节点且没有子节点
        lastBrosAndFather: '4', // 当前节点是最后一个兄弟节点且有含子节点
        brosParent: '5', // 当前节点父节点是非末节点
        lastBrosParent: '6' // 当前节点父节点是末节点
    }
})

// 返回的数据对象默认添加了$isLast（是否最后节点）/$prefixRelationChain（子节点的父级关系链）/$relationChain（节点关系链）/$hasChildren（是否有子集）属性
// 返回排序的数据 [{ID:1, ParentID:0, Name:'1',$isLast:false, $relationChain:'2', $hasChildren:true}, {ID:3, ParentID:1, Name:'1_1',$isLast:true, $relationChain:'53', $hasChildren:false},  {ID:2, ParentID:0, Name:'2', $isLast:true, $relationChain:'3', $hasChildren:false}]
var rows = proxy.get() 
 // 添加一个节点，返回排序的数据 支持addWay参数:front/foot，分别添加子集的开头和末尾
proxy.add({ID:4, ParentID: 1, Name:'1_2'})
proxy.delete(4) // 返回排序的数据
proxy.destroy() // 不用了销毁

```

* 自定义`relationSign`

``` js
import treeDataProxy from 'src/static/js/treeDataProxy.js'

const data = [
    {ID:1, ParentID:0, Name:'1'}, 
    {ID:2, ParentID:0, Name:'2'}, 
    {ID:3, ParentID:1, Name:'1_1'}
]
const proxy = treeDataProxy({
    id:'ID', 
    parentId:'ParentID', 
    rootValue:0, 
    data:data,
    // 自定义层级标识
    relationSign: {
        bros: '<span class="node node-bros"></span>',
        brosAndFather: '<span class="node node-bros-father"></span>',
        lastBros: '<span class="node node-last-bros"></span>',
        lastBrosAndFather: '<span class="node node-last-bros-father"></span>',
        brosParent: '<span class="node node-line"></span>',
        lastBrosParent: '<span class="node node-blank"></span>'
    }
})

var rows = proxy.get() 
// [
//  { ID:1, ParentID:0, Name:'1',$isLast:false, $relationChain:'<span class="node node-bros-father"></span>', $hasChildren:true},
//  {ID:3, ParentID:1, Name:'1_1',$isLast:true, $relationChain:'<span class="node node-line"></span><span class="node node-last-bros"></span>', $hasChildren:false},
//  {ID:2, ParentID:0, Name:'2', $isLast:true, $relationChain:'<span class="node node-last-bros"></span>', $hasChildren:false}
// ]
console.log(rows)
```

* 嵌套数据源

``` js
import api, {extend} from 'src/static/js/api.js'
import treeDataProxy from 'src/static/js/treeDataProxy.js'

const structure = {
    structure: {
        url: '/api/structures',
        type: constants.GET,
        data: {
            withDept: { paramType: constants.QUERY, type: Boolean }
        }
    }
}

extend(structure)

// 返回数据格式：[{
//  'StruId': '154e76906a4166ceec8d94d42d7abcdf',
//  'StruName': '中南集团',
//  'ParentStruId': null,
//  'IconPath': '',
//  'StruType': 0,
//  'ParentStruName': null,
//  'Children':[{
//       'StruId': '154e76782582f51cadf7e0c4457b1aa0',
//       'StruName': '房地产业集团',
//       'ParentStruId': '154e76906a4166ceec8d94d42d7abcdf',
//       'IconPath': '',
//       'StruType': 1,
//       'ParentStruName': '中南集团',
//       'Children':[...]
//   }]
// }]
var structures = null
api.structure({
    data: { withDept: true },
    loading: true
}).then(function (data) {
    if (data) {
        let rowId = 0
        dataProxy = treeDataProxy({
            data: data.Data,
            id: 'StruId',
            parentId: 'ParentStruId',
            rootValue: null,
            // 指定包含子集属性名称
            childrenIdName: 'Children',
            // 可自定义返回属性
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
        structures = dataProxy.get()
    }
})
```

* 返回嵌套数据

``` js
const data = [
    {ID:1, ParentID:0, Name:'1'}, 
    {ID:2, ParentID:0, Name:'2'}, 
    {ID:3, ParentID:1, Name:'1_1'}
]

const proxy = treeDataProxy({
    id:'ID', 
    parentId:'ParentID', 
    rootValue:0, 
    data:data
})

let rowId = 0
// 第一个参数为指定子集属性名称；第二个参数是返回的属性配置；第三个为过滤函数，可选，返回值为true表示符合条件保留，否则不返回
var result = proxy.getNest('Children', {
    NewID:'ID',
    NewParentID:'ParentID',
    NewName:'Name',
    // 定义其他属性
    RowID:function(node){
        rowId = rowId + 1
        return rowId
    }
}, function(node){
    return true
})
// [
//      { NewID:1, NewParentID:0, NewName:'1', RowID:1, Children:[{NewID:3, NewParentID:1, NewName:'1_1', RowID:2}] }, 
//      { NewID:2, NewParentID:0, NewName:'2', RowID:3, Children:[] }
// ]
console.log(result)
```