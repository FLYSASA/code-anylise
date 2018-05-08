<template>
	<div>
		<div class="fullline">
			<el-button @click="print">打印</el-button>
		</div>
		<div class="main-table table-no-border" :width="1120">
			<el-table :data="tableData">
				<el-table-column prop="status" label="审批状态" width="100">
				</el-table-column>
				<el-table-column prop="name" label="申请名称" width="180">
				</el-table-column>
				<el-table-column prop="reason" width="620" label="申请理由">
				</el-table-column>
				<el-table-column prop="people" label="起草人1" width="220">
				</el-table-column>
				<el-table-column prop="people" label="起草人2" width="230">
				</el-table-column>
				<el-table-column prop="people" label="起草人3" width="130">
				</el-table-column>
				<el-table-column prop="date" label="起草时间" width="160">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import print from "@/static/js/print.js";
	export default {
		data() {
			return {
				tableData: []
			}
		},
		mixins: [print],
		methods: {
			getTableData() {
				var datas = this.tableData = [],
					data;
				for(var i = 0; i < 80; i++) {
					data = {};
					data.status = "待审核";
					data.name = "审核名称什么的" + i;
					data.reason = "审核理由之" + i;
					data.people = "审核人之" + i;
					data.date = this.$dateFormat("yyyy-MM-dd", (new Date()).toDateString());
					datas.push(data);
				}
			},
			print() {
				this.width = "1045px";
				this.printView(".main-table");
			}
		},
		mounted() {
			this.getTableData();
		}
	}
</script>

<style>

</style>