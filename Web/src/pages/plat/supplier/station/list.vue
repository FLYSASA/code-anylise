<template>
	<div class="main">
		<div class="main-header main-header-offset-position">
			<div class="main-header-map"><span class="main-header-map-text"></span></div>
			<div class="main-header-search">
				<div class="func-btns">
					<sapi-search v-model="params.keyword" :placeholder="$t('station.search')" @on-search="loadData"></sapi-search>
					<span v-if="permissions.Add && option.StruType==1" class="icon-btn" @click="openAddDialog" :title="$t('add')"><i class="icon-build"></i></span>
					<span v-if="permissions.Delete" class="icon-btn" @click="deleteItems" :title="$t('delete')"><i class="icon-deleter"></i></span>
					<span v-if="permissions.Import" class="icon-btn" @click="importDialog" :title="$t('import')"><i class="icon-import"></i></span>
					<span v-if="permissions.Export" class="icon-btn" @click="exportDialog" :title="$t('export')"><i class="icon-export"></i></span>
					<span class="icon-btn icon-filter" :title="$t('filter')"></span>
				</div>
			</div>
		</div>

		<div class="main-table table-no-border width-p100">
			<el-table border :data="tableData" ref="bodyTable" @sort-change="sortChange" @selection-change="rowSelect" :height="maxBodyHeight">
				<el-table-column type="selection" width="45">
				</el-table-column>
				<el-table-column prop="StationName" :label="$t('station.stationName')" width="120" show-overflow-tooltip sortable>
					<template slot-scope="scope">
						<a href="javascript:void(0)" @click="openViewDialog(scope.row)">{{scope.row.StationName}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="StationNo" :label="$t('station.stationNo')" width="120" show-overflow-tooltip sortable>
				</el-table-column>
				<el-table-column prop="DeptName" :label="$t('station.corpOrDeptName')"  show-overflow-tooltip>
					<template slot-scope="scope">
						{{scope.row.CorpName+"/"+scope.row.DeptName}}
					</template>
				</el-table-column>
				<el-table-column prop="EmployeeName" :label="$t('station.employeeName')" width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="PositionName" :label="$t('station.positionName')" width="150" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="RowIndex" :label="$t('rowIndex')" width="90" show-overflow-tooltip sortable>
				</el-table-column>
				<el-table-column :label="$t('handle')" fixed="right" width="100" v-if="permissions.Edit || permissions.Delete">
					<template slot-scope="props">
                            <a v-if="permissions.Edit" class="table-btn" href="javascript:void(0)" @click.stop="openEditDialog(props.row,props.$index)" v-text="operateText.edit"></a>
                            <a v-if="permissions.Delete" class="table-btn" href="javascript:void(0)" @click.stop="deleteItem(props.row,props.$index)" v-text="operateText.delete"></a>
                    </template>
				</el-table-column>
			</el-table>

		</div>
		<div class="main-pager">
			<el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" :layout="layout" :total="pageTotal">
			</el-pagination>
		</div>
		<station-import v-model="importVisible" template-url="/Templates/Excel/Import/企业岗位导入模板.xlsx" :title="$t('station.importStationTitle')" confirm-api="/api/plat/stations/import" @callback="loadData">

		</station-import>

		<station-export v-model="exportVisible" :title="$t('station.exportStationTitle')" export-url="/api/plat/stations/export"></station-export>
		<station-filter @on-confirm="loadData">
			<!--ul-li为必须的-->
			<ul>
				<li>
					<span class="w-65" v-text="$t('station.selectionRange')"></span>
					<span class="right-auto-box">
						<el-checkbox prop="hasChildren" v-model="params.hasChildren"  :options="stationFilterOptions">{{$t('station.hasChildren')}}</el-checkbox>
					</span>
				</li>
			</ul>

		</station-filter>
		<component v-bind:is="currentView" v-model="visible" :option="childOption"></component>
	</div>
</template>

<script>
	import confirm from "@/components/sapi-confirm.js";
	import search from "@/components/sapi-search.vue";
	import filter from "@/components/sapi-filter.vue";

	import stationImport from "@/components/sapi-import.vue";
	import stationExport from "@/components/sapi-export.vue";

	export default {
		data() {
			return {
				childOption: {},
				tableData: [],
				deleteIds: [],
				currentView: "",
				visible: false,
				importVisible: false,
				exportVisible: false,
				params: {
					StruId: '',
					StruType: 0,
					hasChildren: false
				},
				operateText:{
					edit: this.$t("edit"),
					delete:this.$t("delete")
				},
				stationFilterOptions: "key:"+this.$t('station.hasChildren')+",value:true",
			}
		},
		props: ["option"],
		components: {
			"station-add": (resolve) => {
				require(['./add.vue'], resolve);
			},
			"station-edit": (resolve) => {
				require(['./edit.vue'], resolve);
			},
			"station-view": (resolve) => {
				require(['./view.vue'], resolve);
			},
			"station-import": stationImport,
			"station-export": stationExport,
			"station-filter": filter,
			"sapi-search": search
		},

		mixins: [getPagerMixin(), getTabMixin()],
		methods: {
			loadData() {
				var params = this.params;
				params.StruId = this.option.StruId;
				params.StruType = this.option.StruType;
				params.hasChildren = params.hasChildren || false;
				this.$loadingOpen();
				this.$get("/api/plat/stations/", params, function(res) {
					this.tableData = res.Rows;
					this.pageTotal = res.Total;
				});
			},
			openAddDialog() {
				this.currentView = "station-add";
				this.childOption = this.option;
				this.visible = true;
			},
			openEditDialog(row, index) {
				this.currentView = "station-edit";
				this.childOption = row;
				this.visible = true;
			},
			deleteStations(apiAddress, itemIds, successFunc) {
				if(itemIds.length == 0) {
					Vue.msg(this.$t("selectOneWhenDeleted"));
					return false;
				}

				this.$deleteTips(function() {
					this.$delete(apiAddress, JSON.stringify(itemIds), function(res) {
						successFunc(res);
						Vue.successMsg(this.$t("station.delStationSuccess"));
					});
				});
			},
			deleteItem(row, index) {
				var _this = this;
				var deleteIds = [];
				deleteIds.push(row.StationId);
				this.deleteStations(
					"/api/plat/stations/",
					deleteIds,
					function(res) {
						_this.loadData();
					});
			},
			deleteItems() {
				var _this = this;
				this.deleteStations(
					"/api/plat/stations/",
					_this.deleteIds,
					function(res) {
						_this.loadData();
					});
			},
			importDialog() {
				this.importVisible = true;
			},
			exportDialog() {
				this.exportVisible = true;
			},
			sortChange(obj) {
				this.params.sortName = obj.prop;
				this.params.sortType = obj.order;
				this.pageCurrentChange(1);
			},
			rowSelect(datas) {
				var _this = this;
				_this.deleteIds = [];
				if(datas.length > 0) {
					datas.forEach(function(data) {
						_this.deleteIds.push(data.StationId);
					});
				}
			},
			openViewDialog(row, index) {
				this.currentView = "station-view";
				this.childOption = row;
				this.visible = true;
			}
		},
		watch: {
			option(val) {
				this.loadData();
			}
		},
		created() {
			Vue.use(confirm);
			//pager改变时将要执行的函数，对该值进行初始化
			this.pageFunc = this.loadData;
			this.loadData();
			//初始化权限等
			this.$init();
		},
		mounted() {

		}
	}
</script>