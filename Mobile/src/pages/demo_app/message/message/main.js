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
        uploadFilePath: 'download/zsyf/abc.zip'
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
                success: function (path, url) {
                    alert(path + '\n' + url)
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
                success: function (result) {
                    alert(JSON.stringify(result))
                }
            })
        },
        zipFile () {
            App.file.zipFile({
                sourcePath: 'temp/zsyf',
                zipPath: 'temp/zsyf.zip',
                success: function (result) {
                    alert(JSON.stringify(result))
                }
            })
        },
        selectFile () {
            App.file.selectFile({
                callback: function (path) {
                    alert(path)
                }
            })
        }
    }
})
