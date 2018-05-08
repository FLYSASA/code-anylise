<template>
	<sapi-dialog v-model="visible" width="500px" top="16%" class="add"  @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('basic.editTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<span class="w-75" v-text="$t('basic.aliasName')"></span>
				<span class="right-person-box">
					<el-input v-model="editModel.AliasName" disabled></el-input>
				</span>
			</div>
			<div class="fullline">
				<span class="w-75" v-text="$t('basic.userName')"></span>
				<span class="right-person-box">
					<el-input v-model="editModel.UserName" disabled></el-input>
				</span>
			</div>			
			<div class="fullline">
				<span class="w-75" v-text="$t('basic.mobileTelephone')"></span>
				<span class="right-person-box">
					<el-input id="txtMobileTelephone" v-model="editModel.MobileTelephone" :maxlength="100"></el-input>
				</span>
			</div>
			<div class="fullline">
				<span class="w-75" v-text="$t('basic.officePhone')"></span>
				<span class="right-person-box">
					<el-input id="txtOfficePhone" v-model="editModel.OfficePhone" :maxlength="100"></el-input>
				</span>
			</div>
			<div class="fullline">
				<span class="w-75">Email</span>
				<span class="right-person-box">
					<el-input id="txtEmail" v-model="editModel.Email" :maxlength="100"></el-input>
				</span>
			</div>
			<div class="fullline">
				<span class="w-75" v-text="$t('basic.weChat')"></span>
				<span class="right-person-box">
					<el-input id="txtWeChat" v-model="editModel.WeChat" :maxlength="100"></el-input>
				</span>
			</div>
			<div class="fullline">
				<span class="w-75" v-text="$t('basic.microBlog')"></span>
				<span class="right-person-box">
					<el-input id="txtMicroBlog" v-model="editModel.MicroBlog" :maxlength="100"></el-input>
				</span>
			</div>	
			<div class="fullline">
				<span class="w-75">QQ</span>
				<span class="right-person-box">
					<el-input id="txtQQ" v-model="editModel.QQ" :maxlength="100"></el-input>
				</span>
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
	export default {
		data() {
			return {
				disabled: false,
				visible: false,
				editModel: {}
			}
		},
		props: ["value","option"],
		methods: {
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input", false);
			},
			open() {
				if(this.option && typeof this.option === "object") {
					this.editModel = JSON.parse(JSON.stringify(this.option));
					console.log(this.editModel)
				} else {
					this.editModel = this.option;
				}
			},
			submit() {
				if(!this.validate()) {
					return;
				}

				this.disabled = true;
				this.$put('/api/plat/users/basic', this.editModel, function(res) {
					this.disabled = false;
					this.close();
					this.$parent.getUser();
					Vue.successMsg(this.$t('basic.editBasicInfoSuccess'));
					var userData=JSON.parse(sessionStorage.getItem('basicInfo'));
					userData.Email=this.editModel.Email;
					sessionStorage["basicInfo"]=JSON.stringify(userData);
				})
			},
			validate() {
				// /*汉字*/
				// var regCn=/[\u4e00-\u9fa5]+/g;
				// /*特殊字符*/
				// var regEn = /[`~!#$%^&*()_+<>?:"{},\/;'[\]]/im;
				// /*非单字节字符*/
				// var regSin=/[^\u0000-\u00FF]/g;
				
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
			}
		},
		components: {
			"sapi-dialog": dialog
		},
		watch: {
			value(val) {
				this.visible = this.value;
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
	.right-person-box {
		display: inline-block;
		width: calc(100% - 80px);
	}
</style>