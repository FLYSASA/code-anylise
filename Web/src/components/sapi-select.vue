<template>
	<div class="sapi-select" :class="{'readonly':readonly===''||readonly===true}">
		<div @click.stop="handleClick" class="input-wrap" :class="{'delete-icon':clearIconFlag,'delete-icon-extend': inInput}">
			<el-input readonly :placeholder="placeholderText" :value="input"></el-input>
			<i class="icon-arrow-down sapi-select-icon" :class="{'active':visible}"></i>
			<i class="icon-closer sapi-select-icon" @click.stop="clear" :class="{'active':visible}"></i>
		</div>
		<div class="sapi-select-box" :class="{active:visible}">
			<div class="sapi-select-box-wrap" @mouseover.stop="stopMounse()">
				<div class="sapi-select-box-wrap-input" @click="close" @mouseover="moveOver" @mouseout="mouseOut">
					<i v-if="clearIconFlag" class="sapi-select-box-wrap-input-icon" @click.stop="clear"></i>
				</div>
				<div class="sapi-select-box-list">
					<component :is="currentView" :showTip="true" v-if="isTree===true" :url="url" :params="params" :node-id="nodeId" :expanded-add-child="expandedAddChild" :get-select-node="getSelectNode" :data="datas" :props="treeProps" @on-click="treeClick"></component>
					<ul v-else>
						<li v-for="(item,index) in datas" :title="item[label]" v-text="item[label]" :class="{disabled:item[disable]===true,active:item.active}" @click.stop="nodeClick(item)"></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var timeout;
	import wheel from "@/components/sapi-wheel-event.js";
	import "@/static/css/sapi-select.css";
	/*import tree from "./sapi-tree.vue";*/
	import importLocale from "@/static/js/importLocale.js";
	import { main, sapi } from "@/components/locale-component.js";
	export default {
		data() {
			return {
				input: "",
				datas: [],
				visible: false,
				currentView: "",
				nodeId: null,
				changeFlag: false,
				label: "label",
				val: "value",
				disable: "",
				treeProps: {},
				isDefault: false,
				inInput: false
			}
		},
		computed: {
			clearIconFlag() {
				if(!this.input) {
					return false;
				}

				if(this.clearable === "" || this.clearable === true) {
					return true;
				}

				return false;
			},
			placeholderText() {
				if(this.readonly === '' || this.readonly === true) {
					return "";
				}

				return this.placeholder || this.$t('selectOne');
			}
		},
		props: ["value", "data", "props", "placeholder", "exceptId", "empty", "width", "height", "isTree", "expandOnClickNode", "readonly", "isAuto", "expandedAddChild", "url", "params", "clearable"],
		components: {
			"tree-nav": (resolve) => {
				require(['./sapi-tree.vue'], resolve);
			},
		},
		methods: {
			moveOver() {
				this.inInput = this.clearIconFlag;
			},
			mouseOut() {
				this.inInput = false;
			},
			clear(e) {
				this.inInput = false;
				this.input = "";
				this.$emit("input", null);
				this.$emit("clear");
				this.close();
			},
			handleClick(e) {
				if(this.readonly === '' || this.readonly === true) {
					return;
				}

				//无数据时进行无数据初始化
				if(!this.data || this.data.length === 0) {
					if(this.datas.length === 0) {
						var data = {};
						data[this.label] = this.$t('noData');
						data[this.val] = null;
						data[this.disable] = true;
						this.datas.push(data);
					}
				}

				//初始化展开第一级树
				if(this.isTree === true && (this.nodeId === null || this.nodeId === undefined) && this.isDefault === false) {
					setTimeout(() => {
						var li = this.$el.querySelector(".sapi-select-box-list .sapi-tree>ul>li");
						if(!li.querySelector(".tree-node-childs")) {
							return;
						}
						var dom = li.querySelector(".tree-node-icon");
						if(dom) {
							dom.click();
						}
					}, 50);
					this.isDefault = true;
				}

				this.visible = true;
				var dom = this.$el.querySelector(".sapi-select-box-wrap");
				var target = e.target;
				var parentNode;
				var offsetLeft = 0;
				var offsetWidth;
				if(target.className.indexOf("sapi-select-icon") > -1) {
					offsetLeft = target.offsetLeft;
					parentNode = target.parentNode;
					offsetWidth = parentNode.offsetWidth;
				}

				var clientY = e.clientY - (e.offsetY || e.layerY);
				var offsetHeight = target.offsetHeight;
				dom.style.left = (e.clientX - e.offsetX - offsetLeft) + "px";
				dom.style.top = clientY + "px";

				if(!this.width) {
					dom.style.width = (offsetWidth || target.offsetWidth) - 2 + "px";
				} else {
					dom.style.width = this.width;
					var vinput = dom.querySelector(".sapi-select-box-wrap-input");
					vinput.style.width = (parentNode ? parentNode.clientWidth : target.clientWidth) + "px";
				}

				var dialog = document.querySelector(".dialog.current-dialog>.dialog-box");
				var maxHeight;
				if(dialog) {
					var top = parseInt(dialog.style.top) || 0;
					var height = dialog.offsetHeight;
					maxHeight = height - (clientY - top) - offsetHeight - 10;
				} else {
					maxHeight = document.body.clientHeight - clientY - offsetHeight - 10;
				}

				var listDom = dom.querySelector(".sapi-select-box-list");
				if(this.height) {
					listDom.style.maxHeight = this.height;
				} else {
					listDom.style.maxHeight = maxHeight + "px";
				}
			},
			close() {
				this.visible = false;
			},
			//列表click
			nodeClick(item) {
				if(item[this.disable] === true) {
					return false;
				}

				var data = {};
				for(var key in item) {
					if(key !== "active") {
						data[key] = item[key];
					}
				}

				var datas = this.datas;
				for(var i = 0, ii = datas.length; i < ii; i++) {
					datas[i].active = false;
				}

				item.active = true;

				this.input = data[this.label];
				this.changeFlag = true;
				this.$emit("input", data[this.val]);
				this.$emit("change", data);
				this.close();
			},
			//树的click
			treeClick(data, target) {
				//禁止点击时
				if(data[this.disable] === true) {
					return false;
				}

				var childs = data[this.props.children];
				if(this.expandOnClickNode !== false && childs && childs.length > 0) {
					target.parentNode.querySelector(".tree-node-icon").click();
					return false;
				}

				var nodeId = data[this.val];
				if(this.exceptId && nodeId === this.exceptId) {
					Vue.errorMsg(this.$t('sapiSelect.currentNodeNotBeSelected'));
					return false;
				}

				var arrs = [];
				//是否是联动，如果是，返回当前对象和所有父辈对象(还没有完成。。。)
				/*if(this.isAuto === true) {
					arrs = this.getParents(target);
				}*/

				this.input = data[this.label];
				this.changeFlag = true;
				this.$emit("input", nodeId);
				this.$emit("change", data, arrs);
				this.close();
			},
			/*getParents(target) {
				var arrs = [];
				var child = this.treeProps.children;
				if(!child) {
					return arrs;
				}

				var parent = target.parentNode.parentNode;
				var parentIndexs = parent.getAttribute("data-parent-index");
				var index = parent.getAttribute("data-index");

				if(!parentIndexs) {
					arrs.push(this.datas[index])
					return arrs;
				}

				var indexs = parentIndexs.split(",");
				var datas = this.datas;

				var obj = datas[indexs[0]];
				arrs.push(obj);

				if(indexs.length > 1) {
					obj = obj[child];
					for(var i = 1, ii = indexs.length; i < ii; i++) {
						var data = obj[i];
						arrs.push(data);
						obj = obj[i][child];
					}
				} else {
					obj = obj[child];
				}
				arrs.push(obj[index]);
				return arrs;
			},*/
			initScroll() {
				var dom = this.$el.querySelector(".sapi-select-box-list");
				wheel.addEvent(dom, function(e) {
					e.preventDefault();
					if(e.delta < 0) {
						this.scrollTop = this.scrollTop + 72;
					} else {
						this.scrollTop = this.scrollTop - 72;
					}
				});
				dom = null;
			},
			initMounse() {
				var _this = this;
				setTimeout(function() {
					var dom = _this.$el.querySelector(".sapi-select-box");
					dom.addEventListener("mouseover", function(e) {
						clearTimeout(timeout);
						timeout = setTimeout(function() {
							_this.visible = false;
						}, 300);
					}, false);
					dom = null;
				}, 100);
			},
			stopMounse(e) {
				clearTimeout(timeout);
			},
			getSelectNode(item) {
				this.input = item[this.label];
				if(this.input === undefined) {
					this.input = "";
					this.$emit("matchFailure");
					return;
				}

				this.$emit("call-back", item);
			},
			init() {
				var datas = this.datas = this.data || [];
				var value = this.value;
				if(this.isTree !== true & datas.length > 0) {
					var label = this.label;
					var val = this.val;
					var flag = false;
					for(var i = 0, ii = datas.length; i < ii; i++) {
						if(value === datas[i][val]) {
							this.input = datas[i][label];
							datas[i].active = true;
							flag = true;
						} else {
							datas[i].active = false;
						}
					}
					if(flag === false && value!==null) {
						this.input = "";
						this.$emit("matchFailure");
					}
				} else {
					this.currentView = "tree-nav";
					this.isDefault = false;
				}
			}
		},
		created() {
			!Vue.toLocale && Vue.use(importLocale);
			let obj = Vue.extendLangs(main, sapi);
			Vue.toLocale(obj);
		},
		mounted() {
			var props = this.props || {};
			this.disable = props.disabled || "select-disabled";
			this.label = props.label || this.label;
			this.val = props.value || props.nodeKey || this.val;
			this.treeProps = {
				label: this.label,
				value: this.val,
				children: props.children,
				hasChild: props.hasChild
			}
			this.init();
			this.initMounse();
			this.initScroll();
		},
		watch: {
			data(val) {
				this.datas = val;
				if(this.value) {
					this.init();
				}
			},
			value(val) {
				this.nodeId = this.value;
				//$emit() 会触发这里更新，但是这里不想执行init
				if(this.changeFlag === false && this.data.length > 0) {
					this.init();
				} else {
					this.changeFlag = false;
				}

				if(val === undefined || val === null) {
					this.input = '';
				}
			}
		}
	}
</script>