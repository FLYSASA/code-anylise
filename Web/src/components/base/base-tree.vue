<script>
	var renderModel = {};

	export default {
		functional: true,
		props: ["data", "props", "nodeId", "defaultExpandAll", "renderContent", "renderNodeClick", "getSelectNode", "expandedFn", "indent","noCache","showTip","__domId"],
		render(h, content) {
			var datas = content.props.data;
			if(!datas || datas.length === 0) {
				return;
			}

			var label = content.props.props.label,
				children = content.props.props.children,
				hasChildKey = content.props.props.hasChild,
				nodeKey = content.props.props.value,
				treeEleId=content.props.__domId,
				showTip=content.props.showTip;

			if(!label || !children) {
				console.error("props 的 label或者children不能为空");
				return;
			}

			var innerHtml = "<ul class='tree-ul'>";
			var data, hasChild, className = "";
			var isRender = typeof content.props.renderContent === "function" && typeof content.props.renderNodeClick === "function";

			//定义icon和tree-node-label点击函数
			function nodeClickFunc(e) {
				e.stopPropagation();
				var target = e.target;

				if(target.className.indexOf("tree-node-icon") > -1) {
					renderModel.expandedClick(content, datas, target);
					return;
				}

				var flag = true;

				//自主定义内容
				if(isRender === true) {
					flag = renderModel.renderExtendClick(content, e);
				}

				//限制冒泡
				if(flag === false) {
					return;
				}

				var dom = getTreeNode(target, "tree-node-label");
				if(dom) {
					renderModel.nodeClick(content, datas, dom, treeEleId);
				}
			}

			var defaultExpandAll = content.props.defaultExpandAll;

			var renderContent = content.props.renderContent;
			for(var i = 0, ii = datas.length; i < ii; i++) {
				data = datas[i];
				if(data[hasChildKey] === true || (data[children] && data[children].length > 0)) {
					hasChild = true;
					if(defaultExpandAll===true){
						className = " tree-node-expanded";
					}else{
						className = "";
					}
					
				} else {
					hasChild = false;
					className = " tree-node-no-child";
				}
				var laberText = data[label];
				if(typeof renderContent === "function") {
					laberText = renderContent.call(content.parent, data, i);
				}
				
				var stitle="";
				if(showTip===true){
					stitle=laberText;
				}

				innerHtml += "<li class='tree-node" + className + "' data-index='" + i + "'><div class='tree-node-text'><span class='tree-node-icon icon-arrow-right'></span>";
				innerHtml += '<span class="tree-node-label" title="'+stitle+'">' + laberText + '</span></div>';
				if(hasChild) {
					if(defaultExpandAll === true) {
						var childHtml = addChildHTML(content, data[children], i, true, true);
						innerHtml += '<div class="tree-node-childs">' + childHtml + '</div>';
					} else {
						innerHtml += '<div class="tree-node-childs"></div>';
					}

				}

				innerHtml += "</li>";
			}

			innerHtml += "</ul>";
			
			var curInnerHtml=innerHtml;
			if(content.props.noCache===true){
				curInnerHtml=null;
			}

			var div = h("div", {
				domProps: {
					id: treeEleId,
					innerHTML: curInnerHtml
				},
				"class": "sapi-tree",
				on: {
					click: function(e) {
						nodeClickFunc(e)
					}
				}
			});

			//进行挂载之后进行初始化
			setTimeout(function() {
				if(content.props.noCache===true){
					var mydom=window[treeEleId];
					if(mydom){
						mydom.innerHTML=innerHtml;
					}
				}
				
				renderModel.setNodeActive(content, content.props.nodeId, treeEleId);
			}, 0);

			return div;
		}
	}

	//选中某个node点，并使之高亮
	renderModel.setNodeActive = function(content, id, treeEleId) {
		var datas = content.props.data,
			flag = false,
			children = content.props.props.children,
			key = content.props.props.value;

		if(!key || id===null||id===undefined) {
			return;
		}

		var arrIndexs = [];
		var foreachNode = function(node) {
			var childs = node[children];
			if(childs && childs.length > 0) {
				for(var j = 0, jj = childs.length; j < jj; j++) {
					if(childs[j][key] === id) {
						flag = true;
						arrIndexs.push(j);
						return;
					}

					foreachNode(childs[j]);

					if(flag === true) {
						arrIndexs.push(j);
						break;
					}
				}
			} /*else {
				if(node[key] === id) {
					flag = true;
				}
			}*/
		}

		var index;

		//树根遍历
		for(var i = 0, ii = datas.length; i < ii; i++) {
			if(datas[i][key] === id) {
				index = i;
				flag = true;
				break;
			}

			//子类遍历
			foreachNode(datas[i]);
			if(flag === true) {
				index = i;
				break;
			}
		}
		
		var dom = document.getElementById(treeEleId);
			if(!dom) {
				return;
			}

		if(flag) {
			if(content.props.defaultExpandAll === true) {
				arrIndexs.push(index);
				var parentIndex = arrIndexs.reverse().slice(0, arrIndexs.length - 1).join(",");
				var laberNode = dom.querySelector("div[data-parent-index='" + parentIndex + "'][data-index='" + arrIndexs[arrIndexs.length - 1] + "']");
				if(!laberNode) {
					return;
				}

				var activeNode = laberNode.querySelector(".tree-node-text");
				activeNode.className = activeNode.className + " active";

				if(typeof content.props.getSelectNode === "function") {
					var item = getItem(content.props.data, arrIndexs[arrIndexs.length - 1], parentIndex, content);
					content.props.getSelectNode.call(content.parent, item);
				}

				return;
			}

			var lis = dom.querySelectorAll("ul>li");
			if(!lis || lis.length === 0) {
				return;
			}

			var li = lis[index];

			var activeDom = dom.querySelector(".tree-node-text.active");
			if(activeDom) {
				activeDom.className = activeDom.className.replace(" active", "");
			}

			if(arrIndexs.length === 0) {
				var textNode = li.querySelector(".tree-node-text");
				textNode.className = textNode.className + " active";
				item = datas[index];
				if(item && item[children] && item[children].length > 0) {
					var innerHtml = addChildHTML(content, item[children], "" + index, false);
					li.querySelector(".tree-node-childs").innerHTML = innerHtml;
					if(li.className.indexOf("tree-node-expanded") === -1) {
						li.className = li.className + " tree-node-expanded";
					}
				}

				if(typeof content.props.getSelectNode === "function") {
					content.props.getSelectNode.call(content.parent, item);
				}
				return;
			}

			//arrIndexs.push(index);
			var treeNodes = datas[index],
				innerHtml = "";

			var indexs = [].concat(arrIndexs);

			//追加子节点，直到激活节点为止
			innerHtml = addChildHTML(content, treeNodes[children], index + "", "", "", indexs);
			arrIndexs.push(index);

			var parentIndex = arrIndexs.reverse().slice(0, arrIndexs.length - 1).join(",");
			var currenIndex = arrIndexs[arrIndexs.length - 1];

			li.querySelector(".tree-node-childs").innerHTML = innerHtml;
			if(li.className.indexOf("tree-node-expanded") === -1) {
				li.className = li.className + " tree-node-expanded";
			}

			//激活当前节点、展开下面节点
			var item = null;
			var treeNode = li.querySelector("div[data-parent-index='" + parentIndex + "'][data-index='" + currenIndex + "']");
			if(treeNode) {
				textNode = treeNode.querySelector(".tree-node-text");
				textNode.className = textNode.className + " active";
				item = getItem(content.props.data, currenIndex, parentIndex, content);
				if(item && item[children] && item[children].length > 0) {
					var innerHtml = addChildHTML(content, item[children], parentIndex + "," + currenIndex, false);
					treeNode.querySelector(".tree-node-childs").innerHTML = innerHtml;
					if(treeNode.className.indexOf("tree-node-expanded") === -1) {
						treeNode.className = treeNode.className + " tree-node-expanded";
					}
				}
			}

			if(typeof content.props.getSelectNode === "function") {
				item = item !== null ? item : getItem(content.props.data, currenIndex, parentIndex, content);
				content.props.getSelectNode.call(content.parent, item);
			}
		}
		else{
			var activeDom = dom.querySelector(".tree-node-text.active");
			if(activeDom) {
				activeDom.className = activeDom.className.replace(" active", "");
			}

			if(typeof content.props.getSelectNode === "function") {
				content.props.getSelectNode.call(content.parent, {});
			}
		}
	}

	//点击node的label时的回调函数，这个是拓展函数，由使用者自定义是否调用，作用在tree-node-label内
	renderModel.renderExtendClick = function(content, e) {
		var target = e.target;
		isTreeNodeLabel = false;
		var grandfather = getTreeNode(target, "tree-node");
		if(!grandfather || !isTreeNodeLabel) {
			return true;
		}

		var index = grandfather.getAttribute("data-index");
		var parentIndex = grandfather.getAttribute("data-parent-index");
		var item = getItem(content.props.data, index, parentIndex, content);

		return content.props.renderNodeClick.call(content.parent, e, item, index, parentIndex);
	}

	function expandedClickFn(content, target, item, children, parentIndex, index) {
		var grandfather = target.parentNode.parentNode;
		//展开
		var childDiv = grandfather.querySelector(".tree-node-childs");
		if(!childDiv) {
			return;
		}

		//已经存在的就不在进行html拼接
		if(childDiv.childNodes && childDiv.childNodes.length > 0) {
			grandfather.className = grandfather.className + " tree-node-expanded";
			if(typeof content.listeners["expanded-click"] === "function") {
				content.listeners["expanded-click"].call(content.parent, item, target, true);
			}
			return;
		}

		if(parentIndex) {
			parentIndex += "," + index;
		} else {
			parentIndex = index;
		}

		var datas = item[children];
		var html = addChildHTML(content, datas, parentIndex, false, false);
		childDiv.innerHTML = html;

		grandfather.className = grandfather.className + " tree-node-expanded";
		if(typeof content.listeners["expanded-click"] === "function") {
			content.listeners["expanded-click"].call(content.parent, item, target, true);
		}
	}

	//点击node的icon时的回调函数，作用在tree-node-label上
	renderModel.expandedClick = function(content, items, target) {
		var grandfather = target.parentNode.parentNode;
		var index = grandfather.getAttribute("data-index");
		var parentIndex = grandfather.getAttribute("data-parent-index");
		var item = getItem(items, index, parentIndex, content);
		var children = content.props.props.children;

		//收缩
		if(grandfather.className.search(/\*?tree-node-expanded\b/) > -1) {
			if(typeof content.listeners["expanded-click"] === "function") {
				content.listeners["expanded-click"].call(content.parent, item, target, false);
			}
			grandfather.className = grandfather.className.replace(/\s*?tree-node-expanded\b/g, "");
			return;
		}

		//后台按需加载
		if(content.props.props.hasChild && item[children] && item[children].length === 0 && typeof content.props.expandedFn === "function") {
			content.props.expandedFn.call(content.parent, item, function() {
				expandedAddChild(content, item, target);
				if(typeof content.listeners["expanded-click"] === "function") {
					content.listeners["expanded-click"].call(content.parent, item, target, true);
				}
			});
			return;
		}

		/*return;*/

		expandedClickFn(content, target, item, children, parentIndex, index)
	}

	function expandedAddChild(content, item, target) {
		var children = content.props.props.children;
		if(!item[children] || item[children].length === 0) {
			return;
		}

		var parent = target.parentNode.parentNode;
		var childNode = parent.querySelector(".tree-node-childs");
		var index = parent.getAttribute("data-index");
		var parentIndex = parent.getAttribute("data-parent-index");
		if(parentIndex) {
			parentIndex += "," + index;
		} else {
			parentIndex = index;
		}

		var childHtml = addChildHTML(content, item[children], parentIndex, false, false);
		parent.className += " tree-node-expanded";
		childNode.innerHTML = childHtml;
	}

	//点击node的label时的回调函数
	renderModel.nodeClick = function(content, items, target, treeEleId) {
		var grandfather = target.parentNode.parentNode;
		var index = grandfather.getAttribute("data-index");
		var parentIndex = grandfather.getAttribute("data-parent-index");
		var item = getItem(items, index, parentIndex, content);

		var flag = true;
		if(typeof content.listeners["node-click"] === "function") {
			flag = content.listeners["node-click"].call(content.parent, item, target);
		}

		if(flag === false) {
			return;
		}

		var treeNode = document.getElementById(treeEleId);
		if(treeNode) {
			var activeNode = treeNode.querySelector(".tree-node-text.active");
			if(activeNode) {
				activeNode.className = activeNode.className.replace(/\s*?active\b/g, "");
			}
		}

		var parentNode = target.parentNode;
		parentNode.className = parentNode.className + " active";
	}

	//把所有数据全部转变为html
	renderModel.appendAllNode = function(content, datas) {
		var children = content.props.props.children;
		var label = content.props.props.label;
		var innerHtml = "<ul class='tree-ul'>";
		var data, hasChild, className = "";
		var renderContent = content.props.renderContent;
		for(var i = 0, ii = datas.length; i < ii; i++) {
			data = datas[i];
			if(data[children] && data[children].length > 0) {
				hasChild = true;
				className = "";
			} else {
				hasChild = false;
				className = " tree-node-no-child";
			}

			var labelText = data[label];
			if(typeof renderContent === "function") {
				labelText = renderContent.call(content.parent, data, i);
			}

			innerHtml += "<li class='tree-node tree-node-expanded" + className + "' data-index='" + i + "'><div class='tree-node-text'><span class='tree-node-icon icon-arrow-right'></span>";
			innerHtml += '<span class="tree-node-label">' + labelText + '</span></div>';
			if(hasChild) {
				var childHtml = addChildHTML(content, data[children], i, true, true);
				innerHtml += '<div class="tree-node-childs">' + childHtml + '</div>';
			}

			innerHtml += "</li>";
		}

		innerHtml += "</ul>";

		return innerHtml;
	}

	var isTreeNodeLabel = false;

	function getTreeNode(target, className, reg) {
		if(target.tagName === "BODY" || target.className.indexOf("sapi-tree") > -1) {
			return "";
		}

		if(target.className.search(/(\b)+tree-node-label(\b)+/) > -1) {
			isTreeNodeLabel = true;
		}

		reg = reg || (new RegExp("(\\b)+" + className + "(?!(-|\w+))"));

		if(target.className.search(reg) > -1) {
			return target;
		} else {
			return getTreeNode(target.parentNode, className, reg);
		}
	}

	//局部进行加载
	function addChildHTML(content, items, dataParenIndex, isEach, isExpanded, expandedIndexs) {
		var html = "";
		var hasChildKey = content.props.props.hasChild;
		var children = content.props.props.children;
		var label = content.props.props.label;
		var showTip=content.props.showTip;
		var data, hasChild, className = "";
		var paddingLeft = 0;
		dataParenIndex = dataParenIndex + "";
		var indexs = expandedIndexs || [];
		var index = indexs.pop();
		var renderContent = content.props.renderContent;
		var indent = parseInt(content.props.indent) || 16;
		paddingLeft = dataParenIndex.split(",").length * indent;

		for(var i = 0, ii = items.length; i < ii; i++) {
			data = items[i];
			var dataLengthFlag = data[children] && data[children].length > 0;
			if(data[hasChildKey] === true || dataLengthFlag) {
				hasChild = true;
				className = "";
				/*if(dataLengthFlag && (index === i && indexs.length > 0 || (indexs.length === 0 && isEach !== false) || isExpanded === true)) {
					className += " tree-node-expanded";
				}*/
				if(expandedIndexs !== undefined) {
					if(index === i && indexs.length > 0) {
						className += " tree-node-expanded";
					}
				} else if(isEach !== false || isExpanded === true) {
					className += " tree-node-expanded";
				}
			} else {
				hasChild = false;
				className = " tree-node-no-child";
			}

			var labelText = data[label];
			if(typeof renderContent === "function") {
				labelText = renderContent.call(content.parent, data, i);
			}
			
			var stitle="";
				if(showTip===true){
					stitle=labelText;
				}

			html += "<div class='tree-node" + className + "' data-parent-index='" + dataParenIndex + "' data-index='" + i + "'>";
			html += "<div class='tree-node-text' style='padding-left:" + paddingLeft + "px;'>";
			html += '<span class="tree-node-icon icon-arrow-right"></span><span class="tree-node-label" title="'+stitle+'">' + labelText + '</span></div>';
			if(hasChild) {
				var returnHtml = "";
				if(expandedIndexs !== undefined) {
					if(index == i && indexs.length > 0) {
						returnHtml = addChildHTML(content, data[children], dataParenIndex + "," + i, isEach, isExpanded, indexs);
					}
				} else if(isEach !== false) {
					returnHtml = addChildHTML(content, data[children], dataParenIndex + "," + i, isEach, isExpanded);
				}

				html += '<div class="tree-node-childs">' + returnHtml + '</div>';
			}

			html += "</div>";
		}

		return html;
	}

	//根据索引获取某项数据
	function getItem(items, index, parentIndex, content) {
		var children = content.props.props.children;
		var datas;
		if(parentIndex) {
			var arrs = parentIndex.split(",");
			datas = items[arrs[0]];
			for(var i = 1, ii = arrs.length; i < ii; i++) {
				datas = datas[children][arrs[i]];
			}
			datas = datas[children];
		} else {
			datas = items;
		}

		return datas[index];
	}
</script>

<style>
	.sapi-tree>ul {
		padding: 0;
		margin: 0;
	}
	
	.sapi-tree>ul>li {
		list-style: none;
	}
	
	.sapi-tree .tree-node-text {
		height: 36px;
		line-height: 36px;
		vertical-align: middle;
	}
	
	.sapi-tree .tree-node-text:hover {
		background: #fdf6da;
	}
	
	.sapi-tree .tree-node-text.active {
		background: #fdf6da;
	}
	
	.sapi-tree .tree-node-icon {
		display: block;
		width: 24px;
		height: 36px;
		line-height: 36px;
		float: left;
		cursor: pointer;
		font-size: 24px;
		color: #B8B8B8;
		line-height: 38px;
	}
	
	.sapi-tree .tree-node-expanded>.tree-node-text>.tree-node-icon {
		-ms-transform: rotate(90deg) translate(1px, 1px);
		transform: rotate(90deg) translate(1px, 1px);
	}
	
	.sapi-tree .tree-node-label {
		float: left;
		width: calc(100% - 28px);
		height: 36px;
		line-height: 36px;
		white-space: nowrap;
		text-overflow: ellipsis;
		cursor: pointer;
		overflow: hidden;
	}
	
	.sapi-tree .tree-node-no-child>.tree-node-text>.tree-node-icon {
		display: none;
	}
	
	.sapi-tree .tree-node-no-child>.tree-node-text>.tree-node-label {
		margin-left: 25px;
	}
	
	.sapi-tree .tree-node-childs {
		display: none;
	}
	
	.sapi-tree .tree-node-no-child>.tree-node-childs {
		display: none;
	}
	
	.sapi-tree .tree-node-expanded>.tree-node-childs {
		display: block;
	}
</style>