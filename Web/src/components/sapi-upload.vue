<template>
	<div class="sapi-upload" :class="{'sapi-upload-preview':readonly===true}">
		<el-upload action="" v-if="readonly!=true" :disabled="isReadly" class="sapi-upload-file" :on-change="change" :multiple="true" :auto-upload="false" :show-file-list="false" :file-list="fileList">
			<button :disabled="isReadly||isOnly" class="el-button" v-text="btnText"></button>
		</el-upload>
		<ul class="sapi-upload-list" :class="{'sapi-upload-nolist':fileList.length===0,'spai-upload-noborder':fileList.length>1}">
			<li v-for="(item,index) in fileList" :class="{'not-preview':hasPreview===false}">
				<p>
					<span v-if="hasSize!==false" v-text="setSize(item)"></span>
					<span v-if="hasDate!==false" v-text="$dateFormat('yyyy-MM-dd hh:mm',item.date)"></span>
					<span class="hover" v-if="hasLoad!==false" @click="downloadClick(item)" v-text="$t('download')"></span>
					<span class="hover closeBtn" v-if="readonly!=true&&isOnly!==true&&hasDelete!==false" @click="remove(item,index)" v-text="$t('delete')"></span>
				</p>

				<div class="sapi-upload-list-left">
					<img :src="setImageIcon(item)" class="sapi-upload-list-icon" @error="error($event)" />
					<a class="sapi-upload-list-title" :title="item.name" href="javascript:void(0)" @click="preview(item,index)" v-text="setText(item)"></a>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import "@/static/css/sapi-upload.css";
	import importLocale from "@/static/js/importLocale.js";
	import {main,sapi} from "@/components/locale-component.js";
	var timeout;
	export default {
		data: function() {
			return {
				fileList: [],
				isReadly: false,
				timeout: null,
				serverList: [],
				isOnly: false,
				btnText: this.$t('sapiUpload.uploadWhenClick'),
				fileSize: 0,
				uploader: "",
				loadFormat: null

			}
		},
		props: ["size", "count", "type", "value", "readonly", "url", "isResource", "hasSize", "hasDate", "hasLoad", "hasDelete", "hasPreview", "downloadFormat"],
		methods: {
			setSize(item) {
				console.log(item)
				if(!item.size) {
					return "0 KB";
				}

				var size = Math.ceil(item.size / 1024);
				if(size >= 1024) {
					return(size / 1024).toFixed(2) + " MB";
				}

				return size + " KB";
			},
			setText(item) {
				var uploader = item.uploader || this.uploader;
				if(uploader) {
					return "（" + uploader + "）" + item.name;
				}

				return item.name;
			},
			setImageIcon(item) {
				if(!item.name) {
					return;
				}
				var extensions = item.name.split(".");
				var extension = extensions[extensions.length - 1];
				if(!extension) {
					return;
				}

				var url = "/static/file-extension/" + extension.trim() + ".png";
				var background = "background:url(" + url + ") no-repeat center";

				return url;
			},
			error(e) {
				e.target.src = "/static/file-extension/_.png";
			},
			getItem(item) {
				var list = this.serverList;
				if(list.length === 0) {
					return {};
				}
				var sameFile = (item.name || "").trim();

				//根据后台返回的数据size+name,来判断是否同一个名称
				var hasFileSize = false;
				if(list[0].FileSize > 0) {
					hasFileSize = true;
					sameFile += item.size;
				}

				var returnObj = {};

				for(var i = 0, ii = list.length; i < ii; i++) {
					var obj = list[i];
					var fileStr = hasFileSize ? (obj.FileName + (obj.Extension || "").trim() + obj.FileSize) : (obj.FileName + (obj.Extension || "").trim());
					if(fileStr === sameFile) {
						returnObj = {
							item: obj,
							index: i
						}
						break;
					}
				}

				return returnObj;
			},
			remove: function(item, index) {
				this.fileList.splice(index, 1);
				this.isReadly = false;
				var fileData = this.getItem(item);
				if(fileData.item) {
					this.serverList.splice(fileData.index, 1);
				}

				this.$emit("input", this.serverList);
			},
			preview: function(file, index) {
				if(this.hasPreview === false) {
					return;
				}

				var name;
				if(file.raw) {
					name = file.name;
				} else {
					name = file.url;
				}

				var types = [".jpg", ".gif", ".jpeg", ".png", ".psd", ".svg", ".bmp"].join("$|") + "$";
				var reg = new RegExp(types, "ig");
				if(reg.test(name)) {
					Vue.setImagePrew(file.url);
				} else {
					var fileData = this.getItem(file);
					if(fileData.item) {
						this.download(fileData.item);
					}
				}
			},
			change: function(file, fileList) {
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					var datas = this.fileList;
					var myFileList = fileList.slice(datas.length, fileList.length);
					var isReadonly = false;

					//检查数量
					if(this.count && !isNaN(this.count)) {
						if(this.count == fileList.length) {
							isReadonly = true;
						} else if(this.count < fileList.length) {
							fileList.splice(datas.length, fileList.length);
							Vue.msg(this.$t('sapiUpload.msgUploadCountLimit',{count:this.count}));
//							Vue.msg("上传数量不能超过" + this.count + "个");
							return;
						}
					}

					//检查格式
					if(this.type) {
						var types = this.type.split(",").join("$|") + "$";
						var reg = new RegExp(types, "ig");

						for(var j = 0, jj = myFileList.length; j < jj; j++) {
							var myfile = myFileList[j];
							if(!reg.test(myfile.name)) {
								fileList.splice(datas.length, fileList.length);
								Vue.errorMsg(this.$t('sapiUpload.unableUploadWhenFileFormatInvalid'));
								//Vue.errorMsg("不能上传该格式文件");
								return false;
							}
						}
					}

					//检查容量大小
					if(this.fileSize) {
						for(var j = 0, jj = myFileList.length; j < jj; j++) {
							var myfile = myFileList[j];
							if(myfile.size === 0) {
								fileList.splice(datas.length, fileList.length);
								Vue.errorMsg(this.$t('sapiUpload.unableUploadWhenFileBeEmpty'));
								//Vue.errorMsg("不能上传空文件");
								return false;
							} else if(this.fileSize < myfile.size) {
								fileList.splice(datas.length, fileList.length);
								var mSize = this.fileSize / 1024;
								var size = mSize + "KB";
								if(mSize > 1024) {
									size = (mSize / 1024).toFixed(2) + "M";
								}
								Vue.errorMsg(this.$t('sapiUpload.unableUploadWhenFileMoreThanSize',{size:size}));
								//Vue.errorMsg("不能上传大于" + size + "的文件");
								return false;
							}
						}
					}

					//检查文件是否相同
					for(var i = 0, ii = myFileList.length; i < ii; i++) {
						var data = myFileList[i];
						/*var sameFile = (data.name || "").trim() + data.size;
						for(var j = 0, jj = myFileList.length; j < jj; j++) {
							var myfile = myFileList[j];
							if(sameFile === (myfile.name + myfile.size)) {
								fileList.splice(datas.length, fileList.length);
								Vue.errorMsg("不能上传已存在文件");
								return false;
							}
						}*/
						var fileData = this.getItem(data);
						if(fileData.item) {
							fileList.splice(datas.length, fileList.length);
							Vue.errorMsg(this.$t('sapiUpload.unableUploadWhenFileExists'));
							//Vue.errorMsg("不能上传已存在文件");
							return false;
						}
					}

					if(isReadonly === true) {
						this.isReadly = true;
					}

					this.upload(fileList);
				}, 0);
			},
			download(item) {
				if(typeof this.loadFormat === "function") {
					this.loadFormat.call(this.$parent, item);
					return;
				}

				var path = (webConfig.fileServer || globalConfig.baseUrl) + "/api/plat/shares/download?relativePath=" + item.FilePath + "&downloadFileName=" + encodeURI(item.FileName);
				path += "&access_token=" + sessionStorage.getItem("access_token");
				window.open(path, item.FileName);
			},
			downloadClick(file) {
				var fileData = this.getItem(file);
				if(fileData.item) {
					this.download(fileData.item);
				}
			},
			upload(fileList) {
				var fileData = fileList.slice(this.fileList.length);

				var url = this.url;
				if(!url && globalConfig.fileUrl) {
					url = globalConfig.fileUrl;
				} else {
					console.log("上传文件api不存在！！！");
					return;
				}

				if(url.indexOf("http:") === -1 && webConfig.fileServer) {
					url = webConfig.fileServer + url;
				}

				var formdata = new FormData();
				fileData.forEach(function(item, i) {
					formdata.append("file_" + i, item.raw);
				});

				if(!this.url) {
					var isResource = this.isResource;
					if(isResource===true) {
						url += "/" + "resource";
					} else {
						url += "/data";
					}
				}

				this.isOnly = true;
				this.$request({
					method: "post",
					url: url,
					data: formdata,
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}, function(res) {
					var result = res.Data;
					var uploadDate = result.UploadDate;
					var uploader = this.uploader = result.Uploader;
					var uploaderId = result.UploaderId;

					var datas = result.Files;
					var list = this.serverList;
					if(typeof datas === "object" && datas.length > 0) {
						datas.forEach(function(item) {
							list.push({
								"FilePath": item.RelativePath,
								"FileName": item.FileName,
								"FileSize": item.Length,
								"Extension": item.Extension,
								"UploadDate": uploadDate,
								Uploader: uploader,
								UploaderId: uploaderId
							});
						});
					}
					
					fileData.forEach(function(item, i) {
						item.date = uploadDate;
					});

					this.fileList = [].concat(this.fileList, fileData);
					this.$emit("input", list);
					Vue.successMsg(this.$t('uploadSuccess'));
					//这里使用定时器的问题：this.$emit改变调用者的值时，有时候没有触发本组件的value值
					timeout = setTimeout(() => {
						this.isOnly = false;
					}, 50);
				}, function(e) {
					var len1 = this.fileList.length;
					var len = fileList.length - len1;
					fileList.splice(len1, len);
					Vue.errorMsg(this.$t('uploadError'));
					this.isOnly = false;
				});
			},
			init() {
				this.serverList = this.value ? [].concat(this.value) : [];
				var list = this.fileList = [];
				var baseUrl = (webConfig.fileServer || globalConfig.baseUrl) + "/";
				this.uploader="";
				this.serverList.forEach(function(item) {
					var obj = {
						name: item.FileName + (item.Extension||""),
						size: item.FileSize,
						extension: item.Extension,
						date: item.UploadDate,
						uploader: item.Uploader,
						url: baseUrl + item.FilePath
					}

					list.push(obj);
				});

				if(this.count && this.fileList.length >= this.count) {
					this.isReadly = true;
				} else {
					this.isReadly = false;
				}

				if(list.length > 0) {
					setTimeout(() => {
						var ul = this.$el.querySelector(".sapi-upload-list");
						var pNode = ul.querySelector("li>p");
						if(pNode) {
							if(pNode.clientWidth < 100) {
								ul.className = ul.className + " subw-130";
							}
						}
					}, 50);
				}
			}
		},
		mounted: function() {
			this.init();
			this.fileSize = (this.size || globalConfig.fileSize) * 1024;
			this.loadFormat = this.downloadFormat;
		},
		watch: {
			value: function(val) {
				if(this.isOnly === false) {
					this.init();
				} else {
					clearTimeout(timeout);
					this.isOnly = false;
				}
			},
			isOnly(val) {
				if(val === false) {
					this.btnText = this.$t('sapiUpload.uploadWhenClick');//"点击上传";
				} else {
					this.btnText = this.$t('sapiUpload.uploading');//"正在上传";
				}
			}
		},
		beforeCreate() {
			!Vue.toLocale&&Vue.use(importLocale);
			let lang=Vue.extendLangs(main,sapi);

			Vue.toLocale(lang);

			if(Vue.setImagePrew) {
				return;
			}

			Vue.setImagePrew = function(path) {
				var dom = document.querySelector(".sapi-prew-box-img"),
					parent;
				if(!dom) {
					var ele = document.createElement("div");
					ele.className = "sapi-prew active";
					ele.innerHTML = "<div class='sapi-prew-box'><img class='sapi-prew-box-img' src='" + path + "' /></div>";
					document.body.appendChild(ele);
					parent = document.querySelector(".sapi-prew");
				} else {
					dom.src = path;
					parent = dom.parentNode.parentNode;
					parent.className = parent.className + " active";
				}

				function hideImage() {
					this.className = this.className.replace(/ active/g, "");
					this.removeEventListener("click", hideImage);
				}

				parent.addEventListener("click", hideImage, false);
				parent = null;
			}
		}
	}
</script>