<template>
	<div class="main-401">
		<div class="main-401-box">
			<div class="main-401-box-left">
				<span>{{$t('noPermissions')}}</span>
				<p>{{$t('noPermissionsDesc')}}</p>
				<a href="/" v-text="$t('returnHome')"></a>
			</div>
			<div class="main-401-box-right"></div>
		</div>
	</div>
</template>
<script>
	import importLocale from "@/static/js/importLocale.js";
	import {home} from "../js/locale-home.js";
	
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		beforeCreate() {
			!Vue.toLocale&&Vue.use(importLocale);
			Vue.toLocale(home);
		},
	}
</script>
<style type="text/css">
	.main-401 {
		overflow: hidden;
		width: 650px;
		height: 100%;
		margin: 0 auto;
		padding-top: 50px;
		text-align: center;
	}
	
	.main-401-box-left {
		float: left;
		width: 370px;
		padding-top: 12px;
		text-align: left;
	}
	
	.main-401-box-left>span {
		color: #353636;
		font-size: 24px;
		line-height: 36px;
	}
	
	.main-401-box-left>p {
		margin: 0;
		margin-top: 10px;
		margin-bottom: 20px;
		font-size: 14px;
		line-height: 26px;
	}
	
	.main-401-box-left>a {
		display: inline-block;
		width: 173px;
		height: 45px;
		font-size: 18px;
		line-height: 45px;
		text-align: center;
		color: #fff;
		border-radius: 20px;
		background: #00dda2;
	}
	
	.main-401-box-right {
		float: left;
		width: 183px;
		height: 183px;
		margin-left: 90px;
		background: url(../../../static/images/401-image.png) no-repeat top center;
	}
</style>