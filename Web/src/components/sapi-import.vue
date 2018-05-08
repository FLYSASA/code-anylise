<template>
	<spai-import v-model="visible" :title="text" type=".xlsx" :confirm-api="confirmApi" @callback="onConfirm">
		{{$t('sapiImport.importDesc.0',{title:title})}}
		{{$t('sapiImport.importDesc.1')}}
		<a class="text-info" :href="getTemplateUrl">&lt;{{$t('sapiImport.importDesc.2')}}&gt;</a>
		{{$t('sapiImport.importDesc.3',{title:title})}}
	</spai-import>
</template>

<script>	
	import sapiImport from "./base/base-import.vue";
	import importLocale from "@/static/js/importLocale.js";
	import {sapi} from "@/components/locale-component.js";
	export default {
		data() {
			return {
				visible: false,
				text: ""
			}
		},
		computed: {
			getTemplateUrl() {
				if(this.templateUrl) {
					if(this.templateUrl.trim().indexOf("http://")===0){
						return this.templateUrl;
					}
					
					return globalConfig.baseUrl + this.templateUrl;
				}

				return "";
			}
		},
		props: ["value", "title", "confirmApi", "templateUrl"],
		components: {
			"spai-import": sapiImport
		},
		methods:{
			onConfirm(){

				this.$emit("callback");
			}
		},
		created() {
			!Vue.toLocale&&Vue.use(importLocale);
			Vue.toLocale(sapi);
			this.text = this.title;
			this.visible = this.value;
		},
		watch: {
			value(val) {
				this.visible = val;
			},
			visible(val) {
				if(val === false) {
					this.$emit("input", val);
				}
			}
		}
	}
</script>

<style>

</style>