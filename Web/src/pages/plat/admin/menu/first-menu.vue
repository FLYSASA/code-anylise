<template>
	<div class="no-data-wrapper">
		<div class="structrue-logo">
			<img src="../../../../static/images/structure_flag.png" />
		</div>
		<p class="stru-msg">暂无菜单，请先开始编辑菜单！</p>

		<div class="fullline">
			<span class="w-65 must-star">菜单名称</span>
			<div class="right-box">
				<el-input id="MenuName" v-model.trim="createModel.MenuName" :maxlength="10"></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-65">菜单编号</span>
			<div class="right-box">
				<el-input v-model="createModel.MenuNo" :maxlength="100"></el-input>
			</div>
		</div>

		<div class="fullline">
			<span class="w-65">链接地址</span>
			<div class="right-box">
				<el-input v-model="createModel.MenuPath" :maxlength="1000"></el-input>
			</div>
		</div>

		<div class="stru-form-btn" :disabled="disabled" @click="save">新建菜单</div>
	</div>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
	export default {
		data() {
			return {
				disabled: false,
				createModel: {
					"MenuId": "",
					"ClientId": "WebApp",
					"MenuName": "",
					"MenuNo": "",
					"MenuPath": "",
					"ParentMenuId": null,
					"IconPath": "",
					"Enabled": true,
					"RowIndex": 10,
					"Remark": "",
					"Resources": [{
						"ResourceCode": "View",
						"ResourceName": "浏览",
						"Remark": "",
						"RowIndex": 0,
						"Paths": []

					}]
				}
			}
		},
		created() {
			Vue.use(tips);
		},
		methods: {
			save() {
				if(this.validate()) {
					this.disabled = true;
					this.$loadingOpen();
					this.$post("/api/plat/menus",
						this.createModel,
						function(res) {		
							this.$parent.getTree();					
							this.$loadingClose();							
							Vue.successMsg(res.Message);
						},function(res){
							this.$loadingClose();		
							Vue.errorMsg(this.$t('structure.code.'+res.Code));
						});
				}
			},
			validate() {
				if(!this.createModel.MenuName) {
					this.$errorTips("请填写菜单名称", "#MenuName");
					return false;
				}

				return true;
			}
		}
	}
</script>

<style>
	.no-data-module {
		width: 100%;
		height: 100%;
	}
	
	.no-data-wrapper {
		position: absolute;
		left: 50%;
		margin-left: -210px;
		top: 60px;
		width: 420px;
		height: 412px;
	}
	
	.no-data-wrapper .structrue-logo>img {
		display: block;
		margin: 0 auto;
		padding-left: 65px;
	}
	
	.no-data-wrapper .stru-msg {
		text-align: center;
		font-size: 14px;
		color: #999999;
		padding-left: 65px;
		margin: 50px 0 20px 0;
	}
	
	.no-data-wrapper .stru-form-btn {
		background-color: #6ecdfa;
		width: 350px;
		height: 38px;
		border-radius: 4px;
		text-align: center;
		color: #fff;
		font-size: 15px;
		line-height: 38px;
		margin: 56px 0 0 68px;
		cursor: pointer;
	}
</style>