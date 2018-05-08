<template>
<div class="content-wrap">
	<div class="main-header">
		<div class="main-header-map"><span class="main-header-map-text"></span></div>
	</div>
	<div class="form-content no-footer padding-content">
		<div class="fullline">
			<div class="wp-50">
				<span class="w-65">版本名称</span>
				<div class="right-auto-box">
					<el-input id="RoleName" v-model="viewModel.Name" readonly></el-input>
				</div>
			</div>
			<div class="wp-50 float-right">
				<span class="w-65">版本号</span>
				<div class="right-auto-box">
					<el-input v-model="viewModel.Version" readonly></el-input>
				</div>
			</div>
		</div>
		<div class="fullline">
			<div class="wp-50">
				<span class="w-65">发布日期</span>
				<div class="right-auto-box">
					<el-input v-model="viewModel.Date" readonly></el-input>
				</div>
			</div>
			<div class="wp-50 float-right">
				<span class="w-65">作者</span>
				<div class="right-auto-box">
					<el-input  v-model="viewModel.Author" readonly></el-input>
				</div>
			</div>
		</div>
		<div class="fullline">
			<span class="w-65">依赖信息</span>
			<!--依赖版本信息列表-->
			<div class="right-auto-box common-table width-p100">
				<el-table :data="viewModel.Dependencies" >
					<el-table-column prop="Name" label="名称" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="Version" label="版本号" show-overflow-tooltip>
					</el-table-column>				
				</el-table>
			</div>
		</div>
		<div class="fullline">
			<span class="w-65">描述信息</span>
			<div class="right-auto-box">
				<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="viewModel.Description" readonly></el-input>
			</div>
		</div>
	</div>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				viewModel: {}
			}
		},
		methods: {
			getData() {
				this.$get("/api/plat/configs/",function(res) {
					this.viewModel = JSON.parse(res.Version);
				});
			}
		},
		created()
		{
			this.$init();
			this.getData();
		},
	}
</script>

<style scoped="scoped">
	.padding-content{
		width: 100%;
		padding-left: 32px;
		padding-right:32px;
		padding-top: 20px;
	}


</style>
