<template>
	<div class="sapi-table">
		<table-header ref="tableHeader" :changeSize="changeSize" :table-width.sync="tableWidth" :table-cols.sync="cols" @select-all="selectAll"></table-header>
		<div class="sapi-table-body" :style="{height:height,'max-height':maxHeight}">
			<table-column @on-expand="expand" :indent="indent" :style="{width:bodyWidth+'px'}" @on-change="selection" :data="data" v-if="isInit&&data.length>0" :defaultExpandAll="defaultExpandAll" :cols="cols" :props="props" parent-index=""></table-column>
			<div class="sapi-table-body-nodata" :style="{width:tableWidth+'px'}" v-if="data.length===0">暂无数据</div>
		</div>
	</div>
</template>

<script>
	import header from "./table-header.vue";
	import column from "./table-column.vue";
	export default {
		data() {
			return {
				cols: null,
				tableWidth: null,
				tableHeight: null,
				bodyWidth: null,
				isInit: false,
				isInitScroll: false,
				selectAllFlag: null,
				isInitWidth: false
			}
		},
		props: {
			data: Array,
			props: Object,
			height: {
				type: String,
				default: ""
			},
			maxHeight: {
				type: String,
				default: ""
			},
			defaultExpandAll: {
				default: false,
				type: Boolean
			},
			changeSize: {
				default: true,
				type: Boolean
			},
			indent: {
				default: 16,
				type: Number
			},
		},
		methods: {
			selectAll(flag) {

				this.selectAllFlag = flag;
			},
			selection(item, parentIndexs) {
				console.log(parentIndexs)
			},
			expand(item, flag) {
				this.$emit("on-expand", item, flag);
			},
			initScroll() {
				let elm = this.$el;

				let body = elm.querySelector(".sapi-table-body");
				const header = elm.querySelector(".sapi-table-header>table");
				let scrollLeft = 0;

				body.addEventListener("scroll", function(e) {
					const left = this.scrollLeft;
					if(scrollLeft === left) {
						return;
					} else {
						scrollLeft = left;
					}

					header.style.marginLeft = -left + "px";
				}, false);

				elm = null;
				body = null;
			},
			initWidth() {
				if(this.isInitWidth) {
					return;
				}

				setTimeout(() => {
					if(!this.$el || !this.cols || !this.data) {
						return;
					}

					const el = this.$el;
					let body = el.querySelector(".sapi-table-body");
					const tableBody = body.querySelector(".sapi-table-rows");
					if(!tableBody) {
						return;
					}

					if(tableBody.clientHeight > body.clientHeight) {
						this.isInitWidth = true;
						const subWidth = el.clientWidth - body.clientWidth;
						if(tableBody.clientWidth > body.clientWidth + subWidth) {
							return;
						}

						this.bodyWidth = this.tableWidth - subWidth;
					}

				}, 50);
			},
			initTips() {
				let toolTip=false;
				for(let i=0,ii=this.cols.length;i<ii;i++){
					let col=this.cols[i];
					if(col.showTip===true){
						toolTip=true;
						break;
					}
				}

				if(!toolTip){
					return;
				}

				let div=document.createElement("div");
				div.id="sapi-tool-tips";
				div.className="sapi-tool-tips hide";
				div.innerHTML='<span class="sapi-tool-tips-text"></span><span class="sapi-tool-tips-arrow down"></span>';
				document.body.appendChild(div);
			}
		},
		components: {
			"table-header": header
		},
		mounted() {
			this.$nextTick(() => {
				this.initScroll();
				this.initTips();
			});
			//console.log(this.$slots)
		},
		watch: {
			cols(val) {
				this.isInit = true;
				//this.initWidth();
			},
			data(val) {
				this.initWidth();
			},
			tableWidth(val) {
				this.bodyWidth = val;
				this.isInitWidth = false;
			}
		}
	}

	Vue.component("table-column", column);
</script>

<style>
	.sapi-table {
		width: 100%;
		box-sizing: content-box;
		border: #eee solid 1px;
	}
	
	.sapi-table-header {
		overflow: hidden;
	}
	
	.sapi-table-header>table {
		border-collapse: collapse;
		table-layout: fixed
	}
	
	.sapi-table-header th {
		height: 48px;
		text-align: left;
		overflow: hidden;
		background: #f8f8f8;
	}
	
	.sapi-table .sapi-table-body {
		overflow: auto;
	}
	
	.sapi-table .col-cell-tree {
		width: 100%;
		overflow: hidden;
	}
	
	.sapi-table .col-cell-tree>span {
		float: left;
		display: block;
	}
	
	.sapi-table .col-cell-tree-icon {
		width: 13px;
		padding-right: 5px;
		cursor: pointer;
	}
	
	.sapi-table .col-cell-tree-label {
		width: calc(100% - 20px);
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.sapi-table-rows {
		width: 100%;
		overflow: hidden;
	}
	
	.sapi-table-row {
		display: table;
		width: 100%;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #eee;
		table-layout: fixed
	}
	
	.sapi-table-body>.sapi-table-rows>.sapi-table-row:last-child {
		border-bottom-width: 0;
	}
	
	.sapi-table-col {
		display: table-cell;
		vertical-align: top;
	}
	
	.sapi-table .col-cell {
		padding-left: 10px;
		padding-right: 10px;
		color: inherit;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.sapi-table-body-nodata {
		width: 100%;
		min-height: 40px;
		line-height: 40px;
		text-align: center;
	}
	
	.table-th-drag {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 99;
		height: 48px;
		width: 2px;
		background: #ccc;
	}
	
	.table-th-drag:hover {
		cursor: col-resize;
	}
	
	.sapi-tool-tips {
		position: absolute;
		z-index: 99;
		left: 0;
		top: 200px;
		width: 230px;
		padding: 18px 24px;
		line-height: 20px;
		border-radius: 5px;
		background: #fff;
		box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.07);
	}
	
	.sapi-tool-tips.visible{
		visibility: hidden;
		z-index: -1;
	}

	.sapi-tool-tips-arrow.up {
		top: -8px;
		border-top-width: 0;
		border-bottom-color: rgba(225, 225, 225, 0.7);
	}
	
	.sapi-tool-tips-arrow.up:after {
		top: 1px;
		border-bottom-color: #fff;
		border-top-width: 0;
	}
	
	.sapi-tool-tips-arrow.down {
		bottom: -8px;
		border-bottom-width: 0;
		border-top-color: rgba(225, 225, 225, 0.7);
	}
	
	.sapi-tool-tips-arrow.down:after {
		bottom: 1px;
		border-top-color: #fff;
		border-bottom-width: 0;
	}
	
	.sapi-tool-tips-arrow {
		position: absolute;
		left: 23px;
		display: block;
		width: 0;
		height: 0;
		border: 8px;
		border-color: transparent;
		border-style: solid;
	}
	
	.sapi-tool-tips-arrow:after {
		position: absolute;
		display: block;
		width: 0;
		height: 0;
		margin-left: -8px;
		content: " ";
		border: 8px;
		border-color: transparent;
		border-style: solid;
	}
</style>