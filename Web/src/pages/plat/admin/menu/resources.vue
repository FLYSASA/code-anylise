<template>
	<div class="resource-power-box">
		<div class="resource-list-container float-left">
			<h5 class="resource-title f-12">资源名称</h5>
			<ul class="resource-list list-unstyled">
				<li v-for="(item,$index) in resources" :class="{active:activeIndex===$index}" :title="item.ResourceName" @click.self="clickMenuResource(item,$index)">
					<span class="right-btn-box" @click="addResourcePath($index)" v-if="editable"><i class="icon-work"></i></span> {{item.ResourceName}}
				</li>
			</ul>
		</div>
		<div class="table common-table width-p100">
			<el-table class="float-left" v-show="menuResourcePaths" :data="menuResourcePaths" height="198">
				<el-table-column v-for="item in headerData" :width="item.width" :key="item.id" :prop="item.prop" :label="item.label" show-overflow-tooltip :sortable="item.sortable">
				</el-table-column>
				<el-table-column label="操作" width="100" v-if="editable">
					<template slot-scope="props">
                        <a class="table-btn" href="javascript:void(0)" @click.stop="editResourcePath(props.row,props.$index)">编辑</a>
                        <a class="table-btn" href="javascript:void(0)" @click.stop="deleteResourcePath(props.row,props.$index)">删除</a>
                    </template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
	import dialog from "@/components/sapi-dialog.vue";

	export default {
		data() {
			return {

				pathModel: {
					Method: "POST",
					Path: "",
					RowIndex: ""
				},
				type: "add", //表示新增路径、还是修改路径，默认为新增
				activeIndex: 0,
				editIndex: 0,
				menuResourcePaths: [],
				headerData: [{
					prop: "Path",
					label: "路径",
					sortable: false
				}, {
					prop: "Method",
					label: "方法",
					width: "100",
					sortable: false
				}, {
					prop: "RowIndex",
					label: "行号",
					width: "100",
					sortable: true
				}],
				resourceMethods: ["POST", "PUT", "DELETE", "GET"]
			}
		},
		props: ["option", "editable", "resources"],

		methods: {
			clickMenuResource(row, index) {
				this.activeIndex = index;
				this.menuResourcePaths = row.Paths;
			},
			addResourcePath(index) {
				this.pathModel = {
					Method: "POST",
					Path: "",
					RowIndex: 10
				}
				var indexArrs=[this.activeIndex];
				this.$emit("call-back", this.pathModel, indexArrs, true);
			},
			editResourcePath(row, index) {
				this.pathModel = JSON.parse(JSON.stringify(row));
				var indexArrs=[this.activeIndex,index];
				this.$emit("call-back", this.pathModel, indexArrs, false);
			},
			deleteResourcePath(row, index) {
				var datas = this.resources[this.activeIndex].Paths;
				datas.splice(index, 1);
			},
		},
		mounted() {
			if(typeof this.option == "object") {
				if(this.resources && this.resources.length > 0) {
					this.menuResourcePaths = this.resources[0].Paths;
				}
			}
		},
		watch: {
			resources(val) {
				this.activeIndex = 0;
				if(val && val.length > 0) {
					this.menuResourcePaths = val[0].Paths;
				}
			}
		}
	}
</script>

<style>
	.resource-list-container {
		width: 14%;
		min-width: 85px;
		height: 198px;
		float: left;
		border: 1px solid #e0e6ed;
		overflow: hidden;
		border-right: none;
	}
	
	.resource-power-box .resource-title {
		margin: 0 auto;
		text-align: center;
		height: 36px;
		line-height: 38px;
		font-weight: bold;
		background-color: #f8f8f8;
	}
	
	.resource-power-box .resource-list {
		/*min-height: 59px;*/
		/*max-height:360px;*/
		height: 160px;
		margin: 0;
		padding: 0;
		overflow-y: auto;
	}
	
	.resource-power-box .resource-list>li {
		height: 40px;
		line-height: 40px;
		padding-left: 15px;
		padding-right: 6px;
		margin: 0;
		/*border-bottom: 1px solid #e0e6ed;*/
		cursor: pointer;
		list-style: none;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.resource-list>li.active {
		background-color: #cdf0ff;
	}
	
	.resource-list .el-checkbox__label {
		padding-left: 15px;
	}
	
	.resource-list .right-btn-box {
		float: right;
		width: 24px;
		height: 24px;
		margin-top: 8px;
		line-height: 24px;
		text-align: center;
		border: 1px solid #ccc;
		border-radius: 5px;
		background: #fff;
		display: none;
	}
	
	.resource-list li.active .right-btn-box {
		display: block;
	}
	
	.resource-power-box .resource-path {
		float: left;
		width: 75%;
	}
	
	.resource-list-box .resource-list>li {
		float: left;
		width: 142px;
		height: 30px;
		line-height: 30px;
		list-style: none;
	}
	
	.resource-power-box>.table {
		overflow: hidden;
	}
	
	.right-btn-box .icon-work {
		color: #888;
	}
</style>