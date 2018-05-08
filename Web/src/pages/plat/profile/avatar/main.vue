<template>
	<div class="avatar-outer">
		<div class="avatar-area">
			<div class="avatar-wrapper">
				<img v-if="HeadIconPath" :src="(apiUrl+HeadIconPath)" :onerror="errorImage">
				<img v-else src="../../../../static/images/photo-default.png" alt="">
			</div>
		</div>
		<div class="avatar-operate">
			<p class="warnning-tips">{{$t('avatar.desc.0')}}</p>
			<div class="operate-area">
				<input type="file" id="ipt" v-show="false" class="file-input" @change="imageChange">
				<div v-show="canvasShow" class="add-image" @click="addImage">
					<i class="icon-work"></i>
				</div>
				<div v-show="!canvasShow" class="canvas-wrapper canvas-box">
				</div>
				<div class="review-area">
					<p>{{$t('avatar.desc.1')}}</p>
					<div class="review-image">
						<img ref="defaultImg" src="../../../../static/images/photo-default.png" />
					</div>
				</div>
			</div>
			<div class="button-area">
				<el-button type="small" class="padding-button" @click="reUpload" v-text="$t('avatar.reUpload')"></el-button>
				<!--<el-button type="small" class="padding-button" @click="cancel">取消</el-button>-->
				<el-button type="small" :disabled="disalbed" class="blue-button padding-button" @click="confirm" id="save">{{$t('determine')}}</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import "@/static/external/gojs/jquery.js";
	import ZmCanvasCrop from './zm-canvas-crop.js';
	export default {
		data() {
			return {
				apiUrl: globalConfig.baseUrl+"/",
				errorImage: 'this.src="' + require('../../../../static/images/photo-default.png') + '"',
				defaultImage: require('../../../../static/images/photo-default.png'),
				uploadUrl: globalConfig.baseUrl + '/api/plat/users/basic/headIcon',
				HeadIconPath:'',
				canvasShow: true,
				disalbed: false
			}
		},
		methods: {
			confirm() {},
			addImage() {
				this.$el.querySelector('.operate-area>.file-input').click();
			},
			imageChange() {
				this.canvasShow = false;
			},
			getUser() {
				this.$get('/api/plat/users/basic', function(res) {
					this.HeadIconPath=res.HeadIconPath;
				});
			},
			reUpload() {
				this.$el.querySelector('.operate-area>.file-input').value = '';
				this.$el.querySelector('.operate-area>.file-input').click();
			}
		},
		created(){
			this.getUser();
		},
		mounted() {
			var that = this;

			function saveCallBack(blob) {
				var url = that.apiUrl + '/api/plat/users/basic/headIcon';
				var fileLimit = blob.size / 1024 < 500;
				if(!fileLimit) {
					Vue.errorMsg(that.$t('avatar.imageNotTooBig'));
					return false;
				}
				
				var formdata = new FormData();
				formdata.append("file", blob, blob.name);
				that.disalbed = true;
				that.$request({
					method: "post",
					url: url,
					data: formdata,
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}, function(res) {
					if(res.Code == 0) {
						that.disalbed = false;
						Vue.successMsg(this.$t('avatar.setSuccess'));
						this.HeadIconPath=res.Data;
						var userData=JSON.parse(sessionStorage.getItem('basicInfo'));
							userData.HeadIconPath=this.HeadIconPath;
							sessionStorage["basicInfo"]=JSON.stringify(userData);
					} else {
						Vue.errorMsg(this.$t('avatar.operationFailed'));
					}
				});
			}

			function errorCallBack(warn) {
				that.canvasShow = true;
				if(warn) {
					Vue.errorMsg(warn);
				}
			}

			var c = new ZmCanvasCrop({
				fileInput: $('#ipt')[0],
				saveBtn: $('#save')[0],
				box_width: 308, //剪裁容器的最大宽度
				box_height: 314, //剪裁容器的最大高度
				min_width: 240, //要剪裁图片的最小宽度
				min_height: 240 //要剪裁图片的最小高度
			}, saveCallBack, errorCallBack);
		}
	}
</script>

<style>
	li {
		list-style: none;
	}
	
	.avatar-outer {
		width: 100%;
		height: 100%;
	}
	
	.avatar-outer>.avatar-area {
		width: 198px;
		height: 100%;
		float: left;
		text-align: center;
	}
	
	.avatar-outer>.avatar-operate {
		width: calc(100% - 198px);
		height: 100%;
		float: right;
		position: relative;
		padding-top: 40px;
	}
	
	.avatar-outer .avatar-wrapper {
		width: 108px;
		height: 108px;
		display: inline-block;
		box-shadow: 0 0 10px 6px #eeeeee;
		border-radius: 100%;
		text-align: center;
		margin-top: 34px;
	}
	
	.avatar-outer .avatar-wrapper>img {
		margin-top: 6px;
		width: 96px;
		height: 96px;
		border-radius: 100%;
	}
	
	.avatar-operate>.warnning-tips {
		color: #8894a0;
		font-size: 14px;
	}
	
	.avatar-operate .operate-area {
		width: 474px;
		height: 314px;
		margin: 10px 0;
		font-size: 0;
	}
	
	.operate-area>.add-image {
		display: inline-block;
		width: 310px;
		height: 314px;
		border: 1px dashed #8c939d;
		font-size: 30px;
		color: #8c939d;
		text-align: center;
		line-height: 314px;
		vertical-align: middle;
	}
	
	.operate-area>.canvas-wrapper {
		display: inline-block;
		width: 310px;
		height: 314px;
		position: relative;
		vertical-align: top;
		border: 1px dashed #8c939d;
		box-sizing: content-box;
	}
	
	.operate-area>.review-area {
		display: inline-block;
		width: 142px;
		height: 314px;
		margin-left: 20px;
		vertical-align: top;
		text-align: center;
		background-color: #f2f2f5;
	}
	
	.review-area>p {
		color: #666666;
		font-size: 14px;
		text-align: center;
		margin: 32px 0 30px 0;
	}
	
	.review-image>canvas {
		transform-origin: 0 0;
		margin: 0 22px;
		border-radius: 100%;
	}
	
	.review-area img {
		display: inline-block;
		width: 96px;
		height: 96px;
		border-radius: 100%;
	}
	
	.avatar-outer .button-area {
		margin-left: 52px;
	}
	
	.canvas-box {
		position: relative;
		-webkit-user-select: none;
		-moz-user-select: none;
		-o-user-select: none;
		user-select: none
	}
	
	.canvas-box .overlay {
		position: absolute;
		left: 0;
		top: 0;
		cursor: move;
		border: 1px solid #69f;
	}
	
	.canvas-box div,
	.canvas-box canvas {
		-webkit-user-select: none;
		-moz-user-select: none;
		-o-user-select: none;
		user-select: none
	}
</style>