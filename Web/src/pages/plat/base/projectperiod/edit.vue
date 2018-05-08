<template>
	<sapi-dialog v-model="visible" width="500px" top="26%" @on-open="open"  @on-close="close">
		<span slot="title" v-text="$t('projectPeriod.editProjectPeriodTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
            <div class="fullline">
				<span class="w-65 must-star" v-text="$t('projectPeriod.periodName')"></span>
				<div class="right-auto-box">
					<el-input id="txtPeriodName" v-model.trim="editModel.PeriodName" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('rowIndex')"></span>
				<div class="right-auto-box">
					<el-input v-model="editModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
				</div>
			</div>
            <div class="fullline">
				<span class="w-65" v-text="$t('projectPeriod.remark')"></span>
				<div class="right-auto-box">
					<el-input  :maxlength="200" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  v-model="editModel.Remark" ></el-input>
				</div>
			</div>
		</div>
		<div class="footer">
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit" v-text="$t('submit')"></el-button>			
		</div>
	</sapi-dialog>
</template>

<script>
    import tips from "@/components/sapi-tips.js";
	import dialog from "@/components/sapi-dialog.vue";
    export default {
      data() {
			return {
				disabled:false,
				visible: false,
				editModel: {}
			}
		},
        props:["option","value"],   
        components: {
			"sapi-dialog": dialog
        },
        methods: {
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input",false);
			},
			open(){
				this.getEditModel();
			},
			getEditModel(){	
				var params = {};
                this.$get("/api/plat/projectPeriods/"+this.option.PeriodId, params, function(res) {
					this.editModel = res;
				});
            },
			submit() {
				if(!this.validate()){
					return;
				}
				this.disabled=true;
				this.$put("/api/plat/projectPeriods/", this.editModel, function(res) {
					this.disabled=false;
					this.$parent.loadData();
					this.close();
					Vue.successMsg(this.$t('projectPeriod.editProjectPeriodSuccess'));
				});
            },            
			validate(){
				this.$closeWaringTips(".form-error-tips");
                if (!this.editModel.PeriodName) {
					this.$errorTips(this.$t('projectPeriod.periodNameNotBeEmpty'),"#txtPeriodName");
					return false;
                }
                return true;				
			}
        },
        created(){
			Vue.use(tips);
		},
		mounted(){
			this.visible=this.value;
		},
		watch:{
			value(val){
				this.visible=val;
			}
		}
    }
</script>