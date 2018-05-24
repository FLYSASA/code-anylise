<template>
	<sapi-dialog v-model="visible" class="employee" width="800px" top="10%" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('employee.browseEmployeeTitle')"></span>
		<div class="form-content no-footer">
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.SupName')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.SupName" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.SupNo')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.SupNo" readonly></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.ProvinceName')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.ProvinceName" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.CityName')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.CityName" readonly></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.AreaName')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.AreaName" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.SupId')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.SupId" readonly></el-input>
					</div>
				</div>
			</div>

			<div class="fullline">
				<div class="wp-100">
					<span class="w-65" v-text="$t('供方分类')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.supplierClasses" readonly></el-input>
					</div>
				</div>		
			</div>

			<div class="fullline">
				<div class="wp-100">
					<span class="w-65" v-text="$t('营业执照')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.supplierClasses" readonly></el-input>
					</div>
				</div>		
			</div>

			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.EnterpriseForm')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.EnterpriseForm" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('纳税人类型')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.SupId" readonly></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.LegalRepresentative')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.LegalRepresentative" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.RegisteredCapital')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.RegisteredCapital" readonly></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('公司地址')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.CityName" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.PostalCode')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.PostalCode" readonly></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.OfficePhone')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.OfficePhone" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.FaxNumber')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.FaxNumber" readonly></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.Email')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.Email" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('公司网页')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.FaxNumber" readonly></el-input>
					</div>
				</div>
			</div>

			<div class="fullline">
				<div class="wp-100">
					<span class="w-65" v-text="$t('employee.Remark')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.Remark" readonly></el-input>
					</div>
				</div>
			</div>

			
			<div class="fullline">
				<span class="w-65" v-text="$t('employee.station')"></span>
				<!--岗位列表-->
				<div class="right-auto-box common-table width-p100">
					<el-table :data="viewModel.Stations" >
						<el-table-column v-for="item in stationHeaderData" :key="item.id" :prop="item.prop" :label="item.label" show-overflow-tooltip width="width" :sortable="item.sortable">
						</el-table-column>
						<el-table-column :label="$t('employee.defaultStationName')" width="100">
							<template slot-scope="props">
								<span>
									<el-radio class="radio" v-model="viewModel.DefaultStationId" :label="props.row.StationId" disabled>&nbsp;</el-radio>
								</span>
							</template>							
						</el-table-column>
					</el-table>
				</div>
			</div>

		</div>
		<div class="footer">
			<el-button size="small" class="default-button" @click="close" v-text="$t('close')"></el-button>
		</div>
	</sapi-dialog>
</template>

<script>
	import dialog from "@/components/sapi-dialog.vue";
	export default {
		data() {
			return {
				disabled: false,
				visible: true,
				viewModel: {},
				stationListShow: false,
				stationHeaderData: //员工查看页岗位表头
					[{
						prop: "StationName",
						label: this.$t('employee.stationName'),
						sortable: false
					}, {
						prop: "StationNo",
						label: this.$t('employee.stationNo'),
						sortable: false
					}, {
						prop: "CorpName",
						label: this.$t('employee.stationCorpName'),
						sortable: false
					}, {
						prop: "DeptName",
						label: this.$t('employee.stationDeptName'),
						sortable: false
					}]
			}
		},
		props: ["option", "value"],
		methods: {
			close() {
				this.$emit("input", false);
			},
			open() {
				//在此进行初始化
				this.getData();
			},
			getData() {
				this.$get("/api/plat/suppliers/" + this.option.SupId, function(res) {
					
					this.viewModel = res;
					this.viewModel.Birthday = this.$dateFormat('yyyy-MM-dd', this.viewModel.Birthday);
					this.viewModel.EntryDate = this.$dateFormat('yyyy-MM-dd', this.viewModel.EntryDate);
				});
			}
		},
		components: {
			"sapi-dialog": dialog
		},
		mounted() {
			this.visible = this.value;
			console.log(this.option)
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		}
	}
</script>
