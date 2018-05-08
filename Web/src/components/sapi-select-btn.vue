<template>
	<div class="sapi-btn-select" :class="{readonly:!isReadonly}">
		<div :style="{height:styleHeight}" class="sapi-btn-select-options-wrap">
			<div class="sapi-btn-select-options" :class="{multiple:hasMore === true && height}">
				<span class="sapi-btn-select-options-item" v-for="(item,index) in items">
				<i class="icon-closer" @click.stop="remove(item,index)"></i>
				<label :title="showLabel(item)" v-text="showLabel(item)"></label>
			</span>

			</div>
		</div>

		<label class="sapi-btn-select-options-empty" v-show="items.length>1" @click.stop="empty" v-text="$t('empty')"></label>
		<el-button class="sapi-btn-select-btn" @click="select" :disabled="hasMore!==true&&items.length>0" v-text="$t('select')"></el-button>
	</div>
</template>

<script>
	import importLocale from "@/static/js/importLocale.js";
	import { main } from "@/components/locale-component.js";

	export default {
		data() {
			return {
				items: [],
				styleHeight: null
			}
		},
		computed: {
			isReadonly() {
				if(this.readonly === "" || this.readonly === "undefined" || this.readonly === true) {
					return false
				}

				return true;
			}
		},
		props: ["value", "props", "height", "hasMore", "format", "readonly"],
		methods: {
			remove(item, index) {
				this.items.splice(index, 1);
				this.$emit("input", this.items);
			},
			empty() {
				this.$emit("input", []);
			},
			select() {
				this.$emit("select");
				this.$emit("on-click");
			},
			showLabel(item) {
				if(typeof this.format === "function") {
					return this.format(item);
				}

				return item[this.props.label];
			}
		},
		mounted() {
			this.items = this.value;
			this.styleHeight = this.height;
		},
		created() {
			!Vue.toLocale && Vue.use(importLocale);
			Vue.toLocale(main);
		},
		watch: {
			value(val) {
				this.items = val;
				if(this.hasMore === true) {
					/*if(val&&val.length>30){
						Vue.msg("该控件不支持选择超过30个的，请选用其他控件");
					}*/
					setTimeout(() => {
						let height = this.$el.querySelector(".sapi-btn-select-options").scrollHeight;

						const addHeight=20;
						if(this.height) {
							let initHeight = parseInt(this.height);

							if(height < initHeight) {
								if(height > 30) {
									height = initHeight + addHeight;
								} else {
									height = initHeight;
								}
							} else {
								height+=addHeight;
							}

						} else if(height < 28) {
							height = 28;
						} else {
							height += addHeight;
						}

						this.styleHeight = height+"px";
					}, 50);
				}
			}
		}
	}
</script>

<style>
	.sapi-btn-select {
		position: relative;
		display: inline-block;
		width: 100%;
		min-height: 28px;
		vertical-align: top;
	}
	
	.sapi-btn-select.readonly .sapi-btn-select-options-item>i,
	.sapi-btn-select.readonly .sapi-btn-select-options-empty,
	.sapi-btn-select.readonly .sapi-btn-select-btn {
		display: none;
	}
	
	.sapi-btn-select.readonly .sapi-btn-select-options-wrap {
		width: 100%;
	}
	
	.sapi-btn-select-btn {
		position: absolute;
		right: 0;
		top: 0;
	}
	
	.sapi-btn-select-options-wrap {
		width: calc(100% - 53px);
		height: 28px;
		border: 1px solid #eee;
		border-radius: 4px;
		background-color: #fff;
		overflow: hidden;
	}
	
	.sapi-btn-select-options {
		position: relative;
		padding: 0px 10px;
		line-height: 20px;
	}
	
	.sapi-btn-select-options.multiple {
		box-sizing: border-box;
		/*overflow-y: auto;*/
		height: auto;
	}
	
	.sapi-btn-select-options-empty {
		position: absolute;
		z-index: 2;
		right: 60px;
		bottom: 3px;
		height: 20px;
		color: #209ffd;
		cursor: pointer;
		line-height: 20px;
	}
	
	.sapi-btn-select-options>span {
		position: relative;
		display: inline-block;
		height: 20px;
		max-width: 100%;
		margin-right: 3px;
		margin-top: 3px;
		padding: 0 6px;
		line-height: 20px;
		background: #f6f3f3;
		border-radius: 2px;
		overflow: hidden;
	}
	
	.sapi-btn-select-options>span>label {
		display: block;
		width: 100%;
		height: 20px;
		padding-right: 20px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.sapi-btn-select.readonly .sapi-btn-select-options>span>label{
		padding-right: 0;
	}
	
	.sapi-btn-select-options>span>i {
		position: absolute;
		top: 0;
		right: 5px;
		line-height: 22px;
		cursor: pointer;
	}
</style>