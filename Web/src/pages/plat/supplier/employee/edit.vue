<template>
	<sapi-dialog v-model="visible" class="employee-edit" width="800px" top="6%" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('employee.editEmployeeTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('employee.employeeName')"></span>
					<div class="right-auto-box">
						<el-input id="EmployeeName" v-model.trim="editModel.EmployeeName" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.employeeNo')"></span>
					<div class="right-auto-box">
						<el-input disabled="disabled" v-model.trim="editModel.EmployeeNo" :maxlength="100"></el-input>
					</div>
				</div>

			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.sex')"></span>
					<el-radio-group v-model="editModel.Sex">
						<el-radio class="radio" :label="0">{{$t('employee.sexData.man')}}</el-radio>
						<el-radio class="radio" :label="1">{{$t('employee.sexData.woman')}}</el-radio>
					</el-radio-group>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.birthday')"></span>
					<div class="right-auto-box">
						<el-date-picker v-model="editModel.Birthday" type="date" :a-placeholder="$t('selectDate')">
						</el-date-picker>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.originPlace')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="editModel.OriginPlace" :maxlength="50"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.entryDate')"></span>
					<div class="right-auto-box">
						<el-date-picker v-model="editModel.EntryDate" type="date" :a-placeholder="$t('selectDate')">
						</el-date-picker>
					</div>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('employee.address')"></span>
				<div class="right-auto-box">
					<el-input v-model.trim="editModel.Address" :maxlength="500"></el-input>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.mobileTelephone')"></span>
					<div class="right-auto-box">
						<el-input id="txtMobileTelephone" v-model.trim="editModel.MobileTelephone" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.officePhone')"></span>
					<div class="right-auto-box">
						<el-input id="txtOfficePhone" v-model.trim="editModel.OfficePhone" :maxlength="100"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65">Email</span>
					<div class="right-auto-box">
						<el-input id="txtEmail" v-model.trim="editModel.Email" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.weChat')"></span>
					<div class="right-auto-box">
						<el-input id="txtWeChat" v-model.trim="editModel.WeChat" :maxlength="100"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.microBlog')"></span>
					<div class="right-auto-box">
						<el-input id="txtMicroBlog" v-model.trim="editModel.MicroBlog" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65">QQ</span>
					<div class="right-auto-box">
						<el-input id="txtQQ" v-model.trim="editModel.QQ" :maxlength="100"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('rowIndex')"></span>
					<div class="right-auto-box">
						<el-input v-model="editModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('employee.setStation')"></span>
				<div class="right-auto-box">
					<div class="fullline">
						<div class="wp-50">
						</div>
						<div class="wp-50 float-right btn-outer">
							<ul class="btn-wrap">
								<li class="icon-build" @click="showStationPage"></li>
								<li class="icon-deleter" @click="deleteItems"></li>
							</ul>
						</div>
					</div>
					<!--岗位列表-->
					<div class="common-table width-p100">
						<el-table :data="editModel.Stations" @selection-change="selectionChange">
							<el-table-column type="selection" width="45">
							</el-table-column>
							<el-table-column v-for="item in stationHeaderData" :key="item.id" :prop="item.prop" :label="item.label" show-overflow-tooltip width="width" :sortable="item.sortable">
							</el-table-column>
							<el-table-column :label="$t('employee.defaultStationName')" width="100">
								<template slot-scope="props">
									<span @click="changeDefaultStation(props.row)">
	                            		<el-radio class="radio" v-model="editModel.DefaultStationId" :label="props.row.StationId">&nbsp;</el-radio>
	                        		</span>
								</template>								
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>

		</div>

		<div class="footer">
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit" v-text="$t('submit')"></el-button>
		</div>
		<set-station slot="moreDialog" :node-id="editModel.EmployeeId" :node-datas="editModel.Stations" v-model="stationVisible" :call-back="callback"></set-station>
	</sapi-dialog>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
	import dialog from "@/components/sapi-dialog.vue";
	import station from "@/components/sapi-station-multiline.vue";
	export default {
		data() {
			return {
				disabled: false,
				visible: true,
				editModel: {},
				deleteIds: [],
				stationListShow: false,
				stationVisible: false,
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
		props: ["value", "option"],
		methods: {
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input", false);
			},
			open() {
				this.getData();
			},
			submit() {
				if(!this.validate()) {
					return;
				}
				if(this.editModel.Stations.length === 0) {
					this.editModel.DefaultStationId = null;
				}
				this.disabled = true;
				this.$put("/api/plat/employees/", this.editModel, function(res) {
					this.disabled = false;
					this.$parent.loadData();
					this.close();
					Vue.successMsg(this.$t('employee.editEmployeeSuccess'));
				});
			},
			validate() {
				if(!this.editModel.EmployeeName) {
					this.$errorTips(this.$t('employee.employeeNameNotBeEmpty'), "#EmployeeName");
					return false;
				}
				var msgASCIIContent = this.$t("inputASCIIContentPlease");
				if(this.editModel.MobileTelephone && !this.$checkedASCII(this.editModel.MobileTelephone)) {
					this.$errorTips(msgASCIIContent, "#txtMobileTelephone");
					return false;
				}
				if(this.editModel.OfficePhone && !this.$checkedASCII(this.editModel.OfficePhone)) {
					this.$errorTips(msgASCIIContent, "#txtOfficePhone");
					return false;
				}
				if(this.editModel.Email && !this.$checkedASCII(this.editModel.Email)) {
					this.$errorTips(msgASCIIContent, "#txtEmail");
					return false;
				}
				if(this.editModel.WeChat && !this.$checkedASCII(this.editModel.WeChat)) {
					this.$errorTips(msgASCIIContent, "#txtWeChat");
					return false;
				}
				if(this.editModel.MicroBlog && !this.$checkedASCII(this.editModel.MicroBlog)) {
					this.$errorTips(msgASCIIContent, "#txtMicroBlog");
					return false;
				}
				if(this.editModel.QQ && !this.$checkedASCII(this.editModel.QQ)) {
					this.$errorTips(msgASCIIContent, "#txtQQ");
					return false;
				}
				return true;
			},
			changeDefaultStation(row) {
				this.editModel.DefaultStationId = row.StationId;
			},
			getData() {
				this.$get("/api/plat/employees/" + this.option.EmployeeId, function(res) {
					this.editModel = res;
					this.editModel.Birthday = this.$dateFormat('yyyy-MM-dd', this.editModel.Birthday);
					this.editModel.EntryDate = this.$dateFormat('yyyy-MM-dd', this.editModel.EntryDate);
				});
			},
			showStationPage() {
				this.stationVisible = true;
			},
			callback(res) {
				this.editModel.Stations = res;
				
				//edit by 杨俊  2018-03-22  禅道bug #9541 修改岗位选择页面删除默认岗位后，默认岗位没有的情况
				if (this.editModel.Stations == null || this.editModel.Stations.length == 0){
					this.editModel.DefaultStationId = null;
					return;
				}
				for (var i = 0; i < this.editModel.Stations.length; i++){
					if (this.editModel.DefaultStationId == this.editModel.Stations[i].StationId){
						return;
					}
				}

				this.editModel.DefaultStationId = this.editModel.Stations[0].StationId;		
			},
			selectionChange(datas) {
				this.deleteIds = [];
				if(datas.length > 0) {
					datas.forEach((data) => {
						this.deleteIds.push(data.StationId);
					});
				}
			},
			deleteItems() {
				var _this = this;
				var stations = this.editModel.Stations;

				if(this.deleteIds.length == 0) {
					Vue.msg(this.$t('selectOneWhenDeleted'));
					return false;
				}
				
				var defaultId = this.editModel.DefaultStationId;
				var hasDeleteDefault = false;
				var ids=this.deleteIds;
				for(var i=stations.length-1; i>-1 ; i--) {
					var stationId = stations[i].StationId;
					var index=ids.indexOf(stationId);
					if(index>-1){
						stations.splice(i,1);
						ids.splice(index,1);
						if(defaultId === stationId) {
							hasDeleteDefault = true;
						}
					}
				}

				if(hasDeleteDefault && this.editModel.Stations[0]) {
					this.editModel.DefaultStationId = this.editModel.Stations[0].StationId;
				}
			}
		},
		components: {
			"sapi-dialog": dialog,
			"set-station": station
		},
		created() {
			Vue.use(tips);
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
<style type="text/css">
	.btn-outer .btn-wrap {
		list-style: none;
		border: 1px solid #bfbfbf;
		font-size: 0;
		border-radius: 2px;
		display: inline-block;
		height: 28px;
		position: absolute;
		right: 0;
		overflow: hidden;
	}
	
	.btn-outer .btn-wrap>li {
		display: inline-block;
		width: 28px;
		height: 28px;
		font-size: 16px;
		text-align: center;
		line-height: 28px;
		cursor: pointer;
	}
	
	.btn-outer .btn-wrap>li:first-child {
		border-right: 1px solid #bfbfbf;
	}
	
	.btn-outer {
		position: relative;
	}
</style>