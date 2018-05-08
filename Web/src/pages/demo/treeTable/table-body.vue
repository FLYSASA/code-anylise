<template>
	<div class="sapi-table-body">
		<div class="sapi-table-body-table">
			<div class="table-row" v-for="(item,index) in datas">
				<template v-for="(col,colIndex) in cols">
					<div class="table-row-col" :class="['table-row-col'+colIndex]"></div>
				</template>
				
			</div>
		</div>

	</div>
</template>

<script>
	import row from "./table-row.js";
	export default {
		data() {
			return {
				datas:[],
				treeProp:null,
				children:null
			}
		},
		props: ["cols", "data", "props","defaultExpandedAll"],
		components: {
			"table-tr": row
		},
		methods: {
			init() {
				
			}
		},
		created() {
			
		},
		mounted(){
			
		}
	}
</script>

<style>

</style>