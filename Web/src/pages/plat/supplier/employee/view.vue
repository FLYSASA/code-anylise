<template>
	<sapi-dialog v-model="visible" class="employee" width="800px" top="10%" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('employee.browseEmployeeTitle')"></span>
		<div class="form-content no-footer">
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.employeeName')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="viewModel.EmployeeName" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.employeeNo')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.EmployeeNo" readonly></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.sex')"></span>
					<div class="right-auto-box">
						<el-input :value="viewModel.Sex == 0 ? $t('employee.sexData.man'):$t('employee.sexData.woman')" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.birthday')"></span>
					<div class="right-auto-box">
						<el-date-picker v-model="viewModel.Birthday" type="date" readonly>
						</el-date-picker>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.originPlace')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.OriginPlace" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.entryDate')"></span>
					<div class="right-auto-box">
						<el-date-picker v-model="viewModel.EntryDate" type="date" readonly>
						</el-date-picker>
					</div>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('employee.address')"></span>
				<div class="right-auto-box">
					<el-input v-model.trim="viewModel.Address" readonly></el-input>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.mobileTelephone')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.MobileTelephone" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.officePhone')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.OfficePhone" readonly></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65">Email</span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.Email" readonly></el-input>
					</div>					
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.weChat')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.WeChat" readonly></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.microBlog')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.MicroBlog" readonly></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65">QQ</span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.QQ" readonly></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('rowIndex')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="viewModel.RowIndex" readonly></el-input>
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
				this.$get("/api/plat/employees/" + this.option.EmployeeId, function(res) {
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
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		}
	}
</script>
