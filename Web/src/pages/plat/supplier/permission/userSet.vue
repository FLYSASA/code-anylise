<template>
	<sapi-dialog class="user-set" width="970px" top="12%" :has-max="false" v-model="visible" @on-close="close" @on-open="open">
		<span slot="title" v-text="$t('permission.setUserTitle')"></span>
		<div class="user-set-box form-content">
			<div class="user-set-box-left single-station">
				<div class="user-set-box-map relative" @keyup.enter="getTableData">
					<el-input :placeholder="$t('permission.searchUser')" v-model="params.keyword" >
						<a slot="suffix" class="el-icon-search" @click="getTableData"></a>
					</el-input>
				</div>
				<div class="user-set-box-table user-set-box-table-cursor table-no-border mb-10 width-p100">
					<el-table :data="tableData" ref="tableData" :highlight-current-row="true" @row-click="handleLeftRowClick" :height="(pageTotal/params.pageSize)>1 ? 350 : 390">
						<el-table-column v-for="item in headerData" :key="item.id" :prop="item.prop" :label="item.label" show-overflow-tooltip>
						</el-table-column>
					</el-table>
					<div class="select-all" @click="selectAll" v-show="tableData && tableData.length">
						<a v-text="$t('choiceAll')"></a>
					</div>
				</div>
				<div class="fullline mb-10 pagenation-wrap">
					<el-pagination v-show="(pageTotal/params.pageSize)>1" @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" layout="next, pager, prev" :total="pageTotal">
					</el-pagination>
				</div>
			</div>
			<div class="user-set-box-middle user-set-box-middle-right single-station">
				<div class="user-set-box-map">
					<span class="float-left" v-text="$t('permission.selectedUserDesc',{userCount:userCount})"></span>
					<i class="float-right icon-deleter delete-btn-icon f-14" @click.stop="deleteItems" v-show="setTableData && setTableData.length"></i>
				</div>
				<div class="user-set-box-table user-set-box-table-delete user-set-box-table-cursor table-no-border width-p100">
					<el-table ref="tableBody" :data="setTableData" @selection-change="selectionChange"  height="390">
						<el-table-column type="selection" width="45">
						</el-table-column>
						<el-table-column v-for="item in headerData" :key="item.id" :prop="item.prop" :label="item.label" show-overflow-tooltip>
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
			<el-button class="blue-button" size="small" :disabled="disabled" @click="confirm" v-text="$t('determine')"></el-button>			
		</div>
	</sapi-dialog>
</template>

<script>
	import dialog from "@/components/sapi-dialog.vue";

	export default {
		data() {
			return {
				headerData: [{
					prop: "UserName",
					label: this.$t('permission.userName'),
					sortable: false
				}, {
					prop: "AliasName",
					label: this.$t('permission.aliasName'),
					sortable: false
				}],
				tableData: [],
				setTableData: [],
				visible: false,
				disabled: false,
				isInit: false,
				userCount: 0,
				params: {
					roleId: null,
					isRelated: false
				}
			}
		},
		props: ["value", "roleId", "callBack"],
		mixins: [getPagerMixin()],
		methods: {
			open() {
				this.params.pageIndex=1;
				this.params.roleId=this.roleId;
				this.setTableData = [];
				this.params.keyword = '';
				this.userCount = 0;
				this.getTableData();
			},
			getTableData() {
				this.$get("/api/plat/roles/optionalUsers", this.params, function(res) {
					this.tableData = res.Rows;
					this.pageTotal = res.Total;
				});
			},
			checkedAll() {
				if(this.tableData.length == 0) {
					return;
				}

				var datas = this.setTableData = this.setTableData.concat(this.tableData);
				var obj = {};
				for(var i = datas.length - 1, ii = 0; i >= ii; i--) {
					var id = datas[i].UserId;
					if(obj[id]) {
						datas.splice(i, 1);
					} else {
						obj[id] = true;
					}
				}

				this.userCount = this.setTableData.length;
			},
			handleLeftRowClick(row) {
				var flag = true;
				var datas = this.setTableData;
				if(datas.length >= 100) {
					Vue.errorMsg(this.$t('permission.moreThanUpperLimit'));
					return false;
				}
				for(var i = 0, ii = datas.length; i < ii; i++) {
					var data = datas[i];
					if(data.UserId == row.UserId) {
						flag = false;
						break;
					}
				}

				if(flag) {
					datas.push(row);
					this.userCount = datas.length;
				}
			},
			selectionChange(datas) {
				var _this = this;
				_this.deleteIds = [];
				if(datas.length > 0) {
					datas.forEach(function(data) {
						_this.deleteIds.push(data.UserId);
					});
				}
			},
			confirm() {
				var datas = this.setTableData;
				if(datas.length === 0) {
					this.close();
					return;
				}
				var userIds = [];
				for(var i = 0, ii = datas.length; i < ii; i++) {
					userIds.push(datas[i].UserId);
				}
				if(userIds.length === 0) {
					this.close();
					return;
				}
				this.$put("/api/plat/roles/users", {
					RoleId: this.roleId,
					UserIds: userIds
				}, function(res) {
					if(typeof this.callBack === "function") {
						this.callBack.call(this.$parent, this.setTableData);
					}

					this.close();
				}, function(err) {
					Vue.msg(err.Message);
				})

			},
			deleteItem(row) {
				var datas = this.setTableData;
				for(var i = 0, ii = datas.length; i < ii; i++) {
					var data = datas[i];
					if(data.UserId == row.UserId) {
						datas.splice(i, 1);
						break;
					}
				}
				this.userCount = datas.length;
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
						if(datas[i].UserId == id) {
							datas.splice(i, 1);
							_this.deleteIds.splice(index, 1);
							break;
						}
					}
				});
				this.userCount = datas.length;
			},
			close() {
				this.$emit("input", false);
			},
			deleteItem(row) {
				var datas = this.setTableData;
				for(var i = 0, ii = datas.length; i < ii; i++) {
					var data = datas[i];
					if(data.UserId == row.UserId) {
						datas.splice(i, 1);
						break;
					}
				}
				this.userCount = datas.length;
			},
			deleteItems() {
				if((this.deleteIds && this.deleteIds.length == 0) || !this.deleteIds) {
					Vue.msg(this.$t('selectOneWhenDeleted'));
					return false;
				}
				var deleteIds = [].concat(this.deleteIds);
				var _this = this;
				var datas = this.setTableData;
				deleteIds.forEach(function(id, index) {
					for(var i = 0, ii = datas.length; i < ii; i++) {
						if(datas[i].UserId == id) {
							datas.splice(i, 1);
							_this.deleteIds.splice(index, 1);
							break;
						}
					}
				});
				this.userCount = datas.length;
			},
			selectAll() {
				var datas = this.tableData;
				if(datas.length >= 100) {
					Vue.errorMsg(this.$t('permission.moreThanUpperLimit'));
					return false;
				}
				for(var i = 0, ii = datas.length; i < ii; i++) {
					this.handleLeftRowClick(datas[i]);
				}
			}
		},
		components: {
			"sapi-dialog": dialog
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		},
		created() {
			//pager改变时将要执行的函数，对该值进行初始化
			this.pageFunc = this.getTableData;
			this.getTableData();
		},
		mounted() {
			this.visible = this.value;
			this.params.roleId = this.roleId;
		}
	}

</script>

<style>
	.user-set .dialog-box-header {
		border-bottom: 1px solid #f5f3f4;
	}
	
	.user-set .user-set-box {
		width: 100%;
		height: 520px;
		margin: 0 auto;
		padding: 20px;
		text-align: center;
		overflow: hidden;
	}
	
	.user-set .user-set-box-left {
		position: relative;
		float: left;
		width: 300px;
		text-align: left;
	}
	
	.user-set .user-set-box-middle {
		float: right;
		width: 360px;
	}
	
	.user-set .user-set-box-right {
		float: left;
		margin-left: 20px;
		width: 320px;
	}
	
	.user-set .user-set-box-map {
		height: 28px;
		margin-bottom: 10px;
		line-height: 28px;
	}
	
	.user-set .user-set-box-map>span {
		display: inline-block;
		width: calc(100% - 60px);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;
	}
	
	.user-set .user-set-box-map-link {
		color: #8ecefe;
		text-decoration: underline;
	}
	
	.user-set .user-set-box-table {
		border: 1px solid #eee;
		text-align: left;
		position: relative;
	}
	
	.user-set-box-table-cursor tr {
		cursor: pointer;
	}
	
	.user-set .delete-btn-icon {
		display: inline-block;
		width: 28px;
		height: 28px;
		line-height: 28px;
		cursor: pointer;
		border: 1px solid #ccc;
		background: #f2f2f2;
	}
	
	.user-set .red-close-btn {
		display: none;
		width: 12px;
		height: 20px;
		cursor: pointer;
		background: url(../../../../static/images/info-close-btn.png) no-repeat center bottom;
	}
	
	.user-set-box-table-delete tr:hover .red-close-btn {
		display: inline-block;
	}
	
	.pagenation-wrap {
		overflow: hidden;
		white-space: nowrap;
		height: 34px;
	}
	
	.user-set .el-pagination {
		padding-right: 0px;
	}
	
	.user-set .select-all {
		position: absolute;
		right: 30px;
		top: 18px;
		color: #8ecefe;
		text-decoration: underline;
		cursor: pointer;
	}
	
	.single-station.user-set-box-middle-right {
		width: 590px;
	}
	
	.single-station.user-set-box-left {
		width: 320px;
	}
	
	.single-station.user-set-box-middle-right .el-table__body tr.current-row>td {
		background-color: #63c4ff;
		color: #fff;
	}
	
	.user-set-box-table.table-no-border td,
	.el-table th.is-leaf {
		border-bottom: 1px solid #f3f2f2;
	}
</style>