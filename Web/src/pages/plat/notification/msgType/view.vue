<template>
	<div class="msg-type-view">
		<div class="fullline">
			<span class="w-80">类别名称</span>
			<div class="right-box">
				<el-input v-model="viewModel.MsgTypeName" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-80">父级类别</span>
			<div class="right-box">
				<el-input v-model="viewModel.ParentTypeName" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-80">类别描述</span>
			<div class="right-box">
				<el-input v-model="viewModel.Remark" type="textarea" :autosize="{minRows: 2, maxRows: 2}" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-80">行号</span>
			<div class="right-box">
				<el-input v-model="viewModel.RowIndex" readonly></el-input>
			</div>
		</div>
		<!--处理路径-->
		<div class="set-handleUrl-box">
			<span class="w-80">处理路径</span>
			<div class="right-path-box width-p100">
				<el-table class="common-table" v-show="viewModel.HandleUrls" :data="viewModel.HandleUrls">
					<el-table-column v-for="item in handleUrlHeaderData" :key="item.id" :prop="item.prop" :label="item.label" show-overflow-tooltip :width="item.width" :min-width="item.minWidth" :sortable="item.sortable">
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				viewModel: {},
				handleUrlHeaderData: [{
					prop: "DealTypeId",
					label: "类型编码",
					sortable: false,
					width: 100
				}, {
					prop: "DealTypeName",
					label: "类型名称",
					sortable: false,
					width: 100
				}, {
					prop: "DealUrl",
					label: "处理路径",
					sortable: false,
					minWidth: 100
				}, {
					prop: "RowIndex",
					label: "行号",
					sortable: true,
					width: 90
				}]
			}
		},
		props: ["option"],
		mounted() {
			this.viewModel = this.option;
		},
		watch: {
			option(val) {
				this.viewModel = this.option;
			}
		}
	}
</script>

<style>
	.msg-type-view{
		width: 100%;
		height: 100%;
		overflow: auto;
		padding: 30px 15px 15px 15px;
	}
	.msg-type-view .right-path-box{
		display: inline-block;
	    width: calc(100% - 90px);
	    vertical-align: top;	
	}
</style>