import App from '@/static/js/app'
import Vue from 'vue'
import '../../static/css/base.css'

/* eslint-disable */
new Vue({
    el: '#app',
    data: {
        filePreviewUrl: 'http://rmis.ideasoft.net.cn:8402/view/url?url=http%3A%2F%2F172.56.2.230%2FIDWebSoft%2FAccessary%2F2017%2F03%2F160046_690176_qgFImiw.doc&name=DEF&idocv_auth=sapi',
        downloadFileUrl: 'http://rmis.ideasoft.net.cn:8401/_Acc/Temp/Simulate/Download/1bfef967-1c87-402e-92d2-45057e3b55ec/1bfef967-1c87-402e-92d2-45057e3b55ec.zip',
        savePath: 'download/zsyf/abc.zip',
        uploadFileUrl: 'http://172.56.4.140:83/api/app/uploadfiles',
        uploadFilePath: 'download/zsyf/abc.zip',
        i: 0,
        j: 0,
        k: 0,
        txtReadPath: 'abc/7FE36678-A78B-4A2D-A229-BD5283F3BA2B.txt',
        txtWritePath: 'abc/txt1.txt',
        txtRenamePath: 'abc/txt2.txt',
        txtMovePath: 'download/txt1.txt',
        openfilePath: 'temp/zsyf/7FE36678-A78B-4A2D-A229-BD5283F3BA2B.txt'
    },
    methods: {
        back () {
            App.app.back()
        },
        showFile () {
            App.file.showFile(this.filePreviewUrl)
        },
        downloadFile () {
            App.file.downloadFile({
                requestUrl: this.downloadFileUrl,
                savePath: this.savePath,
                success: function (data) {
                    alert(data.path + '\n' + data.url)
                }
            })
        },
        uploadFile () {
            App.file.uploadFile({
                requestUrl: this.uploadFileUrl,
                files: this.uploadFilePath,
                success: function (data) {
                    alert(JSON.stringify(data))
                }
            })
        },
        unZipFile () {
            App.file.unZipFile({
                sourcePath: this.savePath,
                folderPath: 'temp/zsyf',
                callback: function (result) {
                    alert(JSON.stringify(result))
                }
            })
        },
        zipFile () {
            App.file.zipFile({
                sourcePath: 'temp/zsyf',
                zipPath: 'temp/zsyf.zip',
                callback: function (result) {
                    alert(JSON.stringify(result))
                }
            })
        },
        createDir () {
            if (App.file.createDir('dir/dir' + this.i)) {
                this.i++
                alert('创建成功。')
            } else {
                alert('创建失败。')
            }
        },
        createFile () {
            if (App.file.createFile('file/file' + this.j + '.txt')) {
                this.j++
                alert('创建成功。')
            } else {
                alert('创建失败。')
            }
        },
        deleteDir () {
            if (App.file.deleteFile('dir/dir' + this.i)) {
                this.i--
                alert('删除成功。')
            } else {
                alert('删除失败。')
            }
        },
        deleteFile () {
            if (App.file.deleteFile('file/file' + this.j + '.txt')) {
                this.j--
                alert('删除成功。')
            } else {
                alert('删除失败。')
            }
        },
        readFile () {
            var result = App.file.readFile(this.txtReadPath)
            if (result.code === '0') {
                var data = JSON.parse(result.data)
                alert(data.downid)
            } else {
                alert(data.msg)
            }
        },
        writeFile () {
            if (App.file.writeFile(this.txtWritePath, 'line' + this.k + '\r\n', 1)) {
                this.k++
                alert('写文件成功。')
            } else {
                alert('写文件失败。')
            }
        },
        renameFile () {
            if (App.file.moveFile(this.txtWritePath, this.txtRenamePath)) {
                alert('重命名文件成功。')
            } else {
                alert('重命名文件失败。')
            }
        },
        moveFile () {
            if (App.file.moveFile(this.txtWritePath, this.txtMovePath)) {
                alert('移动文件成功。')
            } else {
                alert('移动文件失败。')
            }
        },
        copyFile () {
            if (App.file.copyFile(this.txtWritePath, this.txtMovePath)) {
                alert('复制文件成功。')
            } else {
                alert('复制文件成功。')
            }
        },
        selectFile () {
            App.file.selectFile({
                callback: function (path) {
                    alert(path)
                }
            })
        },
        openFile () {
            App.file.openFile(this.openfilePath)
        }
    }
})
