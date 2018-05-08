<template>
	<sapi-dialog :has-max="false" v-model="visible" width="440px" top="28%" @on-close="close">
		<span slot="title" v-text="title"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<slot></slot>
		</div>

		<div class="footer">
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button size="small" class="blue-button" :disabled="disabled" @click="confirm" v-text="$t('determine')"></el-button>			
		</div>
	</sapi-dialog>
</template>

<script>
	import dialog from "@/components/sapi-dialog.vue";
	import importLocale from "@/static/js/importLocale.js";
	import {main} from "@/components/locale-component.js";
	export default {
		data() {
			return {
				disabled: false,
				visible: false
			}
		},
		props: ["value", "title", "exportUrl"],
		methods: {
			close() {
				this.$emit("input", false);
				this.$closeWaringTips(".form-error-tips");
			},
			confirm() {
				window.open(this.exportUrl);
				this.close();
			}
		},
		components: {
			"sapi-dialog": dialog
		},
		created() {
			!Vue.toLocale&&Vue.use(importLocale);
			Vue.toLocale(main);
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		}
	}
</script>

<style>

</style>