export default {
	data() {
		return {

		}
	},
	props: ["cols", "data", "props", "defaultExpandedAll"],
	methods: {
		getRows(h) {
			const datas = this.data;
			const children = this.props.children;
			const treeProp = this.props.treeProp;
			const parent = this.$parent.$parent;
			const expandedAll =true;// this.defaultExpandedAll;

			let rows = [];
			const setRow = (data, index, parentIndex) => {
				let row = [];
				const hasChild = data[children] && data[children].length > 0;
				cols.forEach((col, colIndex) => {
					let div, innerHTML;
					if(col.slot) {
						div = h("div", {
							class: "col-cell"
						}, [col.slot({
							row: data
						})]);
					} else if(col.format) {
						div = h("div", {
							domProps: {
								innerHTML: col.format.call(parent, data, index)
							}
						});
					} else if(col.renderContent) {
						div = col.format.call(parent, h, data, index);
					} else {
						if(treeProp === col.prop) {
							let style = "",
								iconHtml = "";
							if(parentIndex) {
								const paddingLeft = parentIndex.split(",").length * 16 + "px";
								style = "style='padding-left:" + paddingLeft + "'";
							}

							if(hasChild) {
								const icon = expandedAll ? "-" : "+";
								iconHtml = "<span class='col-cell-tree-icon'>" + icon + "</span>";
							}

							innerHTML = "<div class='col-cell'><div class='col-cell-tree' " + style + ">" + iconHtml + "<span class='col-cell-tree-label'>" + data[col.prop] + "</span></div></div>";

						} else {
							innerHTML = "<div class='col-cell'>" + data[col.prop] + "</div>";
						}
					}

					row.push(h("div", {
						"class": "sapi-table-col sapi-table-col-" + colIndex,
						style: {
							width: col.width + "px"
						},

						domProps: {
							innerHTML: innerHTML
						},
						on: {
							click(e) {
								const target = e.target;
								if(target.className === "col-cell-tree-icon") {

								}
								console.log(123)
							}
						},
						scopedSlots:props=>{
							console.log(456)
						}
					}, [div]));
				});

				rows.push(h("div", {
					"attrs": {
						"data-index": index,
						"parent-index": parentIndex
					},
					class: "sapi-table-row"
				}, row));
			}

			const foreachNode = (data, parentIndex) => {
				let childs = data[children];
				if(!childs || childs.length === 0) {
					return;
				}

				childs.forEach((node, index) => {
					setRow(node, index, parentIndex);
					if(expandedAll === true) {
						foreachNode(node, parentIndex + "," + index);
					}
				});
			}

			const cols = this.cols;

			datas.forEach((data, index) => {
				setRow(data, index);
				if(expandedAll === true) {
					foreachNode(data, index + "");
				}
			});

			return rows;
		}
	},
	render(h) {
		const cols = this.cols;
		const datas = this.data || [];
		if(!cols || cols.length === 0) {
			return h("");
		}

		let rows = [];

		if(datas.length === 0) {
			rows.push(h("tr", [h("td", {
				attrs: {
					colspan: cols.length
				}
			}, "暂无数据")]));
		} else {
			rows = this.getRows(h);
		}

		return h("div", {
			class: "sapi-table-body-container"
		}, [rows]);
	}
}