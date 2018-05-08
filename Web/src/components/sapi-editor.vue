<template>
	<sapi-editor ref="ueditor" :content="content" width="100%" height="350px" :config="config"></sapi-editor>
</template>

<script>
	import editor from "./base/base-editor.vue";
	export default {
		data() {
			return {
				config: {
					toolbars: [
						['fullscreen', 'source', 'undo', 'redo', 'bold', 'italic', 'forecolor', 'backcolor', 'cleardoc',
							'fontfamily',
							'fontsize',
							'lineheight',
							'link',
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
		props: ["content"],
		components: {
			"sapi-editor": editor
		},
		methods: {
			getContent(){
				return this.$refs.ueditor.getContent();
			}
		}
	}
</script>
