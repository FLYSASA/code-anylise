<template>
	<div class="role main">
		<div class="main-header">
			<div class="main-header-map"><span class="main-header-map-text"></span></div>
			<div class="main-header-search">
				<div class="func-btns">
					<sapi-search v-model="params.keyword" placeholder="按标识、名称进行搜索" @on-search="getTableData"></sapi-search>
					<span class="icon-btn" @click="openAddDialog" title="添加"><i class="icon-build"></i></span>
				</div>			
			</div>
		</div>

		<div class="main-table table-no-border width-p100">
			<!--表格内容-->
			<div class="table-box">
				<el-table border :data="tableData" ref="bodyTable" @row-click="handleRowClick" :height="maxBodyHeight">
					<el-table-column v-for="item in headerData" :key="item.id" :prop="item.prop" :label="item.label" :formatter="item.formatter" show-overflow-tooltip width="width" :sortable="item.sortable">
					</el-table-column>
					<el-table-column label="操作" fixed="right" width="130">
						<template slot-scope="props">
                            <a  class="table-btn" href="javascript:void(0)" @click.stop="openEditDialog(props.row,props.$index)">编辑</a>
                            <a v-if="!props.row.IsSystem" class="table-btn" href="javascript:void(0)" @click.stop="deleteItem(props.row,props.$index)">删除</a>
                        </template>
					</el-table-column>
				</el-table>
			</div>
		</div>

		<div class="main-pager">
			<el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" :layout="layout" :total="pageTotal">
			</el-pagination>
		</div>

		<component v-bind:is="currentEdit" v-model="editVisible" :option="option"></component>
		<component v-bind:is="currentAdd" v-model="addVisible"></component>

	</div>

</template>

<script>
	import confirm from "@/components/sapi-confirm.js";
	import search from "@/components/sapi-search.vue";

	export default {
		data() {
			return {
				//全局
				permissions: {},
				currentEdit:false,
				currentAdd:false,
				option: {},
				editVisible: false,
				addVisible: false,
				headerData: [{ //表头数据
					prop: "ClientId",
					label: "客户端标识",
					sortable: true
				}, {
					prop: "Name",
					label: "客户端名称",
					sortable: true,
				}, {
					prop: "ClientSecret",
					label: "客户端密钥",
					sortable: true
				}, {
					prop: "RefreshTokenLifeTime",
					label: "Token更新时间",
					sortable: false
				}, {
					prop: "Enabled",
					label: "是否启用",
					sortable: false,
					formatter: function(row) {
						return row.Enabled ? "启用" : "禁用";
					}
				}],
				tableData: []
			}
		},
		mixins: [getPagerMixin(),getTabMixin()],
		methods: {
			getTableData() {
				var _this = this;
				this.$get("/api/plat/clients/",this.params,function (res) {
					var rows=res.Rows;					
					this.tableData = res.Rows;
					this.pageTotal = res.Total;
				})
			},
			openEditDialog(row) {
				this.currentEdit = "client-edit";
				this.option = row;
				this.editVisible = true;
			},
			openAddDialog() {
				this.currentAdd = "client-add";
				this.addVisible = true;
			},
			deleteItem(row) {
				this.$deleteTips(function () {
					this.$delete('/api/plat/clients/'+row.ClientId,function (res) {
						Vue.successMsg(res.Message);
						this.getTableData();
					})
				})
			},
			handleRowClick(row, e) {
				this.$refs.bodyTable.toggleRowSelection(row)
			}
		},
		components: {
			"client-edit": (resolve) => {
				require(['./edit.vue'], resolve);
			},
			"client-add": (resolve) => {
				require(['./add.vue'], resolve);
			},
			"sapi-search": search
		},
		created() {
			Vue.use(confirm);
			//初始化权限等
			this.$init();

			//pager改变时将要执行的函数，对该值进行初始化
			this.pageFunc = this.getTableData;
			this.getTableData();
		}
	}
</script>

<style>

</style>