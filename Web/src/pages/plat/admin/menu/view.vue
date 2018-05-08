<template>
	<div class="view">
		<div class="fullline">
			<span class="w-65">菜单名称</span>
			<div class="right-box">
				<el-input v-model="viewModel.MenuName" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-65">菜单编号</span>
			<div class="right-box">
				<el-input v-model="viewModel.MenuNo" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-65">父级菜单</span>
			<div class="right-box">
				<el-input :value="viewModel.ParentMenuName||'根节点'" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-65">链接地址</span>
			<div class="right-box">
				<el-input :value="viewModel.MenuPath" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<div class="wp-50">
				<span class="w-65">菜单图标</span>
				<div class="right-box">
					<el-input v-model="viewModel.IconPath" readonly></el-input>
				</div>
			</div>			
			<div class="wp-50 float-right">
				<span class="w-65">显示菜单</span>
				<div class="right-box">
					<el-checkbox v-model="viewModel.Enabled" disabled></el-checkbox>
				</div>
			</div>
		</div>
		
		<div class="fullline">
			<span class="w-65">备注</span>
			<div class="right-box">
				<el-input v-model="viewModel.Remark" type="textarea" :autosize="{minRows: 2, maxRows: 2}" readonly></el-input>					
			</div>
		</div>
		<div class="fullline">
			<div class="wp-50">
				<span class="w-65">资源权限</span>
			</div>
			<div class="wp-50 float-right">
				<span class="w-65">行号</span>
				<div class="right-box">
					<el-input v-model="viewModel.RowIndex" readonly></el-input>
				</div>
			</div>
		</div>
		<div class="fullline resource-wrap">
			<!-- <span class="w-65">资源权限</span>
			<div class="right-box"> -->
				<menu-resource :resources="viewModel.Resources"></menu-resource>
			<!-- </div> -->
		</div>
	</div>
</template>

<script>
	import resources from "./resources.vue";
	export default {
		data() {
			return {
				viewModel: {}
			}
		},
		props: ["option"],
		components: {
			"menu-resource": resources
		},
		methods: {

		},
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
	.view {
		padding: 30px 15px 15px 15px;
	}
	
	.menu-side .resource-wrap{
		width: calc(100% - 20px);
	}
</style>