<template>
	<div class="content-wrap">
		<div class="main-header">
			<div class="main-header-map"><span class="main-header-map-text"></span></div>
		</div>
		<!--数据区-->
		<div class="box-container form-collapses config-box">
			<div class="form-collapses-item" :class="{'item-hide':collapseFlag[0]}" v-for="item in configContentData" :key="item.id">
				<p class="form-collapses-title" @click="tabClick(0)">{{item.configTitle}}<i class="slide-arrow el-icon-arrow-down"></i></p>
				<div class="form-collapses-content">
					<div class="detail-box" v-show="item.isOpen" v-for="child in item.detailData" :key="child.id">
						<div class="detail-item">
							<span class="w-260 item-title" v-text="child.title"></span>
							<!--多选框-->
							<span class="right-form-box" v-if="child.type=='checkbox'">
							<el-checkbox-group v-model="formModel[child.propName]" >
								<el-checkbox v-for="data in child.chooseItems" :key="data.id" :label="data.id">{{data.name}}</el-checkbox>
							</el-checkbox-group>
							</span>
							<!--单选-->
							<span class="right-form-box" v-else-if="child.type=='radio'">
								<el-radio v-for="data in child.chooseItems" :key="data.id"  v-model="formModel[child.propName]" :label="data.id">{{data.name}}</el-radio>
							</span>
							<!--数字输入框-->
							<span class="w-200" v-else-if="child.type=='input-number'">
								<el-input v-model="formModel[child.propName]"  :step="child.chooseItems.step" :min="child.chooseItems.min" :max="child.chooseItems.max" v-format.d="{default:child.chooseItems.min}">
								</el-input>
							</span>
							<!--文本输入框-->
							<span class="right-form-box" v-else-if="child.type=='input-text'">
								<el-input class="w-200"  v-model="formModel[child.propName]"></el-input>
							</span>
							<!--密码输入框-->
							<span class="right-form-box" v-else-if="child.type=='input-text-pwd'">
								<div class="w-200">
									<el-input id="pwdId" v-show="!child.canBeSee" class="w-200" type="password"  v-model="formModel[child.propName]"></el-input>
									<el-input v-show="child.canBeSee" class="w-200"  v-model="formModel[child.propName]"></el-input>
									<span :class="child.canBeSee?'pwd-openeye':'pwd-closeeye'" @click="child.canBeSee = !child.canBeSee"></span>
						</div>
						</span>
						<!--下拉框-->
						<span class="right-form-box" v-else-if="child.type=='select'">
								<el-select class="w-200"  v-model="formModel[child.propName]" clearable placeholder="请选择">
									<el-option v-for="item in child.chooseItems" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</span>
					</div>
					<div class="clearfix" style="height: 20px;"></div>
				</div>
			</div>
		</div>

		<div class="form-collapses-item item-pading" :class="{'item-hide':collapseFlag[1]}">

			<p class="form-collapses-title" @click="tabClick(1)">界面设置<i class="slide-arrow el-icon-arrow-down"></i></p>
			<div class="form-collapses-content">
				<div class="detail-item">
					<span class="w-260 item-title">布局</span>
					<div class="right-form-box">
						<el-radio v-model="formModel.DefaultWebLayout" label="default">默认布局</el-radio>
					</div>
				</div>
				<div class="detail-item">
					<span class="w-260 item-title">主题</span>
					<div class="right-form-box">
						<el-radio v-model="formModel.DefaultWebTheme" label="default">默认</el-radio>
					</div>
				</div>
				<div class="detail-item">
					<span class="w-260 item-title">字体</span>
					<div class="right-form-box">
						<el-radio v-model="formModel.DefaultFontSize" label="default">小号(默认)</el-radio>
						<el-radio v-model="formModel.DefaultFontSize" label="medium">中号</el-radio>
						<el-radio v-model="formModel.DefaultFontSize" label="large">大号</el-radio>
					</div>
				</div>
				<div class="detail-item">
					<span class="w-260 item-title quick-menu-title">快捷菜单</span>
					<div class="right-form-box">
						<div class="fullline">
							<span class="w-65">是否开启：</span>
							<div class="right-auto-box">
								<el-checkbox v-model="IsEnabled" ></el-checkbox>
							</div>
						</div>
						<sapi-select-btn :readonly="!IsEnabled" v-model="quickMenus" height="60px" :has-more="true" :props="props" @on-click="openMenus"></sapi-select-btn>
					</div>
				</div>

				<div class="detail-item" v-for="(item,index) in imagesSetting">
					<span class="w-260 item-title">
							{{item.title}}
							<i class="image-ask" v-show="item.content" @mouseover="overHandler(item,$event)" @mouseout="outHandler(item,$event)"></i>
						</span>
					<div class="right-form-box">
						<div class="right-auto-box">
							<sapi-upload :count="1" :is-resource="true" :type="item.type" :size="item.size" :has-load="false" :has-date="false" v-model="imagesModel[index]"></sapi-upload>
						</div>
						<a v-show="item.view" class="w-65 look-link" @click.stop="viewHandler(item.view)">查看示例</a>
					</div>
				</div>

				<div class="detail-item">
					<span class="w-260 item-title">界面预览</span>
					<div class="right-form-box">
						<el-button class="default-button" type="default" size="small" @click="preview">点击预览</el-button>
					</div>
				</div>
			</div>
		</div>

	</div>

	<!--按钮区-->
	<div class="fix-btn-box">
		<el-button class="sapi-button padding-button default-button" type="default" size="small" @click="factoryReset">恢复出厂设置</el-button>
		<el-button class="reset-btn padding-button" type="default" size="small" @click="cancelSet">撤销本次修改</el-button>
		<el-button class="save-btn padding-button" :disabled="disabled" type="primary" size="small" @click="submitForm('ruleForm')">保存</el-button>
	</div>

	<img class="image-img" src="" />

	<div class="tips-msg" :class="{active:activeMsg}" :style="styleCss">
		<span class="tips-msg-text" v-html="msgText"></span>
		<span class="tips-msg-arrow up"></span>
	</div>

	<component :is="currentView" :option="option" @call-back="callback"></component>
	</div>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
	import upload from "@/components/sapi-upload.vue";
	import confirm from "@/components/sapi-confirm.js";

	import selectBtn from "@/components/sapi-select-btn.vue";
	import "@/static/css/sapi-form-tab.css";
	
	/*import '@/pages/home/css/index.css';*/
	export default {
		data() {
			return {
				msgText: "",
				activeMsg: false,
				styleCss: {},
				configContentData: JSON.parse(JSON.stringify(configContentData)),
				formModel: {
					DefaultWebTheme: "default",
					DefaultWebLayout: "default",
					DefaultFontSize: "default",
					QuickMenuSetting:{},
					LogoSettings: []
				},
				collapseFlag: {
					0: false,
					1: false
				},
				disabled:false,
				IsEnabled: true,
				defaultConfig: {},
				loginLogo: [],
				mainLogo: [],
				loginBg: [],
				mainBg: [],
				loading: [],
				param: {
					type: "data"
				},
				props: {
					value: "MenuId",
					label: "MenuName"
				},
				option: null,
				quickMenus: [],
				currentView: "",
				imagesModel: [
					[],
					[],
					[],
					[],
					[],
					[]
				],
				imagesSetting: [{
						title: "登录页LOGO",
						content: "图片格式为png，切图尺寸为W：238px；H：90px。",
						type: ".png",
						size: "",
						view: "1"
					},
					{
						title: "首页LOGO",
						content: "图片格式为png，切图尺寸为H：90px，宽度建议在500px以内。",
						type: ".png",
						size: "",
						view: "2"
					},
					{
						title: "二级页面LOGO",
						content: "图片格式为png，切图尺寸为H：50px，宽度建议在500px以内。",
						type: ".png",
						size: "",
						view: "3"
					},
					{
						title: "登录页背景",
						content: "背景图尺寸分辨率1600*900，文件大小为500KB以内，尽可能保证图片清晰。",
						type: ".jpg,.gif,.png,.jpeg,.svg",
						size: 500
					},
					{
						title: "主页面背景",
						content: "背景图尺寸分辨率1600*900，格式为jpg，文件大小为500KB以内，尽可能保证图片清晰。",
						type: ".jpg,.jpeg",
						size: 500
					},
					{
						title: "Loading(gif动画)",
						content: "",
						type: ".gif",
						size: ""
					}
				],
				viewImages: {
					1: require("../../../../static/images/login-logo-image.jpg"),
					2: require("../../../../static/images/index-logo-image.jpg"),
					3: require("../../../../static/images/main-logo-image.jpg")
				}
			}
		},
		components: {
			"sapi-upload": upload,
			"sapi-menu": (resolve) => {
				require(['./setQuickMenu.vue'], resolve);
			},
			"preview": (resolve) => {
				require(['./preview.vue'], resolve);
			},
			"sapi-select-btn": selectBtn,

		},
		methods: {
			getQuickMenus() {
				if(!this.formModel.QuickMenuSetting) {
					return;
				}

				var obj = this.formModel.QuickMenuSetting;
				this.IsEnabled = obj.IsEnabled;
				var quickMenus = obj.List || [];
				var ref = this.$root.$refs.header;
				var datas = [];
				quickMenus.forEach((id) => {
					var data = ref.getCurrentMenu(id);
					if(data.MenuId) {
						datas.push(data);
					}
				});

				this.quickMenus = datas;
			},
			getData() {
				this.$get('/api/plat/configs', function(res) {
					if(!res) {
						return;
					}

					this.formModel = res;

					this.getQuickMenus();

					if(!this.formModel.LogoSettings) {
						return;
					}

					var images = this.formModel.LogoSettings;
					var datas = this.imagesModel;
					images.forEach((item, index) => {
						if(item && item.FilePath) {
							datas[index] = [item];
						}
					});
					//console.log(datas)
				});
			},
			submitForm(formName) {
				if(!this.validate(this.formModel.UserInitialPassword)) {
					return;
				} else {
					this.saveSet();
				};
			},
			callback(datas) {
				if(datas) {
					this.quickMenus = datas;
				}
				this.currentView = "";
			},
			preview() {
				this.currentView = "preview";
				this.option = this.imagesModel;
			},
			openMenus() {
				this.currentView = "sapi-menu";
				this.option = this.quickMenus;
			},
			saveSet() {
				var content = "请确认是否需要保存本次修改？";
				var keys = [];
				this.quickMenus.forEach((item) => {
					keys.push(item.MenuId);
				});
				var menus = {
					IsEnabled: this.IsEnabled,
					List: keys
				}
				this.formModel.QuickMenuSetting = menus;
				var images = [];
				this.imagesModel.forEach((item) => {
					images.push(item[0] || {});
				});

				this.formModel.LogoSettings = images;

				this.$confirmTips(content, function() {
					this.$put('/api/plat/configs', this.formModel, function(res) {
						Vue.successMsg("保存成功，需重新登录，才能生效。");
						this.getData();
					});
				});
			},
			factoryReset() {
				var content = "请确认是否需要恢复出厂设置？";
				this.$confirmTips(content, function() {
					this.$put('api/plat/configs/initConfig', {}, function(res) {
						Vue.successMsg("恢复出厂设置成功，需重新登录，才能生效。");
						this.getData();
					});
				});
			},
			cancelSet() {
				this.getData();
			},
			validate(value) {
				if(!value) {
					this.$errorTips('请输入初始密码', '#pwdId');
					return false;
				} else if(value.indexOf(' ') != -1) {
					this.$errorTips('密码不能使用空格', '#pwdId');
					return false;
				} else if(escape(value).indexOf("%u") > -1) {
					this.$errorTips('密码不能使用汉字', '#pwdId')
					return false;
				} else if(value.length < 6 || value.length > 20) {
					this.$errorTips('密码长度在 6 到 20 个字符', '#pwdId')
					return false;
				}
				return true;
			},
			tabClick(index) {
				this.collapseFlag[index] = !this.collapseFlag[index];
			},
			overHandler(item, e) {
				if(!item.content) {
					return;
				}
				this.msgText = item.content;
				this.activeMsg = true;
				var left = e.target.offsetLeft - 25 + "px";
				this.styleCss.top = e.clientY - 25 + "px";
				this.styleCss.left = left;
			},
			outHandler(item, e) {
				this.activeMsg = false;
			},
			viewHandler(index) {
				Vue.setImagePrew(this.viewImages[index]);
			}
		},
		created() {
			this.$init();
			this.getData();
			Vue.use(tips);
			Vue.use(confirm);
		}
	}

	//配置项
	// type: radio单选 ；checkbox多选 ； input-number数字输入框 ； input-text文本输入框 ；select为下拉框
	var configContentData = [{
		configTitle: "系统设置",
		isOpen: true, //是否展开
		detailData: [{
				title: "语言",
				propName: "DefaultLanguage",
				type: "radio",
				chooseItems: [{
					name: "中文",
					id: "zh-cn"
				}, {
					name: "英文",
					id: "English"
				}]
			},
			/*{
				title: "布局",
				propName: "DefaultWebLayout",
				type: "radio",
				chooseItems: [{
					name: "默认布局",
					id: "default"
				}]
			},
			{
				title: "主题",
				propName: "DefaultWebTheme",
				type: "radio",
				chooseItems: [{
					name: "蓝色",
					id: "default"
				}]
			},*/
			{
				title: "最大导出数据量",
				propName: "ExportDataMaxCount",
				type: "input-number",
				chooseItems: {
					min: 100,
					max: 5000,
					step: 100
				}
			},
			{
				title: "初始密码",
				propName: "UserInitialPassword",
				type: "input-text-pwd",
				chooseItems: "",
				canBeSee: false
			}
		]
	}];
</script>

<style>
	.content-wrap {
		position: absolute;
		width: 100%;
		height: 100%;
		min-width: 500px;
	}
	
	.content-wrap .box-container {
		padding-top: 20px;
		height: calc(100% - 60px);
		overflow: auto;
	}
	
	.content-wrap .box-container>*:last-child {
		padding-bottom: 70px;
	}
	/*.content-wrap .box-container {
		position: absolute;
		padding: 20px;
		width: 100%;
		height: calc(100% - 70px);
		overflow: auto;
	}*/
	/*.content-wrap .module-title {
		margin: 0 0 4px 0;
		padding: 0;
		font-size: 16px;
		font-weight: bold;
		color: #3b515c;
		line-height: 38px;
		position: relative;
		padding-left: 20px;
	}*/
	
	.content-wrap .more-info {
		display: inline-block;
		background: url(../../../../static/images/more-info.png) center center no-repeat;
		width: 20px;
		height: 20px;
		vertical-align: -4px;
		display: none;
	}
	/*.content-wrap .module-title.active {
		background-color: #f5f5f5;
	}
	
	.content-wrap .module-title:hover {
		background-color: #f5f5f5;
	}*/
	/*.content-wrap .arrow-pos {
		position: absolute;
		right: 10px;
		top: 15px;
		color: #c5c6c6;
		font-size: 12px;
	}
	
	.content-wrap .detail-box {
		padding-left: 20px;
		margin-top: 6px;
	}*/
	
	.quick-menu-title{
		vertical-align: top;
		line-height: 30px;
	}
	
	.content-wrap .detail-item {
		padding: 18px 0;
		border-bottom: 1px solid #f3f3f3;
	}
	
	.detail-box>.detail-item::last-child {
		border-bottom: 0;
	}
	
	.content-wrap .item-title {
		font-size: 14px;
		color: #757575;
	}
	
	.content-wrap .right-form-box {
		display: inline-block;
		width: calc(100% - 270px);
		position: relative;
	}
	
	.content-wrap .pwd-openeye {
		background: url(../../../../static/images/icon-openeye.png) no-repeat 0px center;
	}
	
	.content-wrap .pwd-closeeye {
		background: url(../../../../static/images/icon-closeeye.png) no-repeat 0px center;
	}
	
	.content-wrap .pwd-openeye,
	.content-wrap .pwd-closeeye {
		display: inline-block;
		width: 32px;
		height: 30px;
		position: absolute;
		top: 0;
		left: 168px;
		background-size: 20px;
	}
	
	.content-wrap .fix-btn-box {
		position: absolute;
		bottom: 0;
		height: 58px;
		width: 100%;
		z-index: 2;
		text-align: center;
		line-height: 58px;
		box-shadow: 5px 1px 5px 5px #eee;
		background-color: #fff;
	}
	
	.content-wrap .save-btn {
		background-color: #20a0ff;
		color: #fff;
	}
	
	.content-wrap .reset-btn {
		background-color: #fff;
	}
	
	.config-box i.image-ask {
		cursor: pointer;
		display: inline-block;
		width: 12px;
		height: 12px;
		background: url(../../../../static/images/icon-ask.png) no-repeat center;
	}
	
	.content-wrap .tips-msg {
		display: none;
		position: absolute;
		z-index: 99;
		left: 0;
		top: 200;
		width: 230px;
		padding: 18px 24px;
		line-height: 20px;
		border-radius: 5px;
		background: #fff;
		box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.07);
	}
	
	.content-wrap .tips-msg.active {
		display: block;
	}

	.tips-msg-arrow.up{
		top:-8px;
		border-top-width: 0;
		border-bottom-color: rgba(225, 225, 225, 0.7);
	}
	
	.tips-msg-arrow.up:after{
		top: 1px;
		border-bottom-color: #fff;
		border-top-width: 0;
	}
	
	.tips-msg-arrow.down{
		bottom: -8px;
		border-bottom-width: 0;
		border-top-color: rgba(225, 225, 225, 0.7);
	}
	
	.tips-msg-arrow.down:after{
		bottom: 1px;
		border-top-color: #fff;
		border-bottom-width: 0;
	}
	
	.tips-msg-arrow {
		position: absolute;
		left:23px;
		display: block;
		width: 0;
		height: 0;
		border: 8px;
		border-color: transparent;
		border-style: solid;
	}

	.tips-msg-arrow:after {
		position: absolute;
		display: block;
		width: 0;
		height: 0;
		margin-left: -8px;
		content: " ";
		border: 8px;
		border-color: transparent;
		border-style: solid;
	}
	
	.content-wrap .look-link {
		cursor: pointer;
		color: #76bcff;
	}
	/*.content-wrap .item-pading:not(.item-hide){
		padding-top: 20px;
	}*/
</style>