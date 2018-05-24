<template>
	<sapi-dialog v-model="visible" width="700px" top="26%" class="add" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('user.editUserTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('user.userName')"></span>
					<div class="right-auto-box">
						<el-input id="txtUserName" v-model.trim="editModel.UserName" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('user.userStatus')"></span>
					<div class="right-auto-box">
						<el-radio-group v-model="editModel.Enabled">
							<el-radio :label="true">{{$t('user.userStatusData.enabled')}}</el-radio>
							<el-radio :label="false">{{$t('user.userStatusData.disabled')}}</el-radio>
						</el-radio-group>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('user.userType')"></span>
					<div class="right-auto-box">
						<el-input :value="$t('user.userTypeData.employee')" disabled v-if="originUserType==2">
						</el-input>
						<el-select v-model="editModel.UserType" @change="userTypeChange"  v-else>
							<el-option v-for="item in userTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-if="originUserType==2" v-text="$t('user.aliasName')"></span>
					<span class="w-65 must-star" v-else v-text="$t('user.aliasName')"></span>
					
					<div class="right-auto-box">
						<custom-auto v-if="originUserType!=2 && editModel.UserType==2" id="txtAliasName" @select="handleEmployeeSelect" :disabled="originUserType==2" v-model="editModel.AliasName"></custom-auto>

						<el-input v-else id="txtAliasName" v-model="editModel.AliasName" :maxlength="100" :disabled="originUserType==2">
						</el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('user.mobileTelephone')"></span>
					<div class="right-auto-box">
						<el-input id="txtMobileTelephone" v-model.trim="editModel.MobileTelephone" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('user.officePhone')"></span>
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
					<span class="w-65" v-text="$t('user.weChat')"></span>
					<div class="right-auto-box">
						<el-input id="txtWeChat" v-model.trim="editModel.WeChat" :maxlength="100"></el-input>
					</div>					
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('user.microBlog')"></span>
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
						<el-input v-model="editModel.RowIndex" :min="0" :max="999999999" v-format.d="{default:0}"></el-input>
					</div>
				</div>
			</div>
		</div>

		<div class="footer">
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit" v-text="$t('submit')"></el-button>			
		</div>
	</sapi-dialog>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
	import dialog from "@/components/sapi-dialog.vue";
	import selectEmployeeAuto from "../../components/employee-autocomplete.vue";
	export default {
		data() {
			return {
				disabled: false,
				visible: false,
				editModel: {},
				userTypeOptions: [{
						label: this.$t('user.userTypeData.employee'),
						value: 2
					},
					{
						label: this.$t('user.userTypeData.other'),
						value: 3
					}
				],
				selectEmployeeParam: {
					type: 1,
					pageIndex: 1,
					pageSize: 20,
					keyword: ""
				},
				originUserType: 0,
				beforeChangeUserType: 0,		//改变之前的用户类型
				isFirstChangeUserType: true 	//是否第一次改变用户类型，默认值为true，避免在执行open方法进行初始化时，调用change事件出现清空移动电话、Email等信息的情况
			}
		},
		props: ["option", "value"],
		methods: {
			open() {
				this.editModel = {};
				this.$get("/api/plat/users/" + this.option.UserId, function(res) {
					this.editModel = res;
					this.originUserType = res.UserType;
					this.beforeChangeUserType = res.UserType;
					this.isFirstChangeUserType = true;					
				});
			},
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input", false);
			},
			submit() {
				//因员工选择控件中延迟150，故此处延迟大于150
				setTimeout(()=>{
					if(!this.validate()) {
						return;
					}
					this.disabled = true;
					this.$put("/api/plat/users/", this.editModel, function(res) {
						this.disabled = false;
						this.$parent.loadData();
						this.close();
						Vue.successMsg(this.$t('user.editUserSuccess'));
					});
				},160);	
			},			
			validate() {
				this.$closeWaringTips(".form-error-tips");
				if(!this.editModel.UserName) {
					this.$errorTips(this.$t('user.userNameNotBeEmpty'), "#txtUserName");
					return false;
				}
				//职员类型并且UsedById为空
				if (this.editModel.UserType == 2 && !this.editModel.UsedById){
					this.$errorTips(this.$t('user.selectEmployeePlease'), "#txtAliasName");
					return false;
				}
				if (!this.editModel.AliasName){
					this.$errorTips(this.$t('user.aliasNameNotBeEmpty'), "#txtAliasName");
					return false;
				}	
				
				var msgASCIIContent = this.$t("inputASCIIContentPlease");
				if (this.editModel.MobileTelephone && !this.$checkedASCII(this.editModel.MobileTelephone)){
					this.$errorTips(msgASCIIContent, "#txtMobileTelephone");
					return false;
				}	
				if (this.editModel.OfficePhone && !this.$checkedASCII(this.editModel.OfficePhone)){
					this.$errorTips(msgASCIIContent, "#txtOfficePhone");
					return false;
				}
				if (this.editModel.Email && !this.$checkedASCII(this.editModel.Email)){
					this.$errorTips(msgASCIIContent, "#txtEmail");
					return false;
				}
				if (this.editModel.WeChat && !this.$checkedASCII(this.editModel.WeChat)){
					this.$errorTips(msgASCIIContent, "#txtWeChat");
					return false;
				}
				if (this.editModel.MicroBlog && !this.$checkedASCII(this.editModel.MicroBlog)){
					this.$errorTips(msgASCIIContent, "#txtMicroBlog");
					return false;
				}
				if (this.editModel.QQ && !this.$checkedASCII(this.editModel.QQ)){
					this.$errorTips(msgASCIIContent, "#txtQQ");
					return false;
				}

				return true;
			},
			userTypeChange() {	
				//避免在执行open方法进行初始化时，调用change事件出现清空移动电话、Email等信息的情况
				if (this.isFirstChangeUserType){
					this.isFirstChangeUserType = false;
					return;
				}
				//当改变之前的用户类型为职员类型或者本次设置为职员类型时，清空移动电话、Email等信息
				if (this.beforeChangeUserType == 2 || this.editModel.UserType == 2){
					this.clearSettings();
					this.beforeChangeUserType = this.editModel.UserType;
				}	
			},
			handleEmployeeSelect(item) {
				if (!item.EmployeeId){
					this.clearSettings();
					return;
				}
				this.editModel.UsedById = item.EmployeeId;
				this.editModel.AliasName = item.EmployeeName;
				this.$get("/api/plat/employees/" + this.editModel.UsedById, function(res) {
					this.editModel.MobileTelephone = res.MobileTelephone;
					this.editModel.OfficePhone = res.OfficePhone;
					this.editModel.QQ = res.QQ;
					this.editModel.WeChat = res.WeChat;
					this.editModel.MicroBlog = res.MicroBlog;
					this.editModel.Email = res.Email;					
				});
			},
			clearSettings(){
				this.editModel.MobileTelephone = "";
				this.editModel.OfficePhone = "";
				this.editModel.QQ = "";
				this.editModel.WeChat = "";
				this.editModel.MicroBlog = "";
				this.editModel.Email = "";	
				this.editModel.AliasName = "";
				this.editModel.UsedById = "";
			}
		},
		components: {
			"sapi-dialog": dialog,
			"custom-auto": selectEmployeeAuto 
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		},
		created() {
			Vue.use(tips);
			this.visible = this.value;
		},
		mounted() {
			this.visible = this.value;
		}
	}
</script>

<style>
	#txtAliasName {
		width: 100%;
	}
</style>