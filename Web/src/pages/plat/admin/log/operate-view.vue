<template>
	<sapi-dialog v-model="visible" width="700px" top="15%" @on-close="close" @on-open="open">
		<span slot="title">查看日志详情</span>
		<div class="form-content">
			<ul class="log-detail-list">
				<li class="fullline">
					<div class="wp-50">
						<span class="w-75">用户ID</span>
						<div class="right-view-box">
							<el-input v-model="viewModel.UserId" :maxlength="200" readonly></el-input>
						</div>
					</div>
					<div class="wp-50 float-right">
						<span class="w-65">用户实名</span>
						<div class="right-auto-box">
							<el-input v-model.trim="groupName" :maxlength="200" readonly></el-input>
						</div>
					</div>
				</li>
				<li class="fullline">
					<div class="wp-50">
						<span class="w-75">操作标题</span>
						<div class="right-view-box">
							<el-input v-model="viewModel.Title" :maxlength="200" readonly></el-input>
						</div>
					</div>
					<div class="wp-50 float-right">
						<span class="w-65">客户端</span>
						<div class="right-auto-box">
							<el-input v-model.trim="viewModel.ClientName" :maxlength="200" readonly></el-input>
						</div>
					</div>
				</li>
				<li class="fullline">
					<span class="w-75">访问地址</span>
					<div class="right-view-box">
						<el-input v-model="viewModel.Source" :maxlength="200" readonly></el-input>
					</div>
				</li>
				<li class="fullline">
					<span class="w-75">操作内容</span>
					<div class="right-view-box">
						<el-input type="textarea" v-model="viewModel.Content" :rows="8" :maxlength="200" readonly></el-input>
					</div>
				</li>
				<li class="fullline">
					<div class="wp-50">
						<span class="w-75">操作时间</span>
						<div class="right-view-box">
							<el-input v-model="operateTime" :maxlength="200" readonly></el-input>
						</div>
					</div>
					<div class="wp-50 float-right">
						<span class="w-65">用户IP</span>
						<div class="right-auto-box">
							<el-input v-model.trim="viewModel.UserAddress" :maxlength="200" readonly></el-input>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="footer">
			<el-button size="small" class="default-button" @click="close">关闭</el-button>
		</div>
	</sapi-dialog>
</template>

<script>
	import dialog from "@/components/sapi-dialog.vue";
	export default {
		data() {
			return {
				visible: false, //这参数必须的，并且作为弹窗显示的model
				viewModel: {}
			}
		},
		props: ["value", "option", "viewUrl"],
		methods: {
			close() {
				this.$emit("input", false);
			},
			open() {
				//在此进行初始化
				this.getData();
			},
			getData() {
				this.$get(this.viewUrl + this.option.LogId, function(res) {
					this.viewModel = res;
				})
			}
		},
		computed:{
			groupName(){
				return this.viewModel.AliasName+' ('+this.viewModel.UserName+')';
			},
			operateTime(){
				if (this.viewModel.OperateTime) {
					return this.viewModel.OperateTime.replace(/T/g,' ');
				}
			}
		},
		components: {
			"sapi-dialog": dialog
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		},
		mounted() {
			this.visible = this.value;
		}
	}
</script>

<style>
	.log-detail-list {
		list-style: none;
	}
	
	.log-detail-list .right-view-box {
		display: inline-block;
		width: calc(100% - 80px);
	}
</style>