<template>
	<div class="demo">
		<div class="mb-30">
			<div class="title">1、默认弹窗：width:50%;height:auto;left:居中;top:50px;moveable:true;z-index:100</div>
			<div class="btn" @click="showDialog1">显示弹窗</div>
			<sapi-dialog v-model='visible1'>
				<span slot="title">这是标题</span>
				<div class="content">这是内容</div>
			</sapi-dialog>
		</div>
		
		<div class="mb-30">
			<div class="title">2、可配置弹窗：width:500px;height:300px;left:40%;top:40%;moveable:false;z-index:150</div>
			<div class="btn" @click="showDialog2">显示弹窗</div>
			<sapi-dialog width="500px" height="300px" left="40%" top="40%" moveable="false" z-index="150" v-model='visible2'>
				<span slot="title">这是标题</span>
				<div class="content">这是内容</div>
				<div class="content">这是内容</div>
				<div class="content">这是内容</div>
				<div class="content">这是内容</div>
				<div class="content">这是内容</div>
				<div class="content">这是内容</div>
				<div class="content">这是内容</div>
				<div class="content">这是内容</div>
				<div class="content">这是内容</div>
				<div class="content">这是内容</div>
				<div class="content">这是内容</div>
			</sapi-dialog>
		</div>
		
		<div class="mb-30">
			<div class="title">3、弹窗可绑定事件：on-open、on-close</div>
			<div class="btn" @click="showDialog4">显示弹窗</div>
			<sapi-dialog v-model='visible3' @on-open="open" @on-close="close">
				<span slot="title">这是标题</span>
				<div class="content">这是内容</div>
			</sapi-dialog>
		</div>
		
		<div class="mb-30">
			<div class="title">4、列表的弹窗</div>
			<div class="btn" @click="showDialog3(1,$event)">显示弹窗1</div>
			<div class="btn" @click="showDialog3(2,$event)">显示弹窗2</div>
			<div class="btn" @click="showDialog3(3,$event)">显示弹窗3</div>
			<div class="btn" @click="showDialog3(4,$event)">显示弹窗4</div>
		</div>
	</div>
</template>

<script>

	import dialog from "@/components/sapi-dialog.vue";
	import dialogTemplate from "./dialog-template.vue";
	export default{
		data(){
			return {
				visible1:false,
				visible2:false,
				visible3:false,
			}
		},
		methods:{
			showDialog1(){
				this.visible1=true;
			},
			showDialog2(){
				this.visible2=true;
			},
			showDialog3(id,e){
				
			},
			showDialog4(){
				this.visible3=true;
			},
			open(){
				console.log("弹窗打开了")
			},
			close(){
				console.log("弹窗关闭了")
			}
		},
		components:{
			"sapi-dialog":dialog
		},
		created(){

		}
	}
</script>

<style>
	.demo{
		width: 800px;
		margin: 5% auto;
		padding:15px;
		font-size: 14px;
		line-height: 40px;
		border-radius: 5px;
		background: rgba(255,255,255,0.7);
	}
	.btn{
		width: 100px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		cursor: pointer;
		border: 1px solid #ccc;
		background: #ddd;
	}
	.content{
		padding: 15px;
	}
</style>