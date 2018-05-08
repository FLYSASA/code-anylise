<template>
	<aside class="left-aside" :class="{'no-child':!hasChild}">
		<span class="left-aside-map" v-text="mapText"></span>
		<sapi-tree :data="treeData" :node-id="currentTreeId" :props="defaultProps" @node-click="handleNodeClick"></sapi-tree>
	</aside>
</template>

<script>
	import tree from "@/components/base/base-tree.vue";
	import "@/static/css/left-menu.css";
	import drag from "@/components/sapi-move-module.js";
	import {userInfo} from "./locale-component.js";
	export default {
		data() {
			return {
				currentTreeId: "",
				menuName: "",
				mainId: "",
				menuDatas: [],
				treeData: [],
				hasChild: false,
				mapText: null,
				defaultProps: {
					label: "MenuName",
					children: "Children",
					value: "MenuId"
				},
				menuData: [{
					Children: [{
						Children:[],
						IconPath: '',
						Level: 2,
						MenuId: "510ae7ea-0bb9-4e2c-8fec-d17569a7917a",
						MenuName: this.$t('userInfoLeftMenu.basicInfo'),
						MenuNo: '',
						MenuPath: '/plat/profile.html#/basic',
						ParentMenuId: null,
						RowIndex: 10
					},{
						Children:[],
						IconPath: '',
						Level: 2,
						MenuId: "510ae7ea-0bb9-4e2c-8fec-d17569a7918b",
						MenuName: this.$t('userInfoLeftMenu.headIconSetting'),
						MenuNo: '',
						MenuPath: '/plat/profile.html#/avatar',
						ParentMenuId: null,
						RowIndex: 10
					},{
						Children:[],
						IconPath: '',
						Level: 2,
						MenuId: "510ae7ea-0bb9-4e2c-8fec-d17569a7919k",
						MenuName: this.$t('userInfoLeftMenu.modifyPassword'),
						MenuNo: '',
						MenuPath: '/plat/profile.html#/account',
						ParentMenuId: null,
						RowIndex: 10
					}],
					IconPath: '',
					Level: 1,
					MenuId: "510ae7ea-0bb9-4e2c-8fec-d17569a7916c",
					MenuName: this.$t('userInfoLeftMenu.userInfo'),
					MenuNo: '',
					MenuPath: '/plat/profile.html#/',
					ParentMenuId: null,
					RowIndex: 10
				}]
			}
		},
		components: {
			"sapi-tree": tree
		},
		methods: {
			handleNodeClick(data, target) {
				if(data.Children.length === 0) {
					var hightEle = this.$el.querySelector(".is-hight");
					if(hightEle) {
						hightEle.className = hightEle.className.replace(/\s+is-hight/g, "");
					}

					target.parentNode.className = target.parentNode.className + " is-hight";

					if(!data.MenuPath) {
						this.$router.push({
							"path": "/404",
							query: {
								menuId: data.MenuId,
								mainId: this.mainId
							}
						});
						return;
					}

					var path = data.MenuPath;
					var pathName = location.pathname;
					var samePath;
					var pathIndex = path.indexOf("#");
					if(pathIndex > -1) {
						path = path.slice(pathIndex + 1);
						samePath = data.MenuPath.slice(0, pathIndex);
					}

					//不同路径直接跳转，不需要路由
					if(samePath && pathName.indexOf(samePath) === -1) {
						location.href = data.MenuPath + "?mainId=" + this.mainId + "&menuId=" + data.MenuId + "&mainId=" + this.mainId;
						return;
					}

					//本菜单内不需要跳转,使用路由
					this.$router.push({
						"path": path,
						query: {
							menuId: data.MenuId,
							mainId: this.mainId
						}
					});

					this.setMapName(data.MenuId);
				} else {
					target.previousSibling.click();
				}
			},
			setMapName(menuId) {
				var datas = this.treeData;
				var mapNames = [];
				var flag = false;
				//遍历菜单，找出菜单导航名称
				var foreachNode = function(node) {
					var childs = node.Children;
					if(childs && childs.length > 0) {
						for(var i = 0, ii = childs.length; i < ii; i++) {
							if(flag === true) {
								break;
							}

							var child = childs[i];
							//查找到返回上级递归
							if(menuId == child.MenuId) {
								mapNames.push(child.MenuName);
								flag = true;
								return;
							}
							//进行递归查找菜单
							foreachNode(child);
						}

						if(flag === true) {
							mapNames.push(childs[i - 1].MenuName);
						}
					} else {
						if(menuId == node.MenuId) {
							mapNames.push(node.MenuName);
							flag = true;
						}
					}
				}

				if(menuId) {
					for(var j = 0, jj = datas.length; j < jj; j++) {
						var data = datas[j];
						if(data.MenuId == menuId) {
							mapNames.push(data.MenuName);
							flag = true;
							break;
						}

						foreachNode(data);

						if(flag === true) {
							mapNames.push(data.MenuName);
							break;
						}
					}
				}
			},
			init(val) {
				//一级菜单下面的菜单ID
				var menuId = this.$getHashParams("menuId");
				this.menuDatas = val;
				setTimeout(() => {
					var dom = this.$el.querySelector(".tree-node-text.active");
					var fdom=this.$el.querySelector(".tree-node-text");
					var doms=this.$el.querySelectorAll(".tree-node-text");
					if(dom) {
						dom.className = dom.className + " is-hight";
						
					}else if (fdom) {
						fdom.className = fdom.className + " is-hight";
					}
				}, 20);
				
				for(var i = 0, ii = val.length; i < ii; i++) {
					var datas = val[i];
					//if(mainId == datas.MenuId) {
					this.treeData = datas.Children;
					this.menuName = datas.MenuName;
					this.hasChild = datas.Children.length > 0 ? true : false;
					this.$setTitle(this.menuName);
					this.mapText = this.menuName || "";
					if(menuId) {
						this.currentTreeId = menuId;
						this.setMapName(menuId);

						/*setTimeout(() => {
							var dom = this.$el.querySelector(".tree-node-text.active");
							if(dom) {
								dom.className = dom.className + " is-hight";
							}
						}, 20);*/

					} else {
						//this.$root.$el.querySelector(".index-body-map").innerHTML = "<span>" + "首页 / " + datas.MenuName + "</span>";
					}
				}
			}
		},
		beforeCreate() {
			Vue.toLocale(userInfo);
		},
		mounted() {
			this.$nextTick(function() {
				drag.move(this, ".left-aside.index-body-box-menu", ".index-body-box-content", ".index-body-box-drag.drag-element-left", {
					minWidth: 230,
					offsetHeight: 50,
					type: 1
				});
			});
			this.init(this.menuData);
		}
	}
</script>