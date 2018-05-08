<template>
	<div class="dialog" :class="{active:value,visibility:isLoading===true}">
		<div class="dialog-box">
			<div class="dialog-box-header">
				<div class="dialog-box-header-btns">
					<slot name="todo"></slot>
				</div>
				<div class="dialog-box-header-title" :class="{nomove:(moveable===false||isMax===true)}">
					<slot name="title"></slot>
				</div>
				<div class="dialog-box-header-close float-right">
					<span class="dialog-btns-reset" v-show="isMax" @click.stop="resetClick"></span>
					<span class="dialog-btns-max" v-show="!isMax&&hasMax!==false" @click.stop="maxClick"></span>
					<span class="dialog-btns-close" @click.stop="closeClick()"></span>
				</div>
			</div>
			<div class="dialog-box-body" :class="{'max-class':isMax===true}">
				<slot></slot>
			</div>
			<slot name="dialogBox"></slot>
		</div>
		<slot name="moreDialog"></slot>
	</div>
</template>

<script>
	import "@/static/css/sapi-dialog.css";

	export default {
		data() {
			return {
				isLoading: false,
				id: null,
				isClose: false,
				isMax: false,
				_left: null,
				_top: null,
				_width: null,
				_height: null
			}
		},
		props: ["width", "height", "left", "top", "moveable", "value", "zIndex", "hasMax", "isLoad", "maxHeight"],
		methods: {
			resetClick() {
				this.isMax = false;
				this.open(this._width, this._height, this._left, this._top);
				setTimeout(() => {
					var dom = this.$el.querySelector(".dialog-box-body");
					if(dom) {
						dom.scrollTop = 0;
					}
				}, 10);
			},
			maxClick() {
				this.isMax = true;
				this.open("100%", "100%", "0", "0");
			},
			closeClick() {
				this.isClose = true;
				this.$emit("input", false);
				this.$emit("on-close");
				this.close();
			},
			setCurrentDialog() {
				setTimeout(() => {
					var doms = document.querySelectorAll(".dialog.current-dialog");
					if(doms.length > 0) {
						for(var i = 0, ii = doms.length; i < ii; i++) {
							doms[i].className = doms[i].className.replace(/\s+current-dialog/g, "");
						}
					}

					var dom = this.$el;
					dom.className = dom.className + " current-dialog";
					dom = null;
				}, 50);
			},
			open(width, height, left, top) {
				this.$emit("on-resize", this.isMax);
				var box = this.$el.querySelector(".dialog-box");
				box.style.width = width;
				box.style.height = height;
				box.style.left = left;
				box.style.top = top;
				this.setCurrentDialog();
			},
			close() {
				setTimeout(() => {
					var dom = this.$el;
					dom.className = dom.className.replace(/\s+current-dialog/g, "");
					var doms = document.querySelectorAll(".dialog.active");
					if(doms.length > 0) {
						var ele = doms[doms.length - 1];
						ele.className = ele.className + " current-dialog";
					}

					dom = null;
				}, 100);
			},
			init() {
				//初始化height、width、left、top、zindex;
				var body = document.body;
				var _width = this.width;
				if(_width && _width.indexOf("%") > -1) {
					_width = body.clientWidth * parseFloat(_width) / 100 + "px";
				}

				var _height = this.height;
				if(_height && _height.indexOf("%") > -1) {
					_height = body.clientHeight * parseFloat(_height) / 100 + "px";
				}

				var _top = this.top;
				if(_top && _top.indexOf("%") > -1) {
					_top = body.clientHeight * parseFloat(_top) / 100 + "px";
				}

				var _left = this.left;
				if(_left && _left.indexOf("%") > -1) {
					_left = body.clientWidth * parseFloat(_left) / 100 + "px";
				}

				var width = this._width = _width || (body.clientWidth / 2 + "px");
				var height = this._height = _height || "auto";
				var left = this._left = _left || (parseInt(body.clientWidth - parseInt(width)) / 2) + "px";
				var top = this._top = _top || "50px";
				var zindex = this.zIndex;

				var box = this.$el.querySelector(".dialog-box");
				box.style.width = width;
				box.style.height = height;
				box.style.left = left;
				box.style.top = top;

				if(zindex !== undefined) {
					box.parentNode.style.zIndex = zindex;
				}

				//初始化最大高度

				var clientHeight = body.clientHeight;
				setTimeout(() => {
					var _maxHeight = this.maxHeight;
					if(_maxHeight) {
						box.querySelector(".dialog-box-body").style.maxHeight = _maxHeight;
					} else {
						box.querySelector(".dialog-box-body").style.maxHeight = (document.body.clientHeight - parseFloat(top) - box.querySelector(".dialog-box-header-title").clientHeight) + "px";
					}

					this.setCurrentDialog();
					box = null;
					delete this.init;
				}, 100);

				this.$emit("on-open");

				if(this.moveable === false) {
					return;
				}

				var moveBtn = box.querySelector(".dialog-box-header-title");
				var clientx, clienty, moveStart = false,
					moveBox = document.querySelector("body>.dialog-move-box");

				//初始化拖动虚拟框
				if(!moveBox) {
					var divEle = document.createElement("div");
					divEle.className = "dialog-move-box";
					document.body.appendChild(divEle);
					moveBox = document.querySelector("body>.dialog-move-box");
				}

				//虚拟框根据鼠标的移动进行移动
				function moveFunc(e) {
					if(!moveStart) {
						return;
					}

					var left = (parseInt(moveBox.style.left) + e.clientX - clientx);
					var top = (parseInt(moveBox.style.top) + e.clientY - clienty);

					moveBox.style.left = left + "px";
					moveBox.style.top = top + "px";
					clientx = e.clientX;
					clienty = e.clientY;
				}

				moveBtn.addEventListener("mousedown", function(e) {
					e.preventDefault();
					if(this.className.indexOf("nomove") > -1) {
						return;
					}

					clientx = e.clientX;
					clienty = e.clientY;
					box = this.parentNode.parentNode;
					moveBox.style.top = box.style.top || "";
					moveBox.style.left = box.style.left || "";
					moveBox.style.height = box.offsetHeight + "px";
					moveBox.style.width = box.offsetWidth + "px";
					moveBox.className = moveBox.className + " active";
					moveStart = true;
					document.body.addEventListener("mousemove", moveFunc, false);
				}, false);

				document.addEventListener("mouseup", function(e) {
					if(moveStart === true) {
						document.body.removeEventListener("mousemove", moveFunc);
						box.style.top = moveBox.style.top;
						box.style.left = moveBox.style.left;
						moveBox.className = moveBox.className.replace(/ active/g, "");
						moveStart = false;
						box = null;
					}
				}, false);

				moveBtn = null;
				body = null;
			}
		},
		watch: {
			value(val) {
				if(val === false) {
					this.close();
					return;
				}

				if(this.init) {
					this.init();
					return;
				}

				this.resetClick();
				this.$emit("on-open");
			},
			isLoad(val) {
				this.isLoading = val;
				if(val === true) {
					this.$loading(true);
				} else {
					this.$loading(false);
				}
			}
		},
		mounted() {
			if(this.value && this.init) {
				this.init();
			}
		}
	}
</script>