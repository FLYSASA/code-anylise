<template>
	<div>
		<!--v-format.xxx 这里的c是会计格式的标识符，3为小数位，还支持其他格式:d：整数，f小数，不设置时选择默认，默认为f2；
		****             min是最小值，max为最大值，设置了会进行比较，不合适的将清空值内容
		*                这里不可以设置type="number",原因：设置后，当输入不合法的字符时，将不会触发blur事件，导致失效
		-->
		<el-input v-format.c3 v-model="input.data.abcd" min="5" max="1000000" placeholder="请输入内容"></el-input>
		<div class="fullline">
			比较复杂的字段设置
		</div>
		<!--
			v-format="{}" 接收对象，现在接收的属性为default
			可对此进行扩展
		-->
		<div v-for="(item,index) in tableData[0].targets" class="fullline">
			<span class="w-65">{{item.fieldName}}</span>
			<div class="right-auto-box">
				<el-input v-format="{default:0}" v-model="item.fieldValue">
					<template slot="append">万元</template>
				</el-input>
			</div>
		</div>

	</div>
</template>

<script>
	import formatMixin from "@/components/sapi-directive-input.js"

	export default {
		data() {
			return {
				input: {
					data: {
						abcd: "",
						ee: null
					}
				},
				tableData: [{
					targets: [{
							fieldName: "字段1",
							fieldValue: "",
						},
						{
							fieldName: "字段1",
							fieldValue: "",
						},
						{
							fieldName: "字段1",
							fieldValue: "",
						},
						{
							fieldName: "字段1",
							fieldValue: "",
						},
					]
				}]
			}
		},
		mixins: [formatMixin],
		methods: {

		},
		watch: {
			
		}
	}
</script>

<style>

</style>