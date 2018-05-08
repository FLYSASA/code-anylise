<template>
	<sapi-dialog width="1000px" top="12%" class="station-select-dialog" :has-max="false" v-model="visible" @on-close="close" @on-open="open">
		<span slot="title" v-text="$t('sapiStationMultiline.setStationTitle')"></span>
		<div class="station-set-box form-content">
			<div class="station-set-box-left">
				<tree-nav :url="url" :params="param" @call-back="callback" :node-id="id" ref="treeNav" :keyword.sync="keyword" :props="struProps" :data="treeData" @on-click="treeNodeClick"></tree-nav>
			</div>
			<div class="station-set-box-middle">
				<div class="station-set-box-map">
					<span class="float-left relative" :class="{'lg-width':mapText.length>3}" v-show="params.struName">
						<label class="station-set-box-map-text text-overflow" :title="params.struName" v-text="params.struName||''"></label>
						<label class="station-set-box-map-count" >
							：<font v-text="mapText" class="float-right"></font>
						</label>
					</span>
					<a class="float-right station-set-box-map-link" href="javascript:void(0)" @click.stop="checkedAll" v-show="allSelects&&tableData.length>0" v-text="$t('choiceAll')"></a>
				</div>
				<div class="station-set-box-table station-set-box-table-cursor table-no-border width-p100">
					<el-table :data="tableData" :highlight-current-row="true" @row-click="handleLeftRowClick" height="383">
						<el-table-column show-overflow-tooltip prop="StationName" :label="$t('sapiStationMultiline.stationName')">
						</el-table-column>
						<el-table-column width="95" prop="StationNo" :label="$t('sapiStationMultiline.stationNo')">
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="station-set-box-right">
				<div class="station-set-box-map">
					<span class="float-left" v-text="$t('sapiStationMultiline.selectedDesc',{stationCount:stationCount})"></span>
					<i class="float-right icon-deleter delete-btn-icon f-14" @click.stop="deleteItems" v-show="setTableData && setTableData.length"></i>
				</div>
				<div class="station-set-box-table station-set-box-table-delete table-no-border">
					<el-table :data="setTableData" ref="bodyTable" @selection-change="selectionChange" height="383">
						<el-table-column type="selection" width="45">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="StationName" :label="$t('sapiStationMultiline.stationName')">
						</el-table-column>
						<el-table-column width="95" prop="StationNo" :label="$t('sapiStationMultiline.stationNo')">
						</el-table-column>
						<el-table-column width="50">
							<template slot-scope="props">
								<span class="red-close-btn" @click.stop="deleteItem(props.row)"></span>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<div class="footer text-center">
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button size="small" class="blue-button" :disabled="disabled" @click="confirm" v-text="$t('determine')"></el-button>
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
				deleteIds: [],
				treeData: [],
				tableData: [],
				setTableData: [],
				visible: false,
				disabled: false,
				isInit: false,
				struProps: {
					children: 'Children',
					label: 'StruName',
					hasChild:"HasChild",
					value:"StruId"
				},
				mapText: "",
				stationCount: 0,
				params: {
					struId: "",
					struType: "",
					struName: "",
					pageSize: 1000000,
					pageIndex: 1
				},
				param:{
					"withDept": true,
					nodeIdKey: "parentStruId"
				},
				url:"/api/plat/structures/brief",
				treeId: "",
				id:null,
				allSelects: true,
				keyword: null
			}
		},
		props: ["value", "callBack", "nodeId", "node-datas", "baseUrl", "isRefresh"],
		methods: {
			getTreeData() {
				var baseUrl = this.baseUrl || "";
				var url = "/api/plat/structures/brief";
				if(this.treeId) {
					url = "/api/plat/structures/{struId}/parentAndSiblings";
				}
				this.$get(baseUrl + url, {
					"withDept": true,
					struId: this.treeId
				}, function(res) {
					this.treeData = res;
					this.isInit = true;
					this.init();
				});
			},
			getTableData() {
				var baseUrl = this.baseUrl || "";
				this.$get(baseUrl + "/api/plat/stations/", this.params, function(res) {
					this.tableData = res.Rows;
					this.mapText = "";
					this.mapText = this.$t('sapiStationMultiline.mapText',{total:res.Total});//res.Total + "个";
					this.allSelects = res.Total ? true : false;
				});
			},
			treeNodeClick(data) {
				this.params.struName = data.StruName;
				this.params.struId = data.StruId;
				this.params.struType = data.StruType;
				this.getTableData();
			},
			checkedAll() {
				if(this.tableData.length == 0) {
					return;
				}

				var datas = this.setTableData = this.setTableData.concat(this.tableData);
				var obj = {};
				for(var i = datas.length - 1, ii = 0; i >= ii; i--) {
					var id = datas[i].StationId;
					if(obj[id]) {
						datas.splice(i, 1);
					} else {
						obj[id] = true;
					}
				}

				this.stationCount = this.setTableData.length;
			},
			handleLeftRowClick(row) {
				var flag = true;
				var datas = this.setTableData;
				for(var i = 0, ii = datas.length; i < ii; i++) {
					var data = datas[i];
					if(data.StationId == row.StationId) {
						flag = false;
						break;
					}
				}

				if(flag) {
					datas.push(row);
					this.stationCount = datas.length;
				}
			},
			selectionChange(datas) {
				var _this = this;
				_this.deleteIds = [];
				if(datas.length > 0) {
					datas.forEach(function(data) {
						_this.deleteIds.push(data.StationId);
					});
				}
			},
			confirm() {
				//后面会除去callBack方法，使用事件型
				if(typeof this.callBack === "function") {
					this.callBack.call(this.$parent, this.setTableData);
				}
				
				this.$emit("call-back",this.setTableData);
				this.close();
			},
			deleteItem(row) {
				var datas = this.setTableData;
				for(var i = 0, ii = datas.length; i < ii; i++) {
					var data = datas[i];
					if(data.StationId == row.StationId) {
						datas.splice(i, 1);
						break;
					}
				}
				this.stationCount = datas.length;
			},
			deleteItems() {
				if(this.deleteIds.length == 0) {
					Vue.msg(this.$t('selectOneWhenDeleted'));
					return false;
				}
				var deleteIds = [].concat(this.deleteIds);
				var _this = this;
				var datas = this.setTableData;
				deleteIds.forEach(function(id, index) {
					for(var i = 0, ii = datas.length; i < ii; i++) {
						if(datas[i].StationId == id) {
							datas.splice(i, 1);
							_this.deleteIds.splice(index, 1);
							break;
						}
					}
				});
				this.stationCount = datas.length;
			},
			open() {
				this.keyword = "";
				this.isInit = false;
				this.init();
			},
			close() {
				this.$emit("input", false);
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
				//this.isRefresh 每次进来是否进行刷新树型
				if(this.isInit !== true && (this.isRefresh !== false || !this.treeData || this.treeData.length === 0)) {
					this.treeData = [];
					this.getTreeData();

					//this.isInit = false;
					return;
				}

				this.params.struName = "";
				this.params.struId = "";
				//this.getTreeNodeId();
				this.tableData = [];
				this.mapText = "";
				this.stationCount = 0;
				this.id = this.treeData[0].StruId;

				if(this.nodeDatas && this.nodeDatas.length > 0) {
					this.setTableData = [].concat(this.nodeDatas);
					this.stationCount = this.setTableData.length;
				} else {
					this.setTableData = [];
				}

				/*setTimeout(() => {
					//还原展开的树型
					var ul = this.$el.querySelector(".sapi-tree>ul");
					var lis = ul.querySelectorAll("li.tree-node-expanded");
					for(var i = 0, ii = lis.length; i < ii; i++) {
						lis[i].className = lis[i].className.replace(" tree-node-expanded", "");
					}
					lis = null;
					var trigger = ul.querySelector("li.tree-node .tree-node-label");
					trigger && trigger.click();
					var node = this.treeData[0];
					if(node && trigger) {
						this.params.struName = node.StruName;
						this.params.struId = node.StruId;
						this.params.struType = node.StruType;
						this.getTableData();
					}
					ul = null;
				}, 80);*/

			}
		},
		components: {
			"sapi-dialog": dialog,
			"tree-nav": treeNav
		},
		watch: {
			value(val) {
				this.visible = val;
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