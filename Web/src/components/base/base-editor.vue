<template>
	<div class="sapi-ueditor-container">
		<div class="sapi-ueditor" :style="{height: height,width: width}"></div>
	</div>

</template>

<script>
	import "@/static/external/ueditor/ueditor.config.js";
	import "@/static/external/ueditor/ueditor.all.min.js";
	export default {
		data: function() {
			return {
				id: "ueditorid" + Math.round(Math.random(1) * 100000000)
			}
		},
		props: ["content", "config", "height", "width"],
		mounted: function() {
			this.$el.firstChild.id = this.id;
			this.$nextTick(function() {
				var editor = UE.getEditor(this.id, this.config);
				editor.ready(function() {
					editor.setContent(this.content || "");
					var _this = this;

					editor.addListener("contentChange", function() {
						var wordCount = this.getContentLength(true);
						var content = this.getContent();
						_this.$emit('on-change', content, wordCount);
					});

					this.$emit('on-ready', editor);
					this.ready();
				}.bind(this));

			}.bind(this));
		},
		methods: {
			getContent: function() {
				return UE.getEditor(this.id).getContent();
			},
			ready() {
				var cleartimeout;
				var dom = this.$el;
				var hasHeightDom = false;
				dom.addEventListener("scroll", function() {
					clearTimeout(cleartimeout);
					var _this = this;
					setTimeout(function() {
						var tool = _this.querySelector(".edui-editor-toolbarbox");
						if(!tool) {
							return;
						}

						if(_this.scrollTop > 19) {
							tool.style.top = _this.scrollTop + "px";
						} else {
							if(hasHeightDom === false && tool.previousSibling) {
								tool.previousSibling.style.height = 0 + "px";
								hasHeightDom = true;
							}

							tool.style.top = 0;
						}
					}, 100);

				}, false);
				var iframe = dom.querySelector(".edui-editor-iframeholder");
				if(iframe) {
					iframe.style.top = (iframe.previousSibling.clientHeight + 2) + "px";
					iframe = null;
				}
				dom = null;
			}
		},
		watch: {
			content: function(val) {
				val = val || "";
				var editor = UE.getEditor(this.id);
				editor.ready(function() {
					editor.setContent(val);
				});
			}
		},
		beforeDestroy() {
			UE.delEditor(this.id);
		}
	}
</script>

<style>
	.sapi-ueditor-container {
		position: relative;
		top: 0;
		left: 2px;
		right: 2px;
		width: calc(100% - 4px);
		height: 100%;
		overflow: auto;
		z-index: 0;
	}
</style>