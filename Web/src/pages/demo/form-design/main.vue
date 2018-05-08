<template>
	<div class="form-design-demo">
		<div class="form-design-demo-demos">
			<div class="form-design-demo-demos-text">选项卡里面嵌套折叠面板demo，已添加选项切换点击事件</div>
			<div class="form-design-demo-demos-btn clearfix">
				<el-button size="small" class="default-button" @click="click1">点击查看</el-button>
			</div>
		</div>
		<div class="form-design-demo-demos">
			<div class="form-design-demo-demos-text">添加字段时，可注入脚本，运行时间为mounted运行开始即执行（不推荐使用，这种比较适合注入比较简单的脚本，适合人员：不懂开发的业务人员）</div>
			<div class="form-design-demo-demos-btn clearfix">
				<el-button size="small" class="default-button" @click="click2">点击查看</el-button>
			</div>
		</div>
		<div class="form-design-demo-demos">
			<div class="form-design-demo-demos-text">表单设计的html嵌入到业务模块，可通过Vue的mixins注入脚本，运行时间可自行设定（推荐使用，性能高、安全稳定；适合人员：开发人员）</div>
			<div class="form-design-demo-demos-btn clearfix">
				<el-button size="small" class="default-button" @click="click3">点击查看</el-button>
			</div>
		</div>
		<div class="form-design-demo-demos">
			<div class="form-design-demo-demos-text">比较完整的表单设计，里面包括十个原始组件：文本、整数、小数、时间、多行、多选、单选、下拉、明细、附件；其中只是把少部分的功能给展示出来，其中包括：值初始化、明细的统计、附件的限制、原件是否只读、数据的格式、联动事件、数据源的补充等</div>
			<div class="form-design-demo-demos-btn clearfix">
				<el-button size="small" class="default-button" @click="click4">点击查看</el-button>
			</div>
		</div>
		<component v-model="visible" :is="currentView" :option="option"></component>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				visible:false,
				currentView:"",
				option:{}
			}
		},
		methods:{
			click1(){
				this.visible=true;
				this.currentView="nested-module";
			},
			click2(){
				this.visible=true;
				this.currentView="inject-JS-html";
			},
			click3(){
				this.visible=true;
				this.currentView="inject-Vue-mixins";
			},
			click4(){
				this.visible=true;
				this.currentView="overall-module";
			}
		},
		components:{
			"nested-module": (resolve) => {
				let path = "formDesign/demo/nested-module";
					return import(`@/pages/${path}.vue`);
			},
			"inject-JS-html": (resolve) => {
				let path = "formDesign/demo/inject-JS-html";
					return import(`@/pages/${path}.vue`);
			},
			"inject-Vue-mixins": (resolve) => {
				let path = "formDesign/demo/inject-Vue-mixins";
					return import(`@/pages/${path}.vue`);
			},
			"overall-module": (resolve) => {
				let path = "formDesign/demo/overall-module";
					return import(`@/pages/${path}.vue`);
			},
		},
		mounted(){
			
		}
	}
</script>

<style>
	.form-design-demo{
		width: 1000px;
		margin: 0 auto;
		margin-top: 50px;
		text-align: left;
	}
	.form-design-demo-demos{
		margin-bottom: 20px;
	}
	.form-design-demo-demos-text{
		font-size: 14px;
		line-height: 28px;
	}
	
	.form-design-demo-demos-btn{
		padding:5px;
	}
</style>