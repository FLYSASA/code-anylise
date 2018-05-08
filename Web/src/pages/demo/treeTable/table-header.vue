<template>
	<div class="sapi-table-header">
		<table :style="{width:headWidth+'px'}">
			<colgroup>
				<col v-for="(item,index) in cols" :width="item.width"></col>
			</colgroup>
			<thead>
				<tr v-for="(row,index) in rows">
					<th v-for="(th,thIndex) in row.th" @mouseleave.self="mouseleave" @mouseenter="mouseover(thIndex,$event)" :rowspan="th.rowspan" :colspan="th.colspan">
						<div class="col-cell" v-if="th.type==='selection'">
							<el-checkbox @change="change"></el-checkbox>
						</div>
						<div class="col-cell" v-else v-text="th.label"></div>
					</th>
				</tr>
			</thead>
		</table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				bodyWidth: 0,
				headWidth: null,
				slots: null,
				rows: [],
				cols: [],
				target: null,
				clearTime: null,
				dragFlag: false,
				isInit: false,
				dragItem: {
					index: null,
					x: 0
				}
			}
		},
		props:["tableWidth","tableCols","changeSize"],
		methods: {
			initDrag() {
				if(this.isInit) {
					return;
				}

				let drag = this.target;
				const _this = this;
				drag.addEventListener("mouseover", function() {
					clearTimeout(_this.clearTime);
				}, false);

				let clientx;

				//虚拟框根据鼠标的移动进行移动
				function moveFunc(e) {
					let left = (parseInt(drag.style.left) + e.clientX - clientx);
					drag.style.left = left + "px";
					clientx = e.clientX;
				}

				let moveFlag = false;

				drag.addEventListener("mousedown", function(e) {
					drag=this;
					_this.dragFlag = true;
					moveFlag = true;
					e.preventDefault();
					clientx = e.clientX;
					document.body.addEventListener("mousemove", moveFunc, false);
				}, false);

				document.addEventListener("mouseup", function() {
					if(!moveFlag) {
						return;
					}

					_this.dragFlag = false;
					moveFlag = false;
					document.body.removeEventListener("mousemove", moveFunc);
					drag.className = drag.className + " hide";
					_this.setColWidth(clientx);
					_this.mouseleave();
					drag=null;
				});

				this.isInit = true;
				drag=null;
			},
			setColWidth(x) {
				let width = x - this.dragItem.x;
				if(width < 50) {
					width = 50;
				}

				const index = this.dragItem.index;

				let col = this.cols[index];

				const subWidth = width - col.width;
				if(subWidth < 0) {
					if(index !== this.cols.length - 1) {
						let nextCol = this.cols[index + 1];
						nextCol.width -= subWidth;
					} else {
						let preCol = this.cols[index - 1];
						preCol.width -= subWidth;
					}
				} else {
					this.headWidth += subWidth;
				}

				col.width = width;

				this.$emit("update:tableWidth", this.headWidth);
				this.$emit("update:tableCols", this.cols);
			},
			mouseleave() {
				clearTimeout(this.clearTime);
				this.clearTime = setTimeout(() => {
					if(!this.target || this.dragFlag) {
						return;
					}

					let dom = this.target;
					if(dom.className.indexOf("hide") === -1) {
						dom.className = dom.className + " hide";
					}
					this.target = null;
				}, 5);
			},
			mouseover(index, e) {
				if(this.dragFlag||this.changeSize!==true) {
					return;
				}
				
				let dom = this.target = window["table-th-drag"];
				if(!dom){
					return;
				}
				
				clearTimeout(this.clearTime);

				let x = (e.clientX || e.pageX) - e.offsetX;

				this.dragItem = {
					index: index,
					x: x
				}

				const target = e.target;
				x = x + target.clientWidth - 2;
				let y = (e.clientY || e.pageY) - e.offsetY;

				
				dom.className = dom.className.replace(/\s+hide/g, "");
				dom.style.left = x + "px";
				dom.style.top = y + "px";
				this.initDrag();
			},
			change(flag) {
				this.$emit("select-all", flag);
			},
			getCol() {
				let slots = this.slots;
				if(!slots || slots.length === 0) {
					return [];
				}

				let rows = [];
				let cols = [];

				// th列初始化值
				let initValue = (item, isCol) => {
					let attrs = item.data.attrs;
					let th = {
						showTip:attrs["show-tip"],
						type: attrs.type,
						prop: attrs.prop,
						width: parseInt(attrs.width) || 0,
						label: attrs.label,
						format: attrs.format,
					};

					let flag = false;
					let childs = item.componentOptions.children;
					if(!childs || childs.length === 0) {
						flag = true;
					}

					if(flag === true) {
						if(item.data.scopedSlots) {
							th.slot = item.data.scopedSlots.default;
						}

						cols.push(th);
					}

					return th;
				}

				//遍历嵌套的slot
				let forEachSlot = (slot, rowIndex) => {
					let childs = slot.componentOptions.children;

					if(!childs || childs.length === 0) {
						return;
					}

					let row = {
						th: [],
						index: rowIndex
					};
					rows.push(row);

					let rowColspan = 0;
					childs.forEach((item, index) => {
						if(!item.data) {
							return;
						}

						let th = initValue(item);

						row.th.push(th);
						let colspan = forEachSlot(item, rowIndex + 1);
						if(colspan) {
							th.colspan = colspan;
							rowColspan = rowColspan + colspan;
						} else {
							rowColspan++;
						}
					});

					//row.colspan=row.th.length;

					return rowColspan;
				}

				let row = {
					th: [],
					index: 0
				};

				rows.push(row);

				//最外层的slot
				slots.forEach((item, index) => {
					if(!item.data) {
						return;
					}

					let th = initValue(item);

					row.th.push(th);
					let colspan = forEachSlot(item, 1);
					if(colspan) {
						th.colspan = colspan;
					}

					//col.push(h("th",attrs.label));
				});

				//除掉没有列的行
				let filterRows = rows.filter((item) => {
					if(item.th.length > 0) {
						return true;
					}

					return false;
				});

				let ruturnRows = [];
				let rowIndexs = {};
				let len = filterRows.length;
				//合并同一行的列
				filterRows.forEach((row, rowIndex) => {
					if(rowIndexs[row.index] !== true) {
						let arrs = row.th;
						for(let i = rowIndex + 1; i < len; i++) {
							let item = filterRows[i];
							if(item.index === row.index) {
								arrs = arrs.concat(item.th);
							}
						}
						ruturnRows.push({
							th: arrs
						});
						rowIndexs[row.index] = true;
					}
				});

				len = ruturnRows.length;
				//从新设置行高
				ruturnRows.forEach((item, index) => {
					let rowspan = len - index;
					item.th.forEach((val) => {
						if(!val.colspan) {
							val.rowspan = rowspan;
						}
					});
				});

				return {
					cols: cols,
					rows: ruturnRows
				};

			},
			initWidth() {
				const parent = this.$parent;
				const parentNode = parent.$el.parentNode;
				const width = this.bodyWidth = parentNode.clientWidth;
				this.maxWidth = width;
				let cols = this.cols;
				let totalWidth = 0;
				let totalCount = 0;
				let colWidths = [];
				cols.forEach((col, index) => {
					if(col.width && !isNaN(col.width)) {
						totalWidth += col.width;
					} else {
						totalCount++;
						colWidths.push(index);
					}
				});

				if(totalCount !== 0 && cols.length !== totalCount) {
					let averageWidth, lastWidth;

					if(width - totalWidth > 0) {
						averageWidth = parseInt((width - totalWidth) / totalCount);
						lastWidth = width - totalWidth - averageWidth * (totalCount - 1);
					} else {
						lastWidth = averageWidth = 50;
					}

					for(let i = 0, ii = colWidths.length - 1; i < ii; i++) {
						cols[colWidths[i]].width = averageWidth;
					}

					cols[colWidths[colWidths.length - 1]].width = lastWidth;
				}

				let headWidth = 0;
				cols.forEach(col => {
					headWidth += col.width;
				});
				
				this.headWidth=headWidth;

				this.$emit("update:tableWidth", this.headWidth);
				this.$emit("update:tableCols", this.cols);

				setTimeout(() => {
					if(window["table-th-drag"])
					{
						return;
					}
					
					let div = document.createElement("div");
					div.id = "table-th-drag";
					div.className = "table-th-drag hide";

					document.body.appendChild(div);
				});
			}
		},
		created() {
			let parent = this.$parent;
			let slots = this.slots = parent.$slots.default;
			let table = this.getCol();
			this.rows = table.rows;
			this.cols = table.cols;
			this.$nextTick(() => {
				this.initWidth();
			});
		}
	}
</script>

<style>

</style>