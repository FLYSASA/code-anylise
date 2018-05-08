<template>
	<sapi-select v-model="visible" :multiple="true" :data.sync="datas"></sapi-select>
</template>

<script>
	import select from "@/components/sapi-select-user.vue";
	export default {
		data() {
			return {
				visible: true,
				datas: []
			}
		},
		components: {
			"sapi-select": select
		},
		created() {
			let datas = localStorage["historyCookieStation"];
			this.datas = datas ? JSON.parse(datas) : [];

		},
		watch: {
			datas(val) {
				console.log(val)
			}
		}
	}
</script>

<style>

</style>