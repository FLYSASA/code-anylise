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
				<el-table-column prop="SupName" :label="$t('employee.SupName')" width="120" show-overflow-tooltip sortable>
					<template slot-scope="props">
						<a href="javascript:void(0)" @click="openViewDialog(props.row)">{{props.row.SupName}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="SupNo" :label="$t('employee.SupNo')" width="120" sortable show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="TaxPayerId" :label="$t('employee.TaxPayerId')" show-overflow-tooltip>
					<template slot-scope="props" >
								{{props.row.TaxPayerId === 1 ? '一般纳税人' : '小规模纳税人'}}
					</template> 
				</el-table-column>
				<el-table-column prop="EnterpriseForm" :label="$t('employee.EnterpriseForm')" show-overflow-tooltip>
					<template slot-scope="props" >
								{{props.row.EnterpriseForm === 1 ? '国营企业' : '民营企业'}}
					</template> 
				</el-table-column>
				<el-table-column prop="RegisteredCapital" :label="$t('employee.RegisteredCapital')" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="Remark" :label="$t('employee.Remark')" show-overflow-tooltip>
				</el-table-column>

				<el-table-column prop="RowIndex" :label="$t('rowIndex')" width="100">
				</el-table-column>
				<el-table-column :label="$t('handle')" fixed="right" width="100" v-if="permissions.Edit || permissions.Delete">
					<template slot-scope="props">   <!-- slot-cope="props" 的props即传入的:data="tableData" prop是props的某一项,用于定义展示内容-->
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

		<!-- 子组件展示 -->
		<component v-bind:is="currentView" v-model="visible" :option="option"></component>

		<import-employee v-model="importVisible" template-url="/Templates/Excel/Import/企业员工导入模板.xlsx" :title="$t('employee.importEmployeeTitle')" confirm-api="/api/plat/employees/import" @callback="loadData"></import-employee>

		<export-employee v-model="exportVisible" :title="$t('employee.exportEmployeeTitle')" export-url="/api/plat/employees/export"></export-employee>
	</div>
</template>

<script>
	import confirm from "@/components/sapi-confirm.js";
	import search from "@/components/sapi-search.vue";

	import employeeImport from "@/components/sapi-import.vue";
	import employeeExport from "@/components/sapi-export.vue";
	export default {

		components: {
			// "employee-add": (resolve) => {
			// 	require(['./add.vue'], resolve);   // 这个`require`语法会告诉webpack自动将构建代码切割成多个包,这些包会通过Ajax请求加载
			// },
			//简写:
			"employee-add": () => import('./add.vue'),  // 按需求加载
			"employee-edit": () => import('./edit.vue'),
			"employee-view": () => import('./view.vue'),
			
			"sapi-search": search,
			"import-employee": employeeImport,
			"export-employee": employeeExport
		},

		// 组合: 向选型里合并属性
		mixins: [getPagerMixin(), getTabMixin()],

		// 本地状态: 本地的响应式属性		
		data() {
			return {
				tableData: [],
				option: {},
				//控制子组件显隐
				currentView: "",   //初始为空即不渲染任何异步组件
				visible: false,
				importVisible: false,
				exportVisible: false,
				operateText: {
					edit: this.$t('edit'),
					delete: this.$t('delete')					
				}
				
			}
		},

		// 观察本地属性
		watch:{
			"params.provinceId"(val){
				if(!val&&this.citys.length>0){
					setTimeout(()=>{
						this.params.cityId=null;
						this.params.areaId=null;
						this.citys=[];
						this.areas=[];
					});
				}
			},
			"params.cityId"(val){
				if(!val&&this.areas.length>0){
					setTimeout(()=>{
						this.params.areaId=null;
						this.areas=[];
					});
				}
			}
		},		

		// 非响应式的属性
		methods: {
			loadData() {
				var params = this.params;
				this.$loadingOpen();
				this.$get("/api/plat/suppliers/", params, function(res) {
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
			openViewDialog(row, index) {
				this.currentView = "employee-view";  //请求渲染 employee-view 组件
				this.option = row;
				this.visible = true;
			},

			// 勾选项选择
			rowSelect(datas) {
				var _this = this;
				_this.deleteIds = [];
				if(datas.length > 0) {
					datas.forEach(function(data) {
						_this.deleteIds.push(data.SupId);
					});
				}
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
			// 每一行尾部删除
			deleteItem(row, index) {
				var _this = this;
				var deleteIds = [];
				deleteIds.push(row.SupId);
				this.deleteEmployees(
					"/api/plat/suppliers/",
					deleteIds,
					function(res) {
						_this.loadData();
					});
			},
			// 右上角勾选删除
			deleteItems() {
				var _this = this;
				this.deleteEmployees(
					"/api/plat/suppliers/",
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
			}
		},

		// 生命周期钩子: 按照被调用的顺序
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