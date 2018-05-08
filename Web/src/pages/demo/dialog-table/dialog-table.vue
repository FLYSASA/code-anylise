<template>
	<div class="demo">
		<div class="mb-30">
			<!-- @click="showDialog2"-->
			<div class="title">2、可配置弹窗：width:500px;height:300px;left:40%;top:40%;moveable:false;z-index:150</div>
			<div class="btn">显示弹窗</div>
			<sapi-dialog width="900px" height="500px" z-index="150" v-model='visible2'>
				<el-table :data="tableData" style="width: 100%" max-height="400px">
					<el-table-column prop="date" label="日期" width="180">
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="180">
					</el-table-column>
					<el-table-column prop="address" label="地址">
					</el-table-column>
				</el-table>
			</sapi-dialog>
		</div>

		<div class="mb-30">
			<div class="title">2、可配置弹窗：width:500px;height:300px;left:40%;top:40%;moveable:false;z-index:150</div>
			<div class="btn" @click="showDialog2">显示弹窗</div>
			<div id="demo-tableData" style="width:1000px;height:500px;">
				<el-table :data="tableData" style="width: 100%" max-height="400px">
					<el-table-column prop="date" label="日期" width="180">
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="180">
					</el-table-column>
					<el-table-column prop="address" label="地址">
					</el-table-column>
				</el-table>
			</div>

		</div>
	</div>
</template>

<script>
	import dialog from "@/components/sapi-dialog.vue";
	import "@/static/external/gojs/layer/layer.js";
	//import "@/static/external/gojs/layer/skin/layer.css";
	import "@/static/external/gojs/jquery.js";

	export default {
		data() {
			return {
				visible1: false,
				visible2: false,
				visible3: false,
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
		},
		methods: {

			showDialog2() {
				this.visible2 = true;
				/*layer.open({
					type: 1,
					content: $('#demo-tableData') //这里content是一个DOM
				});*/
			},
			open() {
				console.log("弹窗打开了")
			},
			close() {
				console.log("弹窗关闭了")
			}
		},
		components: {
			"sapi-dialog": dialog
		},
		created() {
			var datas = [];
			for(var i = 0; i < 1000; i++) {
				var obj = {};
				obj.date = '2016-05-01';
				obj.name = '王小虎' + i;
				obj.address = '上海市普陀区金沙江路 1516 弄' + i;
				datas.push(obj);
			}
			this.tableData = datas;
		}
	}
</script>

<style>
	.demo {
		width: 800px;
		margin: 5% auto;
		padding: 15px;
		font-size: 14px;
		line-height: 40px;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.7);
	}
	
	.btn {
		width: 100px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		cursor: pointer;
		border: 1px solid #ccc;
		background: #ddd;
	}
	
	.content {
		padding: 15px;
	}
</style>