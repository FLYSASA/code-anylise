<template>
	<sapi-dialog v-model="visible" width="700px" top="26%" class="add" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('station.browseStationTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
                <div class="wp-50">
                    <span class="w-65 must-star" v-text="$t('station.stationName')"></span>
                    <div class="right-auto-box">
                        <el-input id="txtStationName" v-model.trim="viewModel.StationName" readonly></el-input>
                    </div>
                </div>
                <div class="wp-50 float-right">
                    <span class="w-65" v-text="$t('station.stationNo')"></span>
                    <div class="right-auto-box">
                        <el-input v-model="viewModel.StationNo" readonly></el-input>
                    </div>
                </div>
            </div>
            <div class="fullline">
                <div class="wp-50">
                    <span class="w-65" v-text="$t('station.corpName')"></span>
                    <div class="right-auto-box">
                         <el-input v-model="viewModel.CorpName" readonly></el-input>
                    </div>
                </div>
                <div class="wp-50 float-right">
                     <span class="w-65" v-text="$t('station.deptName')"></span>
                    <div class="right-auto-box">
                         <el-input v-model="viewModel.DeptName" readonly></el-input>
                    </div>
                </div>
			</div>
               <div class="fullline">
                    <span class="w-65" v-text="$t('station.higherStation')"></span>
                    <div class="right-auto-box">
                         <el-input  v-model="viewModel.LeaderStationName" readonly>
                        </el-input>
                    </div>
               </div>
            <div class="fullline">
                <div class="wp-50">
                    <span class="w-65" v-text="$t('station.position')"></span>
                    <div class="right-auto-box">
                        <el-input v-model="viewModel.PositionName" readonly>
                        </el-input>
                    </div>
                </div>
               	<div class="wp-50 float-right">
                    <span class="w-65" v-text="$t('rowIndex')"></span>
                    <div class="right-auto-box">
                        <el-input id="txtRowIndex" v-model="viewModel.RowIndex" readonly></el-input>
                    </div>
                </div>
			</div>
             <div class="fullline">
                     <span class="w-65 lh-30" v-text="$t('station.description')"></span>
                    <div class="right-auto-box">
                        <el-input type="textarea" v-model="viewModel.Description" :autosize="{ minRows: 2, maxRows: 10}" readonly>
					</el-input>
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
				disabled:false,
				visible: false,
                stationVisible:false,
				viewModel: {
                }
			}
		},
		props: ["option","value"],
		methods: {
            open(){
                this.$get("/api/plat/stations/"+this.option.StationId,null,function(res){
                    this.viewModel=res;
                });
            },
			close() {
				this.$emit("input", false);
			}
		},
		components: {
			"sapi-dialog": dialog
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		},
		created(){
			Vue.use(tips);
			this.visible=this.value;
		}
	}
</script>

<style>

</style>