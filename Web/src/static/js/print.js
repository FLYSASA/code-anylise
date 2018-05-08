export default {
	data() {
		return {
			width:"100%"
		}
	},
	methods: {
		printView(selector) {
			
			var dom = document.querySelector(selector);
			if(!dom) {
				console.log("找不到打印模块");
				return;
			}
			this.$loadingOpen();

			/*console.log(printWindow.document.querySelector("#index"))

			printWindow.document.querySelector("#index").innerHTML=dom.innerHTML;*/

			
			setTimeout(() => {
				
				var printDom = this.$el.querySelector("#print-report-iframe");
				if(printDom) {
					printDom.outerHTML = "";
				}

				"<iframe id='print-report-iframe'></iframe>";
				var iframe = document.createElement("iframe");
				iframe.id = "print-report-iframe";
				iframe.src = "/print.html";

				this.$el.appendChild(iframe);
				var printDom = this.$el.querySelector("#print-report-iframe");
				var printWindow = printDom.contentWindow;
				printWindow.focus();
				printWindow.printHtml = dom.innerHTML;
				this.width = "100%";
				this.$loadingClose();
			}, 50)

			return false;

		}
	},
	mounted() {

	}
}