<template>
	<sapi-dialog v-model="visible" @on-open="open" width="650px" top="22%" @on-close="close">
		<span slot="title">设置权限资源</span>
		<div class="resource-list-box form-content">
			<el-checkbox-group class="clearfix" v-model="checkList">
				<ul>
					<li v-for="(item,index) in permissions">
						<el-checkbox v-if="index === 0" :label="item.ResourceCode" disabled>{{item.ResourceName}}</el-checkbox>
						<el-checkbox v-else :label="item.ResourceCode">{{item.ResourceName}}</el-checkbox>
					</li>
				</ul>
			</el-checkbox-group>

		</div>
		<div class="footer">
			<el-button class="blue-button" size="small" @click="comfirm">确定</el-button>
		</div>
	</sapi-dialog>

</template>

<script>
	import dialog from "@/components/sapi-dialog.vue";
	export default {
		data() {
			return {
				visible: false,
				model: {},
				permissions: baseResources,
				checkList: ["View"],
				cacheResources: {}
			}
		},
		props: ["value", "option"],
		components: {
			"sapi-dialog": dialog
		},
		methods: {
			close() {
				this.$emit('input', false);
			},
			open() {
				this.cacheResources = {};
				var _this=this;
				this.checkList=[];
				this.option.forEach(function(item) {
					_this.checkList.push(item.ResourceCode);
					_this.cacheResources[item.ResourceCode] = item;
				});
			},
			comfirm() {
				var caches = this.cacheResources;
				var res = [];
				var baseData = {};
				baseResources.forEach(function(item) {
					baseData[item.ResourceCode]={};
					baseData[item.ResourceCode]['name'] = item.ResourceName;
					baseData[item.ResourceCode]['rowIndex']=item.RowIndex; 
				});
				this.checkList.forEach(function(item) {
					
					var data = caches[item];
					if(!data) {
						res.push({
							ResourceCode: item,
							ResourceName: baseData[item]['name'],
							Remark: "",
							RowIndex: baseData[item]['rowIndex'],
							Paths: []
						});
					}else{
						res.push(data);
					}
				});
				res.sort(function (a,b) {
					return a.RowIndex-b.RowIndex;
				});
				this.$emit("call-back", res);
				this.close();
			}
		},
		mounted() {
			this.visible = this.value;
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		}
	}

	var baseResources = [{
			'ResourceCode': 'View',
			'ResourceName': '浏览',
			'RowIndex': 0,
			'Remark': '对应的HTTP动词为GET，查看数据，例如：查看单个用户信息或者查看用户列表信息'
		},
		{
			'ResourceCode': 'Add',
			'ResourceName': '新增',
			'RowIndex': 20,
			'Remark': '对应的HTTP动词为POST，新增数据，例如：新增用户信息'
		},
		{
			'ResourceCode': 'Edit',
			'ResourceName': '修改',
			'RowIndex': 30,
			'Remark': '对应的HTTP动词为PUT，修改数据，例如：修改用户信息'
		},
		{
			'ResourceCode': 'Delete',
			'ResourceName': '删除',
			'RowIndex': 40,
			'Remark': '对应的HTTP动词为DELETE，删除数据，例如：删除用户信息'
		},
		{
			'ResourceCode': 'Import',
			'ResourceName': '导入',
			'RowIndex': 50,
			'Remark': '对应的HTTP动词为POST，导入数据，例如：将Excel中的用户信息导入到数据库中'
		},
		{
			'ResourceCode': 'Export',
			'ResourceName': '导出',
			'RowIndex': 60,
			'Remark': '对应的HTTP动词为GET，导出数据，例如：将用户信息导出到Excel文件中'
		},
		{
			'ResourceCode': 'ToRead',
			'ResourceName': '送阅',
			'RowIndex': 70,
			'Remark': ''
		},
		{
			'ResourceCode': 'Revert',
			'ResourceName': '还原',
			'RowIndex': 80,
			'Remark': ''
		},
		{
			'ResourceCode': 'Revoke',
			'ResourceName': '撤销',
			'RowIndex': 90,
			'Remark': ''
		},
		{
			'ResourceCode': 'Setting',
			'ResourceName': '设置',
			'RowIndex': 100,
			'Remark': ''
		},
		{
			'ResourceCode': 'Assign',
			'ResourceName': '委派',
			'RowIndex': 110,
			'Remark': '分配、指派、委派、分摊。如将我负责的任务指派给别人负责，重新设置任务负责人、成本分摊等。'
		},
		{
			'ResourceCode': 'Count',
			'ResourceName': '统计',
			'RowIndex': 120,
			'Remark': ''
		},
		{
			'ResourceCode': 'Upload',
			'ResourceName': '上传',
			'RowIndex': 130,
			'Remark': ''
		},
		{
			'ResourceCode': 'Download',
			'ResourceName': '下载',
			'RowIndex': 140,
			'Remark': ''
		},
		{
			'ResourceCode': 'Print',
			'ResourceName': '打印',
			'RowIndex': 150,
			'Remark': ''
		},
		{
			'ResourceCode': 'Move',
			'ResourceName': '移动',
			'RowIndex': 160,
			'Remark': ''
		},
		{
			'ResourceCode': 'Copy',
			'ResourceName': '复制',
			'RowIndex': 170,
			'Remark': ''
		},
		{
			'ResourceCode': 'Paste',
			'ResourceName': '粘贴',
			'RowIndex': 180,
			'Remark': ''
		},
		{
			'ResourceCode': 'Check',
			'ResourceName': '审核',
			'RowIndex': 190,
			'Remark': ''
		},
		{
			'ResourceCode': 'Handle',
			'ResourceName': '处理',
			'RowIndex': 200,
			'Remark': ''
		},
		{
			'ResourceCode': 'Adjust',
			'ResourceName': '调整',
			'RowIndex': 210,
			'Remark': ''
		},
		{
			'ResourceCode': 'Archive',
			'ResourceName': '归档',
			'RowIndex': 220,
			'Remark': '档案归档'
		},
		{
			'ResourceCode': 'Union',
			'ResourceName': '合并',
			'RowIndex': 230,
			'Remark': ''
		},
		{
			'ResourceCode': 'Split',
			'ResourceName': '分离',
			'RowIndex': 240,
			'Remark': ''
		},
		{
			'ResourceCode': 'Reset',
			'ResourceName': '重置',
			'RowIndex': 250,
			'Remark': ''
		},
		{
			'ResourceCode': 'Change',
			'ResourceName': '变更',
			'RowIndex': 260,
			'Remark': ''
		},
		{
			'ResourceCode': 'Warrant',
			'ResourceName': '授权',
			'RowIndex': 270,
			'Remark': ''
		},
		{
			'ResourceCode': 'Abandon',
			'ResourceName': '作废',
			'RowIndex': 280,
			'Remark': ''
		}
	];
</script>

<style>
	.resource-list-box ul {
		padding: 0;
		margin: 0;
	}
	
	.resource-list-box li {
		width: 142px;
		height: 30px;
		line-height: 30px;
		list-style: none;
		float: left;
	}
</style>