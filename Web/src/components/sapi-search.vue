<template>
	<span class="search-span" @click.stop=''>
		<span class="search-input" v-show="visible" @keydown.enter="search"><el-input :placeholder="placeholder" :title="placeholder" v-model.trim="keyword" :maxlength="100"></el-input></span>
	<span :title="$t('search')" class="icon-btn" @click="search(true)"><i :class="!keyword ? 'icon-search' : 'icon-closer f-20'"></i></span>
	</span>
</template>

<script>
	import "@/static/css/sapi-search-filter.css";
	import importLocale from "@/static/js/importLocale.js";
	import {main} from "@/components/locale-component.js";
	export default {
		data() {
			return {
				visible: false,
				keyword: ""
			}
		},
		props: ["value", "placeholder"],
		methods: {
			search(flag) {
				if(this.visible === false) {
					var mainHeader = this.$parent.$el.querySelector(".main-header");
					if(mainHeader) {
						mainHeader.className = mainHeader.className + " search-active";
					}
					this.visible = true;
					this.searchClose();
					return;
				}

				if(this.keyword && flag === true) {
					this.visible = false;
					this.keyword = "";
					this.$emit("input", "");
				}

				//this.$emit("input", this.keyword);
				this.$emit("on-search");
				/*if(this.keyword && flag === true) {
					this.visible = false;
					this.keyword = "";
				}*/
			},
			searchClose() {
				var _this = this;
				function clickFunc() {
					if(!_this.keyword) {
						var mainHeader = _this.$parent.$el.querySelector(".main-header");
						if(mainHeader) {
							mainHeader.className = mainHeader.className.replace(/ search-active/g, "");
						}
						_this.visible = false;
						this.removeEventListener("click", clickFunc);
					}
				}

				document.body.addEventListener("click", clickFunc, false);
			}
		},
		created() {
			!Vue.toLocale&&Vue.use(importLocale);
			Vue.toLocale(main);
		},
		watch:{
			keyword(val){
				this.$emit("input", val);
			}
		}
	}
</script>