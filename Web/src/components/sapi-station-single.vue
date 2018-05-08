<template>
	<sapi-dialog width="995px" top="12%" class="station-select-dialog" :has-max="false" v-model="visible" @on-close="close" @on-open="open">
		<span slot="title" v-text="$t('sapiStationSingle.setStationTitle')"></span>
		<div class="station-set-box form-content">
			<div class="station-set-box-left single-station">
				<tree-nav ref="treeNav" :url="url" :node-id="id" @call-back="callback" :params="param" :keyword.sync="keyword" :props="struProps" :data="treeData" @on-click="treeNodeClick"></tree-nav>
			</div>
			<div class="station-set-box-middle single-station station-set-box-middle-right">
				<div class="station-set-box-map">
					<span class="float-left relative" :class="{'lg-width':mapText.length>3}" v-show="params.struName">
						<label class="station-set-box-map-text text-overflow" :title="params.struName" v-text="params.struName||''"></label>
						
						<label class="station-set-box-map-count" >
							：<font v-text="mapText" class="float-right"></font>
						</label>
					</span>
					<a class="float-right station-set-box-map-link" href="javascript:void(0)" @click.stop="cancelChecked" v-show="seleteTableRow" v-text="$t('cancelSelect')"></a>
				</div>
				<div class="station-set-box-table station-set-box-table-cursor table-no-border width-p100">
					<el-table ref="tableBody" :data="tableData" :highlight-current-row="true" @row-click="handleLeftRowClick" height="383">
						<el-table-column show-overflow-tooltip prop="StationName" :label="$t('sapiStationSingle.stationName')">
						</el-table-column>
						<el-table-column prop="StationNo" :label="$t('sapiStationSingle.stationNo')">
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<div class="footer text-center">
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button size="small" class="default-button" v-if="hasClear===true" @click="confirm(0)" v-text="$t('empty')"></el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="confirm" v-text="$t('determine')"></el-button>
		</div>
	</sapi-dialog>

</template>

<script>
	import dialog from "@/components/sapi-dialog.vue";
	import treeNav from "./sapi-tree-nav.vue";
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
					pageSize: 100000,
					pageIndex: 1
				},
				treeId: "",
				keyword: ""
			}
		},
		props: ["value", "callBack", "nodeId", "nodeData", "hasClear", "isRefresh"],
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
					this.isInit = true;
					this.init();
				});
			},
			getTreeNodeId() {
				var _this = this;

				function forEachNode(node) {
					/*var childs = node.Children;
					if(childs && childs.length > 0) {
						forEachNode(childs[0]);
					} else {*/
					_this.treeId = node.StruId;
					//}
				}

				forEachNode(this.treeData[0]);
			},
			getTableData() {
				this.seleteTableRow = null;
				this.$loadingOpen();
				this.$get("/api/plat/stations/", this.params, function(res) {
					this.tableData = res.Rows;
					this.mapText = "";
					this.mapText = this.$t('sapiStationSingle.mapText',{total:res.Total});;//res.Total + "个";
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
			},
			callback(node) {
				this.params.struName = node.StruName;
				this.params.struId = node.StruId;
				this.params.struType = node.StruType;
				this.getTableData();
				var iconNode = this.$el.querySelector(".sapi-tree>ul>li:not(.tree-node-no-child)>.tree-node-text.active>.tree-node-icon");
				if(iconNode) {
					iconNode.click();
				}
			},
			init() {
				if(this.isInit !== true && (this.isRefresh !== false || !this.treeData || this.treeData.length === 0)) {
					this.treeData = [];
					this.getTreeData();

					//this.isInit = false;
					return;
				}

				this.params.struName = "";
				/*this.getTreeNodeId();*/
				this.tableData = [];
				this.mapText = "";

				this.seleteTableRow = this.nodeData;
				this.id = this.treeData[0].StruId;
			}
		},
		components: {
			"sapi-dialog": dialog,
			"tree-nav": treeNav
		},
		watch: {
			value(val) {
				this.visible = val;
				if(val === true) {
					this.getTreeData();
				}
			}
		},
		created() {
			!Vue.toLocale&&Vue.use(importLocale);
			let obj=Vue.extendLangs(main,sapi);
			Vue.toLocale(obj);
			this.visible = this.value;
		}
	}
</script>
<style>
	.station-set-box-middle-right {
		float: right;
	}
	/*.station-set-box-left .sapi-tree .tree-node-text.active{
		background-color: #63c4ff;
		color: #fff;
	}
	.station-set-box-left .sapi-tree .tree-node-text:hover{
		background-color: #63c4ff;
		color: #fff;
	}*/
	
	.station-set-box-left .sapi-tree .tree-node-label>i {
		padding-right: 6px;
	}
</style>