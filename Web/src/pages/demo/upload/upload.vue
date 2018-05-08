<template>
	<div class="demo">
		<div class="mb-16">
			<div class="mb-16">默认上传</div>
			<div>
				<sapi-upload v-model="list"></sapi-upload>
			</div>
		</div>

		<div class="mb-16">
			<div class="mb-16">单个上传</div>
			<div>
				<sapi-upload count="1" v-model="list1"></sapi-upload>
			</div>

		</div>

		<div class="mb-16">
			<div class="mb-16">可以限制上传数量、文件大小、文件格式等；数量最大数量为5，大小为500KB，格式：.jpge,.jpg,.gif,.png</div>
			<div>
				<sapi-upload count="5" size="500" type=".jpge,.jpg,.gif,.png" v-model="list2"></sapi-upload>
			</div>
		</div>

		<div class="mb-16">
			<div class="mb-16">文件可以下载、删除、预览进行控制</div>
			<div>
				<sapi-upload :has-delete="false" :has-load="false" :has-preview="false" v-model="list3"></sapi-upload>
			</div>

		</div>
	</div>

</template>

<script>
	import upload from "@/components/sapi-upload.vue";
	export default {
		data() {
			return {
				list: [],
				list1: [],
				list2: [],
				list3: []
			}
		},
		components: {
			"sapi-upload": upload
		},
		methods: {
			/*change(files, fileList) {
				console.log(files);
			},
			remove(file) {
				console.log(file);
			},
			preview(file) {
				console.log(file);
			}*/
		},
		mounted() {
			console.log(564)
		},
		route: {
			canReuse: false
		}
	}
</script>

<style>
	.demo {
		width: 800px;
		margin: 0px auto;
		padding: 15px;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.7);
	}
	
	.autoFill {
		display: inline-block;
		width: calc(100% - 115px);
	}
</style>