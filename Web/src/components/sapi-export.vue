<template>
	<sapi-export v-model="visible" :title="title" :export-url="getExportUrl">
		<div class="mb-16">
			<p class="text-gray" v-text="$t('sapiExport.exportDesc')"></p>
		</div>
		<div class="mb-16">
			<el-radio-group v-model="isGetAll">
				<el-radio :label="false">{{$t('sapiExport.exportOptions.0')}}</el-radio>
				<el-radio :label="true">{{$t('sapiExport.exportOptions.1',{maxCount:maxCount})}}</el-radio>
			</el-radio-group>
		</div>
	</sapi-export>
</template>

<script>
	import sapiExport from "./base/base-export.vue";
	import importLocale from "@/static/js/importLocale.js";
	import {sapi} from "@/components/locale-component.js";
	export default {
		data() {
			return {
				visible: false,
				isGetAll: false,
				maxCount: 0,
			}
		},
		computed: {
			getExportUrl() {
				var token = window.sessionStorage.getItem('access_token');
				var aHref = this.exportUrl + "?access_token=" + token;
				//没自带http:// 即使用base的url
				if(this.exportUrl.indexOf("http://") === -1) {
					aHref = globalConfig.baseUrl + aHref;
				}
				
				var params = this.$parent.params;
				for(var key in params) {
					var value = params[key];
					if(key == "pageSize") {
						aHref += "&pageSize=" + (this.isGetAll ? this.maxCount : value);
					} else {
						aHref += "&" + key + "=" + value;
					}
				};
				return aHref;
			}
		},
		props: ["value", "title", "exportUrl"],
		components: {
			"sapi-export": sapiExport
		},
		created() {
			!Vue.toLocale&&Vue.use(importLocale);
			Vue.toLocale(sapi);
			this.visible = this.value;
		},
		mounted() {
			setTimeout(() => {
				this.maxCount = globalConfig.maxExportNumber;
			}, 100);
		},
		watch: {
			value(val) {
				this.visible = val;
			},
			visible(val) {
				if(val === false) {
					this.$emit("input", false);
				}
			}
		}
	}
</script>

<style>

</style>