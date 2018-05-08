<template>
	<sapi-dialog class="preview-dialog" :class="{'login-active':isNext===true}" v-model="visible" width="100%" height="100%" :has-max="false" top="0px">
		<span slot="title">界面预览</span>
		<component :is="currentView" v-model="visible" :option="currentOption"></component>
		<div class="footer">
			<el-button size="small" :disabled="isNext===true" @click="nextClick(true)">上一个</el-button>
			<el-button size="small" @click="close">关闭</el-button>
			<el-button size="small" :disabled="isNext===false" @click="nextClick(false)">下一个</el-button>
		</div>
	</sapi-dialog>
</template>

<script>
	import dialog from "@/components/sapi-dialog.vue";
	import login from "@/pages/home/login/login.vue";
	export default {
		data() {
			return {
				visible: true,
				currentView: "login-view",
				isNext: true,
				isVisible: false,
				currentOption: null
			}
		},
		props: ["option"],
		components: {
			"sapi-dialog": dialog,
			"login-view": login,
			"index-view": (resolve) => {
				require(['./main-body.vue'], resolve);
			}
		},
		methods: {
			init() {
				var obj = this.option || [];
				this.$nextTick(() => {
					setTimeout(() => {
						var baseUrl = (webConfig.staticServer || webConfig.fileServer || globalConfig.baseUrl) + "/";
						var loginBg = obj[3][0];
						if(loginBg) {
							var dom = this.$el.querySelector(".login");
							var url = "url(" + baseUrl + loginBg.FilePath.replace(/\\/g, "/") + ")";
							dom.style.backgroundImage = url;
						}

						var loginLogo = obj[0][0];
						if(loginLogo) {
							var loginDom = this.$el.querySelector(".login-box-logo");
							var url = "url(" + baseUrl + loginLogo.FilePath.replace(/\\/g, "/") + ")";
							loginDom.style.backgroundImage = url;
						}
					},50);
				})

			},
			close() {
				this.visible = false;
			},
			nextClick(flag) {
				this.isNext = flag;
				if(flag === false) {
					var obj = this.option || [];
					var logo = obj[1][0] || {};
					var mainBg = obj[4][0] || {};

					this.currentOption = {
						indexLogo: logo.FilePath,
						indexBg: mainBg.FilePath
					}
					this.currentView = "index-view";
				} else {
					this.currentView = "login-view";
					this.init();
				}
			}
		},
		mounted(){
			this.init();
		},
		watch: {
			visible(val) {
				this.$emit("call-back");
			}
		}
	}
</script>
<style>
	@import url("../../../home/css/login.css");
	@import url("../../../home/css/index.css");

	.preview-dialog {
		background: #fff;
	}
	
	.preview-dialog .dialog-box-body {
		margin: 0;
		padding: 0;
	}
	
	.preview-dialog .dialog-box-header {
		display: none;
	}
	
	.preview-dialog.login-active>.dialog-box {
		background: #fff!important;
	}
</style>