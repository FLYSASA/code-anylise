/**
 * description move 模块可以拖拽的方法
 * @params {Object} vue：vue 实例(必填)
 * @params {String} leftSelector 左边模块的选择器(必填)
 * @params {String} rightSelector: 右边模块的选择器(必填)
 * @params {String} dragSelector：拖拽模块的选择器(必填)
 * @params {Object} options：拖拽模块的选择器(选填) 包括属性：minWidth,callback(拖动完之后的回调函数),offsetHeight(定义中间模块的点击事件的偏移量)
 * **/
var move = function(vue, leftSelector, rightSelector, dragSelector, options) {
	setTimeout(() => {
		var box = vue.$el.parentNode;
		if(!box) {
			return;
		}

		var leftSide = box.querySelector(leftSelector);
		var rightSide = box.querySelector(rightSelector);
		var dragBtn = box.querySelector(dragSelector);
		if(!leftSide || !rightSide || !dragBtn) {
			console.log("某个选择器不存在！！");
			return;
		}

		options = options || {};

		var clientx;
		var isMove = true;
		var minWidth = options.minWidth || 250;
		var type = options.type;

		function getElement(target) {
			var parent = target.parentNode;
			leftSide = parent.querySelector(leftSelector);
			rightSide = parent.querySelector(rightSelector);
		}

		function dragReset(e) {
			if(type === 1) {
				dragBtn.className = dragBtn.className.replace(/\s+drag-hide/g, "");
			} else if(type === 2) {
				dragBtn.className = dragBtn.className + " drag-reset";
			}

			leftSide.style.width = minWidth + "px";
			rightSide.style.left = minWidth + "px";
			rightSide.style.width = "calc(100% - " + minWidth + "px)";
			dragBtn.style.left = minWidth + "px";

			if(e) {
				dragBtn.removeEventListener("click", dragReset);
				setTimeout(function() {
					isMove = true;
				});
			}

			if(typeof options.callback === "function") {
				options.callback(minWidth);
			}

		}

		function dragHideEvent() {
			if(dragBtn.className.indexOf("drag-hide") === -1) {
				dragBtn.className = dragBtn.className + " drag-hide";
			}

			dragBtn.addEventListener("click", dragReset, false);
		}

		function dragHide() {
			leftSide.style.width = 0 + "px";
			dragBtn.style.left = 0 + "px";
			rightSide.style.left = 7 + "px";
			rightSide.style.width = "calc(100% - 7px)";
			isMove = false;
			dragHideEvent();

			if(typeof options.callback === "function") {
				options.callback(0);
			}
		}

		function moveFunc(e) {
			if(isMove === false) {
				return;
			}

			var left = dragBtn.offsetLeft + e.clientX - clientx;
			if(type === 1 && left < minWidth - 5) {
				dragHide();
				return;
			} else if(left < 200) {
				return;
			}

			dragBtn.style.left = left + "px";

			clientx = e.clientX;
		}

		var timeout;
		function clear() {
			timeout = setTimeout(function() {
				dragBtn.className = dragBtn.className.replace(/ active/g, "");
				leftSide = null;
				rightSide = null;
			}, 50);
		}

		dragBtn.addEventListener("mousedown", function(e) {
			e.preventDefault();
			clientx = e.clientX;

			getElement(this);
			this.className = this.className + " active";

			var clienty = e.clientY;
			var rangHeight = this.offsetHeight * 0.45 + options.offsetHeight;
			if(type === 1&& dragBtn.className.indexOf("drag-hide") === -1) {
				if(clienty > rangHeight && clienty < (rangHeight + 100)) {
					dragHide();
					clear()
					return;
				}
			} else if(type === 2 && dragBtn.className.indexOf("drag-reset") === -1) {
				if(clienty > rangHeight && clienty < (rangHeight + 100)) {
					dragReset();
					clear()
					return;
				}
			}

			document.addEventListener("mousemove", moveFunc, false);
		}, false);

		document.addEventListener("mouseup", function(e) {
			if(!leftSide) {
				return;
			}
			this.removeEventListener("mousemove", moveFunc);
			
			var left = parseFloat(dragBtn.style.left);
			leftSide.style.width = left + "px";
			rightSide.style.left = left + "px";
			rightSide.style.width = "calc(100% - " + left + "px)";

			var width = left;
			if(type === 2 && width != minWidth && dragBtn.className.indexOf("drag-reset") > -1) {
				dragBtn.className = dragBtn.className.replace(/\s+drag-reset/g, "");
			}

			if(typeof options.callback === "function") {
				options.callback(width);
			}

			clear();
		}, false);

		box = null;
		vue = null;
	}, 100);

}

export default {
	move: move
};