<template>
	<sapi-dialog v-model="visible" @on-close="close" @on-open="open" :has-max="false" width="420px" top="28%">
		<span slot="title" v-text="title">添加路径</span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<span class="w-45 must-star">路径</span>
				<div class="right-auto-box">
					<el-input id="Path" size="small" v-model.trim="pathModel.Path" :maxlength="500"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-45 text-danger">方法</span>
				<div class="right-auto-box">
					<el-radio-group v-model="pathModel.Method">
						<el-radio v-for="item in resourceMethods" :key="item.id" :label="item">{{item}}</el-radio>
					</el-radio-group>
				</div>
			</div>
			<div class="fullline">
				<span class="w-45 text-danger">行号</span>
				<div class="right-auto-box">
					<el-input v-model="pathModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
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
	import dialog from "@/components/sapi-dialog.vue";
	export default {
		data() {
			return {
				pathModel: {
					Method: "POST",
					Path: "",
					RowIndex: ""
				},
				visible: false,
				disabled: false,
				title: "添加路径",
				resourceMethods:[]
			}
		},
		props: ["value", "option","datas", "index"],
		components: {
			"sapi-dialog": dialog
		},
		methods: {
			validate() {
				if(!this.pathModel.Path) {
					this.$errorTips("请填写路径", "#Path");
					return false;
				}
				var msgASCIIContent = "请输入字母、数字、英文标点及常用特殊字符";
				if(this.pathModel.Path && !this.$checkedASCII(this.pathModel.Path)) {
					this.$errorTips(msgASCIIContent, "#Path");
					return false;
				}

				var datas = JSON.parse(JSON.stringify(this.datas || []));
				//有路径存在，并编辑的路径索引大于-1，就移除编辑之前的路径
				if(datas && datas.length > 0 && this.index.length > 1) {
					datas.splice(this.index[1], 1);
				}
				var path = this.pathModel.Path;
				var method = this.pathModel.Method;
				for(var i = 0, ii = datas.length; i < ii; i++) {
					if(path === datas[i].Path && method === datas[i].Method) {
						Vue.msg("已存在相同路径和方法");
						return false;
					}
				}

				return true;
			},
			comfirm() {
				if(!this.validate()) {
					return;
				}

				var datas = this.datas || [];
				if(this.index.length ===1) {
					datas.push(this.pathModel);
				} else {
					this.$set(datas,this.index[1],this.pathModel);
				}
				//this.$emit("call-back",this.pathModel,1);
				this.close();
			},
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input",false);
			},
			open() {
				if(this.index.length === 1) {
					this.title = "添加路径";
				} else {
					this.title = "修改路径";
				}
				this.pathModel = this.option;
			}
		},
		mounted() {
			this.visible = this.value;
			this.resourceMethods=["POST", "PUT", "DELETE", "GET"];
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