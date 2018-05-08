<template>
	<sapi-dialog v-model="visible" class="employee" width="800px" top="28%" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('land.browseLandTitle')"></span>
		<div class="form-content no-footer">
            <div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('land.landName')"></span>
					<div class="right-auto-box">
						<el-input readonly v-model.trim="viewModel.LandName"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('land.landNo')"></span>
					<div class="right-auto-box">
						<el-input readonly v-model.trim="viewModel.LandNo"></el-input>
					</div>
				</div>
			</div>

            <div class="fullline">
                <div class="wp-50">
                    <span class="w-65" v-text="$t('land.city')"></span>
                    <div class="right-auto-box">
                        <el-input :value="getProvinceCityAreaName()" readonly></el-input>
                    </div>
                </div>
                <div class="wp-50 float-right">
                    <span class="w-65" v-text="$t('land.landAddress')"></span>
					<div class="right-auto-box">
						<el-input readonly v-model.trim="viewModel.LandAddress"></el-input>
					</div>
                </div>
            </div>

            <div class="fullline">
				<div class="wp-50">
                    <span class="w-65" v-text="$t('land.isBidInvitation')"></span>
					<div class="right-auto-box">
                        <el-input readonly :value="getBidInvitationData()"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('land.landUsage')"></span>
					<div class="right-auto-box">
						<el-input readonly v-model.trim="viewModel.LandUsage"></el-input>
					</div>
				</div>
			</div>

            <div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('land.landArea')"></span>
					<div class="right-auto-box">
						<el-input readonly v-model.trim="viewModel.LandArea"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('land.grantYear')"></span>
					<div class="right-auto-box">
						<el-input readonly v-model.trim="viewModel.GrantYear"></el-input>
					</div>
				</div>
			</div>

             <div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('rowIndex')"></span>
					<div class="right-auto-box">
                        <el-input readonly v-model.trim="viewModel.RowIndex"></el-input>
					</div>
				</div>
			</div>

            <div class="fullline">
				<span class="w-65 lh-30" v-text="$t('land.remark')"></span>
				<div class="right-auto-box">
					<el-input readonly type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="viewModel.Remark">
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
	import dialog from "@/components/sapi-dialog.vue";
    import address from '../../static/js/address.js';
	export default {
		data() {
			return {
				disabled: false,
				visible: true,
				viewModel: {}
			}
		},
		props: ["option", "value"],
		methods: {
            open() {
				//在此进行初始化
				this.getData();
            },
			getData() {
				this.$get("/api/plat/lands/" + this.option.LandId, function(res) {
					this.viewModel = res;
				});
			},
			close() {
				this.$emit("input", false);
			},
            getProvinceCityAreaName()
            {
                return address.getAddress(this.viewModel.ProvinceName,this.viewModel.CityName,this.viewModel.AreaName);
            },
            getBidInvitationData()
            {
                return this.viewModel.IsBidInvitation ? "招拍挂":"非招拍挂";
            }
		},
		components: {
			"sapi-dialog": dialog
		},
		mounted() {
			this.visible = this.value;
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		}
	}
</script>
