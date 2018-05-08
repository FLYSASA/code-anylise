<template>
	<div class="sapi-table-rows">
		<template v-for="(item,index) in data">
			<div class="sapi-table-row">
				<div class="sapi-table-col" v-for="(col,colIndex) in cols" :class="'sapi-table-col-'+colIndex" :style="{width:col.width+'px'}">
					<column-slot v-if="col.slot" :col="col" :item="item" :index="colIndex"></column-slot>
					<div v-else-if="col.type==='selection'" class="col-cell">
						<el-checkbox v-model="item.__checked" @change="change(item)"></el-checkbox>
					</div>
					<div v-else-if="col.prop===props.treeProp" class="col-cell">
						<div class="col-cell-tree" :style="{'padding-left':indexs.length>0?(indexs.length*indent+'px'):false}">
							<span v-if="!item[props.children]||item[props.children].length===0"></span>
							<span class='col-cell-tree-icon' @click="expand(item)" v-else-if="item.__expandActiveFlag===undefined ? defaultExpandAll===true:item.__expandActiveFlag">-</span>
							<span class='col-cell-tree-icon' @click="expand(item)" v-else>+</span>
							<span class='col-cell-tree-label' v-text="format(item,col)"></span>
						</div>
					</div>
					<div v-else class="col-cell" @mouseleave="mouseleave" @mouseenter="mouseenter(col,$event)" v-text="format(item,col)">
					</div>
				</div>
			</div>

			<table-column @on-change="selection" @on-expand="onExpand" :indent="indent" :defaultExpandAll="defaultExpandAll" :data="item[props.children]" :parent-index="parentIndex?(parentIndex+','+index):(index+'')" :cols="cols" :props="props" v-show="setShow(item,true)" v-if="hasChild(item)"></table-column>
		</template>
	</div>
</template>

<script>
	import slot from "./table-column-slot.js";
	export default {
		data() {
			return {
				indexs: []
			}
		},
		props: ["data",
			"props",
			"cols",
			"parentIndex",
			"defaultExpandAll",
			"indent"
		],
		components: {
			"column-slot": slot
		},
		methods: {
			mouseenter(col,e){
				if(col.showTip!==true){
					return;
				}
				
				const target=e.target;
				const width=target.offsetWidth;
				console.dir(target)
				const text=target.innerText;
				if(!text){
					return;
				}
				
				let tipDom=window["sapi-tool-tips"];
				if(!tipDom){
					return;
				}
				
				let first=tipDom.firstChild;
				first.innerText=text;
				tipDom.className=tipDom.className.replace("hide","visible");
				
				console.dir(first.offsetWidth)
			},
			mouseleave(e){
				
			},
			selection(item, parentIndexs) {
				this.$emit("on-change", item, parentIndexs);
			},
			change(item) {
				this.$emit("on-change", item, this.indexs);
			},
			format(row,col){
				if(typeof col.format==="function"){
					return col.format(row,col);
				}
				
				return row[col.prop];
			},
			onExpand(item,flag){
				this.$emit("on-expand",item,flag);
			},
			expand(item) {
				this.$set(item, "__expandActiveFlag", !item.__expandActiveFlag);
				this.$emit("on-expand",item,!item.__expandActiveFlag);
			},
			hasChild(item) {
				if(item.__expandActiveFlag !== undefined) {
					return true;
				}

				let child = this.props.children;
				if(this.defaultExpandAll) {
					if(item.__expandActiveFlag === undefined) {
						this.expand(item);
					}
					return item[child] && item[child].length > 0;
				}

				return false;

				//return item[child] && item[child].length > 0;
			},
			setShow(item) {
				let child = this.props.children;

				return item.__expandActiveFlag && item[child] && item[child].length > 0;
			}
		},
		created() {
			if(this.parentIndex) {
				this.indexs = this.parentIndex.split(",");
			}
		}
	}
</script>

<style>

</style>