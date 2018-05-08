<template>
	<sapi-dialog v-model="visible" width="800px" top="6%" class="add" @on-open="open" @on-close="close">
		<div class="main" style="min-height: 400px;">
			<div class="main-header">
				<div class="main-header-search">
					<div class="func-btns">
						<sapi-search v-model="params.keyword" @on-search="getTableData"></sapi-search>
						<span class="icon-btn icon-filter" title="过滤"></span>
					</div>
				</div>
			</div>

			<div class="main-table table-no-border">
				<!--表格内容-->
				<div class="table-box">
					<el-table v-if="tableData" border :data="tableData">
						<el-table-column v-for="item in headerData" :key="item.id" :prop="item.prop" :label="item.label" show-overflow-tooltip width="width" :sortable="item.sortable">
						</el-table-column>
						<el-table-column inline-template label="操作" fixed="right" width="70">
							<span>
                            <a class="table-btn" href="javascript:void(0)" >查看</a>
                        </span>
						</el-table-column>
					</el-table>
				</div>
			</div>

			<div class="main-pager">
				<el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" :layout="layout" :total="pageTotal">
				</el-pagination>
			</div>

			<filter-role @on-confirm="getTableData" :is-init="true">
				<ul>
					<li>
						<span class="w-65">开始时间</span>
						<span class="right-auto-box">
						<el-date-picker v-model="params.startTime" prop="startTime"   type="date" format="yyyy-MM-dd" :picker-options="pickerOptions" @click="chooseTime(sysLog)" options="format:date">
						</el-date-picker>
					</span>
					</li>
					<!--情景一-->
					<li>
						<span class="w-65">结束时间</span>
						<span class="right-auto-box">
						<el-date-picker v-model="params.endTime"    type="date"  format="yyyy-MM-dd" :picker-options="pickerOptions" @click="chooseTime(sysLog)" options="format:date">
						</el-date-picker>
					</span>
					</li>
					<!--情景二-->
					<li>
						<span class="w-65">多选择</span>
						<span class="right-auto-box">
						<el-checkbox-group v-model="params.checkList"   options="data:options,deleted:false">
   				 			<el-checkbox :label="item.value"  :key="item.key" v-for="item in options">{{item.key}}</el-checkbox>
  						</el-checkbox-group>
					</span>
					</li>
					<!--情景三-->
					<li>
						<span class="w-65">单选择</span>
						<span class="right-auto-box">
						<el-checkbox v-model="params.checked"  options="key:备选项,value:true,default:false">备选项</el-checkbox>
					</span>
					</li>
					<!--情景四-->
					<li>
						<span class="w-65">单选框</span>
						<span class="right-auto-box">
						<el-radio-group v-model="params.radio"    options="data:radios,key:text,value:value">
					    	<el-radio :label="item.value" :key="item.value" v-for="item in radios">{{item.text}}</el-radio>
					  	</el-radio-group>
					</span>
					</li>
					<!--情景五-->
					<li>
						<span class="w-65">下拉列表</span>
						<span class="right-auto-box">
						<el-select  v-model="params.select" options="data:options2,key:label,value:value" placeholder="请选择">
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
		</div>
	</sapi-dialog>

</template>

<script>
	import search from "@/components/sapi-search.vue";
	import filter from "@/components/sapi-filter.vue";
	import dialog from "@/components/sapi-dialog.vue";
	export default {
		data() {
			return {
				visible: false,
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
			}
		},
		props: ["value"],
		mixins: [getPagerMixin()],
		components: {
			"sapi-search": search,
			"filter-role": filter,
			"sapi-dialog": dialog
		},
		methods: {
			close() {
				this.$emit("input", false);
			},
			open() {
				this.getTimeArr();
			},
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
			getTimeArr() {
				var end = new Date();
				var start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				this.params.startTime = start;
				this.params.endTime = end;
			},
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		},
		mounted() {
			this.visible = this.value;
		}
	}
</script>

<style>

</style>