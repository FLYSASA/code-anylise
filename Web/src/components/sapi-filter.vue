<template>
	<div class="filter" :class="{active:isOpen===true?true:isActive}" @click.stop="">
		<div class="filter-box">
			<slot></slot>
			<div class="footer">
				<el-button size="small" class="default-button" @click="cancel" v-text="$t('cancel')"></el-button>
				<el-button class="blue-button" size="small" @click="confirm" v-text="$t('determine')"></el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import "@/static/css/sapi-search-filter.css";
	import importLocale from "@/static/js/importLocale.js";
	import {main} from "@/components/locale-component.js";

	export default {
		data() {
			return {
				isActive: false
			}
		},
		props: ["isInit","format","isOpen"],
		methods: {
			confirm() {
				this.setTag();
				this.$emit("on-confirm");
				this.close();
			},
			cancel() {
				this.$emit("on-cancel");
				this.close();
			},
			close() {
				//this.$el.style.right = -410 + "px";
				this.isActive = false;
			},
			open() {
				if(this.isActive === false) {
					this.isActive = true;
					//this.$el.style.right = 0 + "px";
				} else {
					this.close();
				}
			},
			setTableHeight(height) {
				var parent = this.$parent;
				if(this.$typeof(parent.isMax) === "boolean" && this.$typeof(parent.isClose) === "boolean") {
					parent = parent.$parent;
				}

				parent.maxBodyHeight = parent.maxBodyHeight + height;
			},
			removeTag(el) {
				var parent = this.$parent;
				/*if(this.$typeof(parent.isMax) === "boolean" && this.$typeof(parent.isClose) === "boolean") {
					parent = parent.$parent;
				}*/
				
				var prop = el.getAttribute("prop");
				var relatedProps=el.getAttribute("related-props");
				var defaultValue = el.getAttribute("default");
				parent.params[prop] = defaultValue;
				var ul = el.parentNode.parentNode;
				var height1 = ul.offsetHeight;
				el.parentNode.outerHTML = "";
				this.removeRelatedProps(ul,relatedProps);
				var height2 = ul.offsetHeight;
				var height = height1 - height2;
				if(height > 0) {
					if(!ul.querySelector("li")) {
						ul.className = "";
						height = height + 28;
					}

					this.setTableHeight(height);
				}

				this.$emit("on-confirm");
			},
			removeRelatedProps(ul,props){
				if(!props){
					return;
				}
				
				var parent = this.$parent;
				/*if(this.$typeof(parent.isMax) === "boolean" && this.$typeof(parent.isClose) === "boolean") {
					parent = parent.$parent;
				}*/
				
				if(props===true){
					var lis=ul.querySelectorAll("li>i");
					for(var i=0,ii=lis.length;i<ii;i++){
						var prop = lis[i].getAttribute("prop");
						var defaultValue = lis[i].getAttribute("default");
						parent.params[prop] = defaultValue;
						lis[i].parentNode.outerHTML="";
					}
				}else{
					var selectors="";
					props=props.split("|");
					for(var j=0,jj=props.length;j<jj;j++){
						selectors+="li>i[prop='"+props[j]+"']";
						if(j!==jj-1){
							selectors+=",";
						}
					}
					
					var lis=ul.querySelectorAll(selectors);
					for(var i=0,ii=lis.length;i<ii;i++){
						var prop = lis[i].getAttribute("prop");
						var defaultValue = lis[i].getAttribute("default");
						parent.params[prop] = defaultValue;
						lis[i].parentNode.outerHTML="";
					}
				}
			},
			removeAll(el){
				var ul=el.parentNode.querySelector("ul");
				this.setTableHeight(ul.offsetHeight);
				this.removeRelatedProps(ul,true);
				ul.className = "";
				
				this.$emit("on-confirm");
			},
			parseObj(str) {
				var obj = {};
				if(!str) {
					return obj;
				}

				var arrs = str.split(",");
				for(var i = 0, ii = arrs.length; i < ii; i++) {
					var arrs1 = arrs[i].split(":");
					obj[arrs1[0]] = arrs1[1];
				}

				return obj;
			},
			formatText(type, val, prop) {
				var parent = this.$parent;
				/*if(this.$typeof(parent.isMax) === "boolean" && this.$typeof(parent.isClose) === "boolean") {
					parent = parent.$parent;
				}*/
				if(val === "" || val === undefined || val === null) {
					return "";
				}

				var value = "";
				switch(type) {
					case "date":
						value = val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate();
						break;
					case "dateRange":
						if(!val || val.length === 0) {
							break;
						}

						var start = val[0].getFullYear() + "-" + (val[0].getMonth() + 1) + "-" + val[0].getDate();
						var end = val[1].getFullYear() + "-" + (val[1].getMonth() + 1) + "-" + val[1].getDate();
						value = start + "-" + end;
						break;
					default:
						if(typeof this.format === "function") {
							return this.format.call(parent, value, prop, type);
							break;
						}
						value = val;
				}

				return value;
			},
			getTagHtml(lis) {
				var li, liHtml = "";

				var parent = this.$parent;
				/*if(this.$typeof(parent.isMax) === "boolean" && this.$typeof(parent.isClose) === "boolean") {
					parent = parent.$parent;
				}*/
				if(!parent){
					return;
				}
				var params = parent.params;

				for(var i = 0, ii = lis.length; i < ii; i++) {
					li = lis[i];
					var propEle = li.querySelector("[prop]");
					if(!propEle) {
						continue;
					}

					var propName = propEle.getAttribute("prop");
					if(!propName) {
						continue;
					}

					var curValue = params[propName],
						options;

					if(curValue === "" || curValue === undefined || curValue === null || curValue.length === 0) {
						continue;
					}

					options = propEle.getAttribute("options");
					var noDeleted = false;
					var defaultValue = "";
					var innerText = "";
					if(options) {
						options = this.parseObj(options);
						//options:data,deleted,key,value,format
						var datasKey = options.data;
						var key = options.label || options.key || "key";
						var value = options.value || "value";
						//noDeleted = (options.deleted + "") === "false";
						var relatedProps=options.relatedProps||""
						defaultValue = options.default;
						if(defaultValue === undefined) {
							defaultValue = '';
						}
						var format = options.format || "";
						var datas = parent[datasKey] || "";

						//单选的时候，为false
						if(curValue === false && !datas && key) {
							continue;
						}

						var data;
						var values = "";
						if(this.$typeof(datas) === "array" && datas.length > 0) {
							if(this.$typeof(curValue) === "array") {
								for(var j = 0, jj = datas.length; j < jj; j++) {
									data = datas[j];
									if(curValue.indexOf(data[value]) > -1) {
										values += data[key] + ",";
									}
								}
								if(values) {
									values = values.slice(0, -1);
								}
							} else {
								for(var j = 0, jj = datas.length; j < jj; j++) {
									data = datas[j];
									if(curValue === data[value]) {
										values = data[key];
										break;
									}
								}
							}
						} else if(value == (curValue + "") && (options.label || options.key)) {
							values = key;
						} else {
							values = curValue;
						}
						innerText = this.formatText(format, values, propName);
					} else {
						innerText = this.formatText("", curValue, propName);
					}

					liHtml += "<li title='" + innerText + "'><span>" + li.firstChild.innerText + "：" + innerText + "</span>";
					if(noDeleted === false) {
						liHtml += "<i class='close-btn' related-props='"+relatedProps+"' default='" + defaultValue + "' prop='" + propName + "'></i>";
					}

					liHtml += "</li>";
				}

				return liHtml;
			},
			setTag() {
				var parentNode;
				if(this.$typeof(parent.isMax) === "boolean" && this.$typeof(parent.isClose) === "boolean") {
					parentNode = this.$el;
				} else {
					parentNode = this.$el.parentNode;
				}
				var searchDiv = parentNode.querySelector(".main-search-filter");

				if(!searchDiv) {
					var div = document.createElement("div");
					div.className = "main-search-filter";
					parentNode.insertBefore(div, parentNode.querySelector(".main-table"));
					div.innerHTML = '<ul></ul><a>'+this.$t("cleanUp")+'</a>';
					searchDiv = parentNode.querySelector(".main-search-filter");
				}

				var lis = this.$el.querySelectorAll("ul>li");
				var liHtml = this.getTagHtml(lis);
				var ul = searchDiv.querySelector("ul");

				if(!liHtml) {
					var height = ul.offsetHeight;
					if(height > 0) {
						this.setTableHeight(height);
					}
					ul.className = "";
					ul.innerHTML = "";
					return;
				}

				var height1 = ul.scrollHeight;
				ul.innerHTML = liHtml;
				var height2 = ul.offsetHeight;
				if(height2 - height1 !== 0) {
					var height = height2 - height1;
					if(height1 === 0) {
						height = height + 28;
					}
					this.setTableHeight(-height);
				}

				ul.className = "active";
				var btns = ul.querySelectorAll("li>i");
				var _this = this;
				for(var j = 0, jj = btns.length; j < jj; j++) {
					btns[j].addEventListener("click", function() {
						_this.removeTag(this);
					}, false);
				}
				
				var clearAll=function(){
					_this.removeAll(this);
					this.removeEventListener("click",clearAll);
				}
				
				searchDiv.querySelector("a").addEventListener("click",clearAll,false);
				
				btns = null;
			}
		},
		created() {
			!Vue.toLocale&&Vue.use(importLocale);
			Vue.toLocale(main);
		},
		mounted() {
			var filterBtn = this.$parent.$el.querySelector(".func-btns>.icon-filter");
			if(filterBtn) {
				var _this = this;
				filterBtn.addEventListener("click", function(e) {
					e.stopPropagation();
					/*var searchInput=_this.$parent.$el.querySelector('.search-input');
					searchInput.style.display="none";*/
					_this.open();
				}, false);
				filterBtn = null;

				document.addEventListener("click", function(e) {
					if(_this.isActive === true) {
						_this.close();
					}
				}, false);
			}
		},
		watch:{
			isInit(val){
				if(val===true){
					this.setTag();
				}
			}
		}
	}
</script>