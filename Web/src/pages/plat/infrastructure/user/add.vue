<template>
	<sapi-dialog v-model="visible" width="700px" top="26%" class="add" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('user.addUserTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('user.userName')"></span>
					<div class="right-auto-box">
						<el-input id="txtUserName" v-model.trim="createModel.UserName" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('user.userStatus')"></span>
					<div class="right-auto-box">
						<el-radio-group v-model="createModel.Enabled">
							<el-radio :label="true">{{$t("user.userStatusData.enabled")}}</el-radio>
							<el-radio :label="false">{{$t("user.userStatusData.disabled")}}</el-radio>
						</el-radio-group>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('user.userType')"></span>
					<div class="right-auto-box">
						<el-select v-model="createModel.UserType" @change="userTypeChange">
							<el-option v-for="item in userTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65 must-star" v-text="$t('user.aliasName')"></span>
					<div class="right-auto-box">
						<el-input v-if="createModel.UserType!=2" id="txtAliasName" v-model="createModel.AliasName" :maxlength="100">
						</el-input>
						<custom-auto id="txtAliasName" v-else @select="handleEmployeeSelect" v-model="createModel.AliasName"></custom-auto>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('user.mobileTelephone')"></span>
					<div class="right-auto-box">
						<el-input id="txtMobileTelephone" v-model.trim="createModel.MobileTelephone" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('user.officePhone')"></span>
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
					<span class="w-65" v-text="$t('user.weChat')"></span>
					<div class="right-auto-box">
						<el-input id="txtWeChat" v-model.trim="createModel.WeChat" :maxlength="100"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('user.microBlog')"></span>
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
						<el-input v-model="createModel.RowIndex" :min="0" :max="999999999" v-format.d="{default:0}"></el-input>
					</div>
				</div>
			</div>
		</div>

		<div class="footer">
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button size="small" class="blue-button" :disabled="disabled" @click="submit" v-text="$t('submit')"></el-button>
		</div>
	</sapi-dialog>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
	import directive from "@/components/sapi-directive-input.js";
	import dialog from "@/components/sapi-dialog.vue";
	import selectEmployeeAuto from "../../components/employee-autocomplete.vue";
	export default {
		data() {
			return {
				disabled: false,
				visible: false,
				beforeChangeUserType: 2, //改变之前的用户类型，默认值为2
				createModel: {
					UserType: 2,
					Enabled: true,
					AliasName: ""
				},
				userTypeOptions: [
					{
						label: this.$t("user.userTypeData.employee"),
						value: 2
					},
					{
						label: this.$t("user.userTypeData.other"),
						value: 3
					}
				],
			}
		},
		props: ["value"],
		methods: {
			open() {
				this.$get("/api/plat/users/maxRowIndex", function(res) {
					this.createModel = {
						UserName: "",
						AliasName: "",
						UserType: 2,
						Enabled: true,
						UsedById: "",
						MobileTelephone: "",
						OfficePhone: "",
						QQ: "",
						WeChat: "",
						MicroBlog: "",
						Email: "",
						RowIndex: res
					}
				});
			},
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input", false);
			},
			submit() {
				this.$closeWaringTips(".form-error-tips");
				//因员工选择控件中延迟150，故此处延迟大于150		
				if(!this.validate()) {
					return;
				}
				this.disabled = true;
				this.$post("/api/plat/users/", this.createModel, function(res) {
					this.disabled = false;
					this.$parent.loadData();
					this.close();
					Vue.successMsg(this.$t("user.addUserSuccess"));
				});
			},
			validate() {
				if(!this.createModel.UserName) {
					this.$errorTips(this.$t("user.userNameNotBeEmpty"), "#txtUserName");
					return false;
				}
				//职员类型并且UsedById为空
				if(this.createModel.UserType == 2 && !this.createModel.UsedById) {
					this.$errorTips(this.$t("user.selectEmployeePlease"), "#txtAliasName");
					return false;
				}
				if(!this.createModel.AliasName) {
					this.$errorTips(this.$t("user.aliasNameNotBeEmpty"), "#txtAliasName");
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
			userTypeChange() {
				//当改变之前的用户类型为职员类型或者本次设置为职员类型时，清空移动电话、Email、用户实名等信息
				if(this.beforeChangeUserType == 2 || this.createModel.UserType == 2) {
					this.clearSettings();
					this.beforeChangeUserType = this.createModel.UserType;
				}
			},
			handleEmployeeSelect(item) {
				if(!item.EmployeeId) {
					this.clearSettings();
					return;
				}
				this.createModel.UsedById = item.EmployeeId;
				this.createModel.AliasName = item.EmployeeName;
				this.$get("/api/plat/employees/" + this.createModel.UsedById, function(res) {
					this.createModel.MobileTelephone = res.MobileTelephone;
					this.createModel.OfficePhone = res.OfficePhone;
					this.createModel.QQ = res.QQ;
					this.createModel.WeChat = res.WeChat;
					this.createModel.MicroBlog = res.MicroBlog;
					this.createModel.Email = res.Email;
				});
			},
			clearSettings() {
				this.createModel.MobileTelephone = "";
				this.createModel.OfficePhone = "";
				this.createModel.QQ = "";
				this.createModel.WeChat = "";
				this.createModel.MicroBlog = "";
				this.createModel.Email = "";
				this.createModel.AliasName = "";
				this.createModel.UsedById = "";
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
			Vue.use(directive);
			this.visible = this.value;
		},
		mounted() {
			this.visible = this.value;
		}
	}
</script>

<style>
	.autoFill {
		display: inline-block;
		width: calc(100% - 115px);
	}
</style>