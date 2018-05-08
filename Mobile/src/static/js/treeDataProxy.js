import utils from './utils.js'
const RelationSign = {
    bros: '1', // 当前节点是非末节点且不含子集
    brosAndFather: '2', // 当前节点是非末节点且有子节点
    lastBros: '3', // 当前节点是最后一个兄弟节点且没有子节点
    lastBrosAndFather: '4', // 当前节点是最后一个兄弟节点且有含子节点
    brosParent: '5', // 当前节点父节点是非末节点
    lastBrosParent: '6' // 当前节点父节点是末节点
}
/**
* 树形结构数据代理
* @method treeDataProxy
* @param options {object} 配置对象
*      @param options.id {string} 层级id字段名称
*      @param options.parentId {string} 层级parentId字段名称
*      @param options.data {array} 树形数据
*      @param options.rootValue {string|number|array} 指定跟值或者顶级节点的id值
*      @param options.childrenIdName {string|number} 指定子集存放在options.data中的名称，
*             存在该配置时初始化时会遍历子集
*      @param options.matchProps 指定对应的属性转换
*      @param options.onNodeCreated {function} 函数参数为node和parentNode，此时节点上存在$isLast/$prefixRelationChain/$relationChain/$hasChildren属性
*      @param options.sortRule {function} 排序规则，与数组的sort方法类似，不过这里传入的是两个node节点数据
*      @param options.relationSign 关系标识，默认是
            @param options.relationSign.bros = '1' 兄弟
            @param options.relationSign.brosAndFather= '2' 兄弟且是父亲
            @param options.relationSign.lastBros= '3' 最后一个兄弟
            @param options.relationSign.lastBrosAndFather = '4' 最后一个兄弟且是父亲
            @param options.relationSign.brosParent = '5' 当前节点父节点是非末节点
            @param options.relationSign.lastBrosParent = '6' 当前节点父节点是末节点
* @example
*  import treeDataProxy from './treeDataProxy.js'
*  const data = [{ID:1, ParentID:0, Name:'1'}, {ID:2, ParentID:0, Name:'2'}, {ID:3, ParentID:1, Name:'1_1'}]
*  const proxy = treeDataProxy({id:'ID', parentId:'ParentID', rootValue:0, data:data})
*  // 返回排序的数据 [{ID:1, ParentID:0, Name:'1'}, {ID:3, ParentID:1, Name:'1_1'},  {ID:2, ParentID:0, Name:'2'}]
*  // 返回的数据对象默认添加了$isLast（是否最后节点）/$prefixRelationChain（子节点的父级关系链）
        /$relationChain（节点关系链）/$hasChildren（是否有子集）属性 /$parentChain (父级id链，以","相隔)
*  var rows = proxy.get()
*  // 添加一个节点，返回排序的数据 支持addWay参数:front/foot，分别添加子集的开头和末尾
*  proxy.add({ID:4, ParentID: 1, Name:'1_2'})
*  proxy.delete(4) // 返回排序的数据
*  proxy.destroy() // 不用了销毁
*/
const treeDataProxy = function (options) {
    var proxy = {
        data: null,
        opts: null,
        idDD: {},
        parentDD: {},
        rows: [],
        init: function (opts) {
            if (!opts.hasOwnProperty('id') || !opts.hasOwnProperty('parentId') && !opts.hasOwnProperty('childrenIdName') ||
                !opts.hasOwnProperty('data') || !opts.hasOwnProperty('rootValue') && !opts.hasOwnProperty('childrenIdName') ||
                opts.hasOwnProperty('data') && !utils.isArray(opts.data)) {
                utils.warn('参数错误：缺少id、parentId、data、rootValue或者data属性非数组', options)
            }

            // 没有parentId的情况
            // 传多个父id情况
            const forEachData = function (target, datas, parentId) {
                for (var i = 0, len = datas.length; i < len; i++) {
                    var obj = {}
                    Object.keys(that.opts.matchProps).forEach(function (prop) {
                        obj[prop] = utils.isFunction(that.opts.matchProps[prop])
                            ? that.opts.matchProps[prop](datas[i]) : datas[i][that.opts.matchProps[prop]]
                    })

                    if (that.hasParentId) {
                        obj[that.opts.parentId] = arguments.length === 2 ? that.opts.rootValue : parentId
                    } else {
                        obj['$parentId'] = parentId || that.opts.rootValue
                    }

                    target.push(obj)

                    if (that.hasChildrens && datas[i][that.opts.childrenIdName] &&
                        datas[i][that.opts.childrenIdName].length > 0) {
                        forEachData(target, datas[i][that.opts.childrenIdName], datas[i][that.opts.matchProps[that.opts.id]])
                    }
                }
            }
            const that = this

            this.data = opts.data
            delete opts.data

            this.opts = opts
            this.opts.relationSign = Object.assign({}, RelationSign, opts.relationSign || {})
            this.hasChildrens = this.opts.hasOwnProperty('childrenIdName')
            this.hasParentId = this.opts.hasOwnProperty('parentId')
            this.isExistNodeCreatedFun = utils.isFunction(this.opts.onNodeCreated)
            this.isExistSortRule = utils.isFunction(this.opts.sortRule)

            if (this.hasChildrens && !this.hasParentId) {
                this.opts.rootValue = ''
            }

            if (this.opts.matchProps && utils.isPlainObject(this.opts.matchProps)) {
                var data = []
                forEachData(data, this.data)
                this.data = data
                this.hasChildrens = false
            } else {
                // 是否额外添加父id属性到node节点
                this.isAddParentId = this.hasChildrens && !this.hasParentId
            }
            this.forEachToDD(this.data)

            this.arrange()
        },
        getId: function (node) {
            return node[this.opts.id]
        },
        getParentId: function (node) {
            return node[this.hasParentId ? this.opts.parentId : '$parentId']
        },
        getParentNode: function (node) {
            return this.getNode(this.getParentId(node))
        },
        getNode: function (id) {
            return this.idDD.hasOwnProperty(id) ? this.idDD[id] : null
        },
        getChildren: function (parentId) {
            return this.parentDD.hasOwnProperty(parentId) ? this.parentDD[parentId] : null
        },
        addChildren: function (node, addWay) {
            const strategy = {
                'foot': function (parentId, node) {
                    this.parentDD[parentId].push(node)
                },
                'front': function (parentId, node) {
                    this.parentDD[parentId].splice(0, 0, node)
                }
            }
            const parentId = this.getParentId(node)

            if (!this.parentDD.hasOwnProperty(parentId)) {
                this.parentDD[parentId] = []
            }

            addWay = strategy[addWay] || strategy['foot']
            addWay.call(this, parentId, node)
        },
        isExistNode: function (node) {
            var nodeId
            if (utils.isPlainObject(node)) {
                this.validateNode(node)
                nodeId = this.getId(node)
            } else {
                nodeId = node
            }

            if (this.idDD.hasOwnProperty(nodeId)) {
                return true
            }

            return false
        },
        validateNode: function (node) {
            if (!utils.isPlainObject(node) || !node.hasOwnProperty(this.opts.id) ||
                !node.hasOwnProperty(this.opts.parentId)) {
                utils.warn('proxy.isExistNode() node参数错误', node)
            }

            return true
        },
        isExistChildren: function (parentId) {
            return this.parentDD.hasOwnProperty(parentId)
        },
        forEachToDD: function (nodes, parentNode) {
            var that = this
            nodes.forEach(function (node) {
                if (that.isAddParentId) {
                    node['$parentId'] = parentNode ? parentNode[that.opts.id] : that.opts.rootValue
                }
                that.addToDD(node)

                if (that.hasChildrens && utils.isArray(node[that.opts.childrenIdName])) {
                    that.forEachToDD(node[that.opts.childrenIdName], node)
                }
            })
        },
        addToDD: function (node, addWay) {
            var id = this.getId(node)
            // 已经存在跳过
            if (this.idDD.hasOwnProperty(id)) {
                return
            }

            this.idDD[id] = node
            this.addChildren(node, addWay)
        },
        /**
         * @param top {string|object} string表示从父节点为top的树形；object表示当前object为跟节点的树形
         *
         */
        arrange: function () {
            let tree = []
            const rows = []
            const rootValue = this.opts.rootValue

            if (!this.isExistChildren(rootValue)) {
                utils.warn(`arrange treeDataProxy不存在父节点为${top}的数据`)
            }

            tree = this.getChildren(rootValue)
            this.forEachChildren(tree, null, rows)

            this.rows = rows
            return this.rows
        },
        forEachChildren: function (nodes, parent, rows) {
            const that = this
            const len = nodes.length

            if (this.isExistSortRule) {
                nodes.sort(function (node1, node2) {
                    return that.opts.sortRule(node1, node2)
                })
            }

            nodes.forEach(function (node, i) {
                rows.push(node)
                node.$isLast = i === len - 1
                node.$prefixRelationChain = (parent && parent.$prefixRelationChain || '') +
                    ((node.$isLast) ? that.opts.relationSign.lastBrosParent : that.opts.relationSign.brosParent)
                node.$parentChain = (parent && (parent.$parentChain + ',') || '') + (parent && parent[that.opts.id] || '')

                if (that.isExistChildren(that.getId(node))) {
                    node.$relationChain = (parent && parent.$prefixRelationChain || '') +
                        ((node.$isLast) ? that.opts.relationSign.lastBrosAndFather : that.opts.relationSign.brosAndFather)

                    node.$hasChildren = true
                    that.forEachChildren(that.getChildren(that.getId(node)), node, rows)
                } else {
                    node.$hasChildren = false
                    node.$relationChain = (parent && parent.$prefixRelationChain || '') +
                        ((node.$isLast) ? that.opts.relationSign.lastBros : that.opts.relationSign.bros)
                }

                if (that.isExistNodeCreatedFun) {
                    that.opts.onNodeCreated(node, parent)
                }
            })
        },
        getNest: function (nestId, matchOpts, nestFilter) {
            const nest = []
            const tree = this.getChildren(this.opts.rootValue)
            nest[nestId] = []
            this.nestFilter = nestFilter
            this.forEachNest(tree, nestId, matchOpts, nest)

            return nest
        },
        forEachNest: function (tree, nestId, matchOpts, childrens) {
            const that = this
            const isFun = utils.isFunction(this.nestFilter)

            for (var i = 0, len = tree.length; i < len; i++) {
                let newObj = {}
                let node = tree[i]

                // 不符合过滤条件的不添加
                if (isFun && !this.nestFilter(node)) {
                    continue
                }

                if (utils.isPlainObject(matchOpts)) {
                    Object.keys(matchOpts).forEach(function (prop) {
                        newObj[prop] = utils.isFunction(matchOpts[prop]) ? matchOpts[prop](node) : node[matchOpts[prop]]
                    })
                } else {
                    Object.keys(node).forEacn(function (prop) {
                        newObj[prop] = node[prop]
                    })
                }
                newObj[nestId] = []

                if (that.isExistChildren(that.getId(node))) {
                    that.forEachNest(that.getChildren(that.getId(node)), nestId, matchOpts, newObj[nestId])
                }

                childrens.push(newObj)
            }
        },
        add: function (node, addWay) {
            this.validateNode(node)
            this.addToDD(node, addWay)
            return this.arrange()
        },
        delete: function (nodeId) {
            // 删除idDD、parentDD
            let node = null
            let parentId
            let children
            if (!this.isExistNode(nodeId)) {
                utils.warn(`delete ${nodeId}节点不存在`)
            }

            node = this.getNode(nodeId)
            parentId = this.getParentId(node)

            if (this.isExistChildren(parentId)) {
                children = this.getChildren(parentId)

                for (var i = 0, len = children.length; i < len; i++) {
                    if (this.getId(children[i]) === nodeId) {
                        children.splice(i, 1)
                        break
                    }
                }

                if (children.length === 0) {
                    delete this.parentDD[parentId]
                }
            }

            delete this.idDD[nodeId]
            return this.arrange()
        },
        destroy: function () {
            this.idDD = null
            this.parentDD = null
            this.data = null
            this.opts = null
            options = null
        }
    }

    proxy.init(options)

    return {
        get: function () {
            return proxy.rows
        },
        getNest: function (childrenIdName, matchOpts, nestFilter) {
            return proxy.getNest(childrenIdName, matchOpts, nestFilter)
        },
        /**
         * 访问proxy的属性方法，需慎用
         * @method prop
         * @param propName {string} 第一个参数是需要访问proxy树形名称
         * @param 剩余参数是调用proxy属性函数需要的参数
         * @example
         *      var proxy = treeDataProxy(options)
         *      proxy.prop('getParentNode', node) // 访问proxy对象的getParentNode方法
         */
        prop: function () {
            var propName = [].shift.call(arguments)
            if (!proxy.hasOwnProperty(propName)) {
                utils.warn(`treeDataProxy代理不存在${propName}属性`)
            }

            if (utils.isFunction(proxy[propName])) {
                return proxy[propName].apply(proxy, arguments)
            }

            return proxy[propName]
        },
        add: function (node, addWay) {
            return proxy.add(node, addWay)
        },
        delete: function (nodeId) {
            return proxy.delete(nodeId)
        },
        destroy: function () {
            proxy.destroy()
            proxy = null
        }
    }
}

export default treeDataProxy
