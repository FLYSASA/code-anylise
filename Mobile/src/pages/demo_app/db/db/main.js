import App from '@/static/js/app'
import Vue from 'vue'
import '../../static/css/base.css'

/* eslint-disable */
new Vue({
    el: '#app',
    data: {
        dbIsCrypt: false,
        dbName: 'OADB.db',
        cryptDbName: 'CCMPDB.db',
        cryptPwd: 'sapi@2017',
        tableName: 'TUser',
        cols: ['name varchar(50)', 'employeename nvarchar(20)', 'age int'],
        querySql: 'SELECT * FROM TUser',
        pageIndex: 2,
        pageSize: 3,
        execSql: `INSERT INTO TUser VALUES ('zhangsan','张三',25)`,
        execsqls: [
            `INSERT INTO TUser VALUES ('lisi','李四',41)`,
            `INSERT INTO TUser VALUES ('wangwu','王五',5)`,
            `INSERT INTO TUser VALUES ('zhaoliu','赵六',23)`,
            `INSERT INTO TUser VALUES ('tianqi','田七',16)`,
            `INSERT INTO TUser VALUES ('zhouba','周八',37)`,
            `DELETE FROM TUser WHERE name='zhangsan'`
        ]
    },
    methods: {
        back () {
            App.app.back()
        },
        open (showMsg) {
            var options = this.dbIsCrypt ? { name: this.cryptDbName, key: this.cryptPwd } : { name: this.dbName }
            if (App.db.open(options)) {
                if (showMsg) {
                    alert('建库或打开库成功。')
                }
            } else {
                alert('建库或打开库失败。')
            }
        },
        openDb () {
            this.dbIsCrypt = false
            this.open(true)
        },
        createTable () {
            if (!App.db.isOpen()) {
                this.open()
            }
            if (!App.db.isTableExist(this.tableName)) {
                if (App.db.createTable(this.tableName, this.cols)) {
                    alert('建表成功。')
                } else {
                    alert('建表失败。')
                }
            } else {
                alert('表已存在。')
            }
            App.db.close()
        },
        dropTable () {
            if (!App.db.isOpen()) {
                this.open()
            }
            if (App.db.isTableExist(this.tableName)) {
                if (App.db.dropTable(this.tableName)) {
                    alert('删表成功。')
                } else {
                    alert('删表失败。')
                }
            } else {
                alert('表不存在。')
            }
            App.db.close()
        },
        getTableCols () {
            if (!App.db.isOpen()) {
                this.open()
            }
            if (App.db.isTableExist(this.tableName)) {
                var cols = App.db.getTableCols(this.tableName)
                alert(JSON.stringify(cols))
            } else {
                alert('表不存在。')
            }
            App.db.close()
        },
        query () {
            if (!App.db.isOpen()) {
                this.open()
            }
            var data = App.db.query(this.querySql)
            alert(JSON.stringify(data))
            App.db.close()
        },
        queryPager () {
            if (!App.db.isOpen()) {
                this.open()
            }
            var sql = `${this.querySql} LIMIT (${this.pageIndex}-1)*${this.pageSize},${this.pageSize}`
            var data = App.db.query(sql)
            alert(JSON.stringify(data))
            App.db.close()
        },
        exec () {
            if (!App.db.isOpen()) {
                this.open()
            }
            if (App.db.exec(this.execSql)) {
                alert('执行sql成功。')
            } else {
                alert('执行sql失败。')
            }
            App.db.close()
        },
        batchExec () {
            if (!App.db.isOpen()) {
                this.open()
            }
            if (App.db.batchExec(this.execsqls)) {
                alert('批量执行sql成功。')
            } else {
                alert('批量执行sql失败。')
            }
            App.db.close()
        },
        openCryptDb () {
            this.dbIsCrypt = true
            this.open(true)
        },
        openAsynCryptDb () {
            App.db.openAsyn({
                name: this.cryptDbName, key: this.cryptPwd, callback: function (result) {
                    if (result.code === '0') {
                        alert('建库或打开库成功。')
                    } else {
                        alert(result.msg)
                    }
                }
            })
        }
    }
})