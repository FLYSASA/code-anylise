<template>
	<sapi-dialog top="12%" width="1000px" ref="dialog" height="600px" class="sapi-select-dialog" v-model="visible" @on-close="close" @on-open="open" :has-max="false">
		<span slot="title" v-text="title||'设置授权岗位'"></span>

		<div slot="todo" class="select-user-search" @click="topSpread">
			<input class="select-user-search-input" readonly="readonly" />
			<i class="icon-search select-user-search-icon"></i>
		</div>

		<div class="select-user-box">
			<ul>
				<li class="left" @click="searchCloseClick(true)">
					<div class="tabs-list">
						<span :class="{active:tabIndexs[0]}" @click="tabClick(0)">企业架构</span>
						<span :class="{active:tabIndexs[1]}" @click="tabClick(1)">最近联系</span>
						<span :class="{active:tabIndexs[2]}" @click="tabClick(2)">其他人员</span>
					</div>
					<div class="tabs-contents">
						<sapi-tree v-show="tabIndexs[0]" ref="treeNav" :url="treeUrl" :params="param" :data="treeData" :render-content="renderContent" :render-node-click="renderNodeClick" :get-select-node="activeNode" :props="defaultProps" :node-id="nodeId" @on-click="treeNodeClick">
						</sapi-tree>
						<ul class="tabs-contents-list"></ul>

						<div class="position-search" :class="{active:isSearch}">
							<div class="position-search-text">
								<i class="el-icon-location"></i>
								<input class="position-search-input" v-model="filterText" @click.stop="searchActive=!searchActive" />
								<i class="el-icon-circle-close" @click.stop="searchCloseClick"></i>
							</div>
							<div class="position-search-list" :class="{active:treeSearchData.length>0}">
								<span class="up-arrow set-position"></span>
								<div class="position-search-list-ul" v-if="nodata===false">
									<ul>
										<li :key="item.StruId" v-for="(item,index) in treeSearchData" @click="treeNodeClick(item)">
											<p v-html="searchText(item)" :title="item.StruName"></p>
											<p v-text="item.CorpName" :title="item.CorpName"></p>
										</li>
									</ul>
								</div>

								<div v-else class="position-search-list-nodata" @click.stop="">暂无数据</div>
							</div>
						</div>
					</div>

				</li>
				<li class="middle">
					<div class="map">
						<p class="map-text" v-text="defaultParams.struName"></p>
						<span class="btn-handle" v-if="multiple===true && tableData.length>0" @click="selectAll">全选</span>
					</div>
					<div class="list">
						<ul v-if="tableData.length>0">
							<li :key="item.StruId" v-for="(item,index) in tableData">
								<img src="../static/images/photo-default.png" width="30" height="30" />
								<div class="list-text">
									<p v-text="showText(item)" :title="showText(item)"></p>
									<p v-text="showContent(item)" :title="showContent(item)"></p>
								</div>
								<div class="list-checkbox">
									<el-checkbox v-if="multiple===true" v-model="item.__checked" @change="change(item)"></el-checkbox>
									<el-radio v-else v-model="item.__checked" @change="radioChange(item,index)"></el-radio>
								</div>
							</li>
						</ul>
						<div v-else class="list-nodata" @click>暂无数据</div>
					</div>
					<div class="list-more">
						<a href="javascript:void(0)">加载更多</a>
					</div>
				</li>
				<li class="right">
					<div class="map">
						<p class="map-text">已选择了岗位{{selectData.length}}个</p>
						<span class="btn-handle" v-if="multiple===true && selectData.length>0" @click="clearAll">清空</span>
					</div>
					<div class="list">
						<ul v-if="selectData.length>0">
							<li :key="item.StruId" v-for="(item,index) in selectData">
								<img src="../static/images/photo-default.png" width="30" height="30" />
								<div class="list-text">
									<p v-text="showText(item)" :title="showText(item)"></p>
									<p v-text="showContent(item)" :title="showContent(item)"></p>
								</div>
								<div class="list-checkbox">
									<i class="el-icon-circle-close" @click="cancelSelect(item)"></i>

								</div>
							</li>
						</ul>
						<div v-else class="list-nodata" @click>暂无数据</div>
					</div>
				</li>
			</ul>
		</div>

		<div class="footer">
			<el-button size="small" class="default-button" @click="close">取消</el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit">提交</el-button>
		</div>

		<div class="top-search" slot="dialogBox" :class="{active:topSearch}" @click="topSearchClose(true)">
			<div class="top-search-box">
				<div class="top-search-header" @click.stop="">
					<input class="select-user-search-input" v-model="topSearchParam.keyword" />
					<i class="el-icon-circle-close" @click.stop="topSearchClose"></i>
				</div>
				<div class="top-search-content">
					<div class="map">
						<p class="map-text" v-text="topMapText"></p>
						<span class="btn-handle" v-if="topMapText==='搜索历史' && historyData.length>0" @click.stop="saveHistory(historyData,false)">清空</span>
					</div>
					<div class="list">
						<ul v-if="topTableData.length">
							<li :key="item.StruId" v-for="(item,index) in topTableData" @click.stop="topChecked(item,index)">
								<img src="../static/images/photo-default.png" width="30" height="30" />
								<div class="list-text">
									<p v-html="topSearchText(item)" :title="item.StruName"></p>
									<p v-text="item.CorpName" :title="item.CorpName"></p>
								</div>
								<div class="list-checkbox" v-if="topMapText==='搜索历史'">
									<i class="el-icon-circle-close" @click.stop="saveHistory(item,false)"></i>
								</div>
							</li>
						</ul>
						<div v-else class="list-nodata" @click>暂无数据</div>
					</div>
				</div>
			</div>

		</div>
	</sapi-dialog>
</template>

<script>
	import dialog from "./sapi-dialog.vue";
	import tree from "./sapi-tree.vue";
	export default {
		data() {
			return {
				visible: false,
				disabled: false,
				searchActive: false,

				nodeId: null,
				treeData: [],

				defaultParams: {
					struId: null,
					struName: null,
					struType: null,
					pageSize: 20,
					pageIndex: 1,

				},
				topSearchParam: {
					keyword: null,
					pageSize: 20,
					pageIndex: 1
				},

				defaultProps: {
					children: 'Children',
					label: 'StruName',
					value: "StruId",
					hasChild: "HasChild",
				},
				treeUrl: "/api/plat/structures/brief",
				param: {
					"withDept": true,
					nodeIdKey: "parentStruId"
				},
				tabIndexs: {
					0: true,
					1: false,
					2: false
				},
				tableData: [],
				selectData: [],
				selectIds: {},
				isSearch: false,
				filterText: null,
				filterReg: null,
				treeSearchData: [],
				timeout: null,
				nodata: false,
				listProp: {
					title: "StruName",
					content: "CorpName",
					img:"",
					id: "StationId",
					titleFn(item) {
						return item.StationNo + " " + (item.EmployeeName || "") + " " + (item.PositionName || "");
					},
					contentFn: null
				},
				topTableData: [],
				topSearch: false,
				topMapText: "搜索历史",
				historyData: []
			}
		},
		props: {
			value: Boolean,
			title:String,
			props: Object,
			multiple: Boolean,
			data: Array | Object,
			cookieName: String, //缓存名称
			params: Object,   //列表获取数据的参数
			url: String,      //列表获取数据的链接
			hasImg:Boolean    //是否展示图片
		},
		components: {
			"sapi-dialog": dialog,
			"sapi-tree": tree,
		},
		methods: {
			close() {
				this.$emit("input", false);
			},
			open() {
				this.tabIndexs = {
					0: true,
					1: false,
					2: false
				};
				this.selectData = [];
				this.selectIds = {};
				//初始化已选岗位
				if(this.data) {
					let key = this.listProp.id;
					let datas = [].concat(this.data);
					datas.forEach(item => {
						item.__checked = true;
						this.selectIds[item[key]] = true;
					});
					this.selectData = datas;
				}
				this.tableData = [];
				this.treeData = [];
				this.defaultParams.pageIndex = 1;

				this.nodeId = null;
				this.loadTreeData();
			},
			submit() {
				if(this.selectData.length === 0) {
					Vue.msg("请最少选取一项！");
					return;
				}

				if(this.multiple === true) {
					this.$emit("update:data", this.selectData);
				} else {
					this.$emit("update:data", this.selectData[0]);
				}

				this.close();
				this.saveHistory(this.selectData, true);
			},
			//清空选中
			clearAll() {
				if(this.selectData.length === 0) {
					return;
				}

				let key = this.listProp.id;
				this.selectData.forEach((item) => {
					this.selectIds[item[key]] = null;
					item.__checked = false;
				});
				this.selectData = [];
			},
			//删除选中
			cancelSelect(item) {
				let key = this.listProp.id;
				let id = item[key];
				let datas = this.selectData;
				this.selectIds[id] = null;
				item.__checked = false;
				for(let i = 0, ii = datas.length; i < ii; i++) {
					if(datas[i][key] === id) {
						datas.splice(i, 1);
						return;
					}
				}
			},
			//全选
			selectAll() {
				let selectIds = this.selectIds;
				let key = this.listProp.id;
				let datas = this.selectData;
				this.tableData.forEach((item) => {
					item.__checked = true;
					let id = item[key];
					if(selectIds[id] === true) {
						return;
					}
					selectIds[id] = true;
					datas.push(item);
				});
			},
			topChecked(item, index) {
				item.__checked = true;
				if(this.multiple === true) {
					this.change(item);
					return;
				}

				this.radioChange(item, index);
			},
			radioChange(item, index) {
				this.selectData = [item];
				this.tableData.forEach((data, i) => {
					if(i !== index) {
						data.__checked = false;
					}
				});
			},
			//单个选择
			change(item) {
				let key = this.listProp.id;
				let id = item[key];
				if(item.__checked === true) {
					if(this.selectIds[id] === true) {
						return;
					}

					this.selectData.push(item);
					this.selectIds[id] = true;
				} else {
					this.selectIds[id] = null;
					let datas = this.selectData;
					for(let i = 0, ii = datas.length; i < ii; i++) {
						if(datas[key] === id) {
							datas.splice(i, 1);
							break;
						}
					}
				}
			},
			//搜索关闭事件
			searchCloseClick(flag) {
				if(flag !== true && this.filterText) {
					this.filterText = "";
					return;
				}

				this.filterText = "";
				this.isSearch = false;
				this.treeSearchData = [];
			},
			//岗位列表标题显示格式的文本
			showText(item) {
				let fn = this.listProp.titleFn;
				if(typeof fn === "function") {
					return fn(item);
				}

				return item[this.listProp.title];
			},
			showContent(item) {
				let fn = this.listProp.contentFn;
				if(typeof fn === "function") {
					return fn(item);
				}

				return item[this.listProp.content];
			},
			//搜索时，显示的格式文本
			searchText(item) {
				if(!item.StruName) {
					return "";
				}

				return item.StruName.replace(this.filterReg, function(arg) {
					return "<font class='key-font'>" + arg + "</font>";
				});
			},
			topSearchText(item) {
				let text = this.showText(item);

				//let text = item.StationNo + " " + (item.EmployeeName || "") + " " + (item.PositionName || "");
				return text.replace(this.filterReg, function(arg) {
					return "<font class='key-font'>" + arg + "</font>";
				});
			},
			//定义一个搜索时间控制器
			searchTimeout(type) {
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					if(type === 1) {
						this.search();
					} else {
						this.searchTableData();
					}

				}, 100);
			},
			//向后台搜索数据
			search() {
				if(!this.filterText || !this.filterText.trim()) {
					this.treeSearchData = [];
					return;
				}

				this.$get("/api/plat/structures/filters", {
					keyWord: this.filterText,
					withDept: true,
					topCount: 20
				}, function(res) {
					this.filterReg = new RegExp(this.filterText, "ig");
					this.isSearch = true;
					if(!res || res.length === 0) {
						this.nodata = true;
						this.treeSearchData = [{}];
						return;
					}
					this.nodata = false;

					this.treeSearchData = res;
				});
			},
			//顶部搜索展开
			topSpread() {
				this.searchActive = false;
				this.isSearch = false;
				this.topSearch = true;
				this.topSearchParam.keyword = null;
				this.loadHistoryData();
			},
			topSearchClose(flag) {
				if(flag !== true && this.topSearchParam.keyword) {
					this.topSearchParam.keyword = "";
					return;
				}

				this.topSearchParam.keyword = null;
				this.topSearch = false;
				this.topTableData = [];
			},
			tabClick(index) {
				var indexs = this.tabIndexs;
				for(let key in indexs) {
					if(key == index) {
						this.tabIndexs[index] = !this.tabIndexs[index];
					} else {
						indexs[key] = false;
					}
				}
			},
			//flag:true为保存，false为删除
			saveHistory(datas, flag) {
				let key = this.listProp.id;
				let historyData = this.historyData;
				let currentDatas = [].concat(datas);

				if(flag === false) {
					currentDatas.forEach(data => {
						for(let i = 0, ii = historyData.length; i < ii; i++) {
							if(data[key] === historyData[i][key]) {
								historyData.splice(i, 1);
								break;
							}
						}
					});
					this.topTableData = [].concat(historyData);
				} else {
					currentDatas.forEach(data => {
						let isActive = false;
						for(let i = 0, ii = historyData.length; i < ii; i++) {
							if(data[key] === historyData[i][key]) {
								isActive = true;
								break;
							}
						}
						if(isActive === false) {
							historyData.push(data);
						}
					});
					if(historyData.length > 20) {
						historyData.slice(historyData.length - 21);
					}

				}

				localStorage[this.cookieName || "historyCookieStation"] = JSON.stringify(historyData);
			},
			loadHistoryData() {
				this.topMapText = "搜索历史";

				this.topTableData = [].concat(this.historyData);
			},
			searchTableData() {
				if(!this.topSearchParam.keyword) {
					return;
				}

				this.topMapText = "搜索内容";

				this.$get("/api/plat/stations/", this.topSearchParam, function(res) {
					this.filterReg = new RegExp(this.topSearchParam.keyword, "ig");
					let datas = res.Rows;
					datas.forEach((item) => {
						item.__checked = false;
					});
					this.topTableData = datas;
				});
			},
			loadCurrentStruData(item) {
				const pageSize = this.defaultParams.pageSize;
				this.defaultParams.pageSize = 10000;
				this.defaultParams.pageIndex = 1;
				this.activeNode(item);
				this.loadTableData(() => {
					this.defaultParams.pageSize = pageSize;
					this.selectAll();
				});
			},
			//获取岗位数据
			loadTableData(callback) {
				this.$get("/api/plat/stations/", this.defaultParams, function(res) {
					let datas = res.Rows;
					datas.forEach((item) => {
						item.__checked = false;
					});
					this.tableData = datas;
					if(typeof callback === "function") {
						callback();
					}
				});
			},
			//获取企业架构数据
			loadTreeData() {
				var url = "/api/plat/structures/brief";
				if(this.nodeId) {
					url = "/api/plat/structures/{struId}/parentAndSiblings";
				}

				this.$get(url, {
					"withDept": true,
					struId: this.nodeId
				}, function(res) {
					this.treeData = res || [];

					if(!this.nodeId && this.treeData.length > 0) {
						this.$nextTick(() => {
							//先展开树型
							var iconNode = this.$el.querySelector(".sapi-tree>ul>li:not(.tree-node-no-child)>.tree-node-text>.tree-node-icon");
							if(iconNode) {
								iconNode.click();
							}
							//初始化选中集团
							this.nodeId = this.treeData[0].StruId;
							//获取集团相关岗位
							this.loadTableData();
						});
					}
				});
			},
			//树节点点击事件
			treeNodeClick(node) {
				this.activeNode(node);
				this.defaultParams.pageIndex = 1;
				this.loadTableData();
			},
			//企业架构自定义内容添加点击事件
			renderNodeClick(e, data, index) {
				let target = e.target;
				let className = target.className;
				//第一级点的定位事件
				if(!data.ParentStruId) {
					if(className.indexOf("nodeIcon") === -1 && target.parentNode.className.indexOf("nodeIcon") === -1) {
						return;
					}

					//定位查找事件
					this.isSearch = true;
				} else if(className.indexOf("nodeIcon") === -1) { //其他节点的加号事件判断
					return;
				} else {
					//全选事件
					this.loadCurrentStruData(data);
				}

				//不进行冒泡
				return false;
			},
			//企业架构自定义内容格式
			renderContent(data, index) {
				var text = data[this.defaultProps.label];
				var iconHtml,
					className,
					iconNode = "";

				if(!data.ParentStruId) {
					className = "treeNode treeRoot";
					iconHtml = "<font>G</font>";
				} else if(data.StruType !== 1) {
					className = "treeNode treeCompany";
					iconHtml = "<font>C</font>";
				} else {
					className = "treeNode treeDepart";
					iconHtml = "<font>D</font>";
				}

				let child = this.defaultProps.children;
				let hasChild = this.defaultProps.hasChild;

				if((data[child] && data[child].length > 0) || data[hasChild] === true) {
					if(!data.ParentStruId) {
						if(index === 0) {
							iconNode = "<p class='nodeIcon'><span>定位到</span><i class='el-icon-location'></i></p>";
						}
					} else if(this.multiple === true) {
						iconNode = "<i class='nodeIcon el-icon-circle-plus-outline'></i>";
					}
				}

				return "<div class='" + className + "'>" + iconHtml + "<span title='" + text + "' class='text'>" + text + "</span>" + iconNode + "</div>";
			},
			//当前初始化节点
			activeNode(node) {
				this.defaultParams.struId = node.StruId;
				this.defaultParams.struName = node.StruName;
				this.defaultParams.struType = node.StruType;
			}
		},
		created() {
			this.visible = this.value;
			this.$nextTick(() => {
				//获取历史数据
				let datas = localStorage[this.cookieName || "historyCookieStation"];
				this.historyData = datas ? JSON.parse(datas) : [];
				this.historyData.forEach((item) => {
					item.__checked = false;
				});
			});

			let props = this.props;
			if(props && this.$typeof(props) === "object") {
				for(let key in props) {
					this.listProp[key] = props[key];
				}
			}

		},
		watch: {
			value(val) {
				this.visible = val;

			},
			filterText(val) {
				this.searchTimeout(1);
			},
			"topSearchParam.keyword" (val) {
				this.searchTimeout(2);
			}
		}
	}
</script>

<style lang="less">
	@import "../static/css/sapi-select-user";
</style>