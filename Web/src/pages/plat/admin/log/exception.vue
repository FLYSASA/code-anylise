<template>
	<div class="main">
		<div class="main-header">
			<div class="main-header-map"><span class="main-header-map-text"></span></div>
			<div class="main-header-search">
				<div class="func-btns">
					<sapi-search v-model="params.keyword" placeholder="按帐号、实名、异常消息、IP进行搜索" @on-search="getTableData"></sapi-search>
					<span class="icon-btn icon-filter" title="过滤"></span>
				</div>			
			</div>
		</div>

		<div class="main-table table-no-border width-p100">
			<!--表格内容-->
			<div class="table-box">
				<el-table v-if="tableData" border :data="tableData" @sort-change="sortChange" :height="maxBodyHeight">
					<el-table-column v-for="item in headerData1" :key="item.id" :prop="item.prop" :label="item.label" show-overflow-tooltip :width="item.width" :sortable="item.sortable" :formatter="item.formatter">
					</el-table-column>
					<el-table-column label="异常消息" show-overflow-tooltip>
                        <template slot-scope="props">
							<a href="javascript:void(0)" @click.stop="openViewDialog(props.row)">{{props.row.Message}}</a>
						</template>
					</el-table-column>
					<el-table-column v-for="item in headerData2" :key="item.id" :prop="item.prop" :label="item.label" show-overflow-tooltip width="width" :sortable="item.sortable">
					</el-table-column>
				</el-table>
			</div>
		</div>

		<div class="main-pager">
			<el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" :layout="layout" :total="pageTotal">
			</el-pagination>
		</div>

		<filter-role @on-confirm="getTableData">
			<ul>
				<li>
					<span class="w-65">时间范围</span>
					<span class="right-auto-box">
						<el-date-picker v-model="params.dateRange" prop="dateRange" type="daterange" :picker-options="pickerOptions" @click="chooseTime(sysLog)" options="format:dateRange">
						</el-date-picker>
					</span>
				</li>

			</ul>
		</filter-role>

		<component v-bind:is="currentView" v-model="visible" :option="option" :view-url="viewUrl"></component>

	</div>

</template>

<script>
	import confirm from "@/components/sapi-confirm.js";
	import search from "@/components/sapi-search.vue";
	import filter from "@/components/sapi-filter.vue";

	export default {
		data() {
			return {
				//全局
				permissions: {},
				headerData1: [{
					prop: "ExceptionTime",
					label: "异常发生时间",
					sortable: "custom",
					width:180,
					formatter: function(row){
						return Vue.dateFormat("yyyy-MM-dd hh:mm",row.ExceptionTime);
					}
				}, {
					prop: "UserName",
					label: "用户帐号",
					sortable: "custom"
				}, {
					prop: "AliasName",
					label: "用户实名",
					sortable: false,
					width: 120
				}, {
					prop: "TypeName",
					label: "异常类型",
					sortable: false
				}],
				headerData2: [{
					prop: "Source",
					label: "异常请求",
					sortable: false
				}, {
					prop: "ClientName",
					label: "客户端",
					sortable: "custom"
				}, {
					prop: "UserAddress",
					label: "用户IP",
					sortable: "custom"
				}],
				tableData: "",
				params: {
					dateRange:null,
					startTime: null,
					endTime: null
				},
				currentView: '',
				option: '',
				viewUrl: '',
				visible: false,
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							var end = new Date();
							var start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							var end = new Date();
							var start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							var end = new Date();
							var start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},

				//浏览
				viewModel: "",
			}
		},
		computed: {

		},
		mixins: [getPagerMixin(),getTabMixin()],
		methods: {
			getTableData() {
				var dateRange = this.params.dateRange;
				if(!dateRange || dateRange.length === 0) {
					Vue.msg('请选择时间范围');
					this.getTimeArr();
					dateRange = this.params.dateRange;
				}

				this.params.startTime = dateRange[0];
				this.params.endTime = dateRange[1];
				
				this.$get("/api/plat/exceptionLogs/", this.params, function(res) {
					this.tableData = res.Rows;
					this.pageTotal = res.Total;
				})
			},
			openViewDialog(row,index) {
				this.currentView = "systemlog-view";
				this.option = row;
				this.visible = true;
				this.viewUrl = "/api/plat/exceptionLogs/";
			},
			getTimeArr() {
				var end = new Date();
				var start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				this.params.dateRange = [start, end];
			},
			sortChange(obj) {
				this.params.sortName = obj.prop;
                this.params.sortType = obj.order;
                this.pageCurrentChange(1);
			},
		},
		components: {
			"systemlog-view": (resolve) => {
				require(['./exception-view.vue'], resolve);
			},
			"sapi-search": search,
			"filter-role": filter
		},
		created() {
			Vue.use(confirm);
			//初始化权限等
			this.$init();

			this.getTimeArr();
			//pager改变时将要执行的函数，对该值进行初始化
			this.pageFunc = this.getTableData;
			this.getTableData();
		}
	}
</script>

<style>

</style>