<template>
	<sapi-dialog v-model="visible" width="420px" top="18%" @on-open="open" @on-close="close">
		<span slot="title" v-text="title"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<span class="w-65 must-star">类型编码</span>
				<div class="right-auto-box">
					<el-input id="DealTypeId" v-model.trim="handleUrlModel.DealTypeId" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65 must-star">类型名称</span>
				<div class="right-auto-box">
					<el-input id="DealTypeName" size="small" v-model.trim="handleUrlModel.DealTypeName" :maxlength="30"></el-input>
				</div>

			</div>
			<div class="fullline">
				<span class="w-65 must-star">处理路径</span>
				<div class="right-auto-box">
					<el-input id="DealUrl" type="textarea" :autosize="{minRows:2, maxRows:2}" v-model.trim="handleUrlModel.DealUrl" :maxlength="1000"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65 lh-30">行号</span>
				<div class="right-auto-box">
					<el-input v-model="handleUrlModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
				</div>
			</div>
		</div>

		<div class="footer">
			<el-button size="small" class="default-button" @click="close">取消</el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="comfirm">确定</el-button>
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
				handleUrlModel: { //处理路径
					DealTypeId: "",
					DealTypeName: "",
					DealUrl: "",
					RowIndex: "10"
				}
			}
		},
		props: ["value", "title", "option"],
		methods: {
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit('input', false);
			},
			open() {
				//每次新增先清空路径数据
				this.handleUrlModel.DealTypeId = "";
				this.handleUrlModel.DealTypeName = "";
				this.handleUrlModel.DealUrl = "";
				this.handleUrlModel.RowIndex = "10";
				//this.dealTypeIdIsSystem = false;
			},
			validate() {
				var dealTypeIdReg = new RegExp(/[\u4e00-\u9fa5]+/)
				//校验处理类型编码
				if(!this.handleUrlModel.DealTypeId) {
					this.$errorTips("请填写类型编码", "#DealTypeId");
					return false;
				} else {
					if(dealTypeIdReg.test(this.handleUrlModel.DealTypeId)) {
						this.$errorTips("类型编码不能含有中文", "#DealTypeId");
						return false;
					}
					if(this.checkDealTypeIdIsExists(this.handleUrlModel.DealTypeId)) {
						this.$errorTips("类型编码已存在", "#DealTypeId");
						return false;
					}
				}
				//校验处理类型名称
				if(!this.handleUrlModel.DealTypeName) {
					this.$errorTips("请填写类型名称", "#DealTypeName");
					return false;
				}
				//校验处理路径
				if(!this.handleUrlModel.DealUrl) {
					this.$errorTips("请填写处理路径", "#DealUrl");
					return false;
				}
				return true;
			},
			//校验类型编码是否已存在
			checkDealTypeIdIsExists: function(val) {
				var isExists = false;
				var handleUrls = this.option.HandleUrls;
				console.log(handleUrls)
				if(handleUrls && handleUrls.length > 0) {
					for(var i = 0, ii = handleUrls.length; i < ii; i++) {
						var handleUrl = handleUrls[i];
						if(handleUrl&&handleUrl.DealTypeId == val) {
							isExists = true;
							break;
						}
					}
				}
				return isExists;
			},
			comfirm() {
				if(this.validate()) {
					this.$emit('callback', JSON.parse(JSON.stringify(this.handleUrlModel)));
					this.close();
				}
			},
		},
		components: {
			"sapi-dialog": dialog
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

<style>

</style>