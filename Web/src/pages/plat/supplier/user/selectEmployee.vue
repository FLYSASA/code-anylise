<script>
	export default {
		//固定参数，不用修改
		functional: true,
		render(h,node){
			var data=node.props.item;
			var dom1,dom2;
			
			
			//只需要改变这两个即可
			//h的用法，第一个参数表示生成的是什么标签，第二个是标签的属性，第三个是标签的子元素
			dom1=h("div",{class:"name"},data.EmployeeName);
			dom2=h("div",{class:"detail"},data.EmployeeNo);
			
			//这里为固定写法，改变最后一个参数即可
			return h("li",node.data,[dom1,dom2]);
		},
		//固定参数，不用修改
		props: {
			item: {
				type: Object,
				required: true
			}
		}
		
	}
</script>

<style>
	.my-autocomplete{
		line-height: normal;
		padding: 7px;
	}
	
	.my-autocomplete .name {
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.my-autocomplete .detail {
		font-size: 12px;
		color: #b4b4b4;
	}
	
</style>