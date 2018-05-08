<template>
	<div>
		<web-header :is-scale="isScale"></web-header>
		<section class="index-body index-body-bg">
			<div class="index-body-left">
				<div class="index-body-left-side1">
					<div class="side-title">
						<span>待办任务（12）</span>
						<a href="javascript:void(0)">MORE></a>
					</div>
					<ul class="side-list">
						<li>
							<span class="count-date">07-12</span>
							<span class="count-icon active">1</span>
							<a href="javascript:void(0)" class="count-text" @click="view($event,0)">标准化成果提交及介绍结束时间为2016年12月1日...</a>
						</li>
						<li>
							<span class="count-date">07-12</span>
							<span class="count-icon active">2</span>
							<a href="javascript:void(0)" class="count-text" @click="view($event,1)">景观概念总图、配置初稿时间为2016年12月10日请...</a>
						</li>
						<li>
							<span class="count-date">07-12</span>
							<span class="count-icon active">3</span>
							<a href="javascript:void(0)" class="count-text" @click="view($event,2)">项目主项计划延期启动，请及时处理</a>
						</li>
						<li>
							<span class="count-date">07-12</span>
							<span class="count-icon">4</span>
							<a href="javascript:void(0)" class="count-text" @click="view($event,3)">部门年度只能计划001（11月系统分解）</a>
						</li>
						<li>
							<span class="count-date">07-12</span>
							<span class="count-icon">5</span>
							<a href="javascript:void(0)" class="count-text" @click="view($event,4)">镀锡板电镀锡机组冷却系统项目预中标，请尽快递交...</a>
						</li>
						<li>
							<span class="count-date">07-12</span>
							<span class="count-icon">6</span>
							<a href="javascript:void(0)" class="count-text" @click="view($event,5)">技改-热轧1580粗轧除鳞喷射阀组等项目预中标进度</a>
						</li>
						<li>
							<span class="count-date">07-12</span>
							<span class="count-icon">7</span>
							<a href="javascript:void(0)" class="count-text" @click="view($event,6)">备件-推焦头尾焦清洗过滤器等项目中标延期处理</a>
						</li>
					</ul>
				</div>
				<div class="index-body-left-side2">
					<div class="side-title">
						<span>事物通告</span>
						<a href="javascript:void(0)" @click="dialogshow">MORE></a>
					</div>
					<div class="side2-content clearfix">
						<img src="../../../static/images/side2-image.jpg" class="float-left" />
						<p class="side2-content-text">
							<label>
        						赛普爱德组织架构及人事任命调整通知
        					</label>

							<span>
								我们的团队由互联网、地产、金融等行业巨头的精英组成，依托金地集团在房地产相关领域28年的经验积累，在产品...
        					</span>
						</p>
					</div>
					<ul class="side-list side2-list">
						<li>
							<span class="count-date">NEW</span>
							<a href="javascript:void(0)" class="count-text" @click="message($event,0)">关于2017年端午节放假通知</a>
						</li>
						<li>
							<span class="count-date">07-12</span>
							<a href="javascript:void(0)" class="count-text" @click="message($event,1)">关于办理深圳2017-2018医保年度重疾补充保险的通知...</a>
						</li>
						<li>
							<span class="count-date">07-12</span>
							<a href="javascript:void(0)" class="count-text" @click="message($event,1)">新版网络会议系统安装程序下载及说明</a>
						</li>
					</ul>
				</div>
				<div class="mb-16 clearfix"></div>
				<div class="index-body-left-side3">
					<div class="side-title">
						<span>已办事项</span>
						<a href="javascript:void(0)">MORE></a>
					</div>
					<div class="side3-table">
						<el-table :data="tableData" height="260" style="width: 100%">
							<el-table-column prop="status" label="审批状态" width="100">
							</el-table-column>
							<el-table-column prop="name" label="申请名称">
							</el-table-column>
							<el-table-column prop="people" label="起草人" width="130">
							</el-table-column>
							<el-table-column prop="date" label="起草时间" width="160">
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
			<div class="index-body-right">
				<div class="index-body-right-side1 mb-16"></div>
				<div class="index-body-right-side2"></div>
			</div>
			<div class="mb-30 clearfix"></div>
			<sapi-dialog height="300px" @on-open="open" v-model="visible">
				<span slot="title">这里是标题</span>
				<div>
					这里是弹窗内容
				</div>
			</sapi-dialog>
		</section>
	</div>
</template>

<script>
	//鼠标滚轮事件
	import wheel from "@/components/sapi-wheel-event.js";
	//单弹窗应用
	import dialog from "@/components/sapi-dialog.vue";
	import header from "./header.vue";
	export default {
		data() {
			return {
				isScale: false,
				visible: false,
				tableData: [{
						status: '已完成',
						name: ' 使用好视通网络会议系统常见的问题以及解决办法。',
						people: '产品部-梁金恒',
						date: ' 2016-10-11 09:42'
					},
					{
						status: '已完成',
						name: ' 使用好视通网络会议系统常见的问题以及解决办法。',
						people: '产品部-梁金恒',
						date: ' 2016-10-11 09:42'
					},
					{
						status: '已完成',
						name: ' 使用好视通网络会议系统常见的问题以及解决办法。',
						people: '产品部-梁金恒',
						date: ' 2016-10-11 09:42'
					},
					{
						status: '已完成',
						name: ' 使用好视通网络会议系统常见的问题以及解决办法。',
						people: '产品部-梁金恒',
						date: ' 2016-10-11 09:42'
					},
					{
						status: '已完成',
						name: ' 使用好视通网络会议系统常见的问题以及解决办法。',
						people: '产品部-梁金恒',
						date: ' 2016-10-11 09:42'
					}
				]
			}
		},
		methods: {
			dialogshow() {
				this.visible = true;
			},
			view(e, id) {

			},
			message(e, id) {

			},
			open() {
				console.log(111)
			}
		},
		components: {
			"web-header": header,
			"sapi-dialog": dialog
		},
		created() {
			this.$setTitle("首页");
		},
		mounted() {
			this.$loadingClose();
			/*var bImage = this.$el.querySelector('.index-body>.bg-image');
			var pNode = this.$el.parentNode;*/

			var _this = this;
			wheel.addEvent(document.querySelector(".index-body"), function(event) {
				if(event.delta < 0) {
					_this.isScale = true;
				} else {
					if(_this.isScale) {
						var top = this.scrollTop;
						if(top < 101) {
							_this.isScale = false;
						}
					}
				}
			});

		}
	}
</script>