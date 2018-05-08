<template>
	<div class="main">
		<div class="main-header">
			<!--有描述需要添加 main-header-map-extend-->
			<div class="main-header-map main-header-map-extend">
				<!--前面图标，没有图标时需要调整 main-header-map-description的宽度-->
				<!--<span class="icon-msg main-header-map-extend-icon"></span>-->
				<span class="main-header-map-text"></span>
				<!--多行时使用more-dsc-->
				<!--点击main-header-map-description-icon时，添加active-->
				<span class="main-header-map-description">
					<!--多行时需要有收缩图标-->
					<!--<i class="icon-single-slidedown main-header-map-description-icon"></i>-->
					<span v-if="authUserCount==0">{{$t("user.desc.0")}}<font color="red">{{$t("user.desc.1",{count:validUserCount})}}</font>{{$t("user.desc.2")}}</span>
					<span v-else>{{$t("user.desc.3")}}<font color="red">{{$t("user.desc.4",{authUserCount:authUserCount})}}</font>{{$t("user.desc.5")}}<font color="red">{{$t("user.desc.6",{validUserCount:validUserCount})}}</font>{{$t("user.desc.7")}}</span>
				
				</span>
			</div>
			<div class="main-header-search">
				<div class="func-btns">
					<sapi-search v-model="params.keyword" :placeholder="$t('user.search')" @on-search="loadData"></sapi-search>
					<span v-if="permissions.Add" class="icon-btn" @click="openAddDialog" :title="$t('add')"><i class="icon-build"></i></span>
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
				<el-table-column prop="UserName" :label="$t('user.userName')" width="120" show-overflow-tooltip sortable>
					<template slot-scope="scope">
						<a href="javascript:void(0)" @click="openViewDialog(scope.row)">{{scope.row.UserName}}</a>
					</template>
				</el-table-column>
				<el-table-column v-if="false" prop="UserType" :label="$t('user.userType')" width="100" sortable>
					<template slot-scope="scope">
						<span v-if="scope.row.UserType==2" v-text="userType.employee"></span>
						<span v-if="scope.row.UserType==3" v-text="userType.other"></span>
					</template>
				</el-table-column>
				<el-table-column prop="AliasName" :label="$t('user.aliasName')" width="150" show-overflow-tooltip sortable>
					<template slot-scope="scope">
						<a v-if="scope.row.UserType==2 && scope.row.UsedById" href="javascript:void(0)" @click="openViewEmployeeDialog(scope.row)">{{scope.row.AliasName}}</a>
						<span v-else>{{scope.row.AliasName}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="Enabled" :label="$t('user.enabled')" width="100" sortable>
					<template slot-scope="scope">
						<span v-if="scope.row.Enabled" v-text="enabledText.isTrue"></span>
						<span v-else v-text="enabledText.isFalse"></span>
					</template>
				</el-table-column>
				<el-table-column prop="UsedByDefaultStationName" :label="$t('user.usedByDefaultStationName')" width="200" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="UsedByCorpName" :label="$t('user.usedByCorpName')" min-width="200" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="UsedByDeptName" :label="$t('user.usedByDeptName')" width="150" show-overflow-tooltip>
				</el-table-column>

				<el-table-column :label="$t('handle')" fixed="right" width="170" v-if="permissions.Edit || permissions.Reset || permissions.Delete">
					<template slot-scope="props">
						<a v-if="permissions.Edit" class="table-btn" href="javascript:void(0)" @click.stop="openEditDialog(props.row,props.$index)" v-text="operateText.edit"></a>
						<a v-if="permissions.Reset" class="table-btn" href="javascript:void(0)" @click.stop="resetPwd(props.row,props.$index)" v-text="operateText.resetPW"></a>
						<a v-if="permissions.Delete" class="table-btn" href="javascript:void(0)" @click.stop="deleteItem(props.row,props.$index)" v-text="operateText.delete"></a>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="main-pager">
			<el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" :layout="layout" :total="pageTotal">
			</el-pagination>
		</div>

		<user-import v-model="importVisible" template-url="/Templates/Excel/Import/系统用户导入模板.xlsx" :title="$t('user.importUserTitle')" confirm-api="/api/plat/users/import" @callback="loadData">
		</user-import>
		<user-export v-model="exportVisible" :title="$t('user.exportUserTitle')" export-url="/api/plat/users/export">
		</user-export>

		<component v-bind:is="currentView" v-model="visible" :option="option"></component>

		<user-filter @on-confirm="loadData" :is-init="true">
			<ul>
				<li>
					<span class="w-65">{{$t('user.userType')}}</span>
					<span class="right-auto-box">
						<el-select v-model="params.userType" prop="userType" options="data:userTypeOptions,key:label" :placeholder="$t('selectOne')">
						    <el-option
						      v-for="item in userTypeOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
							</el-option>
						</el-select>
					</span>
				</li>
			</ul>
			<ul>
				<li>
					<span class="w-65">{{$t('user.userStatus')}}</span>
					<span class="right-auto-box">
						<el-select v-model="params.isEnabled" prop="isEnabled" options="data:userStatusOptions,key:label" :placeholder="$t('selectOne')">
						    <el-option
						      v-for="item in userStatusOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
							</el-option>
						</el-select>
					</span>
				</li>
			</ul>
		</user-filter>

	</div>
</template>

<script>
	import confirm from "@/components/sapi-confirm.js";
	import search from "@/components/sapi-search.vue";
	import filter from "@/components/sapi-filter.vue";
	import userImport from "@/components/sapi-import.vue";
	import userExport from "@/components/sapi-export.vue";

	export default {
		data() {
			return {
				tableData: [],
				deleteIds: [],
				option: {},
				isGetAll: true,
				maxCount: globalConfig.maxExportNumber,
				currentView: "",
				visible: false,
				importVisible: false,
				exportVisible: false,
				params: {
					userType: "",
					isEnabled: ""
				},
				userTypeOptions: [
					{
						label: this.$t("selectAll"),
						value: ""
					},
					{
						label: this.$t("user.userTypeData.employee"),
						value: 2
					},
					{
						label: this.$t("user.userTypeData.other"),
						value: 3
					}
				],
				userStatusOptions: [
					{
						label: this.$t("selectAll"),
						value: ""
					},
					{
						label: this.$t("user.userStatusData.enabled"),
						value: true
					},
					{
						label: this.$t("user.userStatusData.disabled"),
						value: false
					},
				],
				authUserCount: 0, //授权用户数
				validUserCount: 0, //有效用户数,
				operateText:{
					edit: this.$t("edit"),
					resetPW:this.$t("user.resetPw"),
					delete:this.$t("delete")
				},
				enabledText:{
					isTrue:this.$t("user.enabledData.isTrue"),
					isFalse:this.$t("user.enabledData.isFalse")
				},
				userType:{
					employee:this.$t("user.userTypeData.employee"),
					other:this.$t("user.userTypeData.other")
				}
			}
		},
		components: {
			"user-add": (resolve) => {
				require(['./add.vue'], resolve);
			},
			"user-edit": (resolve) => {
				require(['./edit.vue'], resolve);
			},
			"user-view": (resolve) => {
				require(['./view.vue'], resolve);
			},
			"employee-view": (resolve) => {
				require(['../employee/view.vue'], resolve);
			},
			"user-filter": filter,
			"sapi-search": search,
			"user-import": userImport,
			"user-export": userExport
		},
		mixins: [getPagerMixin(), getTabMixin()],
		methods: {
			loadData() {
				this.getUserCount();
				var params = this.params;
				this.$loadingOpen();
				this.$get("/api/plat/users/", params, function(res) {
					this.tableData = res.Rows;
					this.pageTotal = res.Total;
				});
			},
			openAddDialog() {
				this.currentView = "user-add";
				this.visible = true;
			},
			openEditDialog(row, index) {
				this.currentView = "user-edit";
				this.option = row;
				this.visible = true;
			},
			deleteUsers(apiAddress, itemIds, successFunc) {
				if(itemIds.length == 0) {
					Vue.msg(this.$t("selectOneWhenDeleted"));
					return false;
				}

				this.$deleteTips(function() {
					this.$delete(apiAddress, JSON.stringify(itemIds), function(res) {
						successFunc(res);
						Vue.successMsg(this.$t("user.delUserSuccess"));
					});
				});
			},
			deleteItem(row, index) {
				var _this = this;
				var deleteIds = [];
				deleteIds.push(row.UserId);
				this.deleteUsers(
					"/api/plat/users/",
					deleteIds,
					function(res) {
						_this.loadData();
					});
			},
			deleteItems() {
				var _this = this;
				this.deleteUsers(
					"/api/plat/users/",
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
						_this.deleteIds.push(data.UserId);
					});
				}
			},
			resetPwd(row, index) {
				var content = this.$t("user.resetPwConfirm");
				this.$confirmTips(content, function() {
					this.$put("/api/plat/users/" + row.UserId + "/password", {}, function(res) {
						Vue.successMsg(this.$t("user.resetPwSuccess"));
					});
				});
			},
			openViewDialog(row, index) {
				this.currentView = "user-view";
				this.option = row;
				this.visible = true;
			},
			openViewEmployeeDialog(row) {
				this.currentView = "employee-view";
				this.option.EmployeeId = row.UsedById;
				this.visible = true;
			},
			getUserCount() {
				this.$get("/api/plat/users/userCount", function(res) {
					this.authUserCount = res.AuthUserCount;
					this.validUserCount = res.ValidUserCount;
				});
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