<template>
	<div class="custom-autocomplete" :class="{active:hasAdd}">
		<span class="custom-autocomplete-input">
			<!--
				:trigger-on-focus="false"
				这个属性IE存在bug，使用之后不能输入中文，等待修复
			-->
			<el-autocomplete  popper-class="custom-autocomplete-list" v-model="text" :fetch-suggestions="query" :placeholder="placeholder" @select="select">
				<template slot-scope="props">
				    <div class="name" v-text="renderTitle(props.item)" :title="renderTitle(props.item)"></div>
				    <span class="detail" v-text="renderContent(props.item)" :title="renderContent(props.item)"></span>
</template>
</el-autocomplete>
</span>
<span class="custom-autocomplete-btn">
			<el-button size="small" @click="submit" v-text="$t('submit')"></el-button>
		</span>

</div>
</template>

<script>
	import importLocale from "@/static/js/importLocale.js";
	import {main,sapi} from "@/components/locale-component.js";
	export default {
		data() {
			return {
				rows: [],
				text: "",
				pars: {
					pageIndex: 1,
					pageSize: 20,
					keyword: ""
				},
				flag: false,
				timeout: null,
				curProps: {}
			}
		},
		//keys后面会淘汰，可以使用props
		props: ["keys", "value", "params", "url", "hasAdd", "placeholder", "format", "props"],
		methods: {
			query(queryString, callback) {
				queryString = queryString || "";
				queryString = queryString.trim();
				var obj = {};
				if(queryString) {
					this.pars.keyword = queryString;
					clearTimeout(this.timeout);
					this.timeout = setTimeout(() => {
						obj[this.curProps.title] = this.$t('sapiAutocomplete.curPropsTitle');
						obj.isEmpty = true;
						callback([obj]);
					}, 100);
					this.$get(this.url, this.pars, function(res) {
						clearTimeout(this.timeout);
						this.rows = [].concat(res.Rows);
						var rows = res.Rows;
						if(!rows || rows.length === 0) {
							rows = [];
							var obj = {};
							var str = this.$t('sapiAutocomplete.noQuery')+"“" + queryString + "”";
							if(this.hasAdd === true) {
								str += ("，" + this.$t('sapiAutocomplete.addDesc'));
							}
							obj.isEmpty = true;
							obj[this.curProps.title] = str;
							rows.push(obj);
						}

						callback(rows);
					});
				} else {
					obj[this.curProps.title] = this.$t('sapiAutocomplete.startEnterDesc');
					obj.isEmpty = true;
					callback([obj]);
				}
			},
			renderTitle(item) {
				var title = this.curProps.title;
				var titleFunc = this.format.renderTitle || this.format.titleCallback;
				if(!item.isEmpty && typeof titleFunc === "function") {
					return titleFunc.call(null, item);
				} else {
					return item[title] || "";
				}
			},
			renderContent(item) {
				var content = this.curProps.content;
				var contentFunc = this.format.renderContent || this.format.contentCallback;
				if(!item.isEmpty && typeof contentFunc === "function") {
					return contentFunc.call(null, item);
				} else {
					return item[content] || "";
				}
			},
			select(item) {
				this.flag = true;
				var text = item[this.curProps.value] || "";
				if(item.isEmpty === true) {
					this.text = "";
					return false;
				}

				this.text = text;
				this.$emit("select", item);
			},
			submit() {
				this.$emit("on-click");
				//下面这个后面会淘汰
				this.$emit("confirm");
			},
			blur() {
				var dom = this.$el.querySelector(".custom-autocomplete-input .el-input__inner");
				var _this = this;
				dom.addEventListener("blur", function() {
					setTimeout(function() {
						if(_this.flag === false) {
							var text = _this.text;
							var value = _this.curProps.value;
							var isFinish = true;
							if(!text) {
								_this.$emit("select", {});
							} else {
								var rows = _this.rows;
								for(var i = 0, ii = rows.length; i < ii; i++) {
									if(rows[i][value] === text) {
										isFinish = false;
										_this.$emit("select", rows[i]);
										break;
									}
								}

								if(isFinish) {
									_this.text = "";
									_this.$emit("select", {});
								}
							}

						}
						_this.flag = false;
					}, 150);
				}, false);
				dom = null;
			}
		},
		created() {
			!Vue.toLocale&&Vue.use(importLocale);
			let obj = Vue.extendLangs(main,sapi);
			Vue.toLocale(obj);
			
			this.curProps = this.keys || this.props || {};
		},
		mounted() {

			var obj = this.params;
			var pars = this.pars;
			if(obj && typeof obj === "object") {
				for(var key in obj) {
					pars[key] = obj[key];
				}
			}

			this.text = this.value || "";
			setTimeout(() => {
				this.blur();
			}, 50);
		},
		watch: {
			text(val) {
				this.$emit("input", val);
			},
			value(val) {
				this.text = val;
			}
		}
	}
</script>

<style>
	.custom-autocomplete-list.is-loading {
		display: none;
	}
	
	.custom-autocomplete .el-autocomplete {
		width: 100%;
	}
	
	.custom-autocomplete.active .el-autocomplete {
		width: calc(100% - 52px);
	}
	
	.custom-autocomplete .custom-autocomplete-btn {
		display: none;
	}
	
	.custom-autocomplete.active .custom-autocomplete-btn {
		display: inline-block;
	}
	
	.custom-autocomplete-list.el-autocomplete-suggestion li {
		padding: 5px 12px;
		font-size: 12px;
		line-height: inherit;
		overflow: hidden;
	}
	
	.custom-autocomplete-list.el-autocomplete-suggestion li:active {
		background: #e4e8f1;
	}
	
	.custom-autocomplete-list.el-autocomplete-suggestion li>.name {
		line-height: 24px;
		color: #222;
		font-weight: bold;
	}
	
	.custom-autocomplete-list.el-autocomplete-suggestion li>.detail {
		display: block;
		max-height: 40px;
		color: #666;
		line-height: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: normal;
	}
	
	.custom-autocomplete-list.el-autocomplete-suggestion li>.empty {
		color: #666;
		line-height: 20px;
		cursor: default;
	}
</style>