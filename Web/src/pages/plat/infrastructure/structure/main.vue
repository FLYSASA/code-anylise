<template>
	<div class="body-content" v-cloak v-if="permissions.View">
		<div class="main-header">
			<div class="main-header-map"><span class="main-header-map-text"></span></div>
			<div class="main-header-search">
				<div class="func-btns" v-if="permissions.Import||permissions.Export">
					<span class="icon-btn" v-if="permissions.Import" @click="importFile" :title="$t('import')"><i class="icon-import"></i></span>
					<span class="icon-btn" v-if="permissions.Export" @click="exportFile" :title="$t('export')"><i class="icon-export"></i></span>
				</div>
			</div>
		</div>

		<div class="body-content-box" :class="{active:hasData}">
			<div class="left-side-drag drag-element-left drag-reset"></div>
			<div class="left-side tree-wrapper">
				<!--树形结构-->
				<stru-tree :url="url" :showController="showController" :params="params" ref="structrueTree" :node-id="nodeId" node-key="StruId"  :tree-data="treeData"  :tree-prop="struProps" @change-handle="changeHandleType" @on-click="handleClick"></stru-tree>
			</div>
			<div class="right-side">
				<!--修改、查看组件-->
				<component v-bind:is="currentView" :option="struDetail" :actStru="actStru" @viewBack="getViewBack"></component>
			</div>
		</div>

		<!--无数据页面-->
		<div class="no-data-module">
			<component v-bind:is="firstView"></component>
		</div>

		<!--添加同级、子级-->
		<component v-bind:is="addView" v-model="addVisible" :option="option" :title="addTitle"></component>

		<!--导入组件-->
		<import-structrue width="660px" v-model="importVisible" type=".xlsx" :title="$t('structure.importStructureTitle')" :confirm-api="getImportUrl" @callback="getTree">
			<div class="checkbox-pos">
				<el-checkbox v-model="isCover" :label="true" v-if="!actStru.StruName"><span class="f-12">{{$t('structure.importConfirm.0')}}</span></el-checkbox>
				<el-checkbox v-model="isCover" :label="true" v-else><span class="f-12">{{$t('structure.importConfirm.1')}}<span class="struName" :title="actStru.StruName">{{actStru.StruName}}</span>{{$t('structure.importConfirm.2')}}</span>
				</el-checkbox>
			</div>
			<div>
				<div class="text-gray">
					<div class="mb-5">
						{{$t('structure.importDesc.0')}}
						<a class="text-info" :href="getTemplateUrl">&lt;{{$t('structure.importDesc.1')}}&gt;</a>
						{{$t('structure.importDesc.2')}}
					</div>
					<span class="text-warning">{{$t('structure.importDesc.3')}}</span><br/>
					<span v-if="!actStru.StruName">
	                    {{$t('structure.importDesc.4')}}<br />
	                    {{$t('structure.importDesc.5')}}
	                </span>
					<span v-else>
	                    {{$t('structure.importDesc.6')}}<span class="struName">{{actStru.StruName}}</span>{{$t('structure.importDesc.7')}}<br /> {{$t('structure.importDesc.8')}}
					<span class="struName">{{actStru.StruName}}</span>{{$t('structure.importDesc.9')}}<span class="struName">{{actStru.StruName}}</span>{{$t('structure.importDesc.10')}}
					</span>
				</div>
			</div>
		</import-structrue>

		<!--导出组件-->
		<export-structrue v-model="exportVisible" :title="$t('structure.exportStructureTitle')" :export-url="getExportUrl">
			<div class="mb-16">
				<div class="f-14 f-bold mb-5">{{$t('structure.exportDesc.0')}}</div>
				<p class="text-gray">{{$t('structure.exportDesc.1')}}</p>
			</div>
		</export-structrue>
	</div>
</template>

<script>
	import struTree from "@/components/sapi-tree-left-side.vue";
	import tips from "@/components/sapi-tips.js";
	import drag from "@/components/sapi-move-module.js";
	import struImport from "@/components/base/base-import.vue";
	import struExport from "@/components/base/base-export.vue";
	import confirm from "@/components/sapi-confirm.js";
	export default {
		data() {
			return {
				//选中id
				nodeId: null,
				parentStruId: null,
				hasData: false,
				//handleType: "1", //操作类型，0-修改，1-新增同级，2-新增下级，3-查看
				isCover: false, //导入配置，是否覆盖当前数据
				actStru: { //当前被选中的架构
					StruType: "",
					StruId: "",
					StruName: "",
					ParentStruId: "",
					ParentStruName: "",
					ParentStruType: ""
				},
				struProps: {
					children: 'Children',
					label: 'StruName',
					parentId: "ParentStruId",
					nodeKey: "StruId",
					hasChild: "HasChild",
					type: "StruType"
				},
				addVisible: false,
				addTitle: '',
				importVisible: false,
				exportVisible: false,
				firstView: "",
				currentView: "",
				addView: "",
				option: {},
				treeData: [],
				struDetail: {}, //架构详细数据,
				url: "/api/plat/structures/brief",
				params: {
					"withDept": true,
					nodeIdKey: "parentStruId"
				},
				showController:
				{
					AddSame:true,
					Delete:true
				}
			}

		},
		mixins: [getTabMixin()],
		computed: {
			getTemplateUrl() {
				return globalConfig.baseUrl + "/Templates/Excel/Import/企业架构导入模板.xlsx";
			},
			getImportUrl() {
				var struId = this.actStru.StruId || "";
				return "/api/plat/structures/import?struId=" + struId + "&isCover=" + this.isCover;
			},
			getExportUrl() {
				var token = window.sessionStorage.getItem('access_token');
				var aHref = globalConfig.baseUrl + "/api/plat/structures/export?&access_token=" + token;
				return aHref;
			}
		},
		components: {
			"stru-add": (resolve) => {
				require(['./add.vue'], resolve);
			},
			"stru-edit": (resolve) => {
				require(['./edit.vue'], resolve);
			},
			"stru-view": (resolve) => {
				require(['./view.vue'], resolve);
			},
			"stru-first": (resolve) => {
				require(['./first-stru.vue'], resolve);
			},
			"stru-tree": struTree,
			"import-structrue": struImport,
			"export-structrue": struExport
		},
		methods: {
			getTree() {
				//1.进行赋值，控制选中问题
				var nodeId = this.actStru.StruId || this.parentStruId;
				var url = "/api/plat/structures/brief";
				if(nodeId) {
					url = "/api/plat/structures/{struId}/parentAndSiblings";
				}

				this.$get(url, {
					"withDept": true,
					struId: nodeId
				}, function(res) {
					//2.通过treeData的值来控制显示的控件
					this.treeData = res;
					//treeData无值
					if(!this.treeData || this.treeData.length === 0) {
						this.firstView = "stru-first";
						this.actStru = {};
						this.hasData = false;
						return;
					}
					//treeData有值
					this.firstView = "";
					this.hasData = true;
					
					this.nodeId=nodeId;

					//3.存在选中的值，则显示该选中节点的信息
					if(this.nodeId) {
						this.parentStruId = null;
						//this.actStru.StruId = this.nodeId;
						this.$set(this.actStru,"StruId",this.nodeId);
					} else {
						//没有节点被选择，则默认选中第一个节点
						this.nodeId=this.treeData[0].StruId;
		
						/*setTimeout(() => {
							this.$nextTick(()=>{
								this.$el.querySelector(".left-side .sapi-tree>ul>li.tree-node .tree-node-label").click();
							});
						}, 20);*/
					}
					this.actStru.StruId=this.nodeId;
					this.getStruDetail();
					this.currentView = "stru-view";
				});
			},
			getStruDetail() {
				this.$get("/api/plat/structures/" + this.actStru.StruId, {}, function(res) {
					this.struDetail = res;
					//修改当前架构对象
					this.actStru.StruType = res.StruType;
					this.actStru.StruName = res.StruName;
					this.actStru.ParentStruId = res.ParentStruId;
					this.actStru.ParentStruName = res.ParentStruName;
					this.actStru.ParentStruType = res.ParentStruType;
				});
			},
			handleClick(data, node) {
				//最顶级架构不能删除和新增同级
				if(data.ParentStruId)
				{
					this.showController.AddSame=true;
					this.showController.Delete=true;
				}
				else
				{
					this.showController.AddSame=false;
					this.showController.Delete=false;
				}
				//点击后不能直接用data赋值给actStru，避免出现对象数据变化引起逻辑错误
				this.actStru.StruId = data.StruId;
				
				//this.nodeId = this.actStru.StruId;
				this.getStruDetail();
				this.currentView = "stru-view";
			},
			getViewBack() {
				this.currentView = "stru-view";
			},
			changeHandleType(i) {
				//修改
				if(i == 0) {
					this.getStruDetail();
					this.currentView = "stru-edit";
				}
				//删除
				else if(i === 3) {
					this.deleteItem();
				} else { //新增下级、同级
					this.option = {};
					if(i == 1) {
						this.option.ParentStruId = this.actStru.ParentStruId;
						this.option.ParentStruType = this.actStru.ParentStruType;
						this.option.ParentStruName = this.actStru.ParentStruName;
						this.option.StruId = this.actStru.StruId;
						this.addTitle = this.$t('structure.addStructureSameLevelTitle');
					} else {
						this.option.ParentStruId = this.actStru.StruId;
						this.option.ParentStruType = this.actStru.StruType;
						this.option.ParentStruName = this.actStru.StruName;
						this.option.StruId = this.actStru.StruId;
						this.addTitle = this.$t('structure.addStructureChildTitle');
					}

					this.addView = "stru-add";
					this.addVisible = true;
				}
			},

			deleteItem() {
				this.$deleteTips(function() {
					this.$loadingOpen();
					var struType = this.actStru.StruType;
					this.$delete("/api/plat/structures/" + this.actStru.StruId + "?struType=" + this.actStru.StruType, function(res) {
						this.parentStruId = this.actStru.ParentStruId;
						this.actStru = {};
						this.getTree();
						this.$loadingClose();

						Vue.successMsg(struType != 1 ? this.$t('structure.deleteCorpSuccess') : this.$t('structure.deleteDeptSuccess'));															
					}, function(res) {
						Vue.errorMsg(this.$t('structure.code.'+res.Code));
						this.$loadingClose();
					});
				});
			},
			importFile() {
				this.isCover = false;
				this.importVisible = true;
			},
			exportFile() {
				this.exportVisible = true;
			},
		},
		created() {
			Vue.use(tips);
			Vue.use(confirm);
			this.$init();
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
	
	.checkbox-pos {
		margin: -10px 0 5px 0;
	}
	
	.body-content .struName {
		text-decoration: underline;
		display: inline-block;
		max-width: 54%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: -10px;
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