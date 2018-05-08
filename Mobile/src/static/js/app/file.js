/* eslint-disable */
import qs from 'qs'
import base from './base'

/**
 * 内置的下载成功回调函数
* @param {json} requestObj 请求对象
 */
window.appDownloadSuccess = function (requestObj) {
    var filePath = base.getPaths(requestObj.path)

    // 调用自定义的下载成功回调函数，传递两个参数：path:下载的文件的路径（sys:前缀）/url:下载的文件的相对路径
    if (requestObj.success) {
        requestObj.success(filePath)
    }
}

/**
 * 内置的上传成功回调函数
* @param {json} requestObj 请求对象
 */
window.appUploadSuccess = function (requestObj) {
    var data = JSON.parse(requestObj.responseText)

    // 调用自定义的上传成功回调函数，传递请求结果数据作为参数
    if (requestObj.success) {
        requestObj.success(data)
    }
}

/**
 * 内置的请求失败回调函数
* @param {json} requestObj 请求对象
 */
window.appRequestFail = function (requestObj) {
    var msg
    switch (requestObj.status) {
        case '401':
            msg = '服务器不允许匿名访问，请提供正确的访问凭证'
            break
        case '403':
            msg = '无权访问服务器'
            break
        case '404':
            msg = '服务器不存在'
            break
        case '500':
            msg = '服务器内部错误'
            break
        case '1001':
            msg = '用户取消请求'
            break
        default:
            msg = '发生错误'
            break
    }
    msg = `${msg}（代码：${requestObj.status}）。`

    // 调用自定义的请求失败回调函数，传递异常消息作为参数
    if (requestObj.fail) {
        requestObj.fail(msg)
    } else {
        alert(msg)
    }
}

/**
 * 文件操作
 */
var file = {
    /**
     * 打开文档预览页面
     * @method App.file.showFile
     * @param {string} url 文档预览全路径
     */
    showFile (url) {
        if (base.isApp()) {
            nativePage.executeScript(`App.showFile("${url}")`)
        } else {
            window.location = url
        }
    },

    /**
     * 下载文件
     * @method App.file.downloadFile
     * @param {json} options 选项参数
     * @param {string} options.requestUrl 文件请求地址
     * @param {string} options.type 请求方式，GET/POST/PUT/DELETE，默认GET方式
     * @param {json} options.data 请求数据，键值对（可选）
     * @param {string} options.savePath 文件保存路径（可选）
     * @param {boolean} options.showProgress 是否显示进度条（默认为true）
     * @param {function} options.success 下载成功回调函数，接受2个参数，为下载文件的路径（sys:前缀）和相对路径（相对页面）
     * @param {function} options.fail 下载失败回调函数，接受1个参数，为异常信息（可选）
     */
    downloadFile (options) {
        if (base.isApp()) {
            var params = {
                url: options.requestUrl,
                method: options.type ? options.type.toUpperCase() : 'GET',
                successFunction: 'appDownloadSuccess',
                failFunction: 'appRequestFail',
                isBlock: !(options.showProgress === false)
            }
            if (options.data) {
                params.data = qs.stringify(options.data)
            }
            if (options.savePath) {
                params.path = base.getSysPath(options.savePath)

                // 目录不存在则创建
                var folder = new File(params.path.substr(0, params.path.lastIndexOf('/')), true)
                if (!folder.exists()) {
                    folder.mkdirs()
                }
            }

            var requestObj = new DirectDownload(params)
            if (options.success) {
                requestObj.success = options.success
            }
            if (options.fail) {
                requestObj.fail = options.fail
            }
            requestObj.send()
        } else {
            alert('不支持下载文件。')
        }
    },

    /**
     * 上传文件
     * @method App.file.uploadFile
     * @param {json} options 选项参数
     * @param {string} options.requestUrl 请求地址
     * @param {string} options.type 请求方式，GET/POST/PUT/DELETE，默认POST方式
     * @param {string} options.files 文件路径，多个文件为文件路径的数组
     * @param {json} options.data 请求数据，键值对（可选）
     * @param {boolean} options.showProgress 是否显示进度条（默认为true）
     * @param {function} options.success 上传成功回调函数，接受2个参数，为下载文件的路径（sys:前缀）和相对路径（相对页面）
     * @param {function} options.fail 上传失败回调函数，接受1个参数，为异常信息（可选）
     */
    uploadFile (options) {
        if (base.isApp()) {
            var params = {
                url: options.requestUrl,
                method: options.type ? options.type.toUpperCase() : 'POST',
                data: [],
                successFunction: 'appUploadSuccess',
                failFunction: 'appRequestFail',
                isBlock: !(options.showProgress === false)
            }
            if (options.data) {
                for (var key in options.data) {
                    params.data.push({
                        type: 0,
                        name: key,
                        value: typeof (options.data[key]) === 'string' ? options.data[key] : JSON.stringify(options.data[key])
                    })
                }
            }
            if (options.files) {
                var files = []
                if (typeof (options.files) === 'string') {
                    files.push(options.files)
                } else if (options.files instanceof Array) {
                    files = options.files
                }
                for (var i in files) {
                    params.data.push({
                        type: 1,
                        name: `file_${i}`,
                        value: base.getSysPath(files[i])
                    })
                }
            }
            if (!params.data.length) {
                alert('未设置请求参数或要上传的文件。')
                return
            }

            var requestObj = new DirectFormSubmit(params)
            if (options.success) {
                requestObj.success = options.success
            }
            if (options.fail) {
                requestObj.fail = options.fail
            }
            requestObj.send()
        } else {
            alert('不支持上传文件。')
        }
    },

    /**
     * 压缩文件
     * @method App.file.zipFile
     * @param {json} options 选项参数
     * @param {string} options.sourcePath 需要压缩的文件夹或文件的路径
     * @param {string} options.zipPath 压缩后的zip文件路径，若不提供则根据被压缩文件或文件夹自动生成压缩文件名
     * @param {string} options.password 压缩密码，若压缩文件不带密码无须提供
     * @param {function} options.callback 压缩结果回调函数
     */
    zipFile (options) {
        if (base.isApp()) {
            // 判断待压缩文件是否存在
            var sourcePath = base.getSysPath(options.sourcePath)
            var file = new File(sourcePath, false)
            if (!file.exists()) {
                alert('源文件或目录不存在。')
                return
            }

            var zipPath
            if (options.zipPath) {
                zipPath = base.getSysPath(options.zipPath)

                // 目录不存在则创建
                var folder = new File(zipPath.substr(0, zipPath.lastIndexOf('/')), true)
                if (!folder.exists()) {
                    folder.mkdirs()
                }
            } else {
                if (file.isFolder()) {
                    var idx = sourcePath.lastIndexOf('/') + 1
                    zipPath = sourcePath.substr(0, idx) + sourcePath.substr(idx) + '.zip'
                } else {
                    zipPath = sourcePath.substr(0, sourcePath.lastIndexOf('.')) + '.zip'
                }
            }

            FileUtil.zip(sourcePath, zipPath, function (status, path) {
                var result = { code: '-1' }
                status = parseInt(status)
                if (status === 0) {
                    var filePath = base.getPaths(path)
                    result.code = '0'
                    result.data = filePath
                } else if (status === 1) {
                    result.msg = '源文件或目录不存在。'
                } else if (status === 2) {
                    result.msg = '压缩过程失败。'
                }
                if (options.callback) {
                    options.callback(result)
                }
            }, options.password ? options.password : '')

        } else {
            alert('不支持压缩文件。')
        }
    },

    /**
     * 解压文件
     * @method App.file.unZipFile
     * @param {json} options 选项参数
     * @param {string} options.sourcePath 需要解压的zip文件路径
     * @param {string} options.folderPath 解压缩后的文件夹路径，若不提供则根据zip文件自动生成解压文件夹
     * @param {string} options.password 解压缩密码，若压缩文件不带密码无须设置该参数
     * @param {function} options.callback 解压结果回调函数
     */
    unZipFile (options) {
        if (base.isApp()) {
            // 判断压缩文件是否存在
            var sourcePath = base.getSysPath(options.sourcePath)
            var file = new File(sourcePath, false)
            if (!file.exists()) {
                alert('压缩文件不存在。')
                return
            }

            // 目录不存在则创建
            var folderPath = options.folderPath ? base.getSysPath(options.folderPath) : base.getSysPath(file.getFileName().substr(0, file.getFileName().lastIndexOf('.')))
            var folder = new File(folderPath, true)
            if (!folder.exists()) {
                folder.mkdirs()
            }

            FileUtil.unZip(sourcePath, folderPath, function (status, path) {
                var result = { code: '-1' }
                status = parseInt(status)
                if (status === 0) {
                    var filePath = base.getPaths(path)
                    result.code = '0'
                    result.data = filePath
                } else if (status === 1) {
                    result.msg = '压缩文件不存在。'
                } else if (status === 2) {
                    result.msg = '解压过程失败。'
                }
                if (options.callback) {
                    options.callback(result)
                }
            }, options.password ? options.password : '')
        } else {
            alert('不支持解压文件。')
        }
    },

    /**
     * 创建目录（若父目录不存在则同时创建父目录），返回true表示创建成功，false表示创建失败
     * @method App.file.createDir
     * @param {string} path 新目录路径
     */
    createDir (path) {
        if (base.isApp()) {
            var sourcePath = base.getSysPath(path)
            var file = new File(sourcePath, true)
            if (!file.exists()) {
                return file.mkdirs()
            }
            return true
        } else {
            alert('不支持创建目录。')
            return false
        }
    },

    /**
     * 创建一个新的空文件，返回true表示创建成功，false表示创建失败（若文件已存在则直接返回true）
     * @method App.file.createFile
     * @param {string} path 新文件路径
     */
    createFile (path) {
        if (base.isApp()) {
            var sourcePath = base.getSysPath(path)
            var file = new File(sourcePath, false)
            if (!file.exists()) {
                return file.createFile()
            }
            return true
        } else {
            alert('不支持创建文件。')
            return false
        }
    },

    /**
     * 删除文件或文件夹，返回true表示删除成功，false表示删除失败（若文件或文件夹不存在，直接返回true）
     * @method App.file.deleteFile
     * @param {string} path 文件或文件夹的路径
     */
    deleteFile (path) {
        if (base.isApp()) {
            var sourcePath = base.getSysPath(path)
            var file = new File(sourcePath, false)
            if (file.exists()) {
                return file.isFolder() ? FileUtil.deleteFolder(sourcePath) : file.deleteFile()
            }
            return true
        } else {
            alert('不支持删除文件。')
            return false
        }
    },

    /**
     * 获取指定文件内容。只能读取字符串类型，不支持对二进制文件读取。
     * @method App.file.readFile
     * @param {string} path 文件路径
     */
    readFile (path) {
        var result = { code: '-1' }
        if (base.isApp()) {
            var sourcePath = base.getSysPath(path)
            var file = new File(sourcePath, false)
            if (file.exists()) {
                result.code = '0'
                result.data = FileUtil.readFile(sourcePath)
            } else {
                result.msg = '文件不存在。'
            }
        } else {
            result.msg = '不支持读取文件。'
        }
        return result
    },

    /**
     * 保存内容至指定路径文件。只能写入字符串类型，不支持对二进制文件写入。返回true表示写入成功，false表示写入失败。
     * @method App.file.writeFile
     * @param {string} path 文件路径
     * @param {string} content 要写入文件的数据
     * @param {int} mode 0:覆盖原文件内容/1:追加至原文件末尾
     */
    writeFile (path, content, mode) {
        if (base.isApp()) {
            var sourcePath = base.getSysPath(path)
            mode = (mode === 1 ? 1 : 0)
            return FileUtil.writeFile(sourcePath, content, mode)
        } else {
            alert('不支持编辑文件。')
        }
    },

    /**
     * 移动/重命名文件，返回true表示移动文件成功，false表示移动文件失败。
     * @method App.file.moveFile
     * @param {string} sourcePath 源文件路径
     * @param {string} targetPath 目标文件路径
     */
    moveFile (sourcePath, targetPath) {
        if (base.isApp()) {
            sourcePath = base.getSysPath(sourcePath)
            var file = new File(sourcePath, false)
            if (file.exists()) {
                targetPath = base.getSysPath(targetPath)
                return file.renameTo(targetPath)
            } else {
                alert('文件不存在。')
            }
        } else {
            alert('不支持移动文件。')
        }
        return false
    },

    /**
     * 复制文件，返回true表示复制成功，false表示复制失败。
     * @method App.file.copyFile
     * @param {string} sourcePath 源文件路径
     * @param {string} targetPath 目标文件路径
     */
    copyFile (sourcePath, targetPath) {
        if (base.isApp()) {
            sourcePath = base.getSysPath(sourcePath)
            var file = new File(sourcePath, false)
            if (file.exists()) {
                targetPath = base.getSysPath(targetPath)
                return file.copyTo(targetPath)
            } else {
                alert('文件不存在。')
            }
        } else {
            alert('不支持复制文件。')
        }
        return false
    },

    /**
     * 选择文件
     * @method App.file.selectFile
     * @param {json} options 选项参数
     * @param {string} options.defaultPath 选择文件夹路径，若不设置该属性，则默认从变量dataPath所定义的目录打开
     * @param {string} options.filter 选中文件时显示给用户的文件类型，支持以下格式：doc/docx/xls/xlsx/ppt/pptx/pdf/txt/html/xml/bmp/jpg/jpeg/png/rar/zip
        需过滤的文件以“|”连接，如jpg|png，说明过滤出后缀名为jpg或png的图片文件。默认为空串即不过滤
     * @param {function} options.callback 选择文件完成后执行的回调函数，参数为已选中文件路径（若未选择则是空串）
     */
    selectFile (options) {
        if (base.isApp()) {
            NativeUtil.selectFile({
                defaultPath: options.defaultPath ? base.getSysPath(options.defaultPath) : base.dataPath,
                filter: options.filter ? options.filter : ''
            }, function (result) {
                if (options.callback) {
                    var filePath = base.getFilePath(result.filePath)
                    options.callback(filePath)
                }
            })
        } else {
            alert('不支持选择文件。')
        }
    },

    /**
     * 打开文件
     * @method App.file.openFile
     * @param {string} path 文件路径
     */
    openFile (path) {
        if (base.isApp()) {
            var sourcePath = base.getSysPath(path)
            var extName = sourcePath.substr(sourcePath.lastIndexOf('.') + 1).toLowerCase()
            if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'jpg', 'jpeg', 'png', 'gif'].indexOf(extName) !== -1) {
                NativeUtil.open(sourcePath)
            } else {
                alert(`不支持查看${extName}类型的文件。`)
            }
        } else {
            alert('不支持查看文件。')
        }
    },

    /**
     * 判断文件或文件夹是否存在
     * @method App.file.exists
     * @param {string} path 文件或文件夹路径
     */
    exists (path) {
        if (base.isApp()) {
            var sourcePath = base.getSysPath(path)
            var file = new File(sourcePath, false)
            return file.exists()
        }
        return false
    }
}

export default file
