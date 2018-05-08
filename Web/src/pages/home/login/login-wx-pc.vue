<template>
	<div class="login-box-content" :class="{'login-wx':!isPC}">
		<div class="login-pc-wx-img">
			<div class="login-pc-img" @click="isPC=true" v-show="!isPC"></div>
			<div class="login-wx-img" @click="isPC=false" v-show="isPC"></div>
		</div>
		<div class="login-box-logo"></div>
		<div class="login-box-waring-info"></div>
		<div class="login-pc-content" v-show="isPC">
			<div class="login-box-content-user">
				<el-input id="username" @change="change(0)" v-model="username" :placeholder="$t('loginName')"></el-input>
				<span class="login-box-content-user-icons" v-show="isUser"></span>
				<span class="login-box-content-delete-icons" @click="deleteText(0)" v-show="!isUser"></span>
			</div>
			<div class="login-box-content-pass">
				<el-input type="password" @change="change(1)" id="password" v-model="password" :placeholder="$t('password')"></el-input>
				<span class="login-box-content-pass-icons" v-show="isPass"></span>
				<span class="login-box-content-delete-icons" @click="deleteText(1)" v-show="!isPass"></span>
			</div>
			<div class="login-box-content-checked text-right">
				
			</div>
		</div>
		<div class="login-wx-content" v-show="!isPC">
			<div class="login-wx-content-code">
				<span class="login-wx-content-code-img"></span>
				<span class="login-wx-content-code-active-img"></span>
			</div>
			<div class="login-wx-content-text text-center">
				<span class="login-wx-content-text-bg"></span>
				<div>
					<p>{{$t('openThePhone.0')}}<font>{{$t('openThePhone.1')}}</font>{{$t('openThePhone.2')}}</p>
					<p>{{$t('openThePhone.3')}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isPC:true,
				username: "",
				password: "",
				checked: false,
				isUser: true,
				isPass: true
			}
		},
		methods: {
			change(type) {
				if(type === 0) {
					this.username ? this.isUser = false : this.isUser = true;
				} else {
					this.password ? this.isPass = false : this.isPass = true;
				}
			},
			deleteText(type) {
				if(type === 0) {
					this.username = "";
					this.isUser = true;
				} else {
					this.password = "";
					this.isPass = true;
				}
			}
		},
		watch:{
			isPC(val){
				this.$parent.disabled=!val;
			}
		}
	}
</script>