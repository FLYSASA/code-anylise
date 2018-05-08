<template>
	<sapi-dialog width="995px" top="12%" class="station-select-dialog user-select-dialog" :has-max="false" v-model="visible" @on-close="close" @on-open="open">
		<span slot="title" v-text="$t('sapiStationUserSingle.setStationTitle')"></span>
		<div class="station-set-box form-content" :class="{'search-active':activeSearch}">
			<div class="station-set-box-left single-station">
				<tree-nav ref="treeNav" :url="url" :params="param" @call-back="callback" :node-id="id" :has-search="false" node-key="StruId" :props="struProps" :data="treeData" @on-click="treeNodeClick"></tree-nav>
			</div>
			<div class="station-set-box-middle single-station station-set-box-middle-right" :class="{'pager-hide':totalIndex<=1}">
				<div class="station-set-box-map relative" @keyup.enter="getTableData">
					<el-input :placeholder="$t('sapiStationUserSingle.search')" icon="search" v-model="params.keyword" :on-icon-click="getTableData"></el-input>
				</div>
				<div class="station-set-box-table station-set-box-table-cursor table-no-border width-p100">
					<el-table ref="tableBody" :data="tableData" :highlight-current-row="true" @row-click="handleLeftRowClick" :height="tableHeight">
						<el-table-column show-overflow-tooltip prop="AliasName" :width="130" :label="$t('sapiStationUserSingle.aliasName')">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="StationName" :label="$t('sapiStationUserSingle.stationName')">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="CorpName" :label="$t('sapiStationUserSingle.corpName')">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="DeptName" :label="$t('sapiStationUserSingle.deptName')">
						</el-table-column>
					</el-table>
				</div>
				<div class="pagination-left">
					<el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" :layout="layout" :total="pageTotal">
					</el-pagination>
				</div>
			</div>
		</div>
		<div class="footer text-center">
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button size="small" class="default-button" v-if="hasClear===true" @click="confirm(0)" v-text="$t('emptySelect')"></el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="confirm" v-text="$t('determine')"></el-button>
		</div>
	</sapi-dialog>

</template>

<script>
	import dialog from "@/components/sapi-dialog.vue";
	import treeNav from "@/components/sapi-tree-nav.vue";
	import "@/static/css/station.css";
	import importLocale from "@/static/js/importLocale.js";
	import {main,sapi} from "@/components/locale-component.js";
	export default {
		data() {
			return {
				id: null,
				treeData: [],
				tableData: [],
				seleteTableRow: null,
				visible: false,
				disabled: false,
				isInit: false,
				struProps: {
					children: 'Children',
					label: 'StruName',
					hasChild: "HasChild",
					value: "StruId"
				},
				param: {
					"withDept": true,
					nodeIdKey: "parentStruId"
				},
				url: "/api/plat/structures/brief",
				mapText: "",
				params: {
					struId: "",
					struType: "",
					struName: "",
					hasChildren: true,
					pageSize: 10,
					pageIndex: 1
				},
				treeId: "",
				keyword: "",
				totalIndex: 1,
				tableHeight: 385,
				activeSearch: false
			}
		},
		props: ["value", "callBack", "nodeId", "nodeData", "hasClear", "isRefresh"],
		mixins: [getPagerMixin()],
		methods: {
			getTreeData() {
				var url = "/api/plat/structures/brief";
				if(this.treeId) {
					url = "/api/plat/structures/{struId}/parentAndSiblings";
				}
				this.$get(url, {
					"withDept": true,
					struId: this.treeId
				}, function(res) {
					this.treeData = res;
					if(this.treeData.length === 0) {
						return;
					}
					this.isInit = true;
					this.init();
				});
			},
			getTableData() {
				this.seleteTableRow = null;
				this.$loadingOpen();
				this.activeSearch = (this.params.keyword || "").trim() ? true : false;
				var url = "/api/plat/shares/" + this.params.struId + "/stations";
				if(this.activeSearch === true) {
					url = "/api/plat/shares/stations";
				}

				this.$get(url, this.params, function(res) {
					this.tableData = res.Rows;
					this.pageTotal = res.Total;
					this.totalIndex = res.Total / this.params.pageSize;
				});
			},
			treeNodeClick(data) {
				/*if(data.Children && data.Children.length > 0) {
					return;
				}*/

				this.params.struName = data.StruName;
				this.params.struId = data.StruId;
				this.params.struType = data.StruType;
				this.getTableData();
			},
			cancelChecked() {
				this.$refs.tableBody.setCurrentRow();
				this.seleteTableRow = null;
			},
			handleLeftRowClick(row) {
				this.seleteTableRow = row;
			},
			confirm(index) {
				if(!this.seleteTableRow) {
					if(index === 0) {
						if(typeof this.callBack === "function") {
							this.callBack.call(this.$parent, {});
						}
						this.$emit("call-back",{});
						this.close();
						return;
					}

					Vue.msg(this.$t('selectOneWhenDetermined'));
					return;
				}

				//后面会除去callBack方法，使用事件型
				if(typeof this.callBack === "function") {
					this.seleteTableRow && this.callBack.call(this.$parent, this.seleteTableRow);
				}
				this.$emit("call-back",this.seleteTableRow);
				this.close();
			},
			close() {
				this.$emit("input", false);
			},
			open() {
				this.keyword = null;
				this.seleteTableRow = null;
				this.isInit = false;
				this.init();
				/*setTimeout(() => {
					var trigger=this.$el.querySelector(".sapi-tree>ul>li.tree-node .tree-node-label");
					trigger&&trigger.click();
				}, 20)*/
			},
			callback(node) {
				this.params.struName = node.StruName;
				this.params.struId = node.StruId;
				this.params.struType = node.StruType;
				this.getTableData();
				if(node.StruId === this.treeData[0].StruId) {
					var iconNode = this.$el.querySelector(".sapi-tree>ul>li:not(.tree-node-no-child)>.tree-node-text.active>.tree-node-icon");
					if(iconNode) {
						iconNode.click();
					}
				}
			},
			init() {
				if(this.isInit !== true && (this.isRefresh !== false || !this.treeData || this.treeData.length === 0)) {
					this.treeData = [];
					this.getTreeData();
					return;
				}

				var nodeId = JSON.parse(sessionStorage["basicInfo"]).CorpId;

				this.id = nodeId || this.treeData[0].StruId;
				this.params.struName = "";
				this.params.keyword = "";
				this.activeSearch = false;
				/*this.getTreeNodeId();*/
				this.tableData = [];
				this.mapText = "";
				//this.id = this.nodeId;
				this.seleteTableRow = this.nodeData;

				/*this.$nextTick(function() {
					setTimeout(() => {
						if(!this.id) {
							//还原展开的树型
							var ul = this.$el.querySelector(".sapi-tree>ul");
							if(!ul){
								return;
							}
							var lis = ul.querySelectorAll("li.tree-node-expanded");
							for(var i = 0, ii = lis.length; i < ii; i++) {
								lis[i].className = lis[i].className.replace(" tree-node-expanded", "");
							}
							lis = null;
							var trigger = ul.querySelector("li.tree-node .tree-node-icon");
							trigger && trigger.click();
							var node = this.treeData[0];
							if(node) {
								this.callback(node);
							}
						}
					}, 50);
				});*/

			}
		},
		components: {
			"sapi-dialog": dialog,
			"tree-nav": treeNav
		},
		watch: {
			value(val) {
				this.visible = val;
			},
			totalIndex(val) {
				if(val > 1) {
					this.tableHeight = 348;
				} else {
					this.tableHeight = 385;
				}
			}
		},
		created() {
			!Vue.toLocale&&Vue.use(importLocale);
			let obj=Vue.extendLangs(main,sapi);
			Vue.toLocale(obj);
			this.visible = this.value;
			//pager改变时将要执行的函数，对该值进行初始化
			this.pageFunc = this.getTableData;
			//初始化权限等
			this.$init();
		}
	}
</script>
<style>
	.station-set-box-middle-right {
		float: right;
	}
	
	.station-set-box-left .sapi-tree .tree-node-label>i {
		padding-right: 6px;
	}
	
	.user-select-dialog .pagination-left {
		clear: both;
		margin-top: 5px;
		text-align: left;
		overflow: hidden;
	}
	
	.user-select-dialog .pager-hide .pagination-left {
		display: none;
	}
	
	.user-select-dialog .search-active .station-set-box-left {
		display: none;
	}
	
	.user-select-dialog .search-active .station-set-box-middle {
		width: 100%;
		margin-left: 0;
	}
</style>