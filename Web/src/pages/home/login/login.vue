<template>
	<div>
		<div class="login" @keyup.enter="submit" :style="{'background-image': 'url('+backgroundImage+')'}">
			<div class="login-mask">
				<div class="login-mask-btn"></div>
			</div>
			<div class="login-box">
				<login-body ref="login" :login-logo="loginLogo" class="frosted-glass" v-bind:is="currentView"></login-body>
				<div class="login-box-btn text-center frosted-glass" :class="{disabled:disabled}" @click="submit">{{$t('immediatelyLogin')}}</div>
			</div>
		</div>
		<div class="copyright"><span>&copy;{{$t('caseNumber')}}</span></div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				currentView: "",
				disabled: false,
				backgroundImage: "",
				loginLogo: ""
			}
		},
		props: ["value"],
		components: {
			pc: (resolve) => {
				require(['./login-pc.vue'], resolve);
			},
			wxpc: (resolve) => {
				require(['./login-wx-pc.vue'], resolve);
			}
		},
		methods: {
			submit() {
				if(this.disabled||this.value===true) {
					return;
				}
				var login = this.$refs.login;
				this.$closeWaringTips('.login-box-waring-info');
				if(!login.username) {
					this.$errorTips(this.$t('userNameNotBeEmpty'), "#username");
					return;
				}

				if(!login.password) {
					this.$errorTips(this.$t('passwordNotBeEmpty'), "#password");
					return;
				}

				this.disabled = true;

				var btn = this.$el.querySelector(".login-box-btn");
				var text = btn.innerText;
				var str = "...";
				var icount = 2;
				btn.innerText = this.$t('loggingIn');
				var timeout = setInterval(() => {
					if(this.disabled === false) {
						btn.innerText = text;
						clearInterval(timeout);
						return;
					}
					btn.innerText = this.$t('loggingIn') + str.slice(icount--);
					if(icount === -1) {
						icount = 2;
					}
				}, 400);

				var _this = this;
				this.ajax({
					type: "POST",
					url: globalConfig.baseUrl + "/Authorize",
					data: {
						grant_type: 'password',
						username: login.username,
						password: login.password
					},
					success: function(result) {
						_this.disabled = false;
						if(result) {
							var session = window.sessionStorage;
							
							result = JSON.parse(result);
							for(var key in result) {
								var value = result[key];
								if(typeof value == "object") {
									value = JSON.stringify(value);
								}
								session.setItem(key, value);
							}
							window.location.href = globalConfig.defaultUrl || "./";
							return;
						}

						Vue.msg(this.$t('loginFailed'));
					},
					error: function(err) {
						_this.disabled = false;
						if(!err) {
							Vue.msg(this.$t('networkConnectionError'));
							return;
						}

						var msg = {}
						if(typeof err !== "object") {
							try {
								msg = JSON.parse(err);
							} catch(e) {

							}
						}

						var errorMsg = msg.error_description || this.$t('systemError');

						_this.$waringTips(errorMsg, ".login-box-waring-info");
					}
				});
			},
			ajax() {
				function convertData(data) {
					if(typeof data === 'object') {
						var convertResult = "";
						for(var c in data) {
							convertResult += c + "=" + data[c] + "&";
						}
						convertResult = convertResult.substring(0, convertResult.length - 1);
						return convertResult;
					} else {
						return data;
					}
				}

				var ajaxData = {
					type: arguments[0].type || "GET",
					url: arguments[0].url || "",
					async: arguments[0].async || "true",
					data: arguments[0].data || null,
					dataType: arguments[0].dataType || "text",
					contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
					beforeSend: arguments[0].beforeSend || function() {},
					success: arguments[0].success || function() {},
					error: arguments[0].error || function() {}
				}
				ajaxData.beforeSend();
				var xhr = new XMLHttpRequest();

				//xhr.responseType = ajaxData.dataType;
				xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
				xhr.setRequestHeader("Content-Type", ajaxData.contentType);
				xhr.setRequestHeader("Authorization", globalConfig.authorization);

				xhr.send(convertData(ajaxData.data));
				xhr.timeout ? (xhr.timeout = 115000) : "";
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4) {
						if(xhr.status == 200) {
							ajaxData.success(xhr.response)
						} else {
							ajaxData.error(xhr.response)
						}
					}
				}
				xhr.ontimeout = function(event) {
					Vue.msg(this.$t('networkTimeout'));　　
				}

				xhr.error = function(event) {
					Vue.msg(this.$t('unknownMistake'));　　
				}
			},
			getData() {
				this.$get('/api/plat/configs/applyConfig', function(res) {
					if(!res.LogoSettings){
						localStorage["sysConfigSet"] = JSON.stringify({});
						return;
					}

					var images = res.LogoSettings;
					var localObj = {};
					var baseUrl = (webConfig.staticServer || webConfig.fileServer || globalConfig.baseUrl) + "/";

					if(images[0]&&images[0].FilePath) {
						this.loginLogo = baseUrl + images[0].FilePath.replace(/\\/g, "/");
					}

					if(images[1]&&images[1].FilePath) {
						localObj.indexLogo = baseUrl + images[1].FilePath.replace(/\\/g, "/");
					}

					if(images[2]&&images[2].FilePath) {
						localObj.mainLogo = baseUrl + images[2].FilePath.replace(/\\/g, "/");
					}

					if(images[3]&&images[3].FilePath) {
						this.backgroundImage = baseUrl + images[3].FilePath.replace(/\\/g, "/");
					}

					if(images[4]&&images[4].FilePath) {
						localObj.mainBg = baseUrl + images[4].FilePath.replace(/\\/g, "/");
					}
					
					if(images[5]&&images[5].FilePath) {
						localObj.loading = baseUrl + images[5].FilePath.replace(/\\/g, "/");
					}

					this.$nextTick(function() {
						setTimeout(() => {
							delete res.LogoSettings;
							Object.assign(localObj, res);
							localStorage["sysConfigSet"] = JSON.stringify(localObj);
						}, 100);
					});
				});
			}
		},
		created() {
			switch(globalConfig.loginMode) {
				case 1:
					this.currentView = "pc";
					break;
				case 3:
					this.currentView = "wxpc";
					break;
				default:
					this.currentView = "pc";
			}
			if(this.value === true) {
				return;
			}

			this.getData();
		},
		mounted() {
			if(this.value === true) {
				return;
			}
			window.sessionStorage.setItem("baseUrl", globalConfig.baseUrl);

			//清除缓存
			localStorage.clear();
			this.$loadingClose();
			this.$setTitle(this.$t('userLogin'));
		}
	}
</script>

<style scoped>

</style>