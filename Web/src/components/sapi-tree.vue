<template>
	<sapi-tree :data="data" :default-expand-all="defaultExpandAll" :__domId="__domId" @expanded-click="expandedClick" :expanded-fn="expandedAddChild||expandedFunc" :indent="indent" :showTip="showTip" :noCache="noCache" :get-select-node="getSelectNode" :render-content="renderContent" :render-node-click="renderNodeClick" :props="props" :node-id="nodeId" @node-click="handlerClick">
	</sapi-tree>
</template>

<script>
	import tree from "@/components/base/base-tree.vue";
	export default {
		data() {
			return {
				expandedFunc: null,
				param: {},
				paramId: "",
				__domId:null
			}
		},
		props: ["data", "indent", "defaultExpandAll", "renderContent", "getSelectNode", "renderNodeClick", "props", "nodeId", "expandedAddChild", "url", "params","noCache","showTip"],
		components: {
			"sapi-tree": tree
		},
		methods: {
			handlerClick(data, target) {
				//不使用emit的原因：这里需要返回值，如果使用emit的话，就返回不了值
				//this.$emit("on-click", data);
				var func = this.$listeners["on-click"];
				if(typeof func === "function") {
					return func.call(this.$parent, data, target);
				}
			},
			expandedClick(item, target, flag) {
				this.$emit("expanded-click", item, target, flag);
			},
			addChild(item, callback) {
				this.param[this.paramId] = item[this.props.value];

				this.$get(this.url, this.param, function(res) {
					if(!res) {
						return;
					}

					item[this.props.children] = res;
					if(typeof callback === "function") {
						callback();
					}
				});
			}
		},
		created() {
			if(this.url && this.props && this.props.hasChild) {
				this.expandedFunc = this.addChild;

				var option = this.params || {};
				var params = this.param;
				for(var key in option) {
					if(key === "nodeIdKey") {
						this.paramId = option[key];
					} else {
						params[key] = option[key];
					}
				}
			}
			this.__domId="tree-Id-"+Math.ceil(Math.random()*10000);
		}
	}
</script>