<template>
	<div class="no-data-wrapper">
		<div class="structrue-logo">
			<img src="../../../../static/images/structure_flag.png" />
		</div>
		<p class="stru-msg">暂无类别，您可以新建类别，开始编辑！</p>

		<div class="fullline">
			<span class="w-65 must-star">类别名称</span>
			<div class="right-auto-box">
				<el-input id="MsgTypeName" v-model.trim="createModel.MsgTypeName" :maxlength="100"></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-65">类别描述</span>
			<div class="right-auto-box">
				<el-input v-model="createModel.Remark" type="textarea" :autosize="{minRows: 2, maxRows: 2}" :maxlength="200"></el-input>
			</div>
		</div>
		<div class="stru-form-btn" @click="save">新建类别</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {				
				createModel: {
					MsgTypeId: "",
					MsgTypeName: "",
					ParentTypeId: null,
					ParentTypeName: "",
					RowIndex: "10",
					Remark: "",					
					HandleUrls: []		//处理路径
				},
				notificationTypeHandleUrls:[            //通知类别默认的处理路径
					{
						DealTypeId: "Read",
						DealTypeName: "阅读",
						DealUrl: "https://www.baidu.com",
						RowIndex: "10"
					}, {
						DealTypeId: "Browse",
						DealTypeName: "查看",
						DealUrl: "https://hao.360.cn",
						RowIndex: "20"
					}
				],
				dealTypeHandleUrls: [ //事项类别默认的处理路径
					{
						DealTypeId: "Browse",
						DealTypeName: "阅读",
						DealUrl: "https://www.baidu.com",
						RowIndex: "10"
					}
				]
			}
		},
		props: ["mode"],
		methods: {
			save() {
				if(this.validate()) {
					//通知类别
					if (this.mode == 0){
						this.createModel.HandleUrls = this.notificationTypeHandleUrls;
					} else {
						//事项类别
						this.createModel.HandleUrls = this.dealTypeHandleUrls;
					}
					this.$loadingOpen();
					this.$post("/api/plat/msgTypes/" + this.mode,
						this.createModel,
						function(res) {
							if(res.Code == 0) {
								this.$parent.getTree();
								this.$loadingClose();
								Vue.successMsg(res.Message);
							} else {
								this.$loadingClose();
								Vue.errorMsg(res.Message);
							}
						})
				}
			},
			validate() {
				if(!this.createModel.MsgTypeName) {
					this.$errorTips("请填写类别名称", "#MsgTypeName");
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