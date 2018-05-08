<template>
	<div class="demo">
		<el-table class="mb-16" :data="tableData" max-height="400" style="width: 100%;">
			<el-table-column prop="status" label="审批状态" width="100">
			</el-table-column>
			<el-table-column prop="name" label="申请名称" width="180">
			</el-table-column>
			<el-table-column prop="reason" label="申请理由">
			</el-table-column>
			<el-table-column prop="people" label="起草人" width="550">
			</el-table-column>
			<el-table-column prop="date" label="起草时间" width="560">
			</el-table-column>
		</el-table>

		<el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" :layout="layout" :total="pageTotal">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
			}
		},
		mixins:[getPagerMixin()],
		methods: {
			getTableData(){
				var datas=this.tableData=[],data;
				for(var i=0;i<20;i++){
					data={};
					data.status="待审核";
					data.name="审核名称什么的"+i;
					data.reason="审核理由之"+i;
					data.people="审核人之"+i;
					data.date=this.$dateFormat("yyyy-MM-dd",(new Date()).toDateString());
					datas.push(data);
				}
				this.pageTotal=20;
			}
		},
		mounted() {
			//pager改变时将要执行的函数，对该值进行初始化
			this.pageFunc=this.getTableData;
			this.getTableData();
		}
	}
</script>

<style>
.demo {
		width: 80%;
		margin: 0px auto;
		padding: 15px;

		border-radius: 5px;
		background: rgba(255, 255, 255, 0.7);
	}
</style>