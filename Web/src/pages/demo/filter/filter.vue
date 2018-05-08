<template>
	<div class="role main-box">
		<div class="main-header">
			<div class="main-header-map"><span class="main-header-map-text"></span></div>
			<div class="main-header-search">
				<div class="func-btns">
					<sapi-search v-model="params.keyword" @on-search="getTableData"></sapi-search>
					<span class="icon-btn" @click="openDialog" title="新增"><i class="icon-build"></i></span>
					<span class="icon-btn icon-filter" title="过滤"></span>
				</div>

			</div>
		</div>

		<div class="main-table table-no-border">
			<!--表格内容-->
			<div class="table-box">
				<el-table v-if="tableData" border :data="tableData" :height="maxBodyHeight">
					<el-table-column v-for="item in headerData" :key="item.id" :prop="item.prop" :label="item.label" show-overflow-tooltip width="width" :sortable="item.sortable">
					</el-table-column>
					<el-table-column inline-template label="操作" fixed="right" width="70">
						<span>
                            <a class="table-btn" href="javascript:void(0)" @click.stop="openViewDialog(row,$index)">查看</a>
                        </span>
					</el-table-column>
				</el-table>
			</div>
		</div>

		<div class="main-pager">
			<el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" :layout="layout" :total="pageTotal">
			</el-pagination>
		</div>

		<!--
		---使用说明:
		---filter组件只能接收两个参数：一个是确认的回调函数(@on-confirm="getTableData")，一个是否初始化展示条件(:is-init="true")
		---ul-li为固定模式，不能使用其他标签替换
		---组件内部数据绑定参数：v-model只能为params的值，需要在data下定义，prop：为v-mode具体值(省略了params)，
		---options为控制参数，有六个属性options：data,key,value,deleted,format,default(示例：data:options,key:text,value:value,deleted:false,format:date,default:默认值)
		---情景一：使用format:date，输出的时候为时间格式 yyyy-M(M)-d(d);
		---情景二：使用data:options,其中options为Vue data下数组变量名称(只能在data下，不能在其他参数下),
		--- deleted:false,说明没有删除按钮，为必填，默认是true，有删除按钮的（暂时去掉）
		--- relatedProps:a,b,c等,联动性删除属性集合，当删除x标签时，会同时删除prop=a,prop=b,prop=c的标签
		---情景三：值跟显示值（key与value）不一样，这时候需要把label设置为显示值，value为该控件value,default为删除标签时赋予的默认值
		---情景四、五，跟情景二类似，需要绑定data,只不过情景二使用默认值，data的label:label,value:value，这里没有使用而已
		-->
		<filter-role @on-confirm="getTableData" :is-init="true">
			<ul>
				<li>
					<span class="w-65">开始时间</span>
					<span class="right-auto-box">
						<el-date-picker v-model="params.startTime" prop="startTime"  type="date" format="yyyy-MM-dd" :picker-options="pickerOptions" @click="chooseTime(sysLog)" options="format:date,relatedProps:endTime">
						</el-date-picker>
					</span>
				</li>
				<!--情景一-->
				<li>
					<span class="w-65">结束时间</span>
					<span class="right-auto-box">
						<el-date-picker v-model="params.endTime"  prop="endTime"  type="date"  format="yyyy-MM-dd" :picker-options="pickerOptions" @click="chooseTime(sysLog)" options="format:date">
						</el-date-picker>
					</span>
				</li>
				<!--情景二-->
				<li>
					<span class="w-65">多选择</span>
					<span class="right-auto-box">
						<el-checkbox-group v-model="params.checkList" prop="checkList"   options="data:options,deleted:false">
   				 			<el-checkbox :label="item.value"  :key="item.key" v-for="item in options">{{item.key}}</el-checkbox>
  						</el-checkbox-group>
					</span>
				</li>
				<!--情景三-->
				<li>
					<span class="w-65">单选择</span>
					<span class="right-auto-box">
						<el-checkbox v-model="params.checked" prop="checked" options="label:备选项,value:true">备选项</el-checkbox>
					</span>
				</li>
				<!--情景四-->
				<li>
					<span class="w-65">单选框</span>
					<span class="right-auto-box">
						<el-radio-group v-model="params.radio" prop="radio"   options="data:radios,label:text,value:value">
					    	<el-radio :label="item.value" :key="item.value" v-for="item in radios">{{item.text}}</el-radio>
					  	</el-radio-group>
					</span>
				</li>
				<!--情景五-->
				<li>
					<span class="w-65">下拉列表</span>
					<span class="right-auto-box">
						<el-select v-model="params.select" prop="select" options="data:options2,label:label,value:value" placeholder="请选择">
						    <el-option
						      v-for="item in options2"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value"
						      :disabled="item.disabled">
						    </el-option>
						</el-select>
					</span>
				</li>

			</ul>
		</filter-role>

		<dialog-filter v-model="dialogVisible"></dialog-filter>

	</div>

</template>

<script>
	import confirm from "@/components/sapi-confirm.js";
	import search from "@/components/sapi-search.vue";
	import filter from "@/components/sapi-filter.vue";
	import dialogFilter from "./dialog-filter.vue";
	import "@/pages/plat/static/css/index.css";
	export default {
		data() {
			return {
				//全局
				permissions: {},
				headerData: [{
					prop: "OperateTimeString",
					label: "操作时间",
					sortable: false
				}, {
					prop: "UserName",
					label: "用户名",
					sortable: false
				}, {
					prop: "AliasName",
					label: "员工名称",
					sortable: false
				}, {
					prop: "Title",
					label: "操作记录名称",
					sortable: false
				}, {
					prop: "Source",
					label: "操作请求",
					sortable: false
				}, {
					prop: "ClientName",
					label: "客户端",
					sortable: false
				}, {
					prop: "UserAddress",
					label: "用户IP",
					sortable: false
				}],

				tableData: [],

				params: {
					startTime: "",
					endTime: "",
					checkList: ["A"],
					checked: true,
					radio: 3,
					select: ""
				},

				radios: [{
					value: 3,
					text: "单选1"
				}, {
					value: 6,
					text: "单选2"
				}, {
					value: 9,
					text: "单选3"
				}, {
					value: 12,
					text: "单选4"
				}],

				options2: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶',
					disabled: true
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],

				options: [{
					key: "a",
					"value": "A"
				}, {
					key: "b",
					"value": "B"
				}, {
					key: "c",
					"value": "C"
				}, {
					key: "d",
					"value": "D"
				}],

				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							var end = new Date();
							var start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
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
				dialogVisible: false
			}
		},
		mixins: [getPagerMixin()],
		methods: {
			getTableData() {
				if(!this.params.startTime) {
					Vue.msg('请选择开始时间');
					return;
				} else if(!this.params.endTime) {
					Vue.msg('请选择结束时间');
					return;
				}
				this.$get("/api/plat/operateLogs/", this.params, function(res) {
					this.tableData = res.Rows;
					this.pageTotal = res.Total;
				})
			},
			openViewDialog(row) {
				this.currentView = "systemlog-view";
				this.option = row;
				this.visible = true;
				this.viewUrl = "/api/plat/operateLogs/";
			},
			getTimeArr() {
				var end = new Date();
				var start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				this.params.startTime = start;
				this.params.endTime = end;
			},
			openDialog() {
				this.dialogVisible = true;
			}
		},
		components: {
			"sapi-search": search,
			"filter-role": filter,
			"dialog-filter": dialogFilter
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