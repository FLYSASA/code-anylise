import Vue from 'vue';
//这里是element模块，可以全部引入（这里是部分引入）
import elementModule from "@/static/js/importElement.js";
import '@/static/css/normalize.css';
import '@/static/css/common.css';
import '@/static/css/theme.css';
import '@/pages/plat/static/css/index.css';
import './print.css';


window.onload=function(){
	//这里是a4纸大小（没有打印过，只是大概写值）
	const width=900;
	
	//添加表格模块
	let baseDiv=document.createElement("div");
	baseDiv.className="table-page table-page-1";
	let mainBody=window.index;
	mainBody.appendChild(baseDiv);
	var pageDiv=mainBody.querySelector(".table-page");
	//填充打印的表格内容
	pageDiv.innerHTML=window.printHtml;
	//获取表格body（这个的宽度一般会把父层的宽度大）
	var div=pageDiv.querySelector(".el-table__body-wrapper");

	//假如div.scrollWidth的宽度大于a4纸大大小，进行切割进行下一页
	if(div.scrollWidth>width){
		//再追加模块，用于显示所分割的模块
		let baseDiv2=document.createElement("div");
		baseDiv2.className="table-page table-page-2";
		mainBody.appendChild(baseDiv2);
		let pageDiv2=mainBody.querySelector(".table-page-2");
		pageDiv2.innerHTML=window.printHtml;
		//查找表格表头、表格内容
		let innerDiv1=pageDiv2.querySelector(".el-table__header-wrapper");
		let innerDiv2=pageDiv2.querySelector(".el-table__body-wrapper");
		//滚动滚动条，屏幕切换，使得打印机上能正确显示所需内容（这里估计需要微调，没有做过测试）
		innerDiv1.scrollLeft=width;
		innerDiv2.scrollLeft=width;
	}
	
	//假如两张纸还不够，可以按照上一步的方法继续进行切割
	/*if(div.scrollWidth>2width){
		
	}*/
	
	window.print();
}
