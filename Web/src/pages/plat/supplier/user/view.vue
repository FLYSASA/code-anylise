<template>
	<sapi-dialog v-model="visible" width="700px" top="26%" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('user.browseUserTitle')"></span>
		<div class="form-content">
			<div class="fullline">
                <div class="wp-50">
					<span class="w-65" v-text="$t('user.userName')"></span>
					<div class="right-auto-box">
						<el-input id="txtUserName" :readonly="true" v-model.trim="viewModel.UserName"></el-input>
					</div>
				</div>
				 <div class="wp-50 float-right">
					<span class="w-65" v-text="$t('user.userStatus')"></span>
					<div class="right-auto-box">
                         <el-radio-group v-model="viewModel.Enabled" disabled>
                            <el-radio :label="true">{{$t('user.userStatusData.enabled')}}</el-radio>
							<el-radio :label="false">{{$t('user.userStatusData.disabled')}}</el-radio>
                        </el-radio-group>
					</div>
                </div>
            </div>
            <div class="fullline">
               <div class="wp-50">
                        <span class="w-65" v-text="$t('user.userType')"></span>
                        <div class="right-auto-box">
                             <el-input v-model="viewModel.UserTypeName" :readonly="true">
                            </el-input>
                        </div>
                    </div>
                    <div class="wp-50 float-right">
                    <span class="w-65" v-text="$t('user.aliasName')"></span>
                    <div class="right-auto-box">
                        <el-input v-model="viewModel.AliasName" :readonly="true">
                        </el-input>
                    </div>
                </div>
			</div>
            <div class="fullline">
                <div class="wp-50">
                    <span class="w-65" v-text="$t('user.mobileTelephone')"></span>
                    <div class="right-auto-box">
                        <el-input :readonly="true" v-model.trim="viewModel.MobileTelephone"></el-input>
                    </div>
                </div>
                 <div class="wp-50 float-right">
                    <span class="w-65" v-text="$t('user.officePhone')"></span>
                    <div class="right-auto-box">
                        <el-input :readonly="true" v-model.trim="viewModel.OfficePhone"></el-input>
                    </div>
                </div>
			</div>
            <div class="fullline">
                 <div class="wp-50">
                    <span class="w-65">Email</span>
                    <div class="right-auto-box">
                        <el-input :readonly="true" v-model.trim="viewModel.Email"></el-input>
                    </div>                    
                </div>
                <div class="wp-50 float-right">
                    <span class="w-65" v-text="$t('user.weChat')"></span>
                    <div class="right-auto-box">
                       <el-input :readonly="true" v-model.trim="viewModel.WeChat"></el-input>
                    </div>                    
                </div>
			</div>
            <div class="fullline">
                <div class="wp-50">
                   <span class="w-65" v-text="$t('user.microBlog')"></span>
                    <div class="right-auto-box">
                        <el-input :readonly="true" v-model.trim="viewModel.MicroBlog"></el-input>
                    </div> 
                </div>
                 <div class="wp-50 float-right">
                    <span class="w-65">QQ</span>
                    <div class="right-auto-box">
                        <el-input :readonly="true" v-model.trim="viewModel.QQ" ></el-input>
                    </div>
                </div>
			</div>
             <div class="fullline">
                 <div class="wp-50">
                     <span class="w-65" v-text="$t('rowIndex')"></span>
                    <div class="right-auto-box">
                        <el-input :readonly="true" v-model="viewModel.RowIndex"></el-input>
                    </div>
                </div>
			</div>
		</div>
        <div class="footer">
			<el-button size="small" class="default-button" @click="close" v-text="$t('close')"></el-button>
		</div>
	</sapi-dialog>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
	import dialog from "@/components/sapi-dialog.vue";
	export default {
		data() {
			return {
				visible: false,
				viewModel: {}
			}
		},
        components: {
			"sapi-dialog": dialog
		},
		props:["option","value"],
		methods: {
			close() {
				this.$emit("input",false);
			},
            open(){
               this.loadData();
            },
            loadData() {
                this.$get("/api/plat/users/" + this.option.UserId, function(res) {
                    this.viewModel = res;
                    this.viewModel.UserTypeName="";
                    switch(this.viewModel.UserType)
                    {
                        case 1:
                            this.viewModel.UserTypeName=this.$t('user.userTypeData.system');
                            break;
                        case 2:
                            this.viewModel.UserTypeName=this.$t('user.userTypeData.employee');
                            break;
                        case 3:
                            this.viewModel.UserTypeName=this.$t('user.userTypeData.other');
                            break;
                    }
                });
			}
		},
		
		created(){
			Vue.use(tips);
			this.visible=this.value;
		},
		watch:{
			value(val){
				this.visible=val;
				if(val===true){
					this.viewModel=this.option;
				}
			}
		},
        mounted(){
			this.visible=this.value;
			this.viewModel=this.option;
		}
	}
</script>

<style>

</style>