<template>
	<div class="main">
		<div class="main-header">
			<div class="main-header-map"><span class="main-header-map-text"></span></div>
			<div class="main-header-search">
				<div class="func-btns">
					<sapi-search v-model="params.keyword" :placeholder="$t('employee.search')" @on-search="loadData"></sapi-search>
					<span v-if="permissions.Add" class="icon-btn" @click="openAddDialog" :title="$t('add')"><i class="icon-build"></i></span>
					<span v-if="permissions.Delete" class="icon-btn" @click="deleteItems" :title="$t('delete')"><i class="icon-deleter"></i></span>
					<span v-if="permissions.Import" class="icon-btn" @click="importDialog" :title="$t('import')"><i class="icon-import"></i></span>
					<span v-if="permissions.Export" class="icon-btn" @click="exportDialog" :title="$t('export')"><i class="icon-export"></i></span>
				</div>
			</div>
		</div>

		<div class="main-table table-no-border width-p100">
			<el-table border :data="tableData" ref="bodyTable" @sort-change="sortChange" @selection-change="rowSelect" :height="maxBodyHeight">
				<el-table-column v-if="permissions.Delete" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="EmployeeName" :label="$t('employee.employeeName')" width="120" show-overflow-tooltip sortable>
					<template slot-scope="props">
						<a href="javascript:void(0)" @click="openViewDialog(props.row)">{{props.row.EmployeeName}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="EmployeeNo" :label="$t('employee.employeeNo')" width="120" sortable show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="UserName" :label="$t('employee.userName')" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="DefaultStationName" :label="$t('employee.defaultStationName')" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="PositionName" :label="$t('employee.positionName')" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="CorpName" :label="$t('employee.corpName')" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="DeptName" :label="$t('employee.deptName')" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="RowIndex" :label="$t('rowIndex')" width="100">
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

		<component v-bind:is="currentView" v-model="visible" :option="option"></component>

		<import-employee v-model="importVisible" template-url="/Templates/Excel/Import/企业员工导入模板.xlsx" :title="$t('employee.importEmployeeTitle')" confirm-api="/api/plat/employees/import" @callback="loadData">
		</import-employee>

		<export-employee v-model="exportVisible" :title="$t('employee.exportEmployeeTitle')" export-url="/api/plat/employees/export"></export-employee>
	</div>
</template>

<script>
	import confirm from "@/components/sapi-confirm.js";
	import search from "@/components/sapi-search.vue";

	import employeeImport from "@/components/sapi-import.vue";
	import employeeExport from "@/components/sapi-export.vue";
	export default {
		data() {
			return {
				tableData: [],
				deleteIds: [],
				option: {},
				viewOption: {},
				addOption: {},
				currentView: "",
				visible: false,
				importVisible: false,
				exportVisible: false,
				operateText: {
					edit: this.$t('edit'),
					delete: this.$t('delete')					
				}
				
			}
		},
		components: {
			"employee-add": (resolve) => {
				require(['./add.vue'], resolve);
			},
			"employee-edit": (resolve) => {
				require(['./edit.vue'], resolve);
			},
			"employee-view": (resolve) => {
				require(['./view.vue'], resolve);
			},
			"sapi-search": search,
			"import-employee": employeeImport,
			"export-employee": employeeExport
		},
		mixins: [getPagerMixin(), getTabMixin()],
		methods: {
			loadData() {
				var params = this.params;
				this.$loadingOpen();
				this.$get("/api/plat/employees/", params, function(res) {
					this.tableData = res.Rows;
					this.pageTotal = res.Total;
				});
			},
			openAddDialog() {
				this.currentView = "employee-add";
				this.visible = true;
			},
			openEditDialog(row, index) {
				this.currentView = "employee-edit";
				this.option = row;
				this.visible = true;
			},
			deleteEmployees(apiAddress, itemIds, successFunc) {
				if(itemIds.length == 0) {
					Vue.msg(this.$t("selectOneWhenDeleted"));
					return false;
				}

				this.$deleteTips(function() {
					this.$delete(apiAddress, JSON.stringify(itemIds), function(res) {
						successFunc(res);
						Vue.successMsg(this.$t("employee.delEmployeeSuccess"));
					});
				});
			},
			deleteItem(row, index) {
				var _this = this;
				var deleteIds = [];
				deleteIds.push(row.EmployeeId);
				this.deleteEmployees(
					"/api/plat/employees/",
					deleteIds,
					function(res) {
						_this.loadData();
					});
			},
			deleteItems() {
				var _this = this;
				this.deleteEmployees(
					"/api/plat/employees/",
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
						_this.deleteIds.push(data.EmployeeId);
					});
				}
			},
			openViewDialog(row, index) {
				this.currentView = "employee-view";
				this.option = row;
				this.visible = true;
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