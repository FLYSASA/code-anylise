<template>
	<sapi-dialog v-model='visible1'>
		<span slot="title" v-text="title"></span>
		<div class="content" v-text="content"></div>
	</sapi-dialog>
</template>

<script>
	import dialog from "@/components/sapi-dialog.vue";
	export default {
		data() {
			return {
				visible1: false,
				title:"",
				content:""
			}
		},
		methods: {
			getData() {
				//获取从调用页面传递下来的参数
				var option = this.option;
				this.title=option.title;
				this.content="这是内容"+option.id;
				this.visible1=true;
			}
		},
		components:{
			"sapi-dialog":dialog
		},
		mounted(){
			this.getData();
		}
	}
</script>

<style>

</style>