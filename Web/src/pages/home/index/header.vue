<template>
	<header :class="{'body-scale':isScale}">
		<div class="header-left float-left">
			<div class="header-left-logo">
				<img :src="logoImage" @click="goHome" />
			</div>
			<div class="header-left-btns">
				<!--<span class="header-left-btns-left"><i class="el-icon-arrow-left"></i></span>
				<span class="header-left-btns-right"><i class="el-icon-arrow-right"></i></span>-->
			</div>
		</div>
		<div class="header-center header-quick-menus float-left" :style="{width:quickManuWidth}">
			<ul>
				<li v-for="(item,index) in quickMenus" :class="{active:item.active}" v-text="item.MenuName" @click="menuClick(item)">
				</li>
			</ul>
		</div>
		<div class="header-right float-right">
			<span class="header-span-btn header-menu-btn" @click="menuShow=true"></span>
			<span class="header-span-btn header-message-btn" @click="showMsg">
				<i class="header-message-btn-warnning" v-show="msgTotalCount>0">{{msgTotalCount}}</i>
			</span>
			<span class="header-span-btn" v-if="isAdmin===true" @click="gotoBackMenu()">
				<i class="icon-manage"></i>
			</span>
			<header-btns></header-btns>
		</div>

		<menu-bar ref="menu" @callback="setMenus" v-model="menuShow"></menu-bar>

		<!--消息提醒列表-->
		<component :is="currentView" v-model="isMsgListShow" :msg-list="msgList" :total-count="msgTotalCount"></component>

		<!--背景图canvas转化所用img-->
		<!--<img class="bg-image" crossorigin="anonymous" />-->

	</header>
</template>

<script>
	import "../css/header.css";
	import menu from "./menu.vue";
	import headerBtns from "@/extend/header-btns.vue";
	import "@/extend/out-inject-init.js";
	import msgBox from "./notification.vue";
	import importLocale from "@/static/js/importLocale.js";
	import {home} from "../js/locale-home.js";
	
	export default {
		data() {
			return {
				isAdmin: false,
				menuList: [],
				menuShow: false,
				quickMenus: [{
					MenuId: "",
					MenuName: this.$t("menuName"),
					MenuPath: "/",
					active: false
				}],
				msgTotalCount: 0,
				configParams: null,
				quickManuWidth: 0,
				isMsgListShow: false,
				msgList: [],
				currentView: "",
				bodyImage: null,
				logoImage: null,
				logoImages: [],
				hasQuickMenus: false
			}
		},
		props: ["isScale"],
		components: {
			"menu-bar": menu,
			"header-btns": headerBtns,
			"msg-box": (resolve) => {
				require(['./notification.vue'], resolve);
			},
		},
		methods: {
			goHome() {
				window.location.href = "/";
			},
			setMenus(list) {
				this.menuList = list;
				if(this.configParams) {
					this.initQuickManu();
				}
			},
			getCurrentMenu(id, path, arrs, datas) {
				var currentMenu = {};
				var flag = false;
				var list = datas || this.menuList;
				if(!list || list.length === 0) {
					return;
				}

				var indexs = typeof arrs === "object" ? arrs : [];
				var foreachNode = function(node) {
					var childs = node.Children;
					if(childs && childs.length > 0) {
						for(var j = 0, jj = childs.length; j < jj; j++) {
							var child = childs[j];
							if(id && child.MenuId === id) {
								flag = true;
							} else if(path && child.MenuPath.indexOf(path) > -1) {
								flag = true;
							}

							if(flag === true) {
								currentMenu.MenuId = child.MenuId;
								currentMenu.MenuName = child.MenuName;
								currentMenu.MenuPath = child.MenuPath;
								indexs.push(j);
								return;
							}

							foreachNode(child);
							if(flag === true) {
								indexs.push(j);
								break;
							}
						}
					}
				}

				for(var i = 0, ii = list.length; i < ii; i++) {
					var data = list[i];
					if(id && data.MenuId === id) {
						flag = true;
					} else if(path && data.MenuPath.indexOf(path) > -1) {
						flag = true;
					}

					if(flag === true) {
						currentMenu.MenuId = data.MenuId;
						currentMenu.MenuName = data.MenuName;
						currentMenu.MenuPath = data.MenuPath;
						indexs.push(i);
						break;
					}

					foreachNode(data);
					if(flag === true) {
						currentMenu.MainId = data.MenuId;
						currentMenu.MainPath = data.MenuPath;
						indexs.push(i);
						break;
					}
				}

				return currentMenu;
			},
			initQuickManu() {
				if(this.hasQuickMenus !== true) {
					return;
				}
				var menus = this.quickMenus;
				var deleteIndex = [];
				var currentMenu = {};
				for(var i = 0, ii = menus.length; i < ii; i++) {
					currentMenu = menus[i];
					if(currentMenu.MenuPath === "/" && !currentMenu.MenuId) {
						continue;
					}

					var menu = this.getCurrentMenu(currentMenu.MenuId);
					if(!menu.MenuId) {
						deleteIndex.unshift(i);
					} else {
						currentMenu.MenuId = menu.MenuId;
						currentMenu.MainId = menu.MainId;
						currentMenu.MenuName = menu.MenuName;
						currentMenu.MenuPath = menu.MenuPath;
						currentMenu.MainPath = menu.MainPath;
					}
				}

				for(var k = 0, kk = deleteIndex.length; k < kk; k++) {
					this.quickMenus.splice(deleteIndex[k], 1);
				}

				setTimeout(() => {
					this.setQuickManuWidth();
				});

				this.setActiveMenu();
			},
			setQuickManuWidth() {
				if(this.hasQuickMenus !== true) {
					return;
				}
				var box = this.$el;
				var leftBox = box.querySelector(".header-left");
				var leftWidth = leftBox.offsetLeft + leftBox.offsetWidth;
				var rightBox = box.querySelector(".header-right");
				var rightWidth = 35 + rightBox.offsetWidth;
				var max = leftWidth;

				if(rightWidth > max) {
					max = rightWidth + 2;
				}

				if(this.isScale !== true && max < 206) {
					max = 206;
				} else if(this.isScale && max < 171) {
					max = 171;
				}

				var width = 2 * max;
				this.quickManuWidth = "calc(100% - " + width + "px)";
			},
			setActiveMenu(item) {
				item = item || {};
				var mainId = item.MainId || this.$getHashParams("mainId");
				var menuId = item.MenuId || this.$getHashParams("menuId");
				var datas = this.quickMenus;
				if(menuId && mainId) {
					for(var i = 0, ii = datas.length; i < ii; i++) {
						if(datas[i].MenuId === menuId && datas[i].MainId === mainId) {
							datas[i].active = true;
						} else {
							datas[i].active = false;
						}
					}
				} else if(mainId) {
					for(var i = 0, ii = datas.length; i < ii; i++) {
						if(datas[i].MenuId === mainId) {
							datas[i].active = true;
							break;
						}
					}
				} else {
					for(var i = 0, ii = datas.length; i < ii; i++) {
						var currentMenu = datas[i];
						if(currentMenu.MenuPath === "/" && !currentMenu.MenuId) {
							currentMenu.active = true;
							break;
						}
					}
				}
			},
			setPathActive(item, datas) {
				var arrIndexs = [];
				var data = this.getCurrentMenu(item.MenuId, "", arrIndexs, datas);
				if(arrIndexs.length === 0) {
					return;
				}

				this.$root.$refs["left-menu-aside"].currentTreeId = data.MenuId;
				this.$root.menuName = item.MenuName;

				setTimeout(() => {
					arrIndexs.pop();

					var treeDom = this.$root.$el.querySelector("aside.left-aside>.sapi-tree");
					if(!treeDom) {
						return;
					}

					var nodes = treeDom.querySelectorAll(".tree-node-text.is-hight,.tree-node-text.active");
					for(var i = 0, ii = nodes.length; i < ii; i++) {
						var node = nodes[i];
						node.className = node.className.replace(/\s+(active|is-hight)/g, "");
					}

					var laberNode;
					if(arrIndexs.length > 1) {
						var parentIndex = arrIndexs.reverse().slice(0, arrIndexs.length - 1).join(",");
						laberNode = treeDom.querySelector("[data-parent-index='" + parentIndex + "'][data-index='" + arrIndexs[arrIndexs.length - 1] + "'].tree-node");
					} else {
						laberNode = treeDom.querySelector("[data-index='" + arrIndexs[0] + "'].tree-node");
					}

					if(laberNode) {
						var textNode = laberNode.querySelector(".tree-node-text");
						textNode.className = textNode.className + " is-hight active";
					}
				}, 10);

			},
			menuClick(item,datas) {
				if(item.MenuPath && item.MenuPath !== "/") {
					var mainId = this.$getHashParams("mainId");
					//var menuId = this.$getHashParams("menuId");

					var query = "";
					var path = "";
					var currentMenu = {};

					var list = datas||this.menuList;
					if(!item.MainId) {
						
						for(var i = 0, ii = list.length; i < ii; i++) {
							if(list[i].MenuId === item.MenuId) {
								currentMenu = this.getFirstMenu(list[i]);
							}
						}
					}

					if(item.MainId === mainId || item.MenuId === mainId) {
						var menuId = item.MenuId;
						var active;
						if(currentMenu.MenuId) {
							menuId = currentMenu.MenuId;
							path = currentMenu.MenuPath;
							active = currentMenu;
						} else {
							var paths = item.MenuPath.split("#");
							if(paths.length > 1) {
								path = paths[1];
							} else {
								path = paths[0];
							}
							active = item;
						}

						path = path || "/404";

						this.$router.push({
							path: path,
							query: {
								mainId: mainId,
								menuId: menuId
							}
						});

						setTimeout(() => {
							this.setActiveMenu(active);
							this.setPathActive(active,datas);
						}, 10);

						return;
					}

					//需要调转页面
					var mainPath;
					var menuPath;
					var curMainId = item.MainId;
					var curMenuId = item.MenuId;
					if(item.MainId) {
						mainPath = item.MainPath || "";
						menuPath = item.MenuPath || "";
					} else {
						mainPath = item.MenuPath || "";
						menuPath = currentMenu.MenuPath;
						if(currentMenu.MenuId&&!menuPath){
							menuPath="404";
						}
						curMainId = item.MenuId;
						curMenuId = currentMenu.MenuId;
					}

					if(menuPath.indexOf("#/") > -1) {
						menuPath = menuPath.split("#/")[1];
					}

					if(menuPath.indexOf("?") > -1) {
						query = "&mainId=" + curMainId + "&menuId=" + curMenuId;
					} else {
						query = "?mainId=" + curMainId + "&menuId=" + curMenuId;
					}

					path += mainPath + menuPath + query;
					location.href = path;

				} else {
					location.href = "/";
				}

			},
			getFirstMenu(item) { //获取第一个有效的菜单
				if(!item.Children || item.Children.length === 0) {
					return {
						MenuId: "",
						MenuPath: ""
					};
				}
				var currentItem = {};
				var forEachNode = function(data) {
					let childs = data.Children;
					for(let i = 0; i < 1; i++) {
						let child = childs[i];
						if(!child.Children || child.Children.length === 0) {
							currentItem = child;
							return;
						}

						forEachNode(child);
					}
				}

				forEachNode(item);
				if(currentItem.MenuPath && currentItem.MenuPath.indexOf("#/") > -1) {
					var paths = currentItem.MenuPath.split("#/");
					currentItem.MenuPath = paths[1];
				}

				return currentItem;
			},
			//超级管理员的后台管理
			gotoBackMenu() {
				if(this.isAdmin !== true) {
					return;
				}

				this.$get("/api/plat/admin/menus", function(res) {
					if(!res || res.length === 0) {
						return;
					}

					var data = res[0];
					this.menuClick(data,res);
					return;
				});
			},
			showMsg() {
				this.isMsgListShow = true;
				this.currentView = "msg-box";
				this.getNotifications();
			},
			getConfigParams(data) {
				this.configParams = data;
				globalConfig.maxExportNumber = data.ExportDataMaxCount || 2000;
				if(!data.QuickMenuSetting) {
					return;
				}
				var jsonData = data.QuickMenuSetting;
				this.hasQuickMenus = jsonData.IsEnabled;
				if(this.hasQuickMenus !== true) {
					return;
				}
				var datas = jsonData.List;
				var menus = this.quickMenus;
				if(datas) {
					datas.forEach(function(id) {
						menus.push({
							MenuId: id,
							MenuName: "",
							MenuPath: "",
							active: false
						});
					});
				}

				if(this.menuList.length > 0) {
					this.initQuickManu();
				}
			},
			getNotifications() {
				var userId = globalConfig.userId;
				this.$get('/api/plat/notifications/' + userId, {
					autoOpenLoading: false
				}, function(res) {
					this.msgList = res.Msgs;
					this.msgTotalCount = res.TotalCount;
				});
			}
		},
		beforeCreate(){
			Vue.use(importLocale);
			Vue.toLocale(home);
		},
		created() {
			var sysConfig = JSON.parse(localStorage["sysConfigSet"] || "{}");
			this.logoImages = [sysConfig.mainLogo, sysConfig.indexLogo];
			this.logoImage = this.logoImages[this.isScale !== false ? 0 : 1];
			this.getConfigParams(sysConfig);
			var img = sysConfig.mainBg || globalConfig.bodyImage;
			if(img) {
				document.body.style.backgroundImage = "url(" + img + ")";
			}
		},
		mounted() {
			if(globalConfig.userId === "sapiadmin") {
				this.isAdmin = true;
			}

			setTimeout(() => {
				this.getNotifications();
			}, 1000);

			/*每隔1分钟刷新一次*/
			setInterval(() => {
				this.getNotifications();
			}, 60000);
		},
		watch: {
			isScale(val) {
				setTimeout(() => {
					this.setQuickManuWidth();
				});

				this.logoImage = this.logoImages[val !== false ? 0 : 1];
			}
		}
	}
</script>