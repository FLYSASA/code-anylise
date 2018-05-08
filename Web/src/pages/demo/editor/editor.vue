<template>
	<div class="editor-demo">
		<!--这里需要设置绝对定位才可以-->
		<sapi-editor ref="editor" :content="editor1" width="100%" height="350px" :config="config"></sapi-editor>
		<el-button @click="clickHandle">获取数据</el-button>
	</div>
	
</template>

<script>
	import editor from "@/components/sapi-editor.vue";
	export default {
		data() {
			return {
				editor1: "dsf",
				config: {
					toolbars: [
						['fullscreen', 'source', 'undo', 'redo', 'bold', 'italic', 'forecolor', 'backcolor', 'cleardoc',
						'fontfamily',
						'fontsize',
						'lineheight',
						'inserttable',
						'insertrow',
						'insertcol',
						'mergeright',
						'mergedown',
						'deleterow',
						'deletecol',
						'splittorows',
						'splittocols',
						'splittocells',
						'deletecaption',
						'inserttitle',
						'mergecells',
						'deletetable',
						'justifyleft',
						'justifyright',
						'justifycenter',
						'justifyjustify',
					]
					]
				}
			}

		},
		components: {
			"sapi-editor": editor
		},
		methods: {
			ready: function(editor) {

			},
			change: function(content, count) {

			},
			getContent(){
				return this.$refs.editor.getContent();
			},
			clickHandle(){
				console.log(this.getContent());
			}
		},
		mounted: function() {

		}
	}
</script>

<style>
.editor-demo{
	position: absolute;
	width: 100%;
	height: 500px;
}
</style>