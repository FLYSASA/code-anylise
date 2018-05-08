<template>
	<sapi-dialog v-model="visible" width="500px" top="25%" @on-open="open" @on-close="close">
		<span slot="title">修改客户端</span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<span class="w-105">客户端标识</span>
				<div class="right-client-box">
					<el-input id="txtClientId" size="small" v-model="editModel.ClientId" :maxlength="36" disabled></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-105 must-star">客户端名称</span>
				<div class="right-client-box">
					<el-input id="txtName" size="small" v-model.trim="editModel.Name" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-105 must-star">客户端密钥</span>
				<div class="right-client-box">
					<el-input id="txtClientSecret" size="small" v-model.trim="editModel.ClientSecret" :maxlength="200"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-105 must-star">Token更新时间</span>
				<div class="right-client-box">
					<el-input id="txtRefreshTokenLifeTime" size="small" type="number" :min="1200" :max="172800" v-model="editModel.RefreshTokenLifeTime" v-format.d="{default:1200}">
						<template slot="append">秒</template>
					</el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-105">是否启用</span>
				<div class="right-client-box">
					<el-radio-group v-model="editModel.Enabled">
						<el-radio class="radio" :label="true">启用</el-radio>
						<el-radio class="radio" :label="false">禁用</el-radio>
					</el-radio-group>
				</div>
			</div>
		</div>

		<div class="footer">			
			<el-button size="small" class="default-button" @click="close">取消</el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit">提交</el-button>
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
				editModel: {
					ClientId: "",
					Name: "",
					ClientSecret: "",
					RefreshTokenLifeTime: 36000,
					Enabled: true
				}
			}
		},
		props: ["value", "option"],
		methods: {
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input", false);
			},
			open() {
				//在此进行初始化
				this.getData();
			},
			getData() {
				this.$get("/api/plat/clients/" + this.option.ClientId, function(res) {
					for(var key in this.editModel){
						this.editModel[key]=res[key];
					}
				})
			},
			submit() {
				if(!this.validate()) {
					return;
				}

				this.disabled = true;
				this.$put("/api/plat/clients", this.editModel, function(res) {
					this.disabled = false;
					this.$parent.getTableData();
					this.close();
					Vue.successMsg("修改成功！");
				});
			},
			validate() {
				if(!this.editModel.ClientId) {
					this.$errorTips("请填写客户端标识", "#txtClientId");
					return false;
				} 
				if(!this.$checkedASCII(this.editModel.ClientId)) {
					this.$errorTips("客户端标识应由字母、数字、英文标点及常用特殊字符(@#等)组成", "#txtClientId");
					return false;
				}				
				if(!this.editModel.Name) {
					this.$errorTips("请填写客户端名称", "#txtName");
					return false;
				}
				if(!this.editModel.ClientSecret) {
					this.$errorTips("请填写客户端密钥", "#txtClientSecret");
					return false;
				}
				if(!this.$checkedASCII(this.editModel.ClientSecret)){
					this.$errorTips("客户端密钥应由字母、数字、英文标点及常用特殊字符(@#等)组成", "#txtClientSecret");
					return false;
				}
				if(this.editModel.RefreshTokenLifeTime < 1200 || this.editModel.RefreshTokenLifeTime > 172800){
					this.$errorTips("Token更新时间不在1200-172800范围内", "#txtRefreshTokenLifeTime");
					return false;
				}
				return true;
			}
		},
		components: {
			"sapi-dialog": dialog
		},
		created() {
			Vue.use(tips);
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
	.right-client-box {
		display: inline-block;
		width: calc(100% - 120px);
	}
</style>