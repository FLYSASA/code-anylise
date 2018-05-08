<template>
	<div class="body-content">
		<div class="main-header">
			<div class="main-header-map"><span class="main-header-map-text"></span></div>
		</div>

		<div class="body-content-box" :class="{active:hasData}">
			<div class="left-side-drag drag-element-left drag-reset"></div>
			<div class="left-side tree-wrapper">
				<!--树形结构-->
				<msg-tree ref="msgTree" :show-controller="showController" :node-id="nodeId" node-key="MsgTypeId" :tree-data="treeData" :tree-prop="msgTypeProps" @change-handle="changeHandleType" @action-click="actionClick" @on-click="handleClick"></msg-tree>
			</div>
			<div class="right-side">
				<!--修改、查看组件-->
				<component v-bind:is="currentView" :option="actMsgType" :mode="mode" @viewBack="getViewBack"></component>
			</div>
		</div>

		<!--无数据页面-->
		<div class="no-data-module">
			<component v-bind:is="firstView" :mode="mode"></component>
		</div>

		<!--添加同级、子级-->
		<component v-bind:is="addView" v-model="addVisible" :option="option" :title="addTitle" :mode="mode"></component>

	</div>
</template>

<script>
	import msgTree from "@/components/sapi-tree-left-side.vue";
	import tips from "@/components/sapi-tips.js";
	import drag from "@/components/sapi-move-module.js";
	import confirm from "@/components/sapi-confirm.js";
	export default {
		data() {
			return {
				//选中id
				nodeId: null,
				ParentTypeId: null,
				hasData: false,
				actMsgType: { //当前被选择的消息类别节点
					MsgTypeId: "",
					MsgTypeName: "",
					ParentTypeId: "",
					ParentTypeName: "",
					IsOwnMsg: false //是否拥有消息
				},
				msgTypeProps: {
					children: 'Children',
					label: 'MsgTypeName',
					parentId: "ParentTypeId",
					nodeKey: "MsgTypeId"
				},
				addVisible: false,
				addTitle: '',
				firstView: "",
				currentView: "",
				addView: "",
				option: {},
				treeData: [],
				dealTypeHandleUrls: [ //事项类别默认的处理路径
					{
						DealTypeId: "Browse",
						DealTypeName: "阅读",
						DealUrl: "https://www.baidu.com",
						RowIndex: "10"
					}
				],
				mainId: null,
				mode: 0, //消息类别模式，0：通知类别，1：事项类别
				showController: {
					AddSame: true,
					AddChild: true,
					Edit: true,
					Delete: true
				}
			}

		},
		components: {
			"msg-add": (resolve) => {
				require(['./add.vue'], resolve);
			},
			"msg-edit": (resolve) => {
				require(['./edit.vue'], resolve);
			},
			"msg-view": (resolve) => {
				require(['./view.vue'], resolve);
			},
			"msg-first": (resolve) => {
				require(['./first-msg.vue'], resolve);
			},
			"msg-tree": msgTree
		},
		methods: {
			getTree() {
				if(this.permissions.View !== true) {
					return;
				}
				this.$get("/api/plat/msgTypes/" + this.mode, {}, function(res) {
					//1.进行赋值，控制选中问题
					this.nodeId = this.actMsgType.MsgTypeId || this.ParentTypeId;

					//2.通过treeData的值来控制显示的控件
					this.treeData = res;
					//treeData无值					
					if(!this.treeData || this.treeData.length === 0) {
						this.firstView = "msg-first";
						this.actMsgType = {};
						this.hasData = false;
						return;
					}
					//treeData有值
					this.firstView = "";
					this.hasData = true;

					//3.存在选中的值，则显示该选中节点的信息
					if(this.nodeId) {
						this.ParentTypeId = null;
					} else {
						this.nodeId=this.treeData[0].MsgTypeId;
					}
					
					this.actMsgType.MsgTypeId = this.nodeId;
					this.getMsgDetail();
					this.currentView = "msg-view";
				});
			},
			getMsgDetail() {
				this.$get("/api/plat/msgTypes/" + this.mode + "/" + this.actMsgType.MsgTypeId, {}, function(res) {
					this.actMsgType = res;

					//当父级节点名称为空时，表示其父级节点为根节点
					if(this.actMsgType.ParentTypeName == null || this.actMsgType.ParentTypeName == "") {
						this.actMsgType.ParentTypeName = "根节点";
					}
					//系统数据，不能修改，不能删除
					if(this.actMsgType.IsSystem) {
						this.showController.Edit = false;
						this.showController.Delete = false;
					} else {
						this.showController.Edit = true;
						this.showController.Delete = true;
					}
					//是否拥有消息
					this.showController.AddChild = !this.actMsgType.IsOwnMsg;
				});
			},
			actionClick(data) {
				this.actMsgType = data;
			},
			handleClick(data) {
				this.actMsgType.MsgTypeId = data.MsgTypeId;
				this.getMsgDetail();
				this.currentView = "msg-view";
			},
			getViewBack() {
				this.currentView = "msg-view";
			},
			changeHandleType(i) {
				//修改
				if(i == 0) {
					this.getMsgDetail();
					this.currentView = "msg-edit";
				}
				//删除
				else if(i === 3) {
					this.deleteItem();
				} else { //新增下级、同级
					this.option = {};
					if(i == 1) {
						this.option.ParentTypeId = this.actMsgType.ParentTypeId;
						this.addTitle = "新增同级";
					} else {
						this.option.ParentTypeId = this.actMsgType.MsgTypeId;
						this.addTitle = "新增子级";
					}

					this.addView = "msg-add";
					this.addVisible = true;
				}
			},

			deleteItem() {
				this.$deleteTips(function() {
					this.$loadingOpen();
					this.$delete("/api/plat/msgTypes/" + this.mode + "/" + this.actMsgType.MsgTypeId, function(res) {
						this.ParentTypeId = this.actMsgType.ParentTypeId;
						this.getTree();
						this.actMsgType = {};
						this.$loadingClose();
						Vue.successMsg(res.Message);
					}, function(res) {
						Vue.errorMsg(res.Message);
						this.$loadingClose();
					});
				})
			},
			setMapText() {
				var list = this.$root.$refs["left-menu-aside"].treeData;
				var mainId = this.mainId;
				var menuId = this.$getHashParams("menuId");
				var vdata,flag;
				var foreachNode = function(node) {
					var childs = node.Children;
					if(childs && childs.length > 0) {
						for(var j = 0, jj = childs.length; j < jj; j++) {
							if(childs[j].MenuId===menuId) {
								vdata=childs[j];
								flag = true;
								return;
							}

							foreachNode(childs[j]);

							if(flag === true) {
								break;
							}
						}
					} else {
						if(node.MenuId===menuId) {
							vdata=node;
							flag = true;
						}
					}
				}

				for(var i = 0, ii = list.length; i < ii; i++) {
					var data = list[i];
					foreachNode(data);
					if(flag===true) {
						break;
					}
				}
				
				if(vdata){
					var dom=this.$el.querySelector(".main-header-map-text");
					if(dom){
						dom.innerText=vdata.MenuName;
					}
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
			this.mode = this.$getHashParams("mode");
			this.mainId = this.$getHashParams("mainId");
			this.getTree();
			
		},
		mounted() {
			this.$nextTick(function() {
				drag.move(this, ".left-side", ".right-side", ".left-side-drag", {
					type: 2,
					offsetHeight: 102
				});
			});
		},
		watch: {
			//监听路由中menuId
			"$route.query.menuId": function(val) {
				this.mode = this.$route.query.mode;
				this.actMsgType = {};
				this.getTree();
			},
			mode(val) {
				setTimeout(() => {
					this.setMapText();
				});
			}
		}
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