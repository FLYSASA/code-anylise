<template>
	<div class="tree-nav">
		<div class="tree-nav-filter" @keyup.enter="searchClick" v-if="hasSearch!==false">
			<el-input :placeholder="placeholder||$t('sapiTreeNav.placeholder')" v-model="filterText">
				<a slot="suffix" class="el-icon-search" @click="searchClick"></a>
			</el-input>
		</div>
		<div class="tree-nav-box">
			<div class="tree-nav-box-tree" v-show="!isSearch">
				<sapi-tree ref="treeNav" :url="url" :params="params" :data="data" :render-content="renderContent" :get-select-node="activeNode" :props="defaultProps" :node-id="nodeId" @on-click="treeNodeClick">
				</sapi-tree>
			</div>

			<div class="tree-nav-box-search" v-if="hasSearch!==false" v-show="isSearch">
				<ul>
					<li v-for="(item,index) in items" @click.stop="treeNodeClick(item)" :title="showText(item)" v-text="showText(item)" :class="{active:item.nodata}">
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import "@/static/css/tree-nav.css";
	import tree from "@/components/sapi-tree.vue";
	import importLocale from "@/static/js/importLocale.js";
	import {main,sapi} from "@/components/locale-component.js";
	export default {
		data() {
			return {
				filterText: "",
				isSearch: false,
				label: "",
				items: [],
				seletedArrs: [],
				item: {},
				defaultProps: {

				}
			}
		},
		components: {
			"sapi-tree": tree
		},
		props: ['data', 'props', 'nodeId', 'defaultExpandAll', 'hasSearch', "placeholder", "keyword", "searchRender", "url", "params"],
		methods: {
			activeNode(item) {
				this.item = item;
				this.$emit("call-back", item);
			},
			getSelectNode() {
				return this.item;
			},
			treeNodeClick(data, target) {
				if(data.nodata === true) {
					return;
				}
				//不使用emit的原因：这里需要返回值，如果使用emit的话，就返回不了值
				//this.$emit("on-click", data);
				var func = this.$listeners["on-click"];
				if(typeof func === "function") {
					return func.call(this.$parent, data, target);
				}
			},
			renderContent(data) {
				var text = data[this.defaultProps.label];
				var iconType = data["StruType"],
					iconHtml = "<i></i>",
					className;
				if(typeof iconType === "number") {
					if(iconType === 0) {
						className = "icon-company";
					} else {
						className = "icon-department";
					}
					iconHtml = "<i class='" + className + "'></i>";
				}

				return iconHtml + "<span title='" + text + "'>" + text + "</span>";
			},
			showText(item) {
				return(item.CorpName && item.StruType !== 0 ? (item.CorpName + " / ") : "") + item[this.label];
			},
			search() {
				if(!this.filterText || !this.filterText.trim()) {
					this.isSearch = false;
					return;
				}
				this.$get("/api/plat/structures/filters", {
					keyWord: this.filterText,
					withDept: true,
					topCount: 20
				}, function(res) {
					this.isSearch = true;
					if(!res || res.length === 0) {
						var obj = {};
						obj[this.label] = this.$t('noData');
						obj.nodata = true;
						this.items = [obj];
						return;
					}

					this.items = res;
					
				});

				/*this.isSearch = true;
				if(values.length > 0) {
					this.items = values;
				} else {
					var obj = {};
					obj[label] = "暂无数据";
					obj.nodata = true;
					this.items = [obj];
				}*/

			},
			searchClick() {
				if(typeof this.searchRender === "function") {
					this.searchRender.call(this.$parent);
				} else {
					this.search();
				}
			}
		},
		created() {
			!Vue.toLocale&&Vue.use(importLocale);
			let obj=Vue.extendLangs(main,sapi);
			Vue.toLocale(obj);
			this.defaultProps = this.props;
			this.label = this.defaultProps.label;
			this.defaultProps.value = this.props.value || this.props.nodeKey;
		},
		watch: {
			keyword(val) {
				//console.log(val)
				this.filterText = val;
				if(!val) {
					this.isSearch = false;
				}
			},
			filterText(val) {
				if(!this.keyword) {
					//this.$parent.keyword=val;
					this.$emit('update:keyword', val);
				}
			}
		}

	}
</script>

<style>
	.tree-nav .sapi-tree .tree-node-label>i {
		padding-right: 6px;
	}
</style>