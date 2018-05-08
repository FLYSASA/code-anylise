<template>
	<div class="demo">
		<custom-auto v-model="text" :has-add="true" :format="format" @confirm="confirm"  :keys="keys" @select="handleEmployeeSelect" placeholder="请输入用户名" :params="params" url="/api/plat/employees/brief/"></custom-auto>
	</div>
</template>

<script>
	import selectEmployeeAuto from "@/components/sapi-autocomplete.vue";
	
	export default {
		data() {
			return {
				text:"",
				keys:{
					value:"EmployeeName",
					title:"title",
					content:"content"
				},
				params:{
					type:1,
					/*
					下面的三个已经存在组件里
					pageIndex: 1,
					pageSize: 20,
					keyword: ""*/
				},
				format:{
					renderTitle(item){
						return item.EmployeeName+"（"+item.EmployeeNo+"）";
					},
					renderContent(item){
						if(item.DefaultStationName){
							return item.CorpName+"/"+item.DeptName+"/"+item.DefaultStationName;
						}
						
						return "";
					}
				}
			}
		},
		components:{
			"custom-auto":selectEmployeeAuto
		},
		methods: {
			handleEmployeeSelect(item) {
				console.log(item)
			},
			confirm(){
				console.log("添加事件",this.text)
			}
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
	
</style>