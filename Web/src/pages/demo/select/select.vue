<template>
	<div>
		<div>
			<el-button @click="openDialog">打开弹窗</el-button>
			<sapi-select :props="props"  :data="datas" @change="change"></sapi-select>
			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
		</div>
		
		<sapi-dialog v-model="visible" @on-close="close">
			<span slot="title">弹窗下拉列表</span>
			<div class="content">
				<div style="height:0px;"></div>
				<sapi-select :props="treeProps" v-model="tree.id" :is-tree="true" :data="treeDatas" @change="change"></sapi-select>
				<div style="height:800px;"></div>
			</div>
		</sapi-dialog>
	</div>
</template>

<script>
	import select from "@/components/sapi-select.vue";
	import dialog from "@/components/sapi-dialog.vue";
	export default{
		data(){
			return {
				arrs:[],
				datas:[],
				props:{    				   // 配置选项
					disabled:"disabled",   // 禁用项
					label:"label",		   // 标题
					value:"value",			// 值
				},
				visible:false,
				treeDatas:[],
				treeProps:{
					disabled:"disabled",
					label:"label",
					children:"children",
					nodeKey:"id"
				},
				tree:{
					id:5
				}
			}
		},
		components:{
			"sapi-select":select,
			"sapi-dialog":dialog
		},
		methods:{
			change(data){
				console.log(data)
			},
			openDialog(){
				this.visible=true;
			},
			close(){
				this.visible=false;
			}
		},
		mounted(){
			var datas=this.datas;
			for(var i=0;i<500;i++){
				var disabled=false;
				if(i%5===0){
					disabled=true;
				}
				datas.push({label:"下拉列表"+i,value:i,disabled:disabled});
			}
			
			var treeDatas=this.treeDatas;
			for(var k=0;k<20;k++){
				var data={};
				data.children=[];
				data.id=k;
				data.label="下拉树型名称"+k;
				if(k%4===0){
					for(var j=0;j<10;j++){
						var obj={};
						obj.id=k+10+j;
						obj.label="子类名称"+j;
						obj.children=[];
						data.children.push(obj);
					}
				}
				
				treeDatas.push(data);
			}
		}
	}
</script>

<style>
	body .index-body-box-content{
		overflow: auto;
	}
	.content{
		padding:25px;
		padding-top:0;
	}
</style>