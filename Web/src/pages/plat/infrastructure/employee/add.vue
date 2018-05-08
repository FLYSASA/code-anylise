<template>
	<sapi-dialog v-model="visible" width="800px" top="6%" class="add" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('employee.addEmployeeTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('employee.employeeName')"></span>
					<div class="right-auto-box">
						<el-input id="addEmployeeName" v-model.trim="createModel.EmployeeName" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.employeeNo')"></span>
					<div class="right-auto-box">
						<el-input disabled="disabled" v-model.trim="createModel.EmployeeNo" :maxlength="100"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.sex')"></span>
					<el-radio-group v-model="createModel.Sex">
						<el-radio class="radio" :label="0">{{$t('employee.sexData.man')}}</el-radio>
						<el-radio class="radio" :label="1">{{$t('employee.sexData.woman')}}</el-radio>
					</el-radio-group>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.birthday')"></span>
					<div class="right-auto-box" style="position: relative;">
						<el-date-picker style="width: 100%;" v-model="createModel.birthday" type="date" :placeholder="$t('selectDate')">
						</el-date-picker>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.originPlace')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="createModel.OriginPlace" :maxlength="50"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.entryDate')"></span>
					<div class="right-auto-box" style="position: relative;">
						<el-date-picker style="width: 100%;" v-model="createModel.EntryDate" type="date" :placeholder="$t('selectDate')">
						</el-date-picker>
					</div>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('employee.address')"></span>
				<div class="right-auto-box">
					<el-input v-model.trim="createModel.Address" :maxlength="500"></el-input>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.mobileTelephone')"></span>
					<div class="right-auto-box">
						<el-input id="txtMobileTelephone" v-model.trim="createModel.MobileTelephone" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.officePhone')"></span>
					<div class="right-auto-box">
						<el-input id="txtOfficePhone" v-model.trim="createModel.OfficePhone" :maxlength="100"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65">Email</span>
					<div class="right-auto-box">
						<el-input id="txtEmail" v-model.trim="createModel.Email" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.weChat')"></span>
					<div class="right-auto-box">
						<el-input id="txtWeChat" v-model.trim="createModel.WeChat" :maxlength="100"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.microBlog')"></span>
					<div class="right-auto-box">
						<el-input id="txtMicroBlog" v-model.trim="createModel.MicroBlog" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65">QQ</span>
					<div class="right-auto-box">
						<el-input id="txtQQ" v-model.trim="createModel.QQ" :maxlength="100"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('rowIndex')"></span>
					<div class="right-auto-box">
						<el-input v-model="createModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
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
						<el-table :data="createModel.Stations" @selection-change="selectionChange">
							<el-table-column type="selection" width="45">
							</el-table-column>
							<el-table-column v-for="item in stationHeaderData" :key="item.id" :prop="item.prop" :label="item.label" show-overflow-tooltip width="width" :sortable="item.sortable">
							</el-table-column>
							<el-table-column :label="$t('employee.defaultStationName')" width="100">
								<template slot-scope="props">
									<span @click="changeDefaultStation(props.row)">
	                            		<el-radio class="radio" v-model="createModel.DefaultStationId" :label="props.row.StationId">&nbsp;</el-radio>
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
		<set-station slot="moreDialog" :node-id="createModel.EmployeeId" :node-datas="createModel.Stations" v-model="stationVisible" :call-back="callback"></set-station>
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
				stationVisible: false,
				createModel: {},
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
		props: ["value"],
		methods: {
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input", false);
			},
			open() {
				this.createModel = {};
				this.getData();
			},
			submit() {
				if(!this.validate()) {
					return;
				}

				this.disabled = true;
				this.$post("/api/plat/employees/", this.createModel, function(res) {
					this.disabled = false;
					this.$parent.loadData();
					this.close();
					Vue.successMsg(this.$t('employee.addEmployeeSuccess'));
				});
			},
			validate() {
				this.$closeWaringTips(".form-error-tips");
				if(!this.createModel.EmployeeName) {
					this.$errorTips(this.$t('employee.employeeNameNotBeEmpty'), "#addEmployeeName");
					return false;
				}
				var msgASCIIContent = this.$t("inputASCIIContentPlease");
				if(this.createModel.MobileTelephone && !this.$checkedASCII(this.createModel.MobileTelephone)) {
					this.$errorTips(msgASCIIContent, "#txtMobileTelephone");
					return false;
				}
				if(this.createModel.OfficePhone && !this.$checkedASCII(this.createModel.OfficePhone)) {
					this.$errorTips(msgASCIIContent, "#txtOfficePhone");
					return false;
				}
				if(this.createModel.Email && !this.$checkedASCII(this.createModel.Email)) {
					this.$errorTips(msgASCIIContent, "#txtEmail");
					return false;
				}
				if(this.createModel.WeChat && !this.$checkedASCII(this.createModel.WeChat)) {
					this.$errorTips(msgASCIIContent, "#txtWeChat");
					return false;
				}
				if(this.createModel.MicroBlog && !this.$checkedASCII(this.createModel.MicroBlog)) {
					this.$errorTips(msgASCIIContent, "#txtMicroBlog");
					return false;
				}
				if(this.createModel.QQ && !this.$checkedASCII(this.createModel.QQ)) {
					this.$errorTips(msgASCIIContent, "#txtQQ");
					return false;
				}
				return true;
			},
			changeDefaultStation(row) {
				this.createModel.DefaultStationId = row.StationId;
			},
			getData() {
				this.$get("/api/plat/employees/create", function(res) {
					this.createModel = res;
					this.createModel.Birthday = '';
					this.createModel.EntryDate = '';
				});
			},
			showStationPage() {
				this.stationVisible = true;
			},
			callback(res) {
				this.createModel.Stations = res;
				
				//edit by 杨俊  2018-03-22  禅道bug #9541 修改岗位选择页面删除默认岗位后，默认岗位没有的情况
				if (this.createModel.Stations == null || this.createModel.Stations.length == 0){
					this.createModel.DefaultStationId = null;
					return;
				}
				for (var i = 0; i < this.createModel.Stations.length; i++){
					if (this.createModel.DefaultStationId == this.createModel.Stations[i].StationId){
						return;
					}
				}

				this.createModel.DefaultStationId = this.createModel.Stations[0].StationId;				
			},
			deleteItems() {
				var stations = this.createModel.Stations;
				if(this.deleteIds.length == 0) {
					Vue.msg(this.$t('selectOneWhenDeleted'));
					return false;
				}

				var defaultId = this.createModel.DefaultStationId;
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

				//禅道bug8461，如果之前已有默认岗位，则该员工的默认岗位应该还为之前的岗位。
				if(hasDeleteDefault && this.createModel.Stations[0]) {
					this.createModel.DefaultStationId = this.createModel.Stations[0].StationId;
				}
			},
			selectionChange(datas) {
				this.deleteIds = [];
				if(datas.length > 0) {
					datas.forEach((data) => {
						this.deleteIds.push(data.StationId);
					});
				}
			}
		},
		components: {
			"sapi-dialog": dialog,
			"set-station": station
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		},
		created() {
			Vue.use(tips);
		},
		mounted() {
			this.visible = this.value;
		}
	}
</script>

<style>
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