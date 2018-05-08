/* eslint-disable */
import base from './base'

/**
 * 图片操作
 */
var photo = {
    /**
     * 拍照/摄像
     * @method App.photo.camera
     * @param {json} options 选项参数
     * @param {number} options.pwidth 拍照后生成图片的宽度像素值，数字类型，可选项，若不设置则图片不进行压缩
     * @param {number} options.compress 图片压缩后质量比，数字，取值[1~100]，默认100（1:按最高压缩比压缩/100:不压缩，不宜设置过小）
     * @param {string} options.savePath 拍照后保存图片的临时目录（默认是data/tmp，该目录在程序重启后会自动清理）
     * @param {function} options.callback 拍照窗口结束回调函数，参数为所拍图片的路径
     */
    camera (options) {
        if (base.isApp()) {
            var cameraWindow = new CameraWindow()
            cameraWindow.compress = options.compress ? options.compress : 50
            if (options.pwidth) {
                cameraWindow.pwidth = pwidth
            }
            if (options.savePath) {
                cameraWindow.path = base.getSysPath(options.savePath)
            }
            if (options.callback) {
                cameraWindow.onCallback = function () {
                    if (cameraWindow.isSuccess()) {
                        var paths = base.getPaths(cameraWindow.value)
                        options.callback(paths)
                    }
                }
            }
            cameraWindow.startCamera()
        } else {
            alert('不支持拍照。')
        }
    },

    /**
     * 扫码
     * @method App.photo.scan
     * @param {function} callback 解码结束回调函数，参数为解码结果
     */
    scan (callback) {
        if (base.isApp()) {
            var decode = new Decode()
            if (callback) {
                decode.onCallback = function () {
                    if (decode.isSuccess()) {
                        callback(decode.result)
                    }
                }
            }
            decode.startDecode()
        } else {
            alert('不支持扫码。')
        }
    },

    /**
     * 选择图片（首先将选中的图片复制（设置了pwidth则会转换图片尺寸）到临时路径，然后再用临时路径里的图片路径返回）
     * @method App.photo.selectImage
     * @param {json} options 选项参数
     * @param {number} options.pwidth 选择图片后，图片转换的宽度像素值，数字类型，可选项，若不设置则图片不进行压缩
     * @param {number} options.nums 选择总图片最大张数限制，数字类型，可选项，默认值为1
     * @param {string} options.savePath 选择图片后图片复制到的临时目录（默认是data/tmp，该目录在程序重启后会自动清理）
     * @param {function} options.callback 选择图片完成后执行的回调函数，参数为已选中图片路径的数组（若未选择则是空数组）
     */
    selectImage (options) {
        if (base.isApp()) {
            var params = {}
            params.nums = options.nums ? options.nums : 1
            if (options.pwidth) {
                params.pwidth = options.pwidth
            }
            if (options.savePath) {
                params.defaultPath = base.getSysPath(options.savePath)
            }
            NativeUtil.selectImage(params, function (result) {
                if (options.callback) {
                    var paths = result.filePaths
                    if (paths.length) {
                        for (var i in paths) {
                            paths[i] = base.getPaths(paths[i])
                        }
                    }
                    options.callback(paths)
                }
            })
        } else {
            alert('不支持选择图片。')
        }
    },

    /**
     * 缩放图片（首先将选中的图片复制（设置了pwidth则会转换图片尺寸）到临时路径，然后再用临时路径里的图片路径返回）
     * @method App.photo.scaleImage
     * @param {json} options 选项参数
     * @param {string} options.sourcePath 原图路径
     * @param {string} options.savePath 生成缩放后图片路径
     * @param {string} options.mode 图片缩放模式，0:按宽度缩放/1:按比例缩放/2:按图片文件大小缩放
     * @param {number} options.width 缩放后图片的宽度，单位px（图片高度会等比缩放）
     * @param {number} options.compress 图片压缩后质量比，数字类型，取值[1~100]，若不设置则默认100质量不压缩
     * @param {number} options.rate 图片尺寸缩放比例，数字类型，取值[0-1]，若不设置则默认0.5
     * @param {number} options.size 压缩后图片尺寸，数字，以kb为单位，实际的尺寸不会很准确，可能略大于或略小于目标尺寸
     * @param {function} options.callback 结果回调函数，参数为缩放信息（source/target/width/compress）
     */
    scaleImage (options) {
        if (base.isApp()) {
            var params = {
                source: base.getSysPath(options.sourcePath)
            }
            if (options.savePath) {
                params.target = base.getSysPath(options.savePath)
                var targetFileName = params.target.substr(params.target.lastIndexOf('/') + 1)
                if (targetFileName.indexOf('.') === -1) {
                    var sourceFileName = params.source.substr(params.source.lastIndexOf('/') + 1)
                    params.target = `${params.target}/${sourceFileName}`
                }
            } else {
                params.target = params.source
            }
            switch (options.mode) {
                case '0':
                    if (options.width) {
                        params.width = options.width
                    }
                    if (options.compress) {
                        params.compress = options.compress
                    }
                    ImageUtil.scale(params, options.callback)
                    break
                case '1':
                    if (options.rate) {
                        params.rate = options.rate
                    }
                    ImageUtil.scaleByRate(params, options.callback)
                    break
                case '2':
                    if (options.size) {
                        params.size = options.size
                    }
                    ImageUtil.scaleByFileSize(params, options.callback)
                    break
            }
        } else {
            alert('不支持缩放图片。')
        }
    },

    /**
     * 图片涂鸦
     * @method App.photo.paintImage
     * @param {json} options 选项参数
     * @param {string} options.sourcePath 原图路径
     * @param {string} options.savePath 生成图片文件路径（不指定时则默认为sys:data/tmp，该目录在程序重启后会自动清理）
     * @param {function} options.callback 涂鸦结果回调函数，参数为编辑后生成图片的路径
     */
    paintImage (options) {
        if (base.isApp()) {
            var params = {
                imgPath: base.getSysPath(options.sourcePath)
            }
            if (options.savePath) {
                params.fileName = base.getSysPath(options.savePath)
                var targetFileName = params.fileName.substr(params.fileName.lastIndexOf('/') + 1)
                if (targetFileName.indexOf('.') === -1) {
                    var sourceFileName = params.imgPath.substr(params.imgPath.lastIndexOf('/') + 1)
                    params.fileName = `${params.fileName}/${sourceFileName}`
                }
            }
            DrawUtil.openDrawingBoard(params, function (result) {
                var code = parseInt(result.code)
                if (code === 0) {
                    if (options.callback) {
                        options.callback(base.getPaths(result.imgPath))
                    }
                } else if (code !== -1) {
                    alert(`操作异常（代码：${code}）。`)
                }
            })
        } else {
            alert('不支持图片涂鸦。')
        }
    },

    /**
     * 查看图片文件
     * @param {string} path 文件路径
     */
    openImage (path) {
        if (base.isApp()) {
            var sourcePath = base.getSysPath(path)
            var extName = sourcePath.substr(sourcePath.lastIndexOf('.') + 1).toLowerCase()
            if (['jpg', 'jpeg', 'png', 'gif'].indexOf(extName) !== -1) {
                NativeUtil.open(sourcePath)
            } else {
                alert('不支持查看非图片文件。')
            }
        } else {
            alert('不支持查看图片。')
        }
    },

    /**
     * 调用系统图片查看器打开被base64编码过的图片数据，返回值bool类型，若内容非base64编码的图片数据则返回false
     * @param {string} content 图片的base64编码字符串
     */
    openBase64Image (content) {
        return NativeUtil.openImageContent(content)
    }
}

export default photo
