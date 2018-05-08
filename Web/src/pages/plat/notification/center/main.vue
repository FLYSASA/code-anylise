<template>
	<div class="myMsg">
		<section class="content-area clearfix">
			<div class="main-header">
				<div class="main-header-map"><span class="main-header-map-text"></span></div>
				<div class="main-header-search">
					<div class="func-btns">
						<sapi-search v-model="params.keyword" :placeholder="$t('center.search')" @on-search="getTableData"></sapi-search>
						<span class="icon-btn" v-if="permissions.Delete"><i class="icon-deleter"></i></span>
					</div>
				</div>
			</div>

			<aside class="msg-left">
				<div class="inner-msg-left-top clearfix">
					<!--用户角色-->
					<div class="inner-header-role clearfix mb-16">
						<div class="header-role-img">
							<img v-if="userIconPath" :src="userIconPath" :onerror="errorImage">
							<img v-else src="../../../../static/images/photo-default.png" alt="">
						</div>

						<div class="header-role-text">
							<span>{{displayUserName}}</span>
							<i class="el-icon-setting" click="pageTo" style="display:none;"></i>
						</div>
					</div>

					<span class="msg-left-top-item msg-left-top-event" :class="{active:1===tabUiIndex}" @click="tab1Click(1)">
							<label>{{msgToDealCount }}</label>
							<span class="msg-left-top-system-text" v-text="$t('center.toDealTitle')"></span>
					</span>
					<span class="msg-left-top-item msg-left-top-system" :class="{active:0===tabUiIndex}" @click="tab1Click(0)">
							<label>{{msgToReadCount}}</label>
							<span class="msg-left-top-system-text" v-text="$t('center.sysNoticeTitle')"></span>
					</span>
				</div>

				<!--导航树形-->
				<div class="msg-left-tree clearfix">
					<div class="msg-left-tree-line clearfix"></div>
					<div class="msg-left-tree-isread">
						<ul :class="{active:0===tabUiIndex}">
							<li :class="{active:0===tabLiIndex}" @click="tab2Click(0)" v-text="$t('center.tabToRead')"></li>
							<li :class="{active:1===tabLiIndex}" @click="tab2Click(1)" v-text="$t('center.tabRead')"></li>
						</ul>
						<ul :class="{active:1===tabUiIndex}">
							<li :class="{active:0===tabLiIndex}" @click="tab2Click(0)" v-text="$t('center.tabToDeal')"></li>
							<li :class="{active:1===tabLiIndex}" @click="tab2Click(1)" v-text="$t('center.tabDone')"></li>
						</ul>
					</div>
					<div class="msg-left-tree-list">
						<el-tree :data="treeData" :props="defaultProps" node-key="MsgTypeId" empty-text="" :default-expand-all="defaultExpand" :highlight-current="true" :render-content="treeRenderContent" @node-click="treeNodeClick">
						</el-tree>
					</div>
				</div>
			</aside>

			<article class="msg-right">
				<div class="main-table table-no-border width-p100">
					<!--代办事项-->
					<!--代办理-->
					<el-table :data="msgTableData" v-show="tabUiIndex===1 && tabLiIndex===0" @sort-change="handleSortChange" :height="maxBodyHeight">
						<el-table-column :label="$t('center.deal')" width="120">
	    				    <template slot-scope="props">
                                <a class="table-btn" href="javascript:void(0)" @click.stop="dealMessage(props.row,props.$index)">{{props.row.DealTypeName}}</a>
                            </template>
						</el-table-column>

						<el-table-column v-for="(item,index) in msgColumns" :key="item.id" :type="item.type" :min-width="item.minWidth" :sortable="item.sortable" :prop="item.prop" :label="item.label" show-overflow-tooltip :formatter="item.formatter">
						</el-table-column>
					</el-table>

					<!--已办理-->
					<el-table :data="msgTableData" v-show="tabUiIndex===1 && tabLiIndex===1" @sort-change="handleSortChange" :height="maxBodyHeight">
						<el-table-column :label="$t('center.contentName')" min-width="200" sortable="custom" show-overflow-tooltip>
        				    <template slot-scope="props">
                                <a class="table-btn" href="javascript:void(0)" @click.stop="browseDoneMessage(props.row,props.$index)">{{props.row.ContentName}}</a>
                            </template>
						</el-table-column>
						<el-table-column v-for="(item,index) in msgDoneColumns" :min-width="item.minWidth" :sortable="item.sortable" :prop="item.prop" :key="item.id" :label="item.label" show-overflow-tooltip :formatter="item.formatter">
						</el-table-column>
					</el-table>

					<!--系统通知-->
					<!--待阅读-->
					<el-table :data="sysTableData" v-show="tabUiIndex===0 && tabLiIndex===0" ref="bodyTable" @row-click="handleRowClick" @sort-change="handleSortChange" @selection-change="handleSelectionChange" :height="maxBodyHeight">
						<el-table-column :label="$t('center.msgName')" width="120" sortable="custom" show-overflow-tooltip>
                            <template slot-scope="props">
                                <a class="table-btn" href="javascript:void(0)" @click.stop="readMessage(props.row,props.$index)">{{props.row.ContentName}}</a>
                            </template>
						</el-table-column>

						<el-table-column v-for="(item,index) in sysColumns" :type="item.type" :key="item.id" :sortable="item.sortable" :prop="item.prop" :label="item.label" show-overflow-tooltip :formatter="item.formatter">
						</el-table-column>
					</el-table>

					<!--已阅读-->
					<el-table :data="sysTableData" v-show="tabUiIndex===0 && tabLiIndex===1" ref="bodyTable" @sort-change="handleSortChange" :height="maxBodyHeight">
						<el-table-column  :label="$t('center.msgName')" width="120" sortable="custom" show-overflow-tooltip>
							<template slot-scope="props">
                                <a class="table-btn" href="javascript:void(0)" @click.stop="browseReadMessage(props.row,props.$index)">{{props.row.ContentName}}</a>
                            </template>
						</el-table-column>
						<el-table-column v-for="(item,index) in sysReadColumns" :sortable="item.sortable" :prop="item.prop" :label="item.label" :key="item.id" show-overflow-tooltip :formatter="item.formatter">
						</el-table-column>
					</el-table>
				</div>

				<div class="main-pager">
					<el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" :layout="layout" :total="pageTotal">
					</el-pagination>
				</div>
				<!--审核组件-->
				<component v-bind:is="currentView" v-model="visible" :option="option" @call-back="callback"></component>
			</article>
		</section>
	</div>
</template>

<script>
	import search from "@/components/sapi-search.vue";
	import resolves from "@/static/js/notification-resolve.js";
	import components from "@/extend/notification.js";
	export default {
		components: {
			...components,
			"sapi-search": search,
		},
		mixins: [getPagerMixin()],
		data() {
			return {
				errorImage: 'this.src="' + require('../../../../static/images/photo-default.png') + '"',
				treeData: [],
				defaultProps: {
					children: 'Children',
					label: 'MsgTypeName'
				},
				sysTableData: [],
				msgTableData: [],
				tabUiIndex: 1, //0：系统通知，1：待办事宜
				tabLiIndex: 0, //0:待处理或待阅读；1：已处理或已阅读
				messageMap: "",
				messageMapCurrentText: "",
				sysColumns: //系统通知待阅读消息表头
				[
					{		
						prop: "ContentNo",
						label: this.$t('center.msgNo'),
						width: "160",
						sortable: 'custom'
					},
					{
						prop: "ContentHappenedDate",
						label: this.$t('center.contentHappenedDate'),
						width: "120",
						formatter: function(row, column) {
							return Vue.dateFormat("yyyy-MM-dd", row["ContentHappenedDate"]);
						}
					},
					{
						prop: "CreateDate",
						label: this.$t('center.createDate'),
						width: "120",
						formatter: function(row, column) {
							return Vue.dateFormat("yyyy-MM-dd", row["CreateDate"]);
						},
						sortable: 'custom'
					}
				], 
				sysReadColumns: //系统通知已阅读消息表头
				[
					{
						prop: "ContentNo",
						label: this.$t('center.msgNo'),
						width: "160",
						sortable: 'custom'
		
					},
					{
						prop: "ContentCreateDate",
						label: this.$t('center.contentHappenedDate'),
						width: "120",
						formatter: function(row, column) {
							return Vue.dateFormat("yyyy-MM-dd", row["ContentCreateDate"]);
						}
					},
					{
						prop: "CreateDate",
						label: this.$t('center.createDate'),
						width: "120",
						formatter: function(row, column) {
							return Vue.dateFormat("yyyy-MM-dd", row["CreateDate"]);
						}
					},
					{
						prop: "FinishedDate",
						label: this.$t('center.finishedDate'),
						width: "120",
						formatter: function(row, column) {
							return Vue.dateFormat("yyyy-MM-dd", row["FinishedDate"]);
						},
						sortable: 'custom'
					}
				], 
				msgColumns: //待办事项待办理消息表头
				[
					{
						prop: "ContentName",
						label: this.$t('center.contentName'),
						sortable: 'custom'
					},
					{
						prop: "ContentNo",
						label: this.$t('center.contentNo'),
						width: 160,
						sortable: 'custom'
					},
					{
						prop: "ContentHappenedDate",
						label: this.$t('center.contentHappenedDate'),
						width: 120,
						formatter: function(row, column) {
							return Vue.dateFormat("yyyy-MM-dd", row["ContentHappenedDate"]);
						}
					},
					{
						prop: "CreateDate",
						label: this.$t('center.createDate'),
						width: 120,
						formatter: function(row, column) {
							return Vue.dateFormat("yyyy-MM-dd", row["CreateDate"]);
						},
						sortable: 'custom'
					}
				], 			
				msgDoneColumns: //待办事项已办理消息表头
				[
					{
						prop: "ContentNo",
						label: this.$t('center.contentNo'),
						width: "160",
						sortable: 'custom'
					},
					{
						prop: "ContentCreateDate",
						label: this.$t('center.contentHappenedDate'),
						width: "120",
						formatter: function(row, column) {
							return Vue.dateFormat("yyyy-MM-dd", row["ContentCreateDate"]);
						}
					},
					{
						prop: "CreateDate",
						label: this.$t('center.createDate'),
						width: "120",
						formatter: function(row, column) {
							return Vue.dateFormat("yyyy-MM-dd", row["CreateDate"]);
						}
					},
					{
						prop: "FinishedDate",
						label: this.$t('center.finishedDate'),
						width: "120",
						formatter: function(row, column) {
							return Vue.dateFormat("yyyy-MM-dd", row["FinishedDate"]);
						},
						sortable: 'custom'
					}
				], 
				params: { //列表查询参数
					userId: "",
					msgTypeId: "",
					sortName: "",
					sortType: ""
				},
				defaultExpand: true,
				displayUserName: "",
				msgToReadCount: 0,
				msgToDealCount: 0,
				userIconPath: "",
				selectedIds: [], //已选择的Ids
				bodyHeight: 0,
				currentView: false,
				visible: false,
				option: {},
				hasTableData: false
			}
		},
		methods: {
			getData() {
				this.params.userId = globalConfig.userId;
				this.$get("/api/plat/notifications/" + globalConfig.userId, function(res) {
					/*this.$loadingClose();*/
					this.msgToDealCount = res.ToDealCount;
					this.msgToReadCount = res.ToReadCount;
					this.displayUserName = res.StationName ? res.StationName + ", " : "";
					this.displayUserName += res.AliasName;
					this.userIconPath = res.HeadIconPath ? (globalConfig.baseUrl + res.HeadIconPath) : "";
				});
			},
			tab1Click(index) {
				if(this.tabUiIndex == index) {
					return false;
				}

				this.tabUiIndex = index;
				this.tabLiIndex = 0;

				this.getTreeData();
			},
			tab2Click(index) {
				if(this.tabLiIndex == index) {
					return false;
				}

				this.tabLiIndex = index;
				this.getTreeData();
			},
			treeRenderContent(createElement, node) {
				var data = node.data;
				var level = node.node.level;
				var span, label, label2;

				if(this.tabLiIndex == 0 && level == 1) {
					label = createElement("label", {
						class: "tree-node-count"
					}, data.MsgCount);
					label2 = createElement("label", {
						class: "tree-node-text"
					}, data.MsgTypeName);
					span = createElement("span", {
						class: "el-tree-node__label"
					}, [label2, label]);
				} else {
					span = createElement("span", {
						class: "el-tree-node__label"
					}, data.MsgTypeName);
				}

				return span;
			},
			treeNodeClick(data, node, vNode) {
				if(data.Children.length === 0) {
					this.params.pageIndex = 1;
					this.params.msgTypeId = data.MsgTypeId;
					this.messageMapCurrentText = ">" + data.MsgTypeName;
					this.getTableData();
				}
			},
			getTreeData() {
				var _this = this;
				_this.treeData = [];
				_this.tableData = [];
				this.leafAll = [];
				this.leafs = [];
				this.leafIndex = 0;
				this.pageTotal = 0;
				_this.messageMapCurrentText = "";
				_this.sysTableData = [];
				_this.msgTableData = [];

				var url = "/api/plat/notifications/" + globalConfig.userId;

				switch(this.tabUiIndex + "" + this.tabLiIndex) {
					case "00":
						url = url + "/toReadMsgTypes";
						this.messageMap = this.$t('center.sysNoticeTitle') + '>' + this.$t('center.toReadMessage');//"系统通知>待阅读信息";
						break;
					case "01":
						url = url + "/readMsgTypes";
						this.messageMap = this.$t('center.sysNoticeTitle') + '>' + this.$t('center.readMessage');//"系统通知>已阅读信息";
						break;
					case "10":
						url = url + "/toDealMsgTypes";
						this.messageMap = this.$t('center.toDealTitle') + '>' + this.$t('center.toDealMessage');//"待办事宜>待办理信息";
						break;
					case "11":
						url = url + "/doneMsgTypes";
						this.messageMap = this.$t('center.toDealTitle') + '>' + this.$t('center.doneMessage');//"待办事宜>已办理信息";
						break;
				}

				var getDefaultMsgTypeId = function(node) {
					if(node.Children && node.Children.length > 0) {
						getDefaultMsgTypeId(node.Children[0]);
					} else {
						_this.messageMapCurrentText = ">" + node.MsgTypeName;
						_this.params.msgTypeId = node.MsgTypeId;
					}
				}

				if(url) {
					this.$get(url, function(res) {
						if(res.length > 0) {
							this.treeData = res;
							getDefaultMsgTypeId(_this.treeData[0]);
							this.getTableData();
						}
					});
				}
			},
			getTableData() {
				var _this = this;
				if (!_this.params.msgTypeId){
					return;
				}
				var url = "/api/plat/notifications/" + _this.params.userId + "/" + _this.params.msgTypeId;
				var isSysFlag = true;

				switch(this.tabUiIndex + "" + this.tabLiIndex) {
					case "00":

						url = url + "/toReadMsgs";
						break;
					case "01":
						url = url + "/readMsgs";
						break;
					case "10":
						url = url + "/toDealMsgs";
						isSysFlag = false;
						break;
					case "11":
						url = url + "/doneMsgs";
						isSysFlag = false;
						break;
				}

				this.$get(url, this.params, function(res) {
					if(!res) {
						this.tableData = [];
						return false;
					}

					this.hasTableData = res.Rows && res.Rows.length > 0 ? true : false;

					if(isSysFlag === true) {
						this.sysTableData = res.Rows;
					} else {
						this.msgTableData = res.Rows;
					}

					this.pageTotal = res.Total;
				});

			},
			handleSortChange(obj) {
				if(!this.hasTableData) {
					return false;
				}
				this.params.sortName = obj.prop;
				this.params.sortType = obj.order;
				this.pageCurrentChange(1);
			},
			handleSelectionChange(data) {
				var _this = this;
				_this.selectedIds = [];
				if(data.length > 0) {
					for(var i = 0; i < data.length; i++) {
						_this.selectedIds.push(data[i].MsgId);
					}
				}
			},
			handleRowClick(row) {
				this.$refs.bodyTable.toggleRowSelection(row);
			},
			dealMessage(item) {
				/*if(row.DealTypeName === "调整") {
					this.currentView = "msg-adjust";
				} else {
					this.currentView = "msg-review";
				}*/

				this.visible = true;
				var currentObj = resolves.resolveUrl(item.ToDealUrl);
				var componentName = currentObj.component;
				var componentFunc = components[componentName];
				if(!componentFunc || !componentFunc()) {
					Vue.msg(this.$t('registerWhenComponentNoExists'));
					return;
				}

				this.option = currentObj.option;
				this.currentView = componentName;
			},
			browseDoneMessage(item) {
				this.visible = true;
				var currentObj = resolves.resolveUrl(item.BrowseUrl);
				var componentName = currentObj.component;
				var componentFunc = components[componentName];
				if(!componentFunc || !componentFunc()) {
					Vue.msg(this.$t('registerWhenComponentNoExists'));
					return;
				}

				this.option = currentObj.option;
				this.currentView = componentName;
			},
			callback(){
				this.getData();
				this.getTreeData();
				this.getTableData();
			}
		},
		created() {
			//pager改变时将要执行的函数，对该值进行初始化
			this.pageFunc = this.getTableData;

			this.$init();
			this.getData();
			this.getTreeData();

		},
		watch:{
			visible(val){
				if(val===false){
					//this.currentView =null;
				}
			}
		}
	}

</script>

<style>
	.content-area {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	
	.content-area .msg-left {
		position: absolute;
		width: 286px;
		padding-bottom: 20px;
		text-align: left;
		height: calc(100% - 51px);
		border-right: 1px solid #ddd;
	}
	/*内嵌页面*/
	
	.content-area .inner-msg-left-top {
		padding-top: 20px;
		text-align: center;
	}
	
	.content-area .header-role-img {
		width: 106px;
		height: 106px;
		margin: 0 auto;
		text-align: center;
		border-radius: 50%;
		background: #fff;
	}
	
	.content-area .header-role-img img {
		display: inline-block;
		height: 98px;
		width: 98px;
		margin-top: 4px;
		border-radius: 50%;
	}
	
	.content-area .header-role-text {
		line-height: 26px;
		vertical-align: text-bottom;
	}
	
	.content-area .header-role-text i {
		padding-left: 3px;
		width: 16px;
		height: 16px;
		cursor: pointer;
		color: #bbb;
		font-style: normal;
	}
	
	.header-role-text i:hover {
		color: #0b80ff;
	}
	
	.header-role-text i.active {
		color: #0b80ff;
	}
	
	.content-area .msg-left-top {
		height: 78px;
		margin-top: 90px;
		padding: 0 15px;
		border-bottom: 1px solid #ddd;
		text-align: center;
	}
	
	.content-area .msg-left-top-item {
		position: relative;
		left: 0;
		top: 0;
		margin-right: 10px;
		display: inline-block;
		width: 107px;
		height: 66px;
		cursor: pointer;
		border-radius: 5px;
		background: #fff;
	}
	
	.msg-left-top-item label {
		display: inline;
		cursor: pointer;
		font-size: 30px;
		line-height: 40px;
	}
	
	.msg-left-top-item span {
		display: block;
	}
	
	.msg-left-top-item.active {
		color: #fff;
		background: #63c4ff;
	}
	
	.msg-left-top-item.active:after {
		position: absolute;
		bottom: -12px;
		left: 50%;
		margin-left: -6px;
		width: 0;
		height: 0;
		content: "  ";
		border: 6px;
		border-color: #63c4ff transparent transparent transparent;
		border-style: dashed dashed solid dashed;
	}
	
	.content-area .msg-left-tree-line {
		height: 11px;
		border-bottom: 1px solid #eaeaea;
	}
	
	.content-area .msg-left-tree-isread {
		margin: 0 auto;
		margin-top: 16px;
		width: 254px;
		height: 37px;
		text-align: center;
	}
	
	.msg-left-tree-isread ul {
		display: none;
		padding: 0;
		margin: 0;
		font-size: 0;
	}
	
	.msg-left-tree-isread ul.active {
		display: block;
	}
	
	.msg-left-tree-isread li {
		display: inline-block;
		/*display: inline;*/
		zoom: 1;
		width: 127px;
		height: 37px;
		font-size: 12px;
		cursor: pointer;
		color: #fff;
		line-height: 37px;
		background: #cacbd0;
	}
	
	.msg-left-tree-isread li.active {
		background: #63c4ff;
	}
	
	.msg-left-tree-isread li:first-child {
		border-radius: 3px 0 0 3px;
	}
	
	.msg-left-tree-isread li:last-child {
		border-radius: 0 3px 3px 0;
	}
	
	.content-area .msg-left-tree-list {
		margin: 0 auto;
		margin-top: 16px;
		width: 254px;
		text-align: left;
	}
	
	.msg-left-tree-list .el-tree {
		padding: 0;
		border: none;
	}
	
	.msg-left-tree-list>.el-tree>.is-expanded>.el-tree-node__content>.el-tree-node__expand-icon {
		display: inline-block;
		width: 3px;
		height: 22px;
		margin-right: 12px;
		border: none;
		background: #63c4ff;
		transform: none;
	}
	
	.msg-left-tree-list>.el-tree>.el-tree-node>.el-tree-node__content>.el-tree-node__label {
		width: 92%;
	}
	
	.myMsg .msg-right {
		position: absolute;
		left: 287px;
		width: calc(100% - 287px);
		/*padding-bottom: 20px;*/
		height: calc(100% - 51px);
	}
	
	.myMsg .tree-node-text {
		display: block;
		float: left;
		width: calc(100% - 65px);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.myMsg .tree-node-count {
		float: right;
		overflow: hidden;
		max-width: 55px;
		height: 20px;
		padding: 0 8px;
		margin-top: 8px;
		margin-right: 8px;
		color: #fff;
		font-size: 12px;
		line-height: 20px;
		border-radius: 10px;
		background: #c4d4db;
	}
</style>