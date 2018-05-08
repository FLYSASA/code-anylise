<template>
	<div class="body-content">
		<div class="main-header">
			<div class="main-header-map"><span class="main-header-map-text"></span></div>
		</div>

		<div class="body-content-box" :class="{active:hasData}">			
			<div class="left-side-drag drag-element-left drag-reset"></div>
			<div class="left-side tree-wrapper">
				<!--树形结构-->
				<menu-tree ref="menuTree" :node-id="nodeId" node-key="MenuId" :tree-data="treeData" :tree-prop="menuProps" @change-handle="changeHandleType" @action-click="actionClick" @on-click="handleClick"></menu-tree>
			</div>
			<div class="right-side menu-side">
				<!--导入导出按钮-->
				<!-- <div class="main-search">
					<div class="func-btns" v-if="permissions.Import||permissions.Export">
						<span class="icon-btn" v-if="permissions.Import" @click="importFile"><i class="el-icon-upload2 rotate-icon f-14"></i></span>
						<span class="icon-btn" v-if="permissions.Export" @click="exportFile"><i class="el-icon-upload2 f-14"></i></span>
					</div>
				</div> -->

				<!--修改、查看组件-->
				<component v-bind:is="currentView" :option="actMenu" :tree-data="menuList" @viewBack="getViewBack"></component>
			</div>
		</div>

		<!--无数据页面-->
		<div class="no-data-module">
			<component v-bind:is="firstView"></component>
		</div>

		<!--添加同级、子级-->
		<component v-bind:is="addView" v-model="addVisible" :option="option" :title="addTitle" :menu-type="actMenu.MenuType"></component>

	</div>
</template>

<script>
	import menuTree from "@/components/sapi-tree-left-side.vue";
	import tips from "@/components/sapi-tips.js";
	import drag from "@/components/sapi-move-module.js";
	import confirm from "@/components/sapi-confirm.js";
	export default {
		data() {
			return {
				//选中id
				nodeId: null,
				parentMenuId: null,
				hasData: false,
				//handleType: "1", //操作类型，0-修改，1-新增同级，2-新增下级，3-查看
				actMenu: { //当前被选中的架构
					MenuType: "",
					MenuId: "",
					MenuName: "",
					ParentMenuId: "",
					ParentMenuName: "",
					ParentMenuType: ""
				},
				menuProps: {
					children: 'Children',
					label: 'MenuName',
					parenId: "ParentMenuId",
					value:"MenuId"
				},
				permissions:{
					Add:true,
					View:true,
					Edit:true,
					Deleted:true,
					Import:true,
					Export:true
				},
				addVisible: false,
				addTitle: '',
				firstView: "",
				currentView: "",
				addView: "",
				option: {},
				treeData: [],
				menuList:[]
			}

		},
		components: {
			"menu-add": (resolve) => {
				require(['./add.vue'], resolve);
			},
			"menu-edit": (resolve) => {
				require(['./edit.vue'], resolve);
			},
			"menu-view": (resolve) => {
				require(['./view.vue'], resolve);
			},
			"menu-first": (resolve) => {
				require(['./first-menu.vue'], resolve);
			},
			"menu-tree": menuTree
		},
		methods: {
			getTree() {
				this.$get("/api/plat/menus", {"clientId": "WebApp"}, function(res) {
					//1.进行赋值，控制选中问题
					this.nodeId = this.actMenu.MenuId || this.parentMenuId;
					//2.设置menuList的值，供新增、修改页面使用
					this.treeData = res;
					var menu = {
						MenuId: "",
						MenuName: "根节点"
					};
					this.menuList=this.treeData.slice(0);
					this.menuList.unshift(menu);
					
					//3.通过treeData的值来控制显示的控件
					//treeData无值				
					if(!this.treeData||this.treeData.length===0){
			 			this.firstView = "menu-first";
			 			this.actMenu={};
			 			this.hasData=false;
			 			return;
					}
					//treeData有值
					this.firstView = "";
					this.hasData = true;
					
					//4.存在选中的值，则显示该选中节点的信息
					if (this.nodeId){
						this.parentMenuId = null;
					} else {
						this.nodeId=this.treeData[0].MenuId;
					}
					
					this.actMenu.MenuId = this.nodeId;
					this.getMenuDetail();
					this.currentView = "menu-view";
				});
			},
			getMenuDetail() {
				this.$get("/api/plat/menus/" + this.actMenu.MenuId, {}, function(res) {
					this.actMenu = res;
				});
			},
			actionClick(data) {
				this.actMenu = data;
			},

			handleClick(data) {
				this.actMenu.MenuId = data.MenuId;

				this.getMenuDetail();
				this.currentView = "menu-view";
			},
			getViewBack(){
				this.currentView = "menu-view";
			},
			changeHandleType(i) {
				//修改
				if(i == 0) {

					this.getMenuDetail();
					this.currentView = "menu-edit";
				}
				//删除
				else if(i == 3) {
					this.deleteItem();
				} else { //新增下级、同级
					this.option = {};
					if(i == 1) {
						this.option.ParentMenuId = this.actMenu.ParentMenuId;
						this.option.ParentMenuName = this.actMenu.ParentMenuName;
						this.addTitle = "新增同级";
					} else {
						this.option.ParentMenuId = this.actMenu.MenuId;
						this.option.ParentMenuName = this.actMenu.MenuName;
						this.addTitle = "新增子级";
					}

					this.addView = "menu-add";
					this.addVisible = true;
				}
			},
			deleteItem() {
				this.$deleteTips(function () {
					this.$loadingOpen();
					this.$delete("/api/plat/menus/" + this.actMenu.MenuId, function(res) {
						this.parentMenuId = this.actMenu.ParentMenuId;
						this.actMenu = {};
						this.getTree();
						this.$loadingClose();
						Vue.successMsg(res.Message);
					}, function(res) {
						Vue.errorMsg(res.Message);
						this.$loadingClose();
					});
				})
			},
			// importFile() {
			// 	this.importVisible = true;
			// },
			// exportFile() {
			// 	this.exportVisible = true;
			// },
			show() {
				if(this.treeData && this.treeData.length > 0) {
					this.hasData = true;
					this.firstView = "";
					setTimeout(() => {
						this.$el.querySelector(".left-side .sapi-tree>ul>li.tree-node .tree-node-label").click();
					}, 50);
				} else {
					this.hasData = false;
					this.firstView = "menu-first";
				}
			}
		},
		created() {
			Vue.use(tips);
			Vue.use(confirm);
			this.$init();
			this.permissions={
					Add:true,
					View:true,
					Edit:true,
					Delete:true,
					Import:true,
					Export:true
				}
			this.getTree();
		},
		mounted() {
			this.$nextTick(function() {
				drag.move(this, ".left-side", ".right-side", ".left-side-drag", {
					type: 2,
					offsetHeight:102
				});
			});			
		},		
	}
</script>

<style>
	.sibling-cover {
		background: rgba(255, 255, 255, 0.6);
	}
	
	.body-content-box {
		display: none;
	}
	
	.body-content-box.active {
		display: block;
	}
	
	.text-warning {
		color: #ff9500;
	}
	
	.struName {
		text-decoration: underline;
	}
	
	.checkbox-pos {
		margin: -10px 0 5px 0;
	}
	
	.drop-down-wrapper {
		position: relative;
	}
	
	.drop-down-tree .el-tree {
		height: 100%;
		border: 0 none;
	}
	
	.drop-down-wrapper .el-dropdown {
		width: 100%;
	}
	
	.drop-down-wrapper .el-dropdown .el-input {
		width: 100%;
	}
	
	.drop-down-tree .el-tree-node.active {
		background-color: #eff7ff;
	}
	
	.drop-down-tree {
		width: 300px;
		max-height: 200px;
		overflow: auto;
	}
</style>