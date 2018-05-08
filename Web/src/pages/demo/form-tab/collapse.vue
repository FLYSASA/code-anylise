<template>
	<div>
		<div class="form-collapses">
			<div class="form-collapses-item" :class="{'item-hide' : expand[0]===false}">
				<div class="form-collapses-title" @click="expandClick(0)">
					这是标题1
					<i class="el-icon-arrow-down"></i>
				</div>
				<div class="form-collapses-content">
					这里是内容区
				</div>
			</div>
			
			<div class="form-collapses-item" :class="{'item-hide' : expand[1]===false}">
				<div class="form-collapses-title" @click="expandClick(1)">
					这是标题2
					<i class="el-icon-arrow-down"></i>
				</div>
				<div class="form-collapses-content">
					这里是内容区
				</div>
			</div>
			
			<div class="form-collapses-item" :class="{'item-hide' : expand[2]===false}">
				<div class="form-collapses-title" @click="expandClick(2)">
					这是标题3
					<i class="el-icon-arrow-down"></i>
				</div>
				<div class="form-collapses-content">
					这里是内容区
				</div>
			</div>
			
			<div class="form-collapses-item" :class="{'item-hide' : expand[3]===false}">
				<div class="form-collapses-title" @click="expandClick(3)">
					这是标题4
					<i class="el-icon-arrow-down"></i>
				</div>
				<div class="form-collapses-content">
					这里是内容区
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import '@/static/css/sapi-form-tab.css';
	export default {
		data() {
			return {
				expand: {

				}
			}
		},
		methods:{
			expandClick(index){
				this.expand[index]=!this.expand[index];
			}
		},
		created() {
			for(var i = 0; i < 5; i++) {
				this.$set(this.expand, i, false);
			}
			this.expand[0] = true;
		}
	}
</script>
