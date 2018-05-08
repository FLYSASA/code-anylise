<template>
	<div>
		<sapi-select v-model="items" height="100px" :has-more="true"  :props="props"></sapi-select>
	</div>
</template>

<script>
	import select from "@/components/sapi-select-btn.vue"
	export default{
		data(){
			return{
				props:{
					label:"text",
					value:"id"
				},
				items:[{text:"abcd1",id:1},{text:"abcd2",id:2},{text:"abcd3",id:3},{text:"abcd4",id:4}]
			}
		},
		components:{
			"sapi-select":select
		}
	}
</script>

<style>
</style>