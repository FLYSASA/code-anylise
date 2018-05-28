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
					<span class="w-65" v-text="$t('employee.CreditCode')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.CreditCode" readonly></el-input>
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
					<span class="w-65" v-text="$t('employee.BusinessLicence')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.BusinessLicence" readonly></el-input>
					</div>
				</div>		
			</div>

			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.EnterpriseForm')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.EnterpriseForm === 1 ? '国有企业' : '民营企业'" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.TaxPayerId')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.TaxPayerId === 1 ? '一般纳税人' : '小规模纳税人'" readonly></el-input>
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
					<span class="w-65" v-text="$t('employee.Address')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.Address" readonly></el-input>
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
					<span class="w-65" v-text="$t('employee.OfficialWebsite')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.OfficialWebsite" readonly></el-input>
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
				<span class="w-65" v-text="$t('联系人信息')"></span>
				<!--供方联系人列表-->
				<div class="right-auto-box common-table width-p100">
					<el-table :data="viewModel.SupplierContacts" border>  <!-- viewModel是通过具体SupId得到的数据 res -->
							<el-table-column prop="ContactName" :label="$t('employee.contactName')" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="PositionName" :label="$t('employee.contactStation')"  show-overflow-tooltip>
							</el-table-column>
							<!-- 性别 -->
							<el-table-column prop="Sex" :label="$t('employee.contactSex')"  width="120" show-overflow-tooltip>
								<template slot-scope="props" >
									{{props.row.Sex === 0 ? $t('employee.sexData.man'):$t('employee.sexData.woman')}}
								</template> 
							</el-table-column>
							<el-table-column prop="OfficePhone" :label="$t('employee.contactPhone')"  show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="MobileTelephone" :label="$t('employee.contactMobile')"  show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="Email" :label="$t('employee.contactMail')"  show-overflow-tooltip>
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
			}
		},
		props: ["option", "value"],  // option 是list父组件传过来的props.row
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
				});
			}
		},
		components: {
			"sapi-dialog": dialog
		},
		mounted() {
			this.visible = this.value;
		},
		watch: {
			value(val) {
				this.visible = val;
				console.log(this.viewModel)
			}
			
		}
	}
</script>
