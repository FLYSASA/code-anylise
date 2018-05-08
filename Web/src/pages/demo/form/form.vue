<template>
	<div class="demo">
		<div class="mb-16">
			<span class="w-110">单行输入框</span>
			<span class="autoFill"><el-input v-model="input" placeholder="请输入内容"></el-input></span>
		</div>

		<div class="mb-16">
			<span class="w-110">下拉列表</span>
			<span class="autoFill">
				<el-select v-model="value" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</span>
		</div>

		<div class="mb-16">
			<span class="w-110">表单按钮</span>
			<span class="autoFill">
				<el-button>默认按钮</el-button>
				<el-button class="default-button">取消按钮</el-button>
			</span>
		</div>

		<div class="mb-16">
			<span class="w-110">单选按钮</span>
			<span class="autoFill">
				<el-radio class="radio" v-model="radio" label="1">备选项</el-radio>
  				<el-radio class="radio" v-model="radio" label="2">备选项</el-radio>
			</span>
		</div>

		<div class="mb-16">
			<span class="w-110">多选按钮</span>
			<span class="autoFill">
				<el-checkbox-group v-model="checkList">
				    <el-checkbox label="复选框 A"></el-checkbox>
				    <el-checkbox label="复选框 B"></el-checkbox>
				    <el-checkbox label="复选框 C"></el-checkbox>
				    <el-checkbox label="禁用" disabled></el-checkbox>
				    <el-checkbox label="选中且禁用" disabled></el-checkbox>
				</el-checkbox-group>
			</span>
		</div>

		<div class="mb-16">
			<span class="w-110">功能按钮</span>
			<span class="autoFill">
				<span class="func-btns">
					<span><i class="search-btn"></i></span>
			<span><i class="delete-btn"></i></span>
			<span><i class="start-btn"></i></span>
			<span><i class="filter-btn"></i></span>
			</span>
			</span>
		</div>

		<div class="mb-16">
			<span class="w-110">输入框tips</span>
			<span class="autoFill"><el-input id="input" @blur="submit" v-model="input" placeholder="请输入内容"></el-input></span>
		</div>

		<div class="mb-16">
			<span class="w-110">下拉列表tips</span>
			<span class="autoFill">
				<el-select v-model="value" @change="change" id="value" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</span>
		</div>

		<div class="mb-16">
			<span class="w-110">确认删除</span>
			<span class="autoFill">
				<el-button @click="deleteItem">删除</el-button>
			</span>
		</div>
		
		<div class="mb-16">
			<span class="w-110">确认提交</span>
			<span class="autoFill">
				<el-button @click="confirm">提交</el-button>
			</span>
		</div>
		
		<div class="mb-16">
			<span class="w-110">信息提示</span>
			<span class="autoFill">
				<el-button @click="msg">提示信息</el-button>
			</span>
		</div>
		
		<div class="mb-16">
			<span class="w-110">信息添加成功</span>
			<span class="autoFill">
				<el-button @click="successMsg">添加成功</el-button>
			</span>
		</div>
		
		<div class="mb-16">
			<span class="w-110">信息修改失败</span>
			<span class="autoFill">
				<el-button @click="errorMsg">修改失败</el-button>
			</span>
		</div>

	</div>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
	import confirm from "@/components/sapi-confirm.js";

	export default {
		data() {
			return {
				content: "确认信息？？",
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
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
				value: "",
				input: "",
				radio: '1',
				checkList: ['选中且禁用', '复选框 A']
			}
		},
		methods: {
			submit() {
				this.$tips("请输入内容", "#input");
			},
			change() {
				this.$errorTips("错误提示", "#value");
			},
			deleteItem() {
				this.$deleteTips(function() {
					console.log(this.checkList);
				})
			},
			confirm() {
				this.$confirmTips("是否真要提交表单？？？", function() {
					console.log(this.checkList);
				})
			},
			msg(){
				Vue.msg("信息提示");
			},
			successMsg(){
				Vue.successMsg("用户添加成功！<br/>用户修改失败了！！！");
			},
			errorMsg(){
				Vue.errorMsg("用户修改失败了！！！");
			}
		},
		created() {
			Vue.use(tips);
			Vue.use(confirm);
		},
		mounted() {
			//this.submit();
			//this.$errorTips("请输入内容", "#value");
		}
	}
</script>

<style>
	.demo {
		width: 800px;
		margin: 0px auto;
		padding: 15px;
		font-size: 14px;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.7);
	}
	
	.autoFill {
		display: inline-block;
		width: calc(100% - 115px);
	}
</style>