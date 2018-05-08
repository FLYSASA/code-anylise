<template>
	<div class="main-404">
		<div class="main-404-box">
			<div class="main-404-box-logo"></div>
			<div class="main-404-box-content">
				<p>{{$t('noExist')}}</p>
				<a href="javascript:window.top.location.href='/'">{{$t('returnHome')}}</a>
			</div>
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
		created() {
			!Vue.toLocale&&Vue.use(importLocale);
			Vue.toLocale(home);
		},
	}	
</script>
<style>
	.main-404-box {
		overflow: hidden;
		width: 100%;
		height: 100%;
		padding-top: 65px;
		text-align: center;
	}
	
	.main-404-box-logo {
		width: 507px;
		height: 267px;
		margin: 0 auto;
		background: url(../../../static/images/404_image.png) no-repeat top center;
	}
	
	.main-404-box-content {
		padding-top: 40px;
		font-size: 18px;
	}
	
	.main-404-box-content>p {
		height: 30px;
		color: #10113e;
		line-height: 30px;
	}
	
	.main-404-box-content>a {
		display: inline-block;
		width: 173px;
		height: 45px;
		line-height: 45px;
		color: #fff;
		border-radius: 20px;
		background: #00dda2;
	}
</style>