export default {
	props: ["col", "item","index"],
	render(h) {
		return  h("div", {
			class: "col-cell"
		}, [this.col.slot({
			row: this.item,
			$index:this.index
		})]);
	}
}