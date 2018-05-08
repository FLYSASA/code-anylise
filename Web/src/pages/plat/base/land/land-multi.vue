<template>
	<sapi-dialog v-model="visible" width="800px" top="15%" class="add" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('land.choiceLandTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
            <div class="fullline">
                <div class="wp-50">
                    <div class="right-power-box relative ">
                        <sapi-select class="wp-33" v-model="params.provinceId" :data="provinces" :props="{label:'Name',value:'Id'}" @change="provinceChange" placeholder="请选择省份"></sapi-select>
                        <sapi-select class="wp-33" v-model="params.cityId" :data="citys" :props="{label:'Name',value:'Id'}" @change="cityChange" placeholder="请选择城市"></sapi-select>
                        <sapi-select class="wp-33" v-model="params.areaId" :data="areas" :props="{label:'Name',value:'Id'}" @change="areaChange" placeholder="请选择区域"></sapi-select>
                    </div>
                </div>
                <div class="wp-50 float-right btn-outer relative"  @keyup.enter="getTableData">
                    <el-input  v-model="params.keyword" :maxlength="200" :placeholder="$t('land.search')">
                        <a slot="suffix" class="el-icon-search" @click="getTableData"></a>
                    </el-input>
                </div>
            </div>
            <div class="fullline width-p100">
                <el-table ref="multipleTable" :data="tableData" @selection-change="selectionChange">
                    <el-table-column type="selection" :selectable="colSelectable">
                    </el-table-column>
                    <el-table-column :label="$t('land.landName')" show-overflow-tooltip prop="LandName">
                    </el-table-column>
                    <el-table-column prop="LandNo" :label="$t('land.landNo')" width="120" sortable show-overflow-tooltip>
				    </el-table-column>
                    <el-table-column :label="$t('land.city')" width="180" show-overflow-tooltip>
                        <template slot-scope="props">
                            {{ getProvinceCityAreaName(props.row) }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="fullline">
                <el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" 
                :page-sizes="pageArr" :page-size="params.pageSize" :layout="layout" :total="pageTotal">
			    </el-pagination>
            </div>
		</div>

		<div class="footer">
            <el-button size="small" class="cancel" @click="close" v-text="$t('cancel')"></el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="confirm" v-text="$t('determine')"></el-button>
		</div>
	</sapi-dialog>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
    import dialog from "@/components/sapi-dialog.vue";
    import address from '../../static/js/address.js';
    import select from "@/components/sapi-select.vue";

	export default {
		data() {
			return {
				disabled: false,
				visible: false,
				params:{
                    provinceId:null,
                    cityId:null,
                    areaId:null,
                    pageSize:10
				},
                tableData: [],
                lastSelectedLands: [],  //上次选中
                lastSelectedLandIds:[], //上次选中的Id值
                currentSelectedLands: [],  //当前已选中
                provinces:[],
                citys:[],
                areas:[]
			}
		},
        props: ["option","value","callBack"],
        mixins: [getPagerMixin()],
		methods: {
            open() {
                //防止每次打开重新赋值后值重复，在这里进行清空
                this.params.keyword="";
                this.tableData = [];
                this.params.pageIndex = 1;
                this.pageSize = 10;
                this.params.provinceId = this.option.ProvinceId;
                this.params.areaId = this.option.AreaId;
                this.params.cityId = this.option.CityId;
                //获取上次选中的值
                this.lastSelectedLands = [].concat(this.option.SelectedLands);
                this.lastSelectedLandIds = [].concat(this.option.LastSelectedLandIds);
                this.getTableData();
                this.getProvinces();
                if(this.option.ProvinceId)
                {
                    this.getCitys(this.option.ProvinceId,this.option.CityId);
                }
                if(this.option.CityId)
                {
                    this.getAreas(this.option.CityId,this.option.AreaId);
                }
                
            },
			close() {
				this.$closeWaringTips(".form-error-tips");
                this.$emit("input", false);
            },
            confirm() {
                var result = this.selectedLandRemoveRepeat(this.currentSelectedLands.concat(this.lastSelectedLands));
                this.$emit("call-back",result);
				this.close();
            },
            getTableData() {
            	var obj={};
            	var params=this.params;
            	for(var key in params){
            		obj[key]=params[key];
            	}
            	
				this.$get("/api/plat/lands", obj, function(res) {
					this.tableData = res.Rows;
                    this.pageTotal = res.Total;
                   
                    if(this.lastSelectedLandIds)
                    {
                        this.$nextTick(function () {
                            //遍历列表页中的行对选中的Id行进行勾选
                            for(var i=0;i<this.tableData.length;i++)
                            {
                                var row = this.tableData[i];
                                var bSelect = this.lastSelectedLandIds.indexOf(row.LandId)>-1;
                                this.$refs.multipleTable.toggleRowSelection(row,bSelect);
                            }
                        })                        
                    }
				});
            },
            //设置行是否可以勾选
            colSelectable(row,index){
                if(this.lastSelectedLandIds.indexOf(row.LandId) > -1)
                {
                    return false;
                }
                return true;
            },
            getProvinceCityAreaName(row)
            {
                return address.getAddress(row.ProvinceName,row.CityName,row.AreaName);
            },
			selectionChange(datas) {
                this.currentSelectedLands = datas;
            },
            //省份
            getProvinces:function(){
                this.$get("/api/plat/areas/provinces", {}, function(res) {
                    this.provinces = res;
                    var province =  { Id:"", Name:"请选择" };
                    this.provinces.splice(0,0,province);
                });
            },
            provinceChange:function(province)
            {
                this.params.cityId = null;
                this.params.areaId = null;
                this.areas = [];
                if(province.Id)
                {
                    this.getCitys(province.Id);
                }
                else
                {
                    this.citys = [];
                }
                this.getTableData();
            },
            //城市
            getCitys:function(provinceId,cityId)
            {
                this.$get("/api/plat/areas/"+provinceId+"/citys", {}, function(res) {
                    this.citys = res;
                    var city =  { Id:"", Name:"请选择" };
                    this.citys.splice(0,0,city);
                    if(cityId)
                    {
                        this.params.cityId = cityId;
                    }
                });
            },
            cityChange:function(city)
            {
                this.params.areaId = null;
                if(city.Id)
                {
                    this.getAreas(city.Id);
                }
                else
                {
                    this.areas = [];
                }
                this.getTableData();
            },
            //区域
            getAreas:function(cityId,areaId)
            {
                this.$get("/api/plat/areas/"+cityId+"/areas", {}, function(res) {
                    this.areas = res;
                    var area =  { Id:"", Name:"请选择" };
                    this.areas.splice(0,0,area);
                    if(areaId)
                    {
                        this.params.areaId = areaId;
                    }
                });
            },
            areaChange:function(area){
                this.getTableData();
            },
            //数组去重复值
            selectedLandRemoveRepeat:function(array)
            {
                var result = [];
                for(var i = 0; i < array.length; i ++) {
                    var flag = true;
                    var temp = array[i];
                    for(var j = 0; j < result.length; j ++) {
                        if(temp.LandId === result[j].LandId) {
                            flag = false;
                            break;
                        }
                    }
                    if(flag) {
                        result.push(temp);
                    }
                }
                return result;
            }
		},
		components: {
            "sapi-dialog": dialog,
            "sapi-select": select
		},
		watch: {
			value(val) {
				this.visible = this.value;
			}
		},
		created() {
            Vue.use(tips);
            this.pageFunc = this.getTableData;
		},
		mounted() {
			this.visible = this.value;
		}
	}
</script>

<style scoped="scoped">
    .wp-33{
    display: inline-block;
        width: calc(33% - 6px);
        padding-right: 5px;
    }
</style>

