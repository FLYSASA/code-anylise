<template>
	<component ref="abcd" :is="currentView" :option="option" v-model="visible"></component>
</template>

<script>
	import mixin from "../static/js/conmonMixin.js";
	export default{
		data(){
			return{
				currentView:"",
				option:{}
			}
		},
		mixins:[mixin],
		methods:{
			//为啥需要这个方法？因为以前没想到会用到集成，直接调用父级方法刷新数据，这里写一个空方法就是为了执行不报错
			loadData(){
				
			}
		},
		components:{
			"module-add": (resolve) => {
				require(['@/pages/plat/infrastructure/employee/add.vue'], resolve);
			},
			"module-edit": (resolve) => {
				require(['@/pages/plat/infrastructure/employee/edit.vue'], resolve);
			},
			"module-view": (resolve) => {
				require(['@/pages/plat/infrastructure/employee/view.vue'], resolve);
			}
		},
		mounted(){
			var EmployeeId=this.$getUrlParams("employeeId");
			var module=this.$getUrlParams("module");
			if(!module){
				console.log("模块参数为空");
				return;
			}
			
			this.option.EmployeeId=EmployeeId||"11485732-8f1a-4a10-8f45-ea2d5f2ce9dc";
			this.currentView="module-"+module;
			this.$nextTick(function(){
				this.initDialog();
			});
		}
	}
</script>

<style>
</style>