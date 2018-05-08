<template>
	<div class="account">
		<div class="account-positon">
			<p v-show="false">{{$t('account.desc.0')}}<a href="#">{{$t('account.desc.1')}}</a></p>
			<p>{{$t('account.desc.2')}}</p>
			<div class="fullline">
				<span class="w-90 must-star" v-text="$t('account.oldPassword')"></span>
				<span class="right-pw-box">
					<el-input type="password" id="OriginalPassword" v-model="editModel.OriginalPassword" :minlength="6" :maxlength="20"></el-input>
				</span>
			</div>
			<div class="fullline">
				<span class="w-90 must-star" v-text="$t('account.newPassword')"></span>
				<span class="right-pw-box">
					<el-input type="password" id="NewPassword" v-model="editModel.NewPassword" :minlength="6" :maxlength="20"></el-input>
				</span>
			</div>
			<div class="fullline">
				<span class="w-90 must-star" v-text="$t('account.confirmPassword')"></span>
				<span class="right-pw-box">
					<el-input type="password" id="ConfirmPassword" v-model="editModel.ConfirmPassword" :minlength="6" :maxlength="20"></el-input>
				</span>
			</div>

			<div class="btn-box text-center">
				<!--<el-button class="padding-button" size="small" @click="cancel">取消</el-button>-->
				<el-button class="blue-button padding-button" size="small" @click="save" v-text="$t('save')"></el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
	export default{
		data(){
			return {
				editModel: {
					OriginalPassword: "",
					NewPassword: "",
					ConfirmPassword: ""
				}
			}
		},
		methods:{
			save() {
				if(this.validate()) {
					this.$put('/api/plat/users/password', this.editModel, function(res) {
						Vue.successMsg(this.$t('account.passwordChangeSuccess'));
					},function (err) {
						if(err.Code == 101003) {
							this.$errorTips(this.$t('account.code.'+err.Code), '#OriginalPassword');
						} else {
							Vue.errorMsg(this.$t('account.code.'+err.Code));
						}
					})
				}
			},
			validate() {
				//校验原始密码
				if(!this.editModel.OriginalPassword) {
					this.$errorTips(this.$t('account.oldPasswordNotBeEmpty'), '#OriginalPassword');
					return false;
				} else {
					if(/\s/.test(this.editModel.OriginalPassword)) {
						this.$errorTips(this.$t('account.oldPasswordNotBeSpace'), '#OriginalPassword');
						return false;
					}
				}
				//校验新密码
				var newPswd = this.editModel.NewPassword;
				if(!newPswd) {
					this.$errorTips(this.$t('account.newPasswordNotBeSpace'), '#NewPassword');
					return false;
				} else {
					if(/\s/.test(newPswd)) {
						this.$errorTips(this.$t('account.newPasswordNotBeSpace'), '#NewPassword');
						return false;
					}
					if(newPswd.length < 6 || newPswd.length > 20) {
						this.$errorTips(this.$t('account.passwordLength'), '#NewPassword');
						return false;
					}
				}
				//校验重复密码
				var repeatPwd = this.editModel.ConfirmPassword;
				if(!repeatPwd) {
					this.$errorTips(this.$t('account.confirmPasswordNotBeEmpty'), '#ConfirmPassword');
					return false;
				} else {
					if(repeatPwd != newPswd) {
						this.$errorTips(this.$t('account.passwordDissimilarity'), '#ConfirmPassword');
						return false;
					}
				}

				return true;
			},
			/*cancel(){
				this.editModel={};
			}*/
		},
		created(){
			Vue.use(tips);
		}
	}
</script>

<style>
	.account{
		width: 100%;
		height: 100%;
		text-align: center;
		padding-top: 50px;
	}
	.account>.account-positon{
		width: 478px;
		display: inline-block;
	}
	.account>.account-positon>p{
		font-weight: bold;
		font-size: 14px;
		color: #222222;
		margin-bottom: 30px;
		text-align: left;
	}
	.account-positon>.fullline>span:first-child{
		text-align: left;
	}
	.account .right-pw-box {
		display: inline-block;
		width: calc(100% - 95px);
	}
</style>