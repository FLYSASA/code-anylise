<template>
	<div>
		<div class="fullline">
			<span class="w-65">选择项</span>
			<div class="right-auto-box">
				<sapi-select v-model="items" height="56px" :has-more="true" :format="format" @select="selectStation"></sapi-select>
			</div>
		</div>

		 <station-select v-model="stationVisible" :call-back="selectedStation"></station-select>
	</div>
</template>

<script>
	import stationSelect from "@/components/sapi-station-user-single.vue";
	import select from "@/components/sapi-select-btn.vue";
	export default{
		data(){
			return{
				input:"",
				items:[],
				stationVisible:false,
			}
		},
		methods:{
			selectStation(){
                this.stationVisible=true;
            },
            selectedStation(res){
            	this.items.push(res);
            },
			format(item){
				return item.CorpName + "/" + item.DeptName + "/" + item.StationName;
			}
		},
		components:{
			"sapi-select":select,
			"station-select":stationSelect,
		}
	}
</script>

<style>
</style>