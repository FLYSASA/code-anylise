<template>
	<div class="left-side-tree">
		<sapi-tree ref="treeNav" :url="url" :noCache="true" :params="params" :data="treeData" :expanded-add-child="expandedAddChild" :get-select-node="activeNode" :render-content="renderContent" :render-node-click="renderNodeClick" :props="props" :node-id="nodeId" @on-click="treeNodeClick">
		</sapi-tree>
		<!--下拉选择框-->
		<div class="selector-wrapper" @click="selWrapperClick" v-show="hasOpeater">
			<div class="drop-down-selector">
				<p class="add-siblings" v-if="permissions.Add && showObj.AddSame!==false" @click="changeHandleType(1)">
					<img src="../static/images/add-same.png" />
					<span v-text="$t('addSiblingTitle')"></span>
				</p>
				<p class="add-children" v-if="permissions.Add  && showObj.AddChild!==false" @click="changeHandleType(2)">
					<img src="../static/images/add-next.png" />
					<span v-text="$t('addChildTitle')"></span>
				</p>
				<p class="edit-stru" v-if="permissions.Edit && showObj.Edit!==false" @click="changeHandleType(0)">
					<img src="../static/images/stru-edit.png" />
					<span v-text="$t('edit')"></span>
				</p>
				<p class="delete-stru" v-if="permissions.Delete && showObj.Delete!==false" @click="changeHandleType(3)">
					<img src="../static/images/stru-delete.png" />
					<span v-text="$t('delete')"></span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	/*import "@/static/css/fonts/iconfont.css";*/
	import tree from "@/components/sapi-tree.vue";
	import importLocale from "@/static/js/importLocale.js";
	import {main} from "./locale-component.js";
	export default {
		data() {
			return {
				item: {},
				permissions: {},
				showObj: {},
				isIE: false,
				hasOpeater:false,
				props: {}
			}
		},
		props: ["treeProp", "treeData", "nodeKey", "nodeId", "showController", "url", "params", "expandedAddChild"],
		components: {
			"sapi-tree": tree
		},
		methods: {
			activeNode(item) {
				this.item = item;
			},
			treeNodeClick(data) {
				this.$emit("on-click", data);
			},
			removeMousewheel(e) {
				e.preventDefault();
			},
			renderNodeClick(e, data) {
				var target = e.target;
				if(target.className.indexOf("add-btn-span") === -1) {
					return;
				}

				var bodyHeight = document.body.clientHeight - 160;

				//e.stopPropagation();
				var x = e.clientX - 52;
				var y = e.clientY + 26;

				var drop = this.$el.parentNode.querySelector(".drop-down-selector");
				if(drop) {
					var className = "";
					if(y > bodyHeight) {
						y -= 210;
						className = " upDropNode";
					}
					drop.parentNode.className = drop.parentNode.className + " active" + className;

					drop.style.left = x + "px";
					drop.style.top = y + "px";
				}

				if(this.isIE === true) {
					document.querySelector(".left-side").addEventListener("mousewheel", this.removeMousewheel, false)
				}

				this.$emit("action-click", data);
			},
			selWrapperClick() {
				if(this.isIE === true) {
					document.querySelector(".left-side").removeEventListener("mousewheel", this.removeMousewheel);
				}

				var target = this.$el.querySelector('.selector-wrapper');
				target.className = target.className.replace(/\s*?active|\s*?upDropNode/g, "");
			},
			changeHandleType(type) {
				this.$emit("change-handle", type);
			},
			renderContent(data) {
				var className = "";
				var iconType = data[this.treeProp.type];
				if(typeof iconType === "number") {
					if(iconType === 0) {
						className = "icon-company";
					} else {
						className = "icon-department";
					}
				}
				
				var opeaterClass=this.hasOpeater?"add-btn-span":"";

				return "<span class='"+opeaterClass+"'></span><i class='" + className + "'></i>" + data[this.treeProp.label];
			},
			getSelectNode() {
				return this.item;
			}
		},
		created() {
			!Vue.toLocale&&Vue.use(importLocale);
			Vue.toLocale(main);
			
			var props = this.treeProp || {};
			this.props = {
				label: props.label,
				value: props.value || props.nodeKey,
				children: props.children,
				hasChild: props.hasChild
			}
		},
		mounted() {
			this.permissions = this.$parent.permissions||{};
			this.hasOpeater=this.permissions.Add||this.permissions.Edit||this.permissions.Delete;

			if(typeof this.showController === "object") {
				this.showObj = this.showController;
			}

			if(!!window.ActiveXObject || "ActiveXObject" in window) {
				this.isIE = true;
			} else {
				this.isIE = false;
			}
		},
		watch: {
			showController(val, oldVal) {
					if(val) {
						this.showObj = val;
					} else {
						this.showObj = {};
					}
				}
		}
	}
</script>

<style>
	.left-side-tree {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-right: 1px solid #F2F2F2;
	}
	
	.selector-wrapper {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 9;
		left: 0;
		top: 0;
		display: none;
	}
	
	.selector-wrapper.active {
		display: block;
	}
	
	.drop-down-selector {
		width: 110px;
		height: auto;
		position: absolute;
		left: 50px;
		top: 350px;
		z-index: 10;
		background-color: #fff;
		padding: 6px;
		color: #4B5C64;
		font-size: 14px;
		box-shadow: 0 0 16px 5px #eee;
		border-radius: 6px;
	}
	
	.drop-down-selector:before {
		content: "";
		width: 0;
		height: 0;
		border: 6px;
		border-color: transparent transparent #fff transparent;
		border-style: dashed dashed solid dashed;
		position: absolute;
		top: -12px;
		left: 50%;
		margin-left: -6px;
	}
	
	.upDropNode>.drop-down-selector:before {
		display: none;
	}
	
	.upDropNode>.drop-down-selector:after {
		content: "";
		width: 0;
		height: 0;
		border: 6px;
		border-color: #fff transparent transparent transparent;
		border-style: dashed dashed solid dashed;
		position: absolute;
		bottom: -12px;
		left: 50%;
		margin-left: -6px;
	}
	
	.drop-down-selector>p {
		margin: 0;
		padding: 8px;
	}
	
	.drop-down-selector img {
		margin-right: 4px;
		vertical-align: top;
	}
	
	.drop-down-selector>p:hover {
		background-color: #f6f7f7;
		cursor: pointer;
	}
	
	p.add-children {
		border-bottom: 1px solid #F1F1F1;
		padding-bottom: 14px;
	}
	
	p.edit-stru {
		padding-top: 14px;
	}
	
	.tree-node-label:hover>.add-btn-span {
		display: block;
	}
	
	.add-btn-span {
		position: relative;
		display: none;
		float: right;
		width: 40px;
		height: 40px;
		background: url(../static/images/drop-down-trigger.png) 0 -2px;
		z-index: 1;
	}
	
	.left-side-tree .sapi-tree .tree-node-label>i {
		padding-right: 6px;
	}
	
	.tree-wrapper .el-tree-node__label {
		width: calc(100% - 30px);
	}
</style>