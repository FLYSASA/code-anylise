<template>
	<aside class="left-aside" :class="{'no-child':!hasChild}">
		<span class="left-aside-map" v-text="mapText"></span>
		<sapi-tree :data="treeData" :get-select-node="getSelectNode" :node-id="currentTreeId" :props="defaultProps" @node-click="handleNodeClick"></sapi-tree>
	</aside>
</template>

<script>
	import tree from "@/components/base/base-tree.vue";
	import drag from "@/components/sapi-move-module.js";
	import "@/static/css/left-menu.css";
	export default {
		data() {
			return {
				isAdmin: false,
				currentTreeId: "",
				menuName: "",
				mainId: "",
				menuDatas: [],
				treeData: [],
				hasChild: false,
				defaultProps: {
					label: "MenuName",
					children: "Children",
					value: "MenuId"
				},
				mapText: null
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

					var parentNode = target.parentNode;

					parentNode.className = parentNode.className + " is-hight";

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

					this.$root.menuName = data.MenuName;

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
						if(data.MenuPath.indexOf("?") > -1) {
							location.href = data.MenuPath + "&mainId=" + this.mainId + "&menuId=" + data.MenuId;
						} else {
							location.href = data.MenuPath + "?mainId=" + this.mainId + "&menuId=" + data.MenuId;
						}

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
					
					var menu={
						MenuId:data.MenuId,
						MainId:this.mainId,
						MenuPath:data.MenuPath,
						MenuName:data.MenuName
					}
					this.$root.$refs.header.setActiveMenu(menu);
				} else {
					target.previousSibling.click();
				}
			},
			getSelectNode(data) {
				this.$root.menuName = data.MenuName;
			},
			init(val) {
				//一级菜单ID
				var mainId = this.mainId = this.$getHashParams("mainId") || this.mainId;
				//一级菜单下面的菜单ID
				var menuId = this.$getHashParams("menuId");
				if(val && val.length > 0) {
					this.menuDatas = val;
					for(var i = 0, ii = val.length; i < ii; i++) {
						var datas = val[i];
						if(mainId == datas.MenuId) {
							this.treeData = datas.Children;
							this.menuName = datas.MenuName;
							this.mapText = this.menuName || "";
							this.hasChild = datas.Children.length > 0 ? true : false;
							this.$setTitle(this.menuName);
							if(menuId) {
								this.currentTreeId = menuId;
								setTimeout(() => {
									var dom = this.$el.querySelector(".tree-node-text.active");
									if(dom) {
										dom.className = dom.className + " is-hight";
									}
								}, 20);
							}
							break;
						}
					}
				}
				if(this.hasChild === false) {
					var ele = document.querySelector(".index-body-box-drag.drag-element-left");
					if(ele) {
						ele.style.display = "none";
					}
				}
			},
			//后台管理，只能在超级管理员使用
			getMenu() {
				var path=location.href;
				if(globalConfig.userId !== "sapiadmin"||path.indexOf("/plat/admin.html")===-1) {
					return;
				}

				this.$get("/api/plat/admin/menus", function(res) {
					if(!res || res.length === 0) {
						return;
					}

					this.init(res);
				});
			}
		},
		created() {
			//超级管理员的后台管理需要进行特殊处理
			var href = location.href;
			if(href.indexOf("/plat/admin.html#/") > -1) {
				this.isAdmin = true;
				this.getMenu();
			}
			
			if(this.isAdmin === false) {
				var _this = this;
				var refHeader = this.$root.$refs.header;
				if(refHeader.menuList.length > 0) {
					_this.init(refHeader.menuList);
				}

				refHeader.$watch("menuList", function(val) {
					_this.init(val);
				});
			}
		},
		mounted() {
			this.$nextTick(function() {
				drag.move(this, ".left-aside.index-body-box-menu", ".index-body-box-content", ".index-body-box-drag.drag-element-left", {
					minWidth: 230,
					offsetHeight: 50,
					type: 1
				});
			});
		},
		watch: {
			"$route.query.mainId": function(val) {
				if(this.isAdmin === false && this.menuDatas.length > 0) {
					this.init(this.menuDatas);
				}
			}
		}
	}
</script>