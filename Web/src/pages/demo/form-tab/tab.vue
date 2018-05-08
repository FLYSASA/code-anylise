<template>
	<div>
		<div class="form-tabs">
			<div class="form-tabs-title">
				<span @click="tabClick(0)" class="form-tabs-title-item" :class="{active:tabIndex===0}">选项卡1</span>
				<span @click="tabClick(1)" class="form-tabs-title-item" :class="{active:tabIndex===1}">选项卡2</span>
				<span @click="tabClick(2)" class="form-tabs-title-item" :class="{active:tabIndex===2}">选项卡3</span>
			</div>
			<div class="form-tabs-content" :class="{active:tabIndex===0}">内容1</div>
			<div class="form-tabs-content" :class="{active:tabIndex===1}">内容2</div>
			<div class="form-tabs-content" :class="{active:tabIndex===2}">内容3</div>
		</div>
	</div>
</template>

<script>
	import '@/static/css/sapi-form-tab.css';
	export default{
		data(){
			return {
				tabIndex:0
			}
		},
		methods:{
			tabClick(index){
				this.tabIndex=index;
			}
		}
	}
</script>