<template>
	<sapi-dialog v-model="visible" :has-max="false" :width="width||initWidth" top="28%" @on-close="close">
		<span slot="title" v-text="title"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<div class="mb-20">
					<span class="w-65 f-14 float-left" v-text="$t('selectFile')"></span>
					<div class="right-auto-box">
						<el-upload id="filePath" action="" class="upload-input" :multiple="false" :on-change="change" :auto-upload="false" :show-file-list="false" :file-list="[]">
							<el-input class="file-input" readonly v-model="filePath">
							</el-input>
							<el-button class="preview-btn" type="small" v-text="$t('browse')"></el-button>
						</el-upload>
					</div>
				</div>
				<div class="mb-20">
					<span class="w-65"></span>
					<div class="right-auto-box text-gray">
						<slot></slot>
					</div>
				</div>
			</div>
		</div>

		<div class="footer">
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button size="small" class="blue-button" :disabled="disabled" @click="confirm" v-text="$t('determine')"></el-button>			
		</div>
	</sapi-dialog>
</template>

<script>
	var timeout;
	import tips from "@/components/sapi-tips.js";
	import dialog from "@/components/sapi-dialog.vue";
	import importLocale from "@/static/js/importLocale.js";
	import {main,base} from "@/components/locale-component.js";
	export default {
		data() {
			return {
				disabled: false,
				visible: false,
				importModel: {},
				filePath: "",
				file: {},
				initWidth:'440px'
			}
		},
		props: ["value", "size", "type","title","confirmApi","width"],
		methods: {
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input", false);
			},
			confirm() {
				this.$closeWaringTips(".form-error-tips");
				if(this.validate()) {
					var url=this.confirmApi;
					var formdata = new FormData();
					formdata.append("file", this.file.raw);
					this.disabled=true;
					this.$loadingOpen(); 
					this.$request({
						method: "post",
						url: url,
						data: formdata,
						headers: {
							"Content-Type": "multipart/form-data"
						}
					}, function(res) {
						this.close();
						this.$loadingClose();
						this.$emit("callback");
						Vue.successMsg(this.$t('uploadSuccess'));
					},
					function(){
						this.$loadingClose();
					});
				}
			},
			validate() {
				if(!this.filePath) {
					this.$errorTips(this.$t('baseImport.fileNameNotBeEmpty'), "#filePath");
					return false;
				}

				return true;
			},
			change: function(file, fileList) {
				if(this.type) {
					var types = this.type.split(",").join("$|") + "$";
					var reg = new RegExp(types, "ig");

					if(!reg.test(file.name)) {
						this.$el.querySelector("input[type='file']").value = "";
						fileList.length = 0;
						this.$closeWaringTips('.form-error-tips');
						Vue.errorMsg(this.$t('baseImport.unableUploadWhenFileFormatInvalid'));
						return false;
					}
				}

				if(this.size) {
					if(this.size * 1024 < file.size) {
						fileList.length = 0;
						this.$el.querySelector("input[type='file']").value = "";
						this.$closeWaringTips('.form-error-tips');
						Vue.errorMsg(this.$t('baseImport.unableUploadWhenFileMoreThanSize',{size:this.size}));
						return false;
					}
				}

				this.file = file;
				this.filePath = file.name;
				this.$el.querySelector(".upload-input input[type='file']").value = "";
				fileList.length = 0;

			}
		},
		components: {
			"sapi-dialog": dialog
		},
		created() {
			!Vue.toLocale&&Vue.use(importLocale);
			let obj=Object.assign({},main,base);
			Vue.toLocale(obj);
			
			Vue.use(tips);			
		},
		watch: {
			value(val) {
				this.visible = val;
				if(val === true) {
					this.file = {};
					this.filePath = "";
				}
			}
		}
	}
</script>

<style>
	.upload-input>.el-upload {
		width: 100%;
	}
	.upload-input .el-input{
		width: calc(100% - 66px);
		vertical-align: top;
	}
	.upload-input .preview-btn{
		vertical-align: top;
		padding: 7px 10px;
	}
	.upload-input .el-input>.el-input__inner{
		width: 100%;
	}
	.file-input>.el-input__inner[readonly]{
		border-color: rgb(191, 203, 217);
	}
</style>