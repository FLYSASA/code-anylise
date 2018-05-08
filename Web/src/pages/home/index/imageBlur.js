//转换为二进制
function dataURLtoBlob(dataurl) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while(n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {
		type: mime
	});
}

function blurImage(imgNode, pNode, StackBlur) {
	var canvas = document.createElement("canvas");
	canvas.width = imgNode.width;
	canvas.height = imgNode.height;
	// 坐标(0,0) 表示从此处开始绘制，相当于偏移。  
	canvas.getContext("2d").drawImage(imgNode, 0, 0);
	StackBlur.canvasRGB(canvas, 0, 0, canvas.width, canvas.height, 20);
	var url = canvas.toDataURL("image/png");
	localStorage["main-body-image"] = url;
	var href = URL.createObjectURL(dataURLtoBlob(url));
	pNode.style.background = 'url(' + href + ')';
	pNode.style.backgroundSize = 'cover';
}

function init(_this, url64,isPrev) {
	var pNode = _this.$el.parentNode.parentNode;

	if(url64) {
		var href = URL.createObjectURL(dataURLtoBlob(url64));
		pNode.style.background = 'url(' + href + ')';
		pNode.style.backgroundSize = 'cover';
	} else {
		var StackBlur = require('stackblur-canvas');
		var imgNode = _this.$el.querySelector(".bg-image");
		imgNode.src = _this.bodyImage;
		if(isPrev===true){
			setTimeout(function(){
				blurImage(imgNode, pNode, StackBlur);
			},100);
			return;
		}
		window.onload=function(){
			blurImage(imgNode, pNode, StackBlur);

		}
		
	}
}

export default {
	init: init
};