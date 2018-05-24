<template>
	<sapi-dialog class="role-messenger" @on-resize="resize" v-model="visible" width="990px" top="14%" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('permission.browsePermissionTitle')"></span>
		<div class="role-inner-wrapper form-tabs">
			<ul class="form-tabs-title clearfix">
				<li :class="{active:tabIndex==0}" @click="tabChange(0)" v-text="$t('permission.tabBasicInformation')"></li>
				<li :class="{active:tabIndex==1}" @click="tabChange(1)" v-text="$t('permission.tabPermissionSet')"></li>
				<li :class="{active:tabIndex==2}" @click="tabChange(2)" v-text="$t('permission.tabIncludeUsers')"></li>
			</ul>
				<div class="tab-role-edit form-tabs-content" v-if="tabIndex==0" :class="{active:tabIndex===0}">
					<div class="form-error-tips"></div>
					<div class="form-content">
						<div class="fullline">
							<span class="w-65" v-text="$t('permission.roleName')"></span>
							<div class="right-auto-box">
								<el-input :maxlength="200" v-model.trim="editModel.RoleName" readonly></el-input>
							</div>
						</div>
						<div class="fullline">
							<span class="w-65" v-text="$t('permission.roleNo')"></span>
							<div class="right-auto-box">
								<el-input v-model="editModel.RoleNo" :maxlength="100" readonly></el-input>
							</div>
						</div>
						<div class="fullline">
							<span class="w-65" v-text="$t('rowIndex')"></span>
							<div class="right-auto-box">
								<el-input :maxlength="200" v-model="editModel.RowIndex" readonly></el-input>
							</div>
						</div>
						<div class="fullline">
							<span class="w-65" v-text="$t('permission.remark')"></span>
							<div class="right-auto-box">
								<el-input :maxlength="200" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="editModel.Remark" readonly></el-input>
							</div>
						</div>

					</div>

					<div class="footer">
						<el-button size="small" class="default-button" @click="close" v-text="$t('close')"></el-button>
					</div>
				</div>

				<div class="tab-role-set-view form-tabs-content" v-if="tabIndex==1" :class="{active:tabIndex===1}">
					<component v-bind:is="currentView" :role-id="option.RoleId" @call-back="close"></component>
				</div>

				<div class="tab-role-edit form-tabs-content" v-if="tabIndex==2" :class="{active:tabIndex===2}">
					<div class="form-error-tips"></div>
					<div class="form-content">
						<div class="fullline">
							<div class="relative search-wrap" @keyup.enter="getTableData">
								<el-input icon="search" v-model="params.keyword" @click="getTableData" :maxlength="200" :placeholder="$t('permission.searchUser')"></el-input>
							</div>
						</div>
						<div class="fullline width-p100">
							<el-table class="common-table" :data="tableData" ref="tableBody" style="width:100%;">
								<el-table-column :key="item.id" v-for="item in headerData" :prop="item.prop" :label="item.label" show-overflow-tooltip width="width">
								</el-table-column>
							</el-table>
						</div>
						<div class="fullline">
							<el-pagination v-show="(pageTotal/params.pageSize)>1" @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" :layout="layout" :total="pageTotal">
							</el-pagination>
						</div>

					</div>

					<div class="footer">
						<el-button size="small" class="default-button" @click="close" v-text="$t('close')"></el-button>
					</div>
			</div>
		</div>

		<component slot="moreDialog" v-model="userSetVisible" :call-back="getUserData" v-bind:is="userSetView" :role-id="option.RoleId"></component>
	</sapi-dialog>
</template>

<script>
	

	import '@/static/css/sapi-form-tab.css';
	import tips from "@/components/sapi-tips.js";
	import dialog from "@/components/sapi-dialog.vue";
	export default {
		data() {
			return {
				disabled: false,
				visible: false,
				editModel: {},
				tabIndex: 0,
				currentView: "",
				headerData: [{
					prop: "UserName",
					label: this.$t('permission.userName'),
					sortable: false
				}, {
					prop: "AliasName",
					label: this.$t('permission.aliasName'),
					sortable: false
				}],
				userSetVisible: false,
				userSetView: "",
				tableData: [],
				params: {
					roleId: null,
					isRelated: true,
					pageSize:10
				},
				maxHeight: 300,
				deleteIds: []
			}
		},
		mixins: [getPagerMixin()],
		props: ["value", "option"],
		methods: {
			getTableData() {
				this.params.roleId = this.option.RoleId;
				this.$get("/api/plat/roles/optionalUsers", this.params, function(res) {
					this.tableData = res.Rows;
					this.pageTotal = res.Total;
				});
			},
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input", false);
			},
			open() {
				this.params.keyword = '';
				this.params.pageIndex = 1;
				this.params.pageSize = 10;
				
				if(this.option && typeof this.option === "object") {
					this.editModel = JSON.parse(JSON.stringify(this.option));
				} else {
					this.editModel = this.option;
				}
				this.getTableData();
				this.tabIndex = 0;
				this.currentView = "";
			},
			userSetAdd() {
				this.userSetView = "user-set";
				this.userSetVisible = true;
			},
			getUserData(datas) {
				this.getTableData();
			},			
			tabChange(i) {
				this.tabIndex = i;
				if(i === 1) {
					this.currentView = "permission-view";
				}
			},
			resize(flag) {
				if(flag === true) {
					this.maxHeight = document.body.offsetHeight - 320;
				} else {
					this.maxHeight = 300;
				}
			}
		},
		components: {
			"sapi-dialog": dialog,
			"permission-view": (resolve) => {
				require(['./permissionSet.vue'], resolve);
			},
			"user-set": (resolve) => {
				require(['./userSet.vue'], resolve);
			}
		},
		created() {
			Vue.use(tips);
			//pager改变时将要执行的函数，对该值进行初始化
			this.pageFunc = this.getTableData;
			this.getTableData();
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		},
		mounted() {
			this.visible = this.value;
		}
	}

</script>

<style>
	.role-messenger .role-inner-wrapper {
		overflow: auto;
	}
</style>