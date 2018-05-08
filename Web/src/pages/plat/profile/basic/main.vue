<template>
	<div class="user-basic-info">
		<div class="avatar-area">
			<div class="avatar-wrapper">
				<img v-if="userModel.HeadIconPath" :src="(apiUrl+'/'+userModel.HeadIconPath)" :onerror="errorImage">
				<img v-else src="../../../../static/images/photo-default.png" alt="">
			</div>
		</div>
		<div class="info-area">
			<ul>
				<li class="tab-item">
					<p class="tab-title">{{timeStage+$t('basic.desc.0')}}，{{userModel.AliasName+$t('basic.desc.1')}}</p>
					<div class="tab-content">
						<ul class="info-items clearfix">
							<li>
								<span class="item-title" v-text="$t('basic.aliasName')"></span>
								<span class="item-detail" :title="userModel.AliasName">{{userModel.AliasName}}</span>
							</li>
							<li>
								<span class="item-title" v-text="$t('basic.userName')"></span>
								<span class="item-detail" :title="userModel.UserName">{{userModel.UserName}}</span>
							</li>
							<li>
								<span class="item-title" v-text="$t('basic.mobileTelephone')"></span>
								<span class="item-detail" :title="userModel.MobileTelephone">{{userModel.MobileTelephone}}</span>
							</li>
							<li>
								<span class="item-title" v-text="$t('basic.officePhone')"></span>
								<span class="item-detail" :title="userModel.OfficePhone">{{userModel.OfficePhone}}</span>
							</li>
							<li>
								<span class="item-title">Email</span>
								<span class="item-detail" :title="userModel.Email">{{userModel.Email}}</span>
							</li>
							<li>
								<span class="item-title" v-text="$t('basic.weChat')"></span>
								<span class="item-detail" :title="userModel.WeChat">{{userModel.WeChat}}</span>
							</li>
							<li>
								<span class="item-title" v-text="$t('basic.microBlog')"></span>
								<span class="item-detail" :title="userModel.MicroBlog">{{userModel.MicroBlog}}</span>
							</li>
							<li>
								<span class="item-title">QQ</span>
								<span class="item-detail" :title="userModel.QQ">{{userModel.QQ}}</span>
							</li>
						</ul>
					</div>
					<el-button class="edit-user-button" type="small" @click="openEditDialog" v-text="$t('basic.editDatum')"></el-button>
				</li>
				<li class="tab-item">
					<p class="tab-title" v-text="$t('basic.theme')"></p>
					<div class="tab-content color-content">
						<ul>
							<li v-for="item in themes" :style="{backgroundColor:item.color}">
								<span v-show="item.value===profileModel.WebTheme">
									<i class="el-icon-check"></i>
									<span>{{item.label}}</span>
								</span>
							</li>
						</ul>
					</div>
				</li>
				<li class="tab-item">
					<p class="tab-title" v-text="$t('basic.language')"></p>
					<div class="tab-content select-wrapper">
						<el-select v-model="profileModel.Language" @change="langChange" @visible-change="isChoosen(true)">
							<el-option v-for="item in languages" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<!--<li class="tab-item">
					<p class="tab-title">字体大小</p>
					<div class="tab-content select-wrapper">
						<el-select v-model="profileModel.FontSize" @change="fontChange" @visible-change="isChoosen(true)">
							<el-option v-for="item in fontSizes" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>-->
				<li class="tab-item">
					<p class="tab-title" v-text="$t('basic.fontSize')"></p>
					<div class="tab-content color-content font-content">
						<ul>
							<li v-for="item in fontSizes" :class="{active:item.value===profileModel.FontSize}" @click="fontChange(item)">
								<span>
									<i class="el-icon-check"></i>
									<span>{{item.label}}</span>
								</span>
							</li>
						</ul>
					</div>
				</li>
				<!--<li class="tab-item">
					<p class="tab-title">签名图片</p>
					<div class="tab-content">

					</div>
				</li>-->
			</ul>
		</div>
		<component v-bind:is="currentView" v-model="visible" :option="option"></component>
	</div>
</template>

<script>
	import config from "../../static/js/systemConfig.js";
	export default {
		data() {
			return {
				apiUrl: globalConfig.baseUrl,
				errorImage: 'this.src="' + require('../../../../static/images/photo-default.png') + '"',
				userModel: {
					AliasName: "",
					IsRelatedEmployee: true,
					MicroBlog: "",
					MobileTelephone: "",
					OfficePhone: "",
					QQ: "",
					UserName: "",
					HeadIconPath: "",
					WeChat: "",
					Email: ""
				},
				//配置信息
				profileModel: {
					UserId: "",
					WebTheme: "",
					WebLayout: "",
					Language: "",
					FontSize: ""
				},
				option: {},
				visible: false,
				hasChoose: false,
				currentView: ""
			}
		},
		mixins:[config],
		
		methods: {
			getProfile() {
				this.$get('/api/plat/users/profile', function(res) {
					if(!res) {
						return;
					}
					this.profileModel = res;
				})
			},
			getUser() {
				this.$get('/api/plat/users/basic', function(res) {
					this.userModel = res;
				});
			},
			openEditDialog() {
				this.currentView = "user-edit";
				this.option = this.userModel;
				this.visible = true;
			},
			themeChange(theme) {
				this.profileModel.WebTheme = theme;
				this.save();
			},
			fontChange(item) {
				var fontSize=item.value;
				if(this.profileModel.FontSize === fontSize)
				{
					return;
				}

				this.hasChoose=true;
				this.profileModel.FontSize = fontSize;
				this.save();
			},
			isChoosen(boo) {
				this.hasChoose = boo;
			},
			langChange(lang) {

				this.profileModel.Language = lang;
				this.save();
			},
			save() {
				if(!this.hasChoose) {
					return;
				}

				if(!this.profileModel.Language || !this.profileModel.WebTheme || !this.profileModel.FontSize) {
					return;
				}

				this.$put('/api/plat/users/profile', this.profileModel, function(res) {
					var userData = JSON.parse(sessionStorage.getItem('basicInfo'));
					userData.Profile = this.profileModel;
					sessionStorage["basicInfo"] = JSON.stringify(userData);
					Vue.successMsg(this.$t('basic.editUserProfile'));
				});
			}
		},
		components: {
			"user-edit": (resolve) => {
				require(['./edit.vue'], resolve);
			}
		},
		computed: {
			timeStage() {
				var now = new Date();
				var hour = now.getHours();
				if(hour < 6) {
					return this.$t('basic.timeStageData.0');
				} else if(hour < 9) {
					return(this.$t('basic.timeStageData.1'));
				} else if(hour < 12) {
					return(this.$t('basic.timeStageData.2'));
				} else if(hour < 14) {
					return(this.$t('basic.timeStageData.3'));
				} else if(hour < 17) {
					return(this.$t('basic.timeStageData.4'));
				} else if(hour < 19) {
					return(this.$t('basic.timeStageData.5'));
				} else {
					return(this.$t('basic.timeStageData.6'));
				}
			}
		},
		created() {
			this.getUser();
			this.getProfile();
		}
	}
</script>

<style>
	li {
		list-style: none;
	}
	
	.user-basic-info {
		width: 100%;
		height: 100%;
	}
	
	.user-basic-info>.avatar-area {
		width: 198px;
		height: 100%;
		float: left;
		text-align: center;
	}
	
	.user-basic-info>.info-area {
		width: calc(100% - 198px);
		height: 100%;
		float: right;
		padding-right: 80px;
		position: relative;
		overflow: auto;
	}
	
	.user-basic-info .avatar-wrapper {
		width: 108px;
		height: 108px;
		display: inline-block;
		box-shadow: 0 0 10px 6px #eeeeee;
		border-radius: 100%;
		text-align: center;
		margin-top: 34px;
	}
	
	.user-basic-info .avatar-wrapper>img {
		margin-top: 6px;
		width: 96px;
		height: 96px;
		border-radius: 100%;
	}
	
	.info-area .tab-item {
		padding: 38px 0 30px 0;
		border-bottom: 1px solid #f1f1f1;
	}
	
	.info-area .tab-item:last-child {
		border-bottom: none;
	}
	
	.info-area .tab-title {
		color: #8894a0;
		font-size: 16px;
		margin-bottom: 24px;
	}
	
	.tab-content .info-items>li {
		float: left;
		width: 270px;
		cursor: default;
		padding: 0px 4px 0px 0px;
		line-height: 24px;
	}
	
	.tab-content.select-wrapper {
		width: 300px;
	}
	
	.info-items span {
		display: inline-block;
		font-size: 14px;
	}
	
	.tab-content .item-title {
		width: 76px;
		color: #8894a0;
		vertical-align: middle;
	}
	
	.tab-content .item-detail {
		width: calc(100% - 80px);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #000;
		vertical-align: middle;
	}
	
	.info-area .edit-user-button {
		position: absolute;
		right: 80px;
		top: 45px;
	}
	
	.color-content li {
		width: 142px;
		height: 38px;
		display: inline-block;
		text-align: center;
		line-height: 40px;
		border-radius: 4px;
		color: #fff;
		margin: 0 10px 10px 0;
		vertical-align: middle;
		cursor: pointer;
	}
	
	.font-content>ul>li{
		color: #404040;
		background: #dadada;
	}
	
	.font-content>ul>li .el-icon-check{
		display: none;
	}
	
	.font-content>ul>li.active{
		color: #fff;
		background: #666;
	}
	
	.font-content>ul>li.active .el-icon-check{
		display: inline-block;
	}
</style>