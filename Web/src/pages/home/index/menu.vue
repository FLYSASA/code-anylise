<template>
	<nav class="menu" :class="{active:value}" @click.stop="showFunc">
		<div class="menu-box" @click.stop="">
			<div class="menu-box-user">
				<span class="menu-box-user-image" @click="personalEnter">
					<img v-if="userData.HeadIconPath" :src="(apiUrl+userData.HeadIconPath)" :onerror="errorImage">
					<img v-else src="../../../static/images/photo-default.png" alt="">
				</span>
				<span class="menu-box-user-text">
					<label v-text="userInfo" :title="userInfo"></label>
					<label v-text="userData.Email" :title="userData.Email"></label>
				</span>
				<span class="menu-box-user-out" @click="loginOut" :title="$t('loginOut')">
					<i class="el-icon-upload2"></i>
				</span>
			</div>
			<ul>
				<li v-for="(item,index) in list" :class="{'first-li':index%3===0}" @click="menuClick(item,index)">
					<i :class="item.IconPath||'icon-default'"></i>
					<span class="menu-text" v-text="item.MenuName"></span>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
	import "@/static/css/sapi-fonts/iconfont.css";
	import importLocale from "@/static/js/importLocale.js";
	import {home} from "../js/locale-home.js";

	export default {
		data() {
			return {
				apiUrl: globalConfig.baseUrl + "/",
				errorImage: 'this.src="' + require('../../../static/images/photo-default.png') + '"',
				list: [],
				userData: {
					AliasName: "",
					IsRelatedEmployee: true,
					MicroBlog: "",
					MobileTelephone: "",
					OfficePhone: "",
					QQ: "",
					UserName: "",
					HeadIconPath: "",
					WeChat: ""
				},
				isShow: true
			}
		},
		props: ["value"],
		computed: {
			userInfo() {
				var stationName = this.userData.DefaultStationName ? `（${this.userData.DefaultStationName}）` : '';
				return this.userData.AliasName + stationName;
			}
		},
		methods: {
			personalEnter() {
				location.href = "/plat/profile.html";
			},
			getList() {
				if(localStorage["systemMenus"]) {
					var menus = JSON.parse(localStorage["systemMenus"]);
					this.list = menus;
					this.$emit("callback", menus);
					return;
				}

				this.$get("/api/plat/users/menus", function(data) {
					this.list = data || [];
					localStorage["systemMenus"] = JSON.stringify(this.list);
					this.$emit("callback", this.list);
				});
			},
			getUser() {
				if(sessionStorage.getItem('basicInfo')) {
					this.userData = JSON.parse(sessionStorage.getItem('basicInfo'));
					this.$nextTick(function() {
						var box = this.$el.parentNode.parentNode;
						box.className = box.className + " body-layout-font-" + this.userData.Profile.FontSize;
					});

					return;
				}

				this.$get("/api/plat/users/brief", function(data) {
					this.userData = data;
					window.sessionStorage.setItem('basicInfo', JSON.stringify(data));
					this.$nextTick(function() {
						var box = this.$el.parentNode.parentNode;
						box.className = box.className + " body-layout-font-" + this.userData.Profile.FontSize;
					});
				});
			},
			showFunc() {
				this.$emit("input", false);
			},
			loginOut() {
				localStorage.clear();
				window.sessionStorage.clear();
				window.location.href = globalConfig.loginUrl;
			},
			getMenus() {
				return this.list;
			},
			menuClick(item, index) {
				this.$parent.menuClick(item);
				this.$emit("input", false);
			}
		},
		beforeCreate(){
			Vue.use(importLocale);
			Vue.toLocale(home);
		},
		created() {
			this.getList();
			this.getUser();
		}
	}
</script>