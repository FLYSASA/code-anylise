<template>
	<div class="login-box-content">
		<div class="login-box-logo" :style="{'background-image':'url('+(loginLogo||'')+')'}"></div>
		<div class="login-box-waring-info"></div>
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
</template>

<script>
	export default{
		data(){
			return{
				username: "",
				password: "",
				checked:false,
				isUser:true,
				isPass:true
			}
		},
		props:["loginLogo"]
		,
		methods:{
			change(type){
				if(type===0){
					this.username?this.isUser=false:this.isUser=true;
				}else{
					this.password?this.isPass=false:this.isPass=true;
				}
			},
			deleteText(type){
				if(type===0){
					this.username="";
					this.isUser=true;
				}else{
					this.password="";
					this.isPass=true;
				}
			}
		}
	}
</script>
