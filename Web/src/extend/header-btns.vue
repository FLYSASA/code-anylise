<template>
	<ul class="ul float-right">
				<li class="header-work-btn" @click="startWokr" v-if="hasWork"></li>
				<component v-model="visible" :is="currentView" :option="option"></component>
			</ul>
</template>

<script>
	import "./static/css/header.css";
	export default{
		data(){
			return{
				visible:false,
				currentView:"",
				option:{},
				hasWork:false
			}
		},
		methods:{
			startWokr() {
				this.visible = true;
				this.currentView = "work-dialog";

			}
		},
		components: {
			"work-dialog": (resolve) => {
				if(globalConfig.hasFlow) {
					/*let path = "flow/work/index";
					return import(`@/pages/${path}.vue`);*/
				}
			}
		},
		created(){
			
		},
		mounted(){
			this.hasWork=globalConfig.hasFlow;
		}
	}
</script>

<style>
</style>