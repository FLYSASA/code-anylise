import "../css/common.css";
export default {
	data() {
		return {
			visible: false
		}
	},
	methods: {
		initDialog() {
			setTimeout(() => {
				if(!this.$el){
					console.log("找不到弹窗对象");
					return;
				}
				
				var dialog = this.$el.parentNode.querySelector(".dialog>.dialog-box");
				if(!dialog) {
					return;
				}

				dialog.className = dialog.className + " dialog-visibility";
				this.visible = true;
				setTimeout(function() {
					var maxBtn = dialog.querySelector(".dialog-btns-max");
					if(maxBtn) {
						maxBtn.click();
					}
				});

				setTimeout(() => {
					dialog.className = dialog.className.replace("dialog-visibility", "dialog-no-header");
					dialog = null;
				}, 10);
			}, 50)

		}
	},
	watch: {
		visible(val) {
			if(val === false) {
				if(this.currentView){
					this.currentView="";
				}
				
				window.close();
			}
		}
	}
}