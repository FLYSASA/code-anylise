<template>
	<div>
		<el-button @click="click">调用企业员工页面</el-button>
		<br />
		<iframe :src="src" style="width:1000px;height:700px;"></iframe>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				src: ""
			}
		},
		methods: {
			click() {
				this.src = "/integrate/employee.html?module=edit&time="+new Date().getTime();
			}
		}
	}
</script>

<style>

</style>