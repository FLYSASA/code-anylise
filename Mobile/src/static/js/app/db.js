/* eslint-disable */
import base from './base'
var dbIsCrypt = false

/**
 * 创建并返回数据库对象
 * @param {string} encrypted 是否加密数据库，默认false
 */
function createDb () {
    if (!base.isApp()) {
        return null
    }

    if (dbIsCrypt) {
        if (!window.appCryptDb) {
            window.appCryptDb = new DbCipher()
        }
    } else {
        if (!window.appDb) {
            window.appDb = new DB()
        }
    }

    return getDb()
}

/**
 * 获取数据库对象
 */
function getDb () {
    return dbIsCrypt ? window.appCryptDb : window.appDb
}

var database = {
    /**
     * 打开或新建并打开数据库
     * @method App.db.open
     * @param {json} options 选项参数
     * @param {string} options.name 需要打开的数据库名称，若不存在该数据库则新建并打开
     * @param {string} options.path db数据库文件的存放目录，默认保存在sys:data/files/db目录下，也可根据业务指定保存目录名
     * @param {string} options.key 数据库密码，支持英文、数字、中文及其他特殊字符；需要加密数据库时提供
     */
    open (options) {
        dbIsCrypt = !!options.key
        var db = createDb()

        options.path = base.getSysPath(options.path || 'db')
        return dbIsCrypt ? db.open(options) : db.open(options.name, options.path)
    },

    /**
     * 异步方式打开或新建并打开加密数据库
     * @method App.db.open
     * @param {json} options 选项参数
     * @param {string} options.name 需要打开的数据库名称，若不存在该数据库则新建并打开
     * @param {string} options.path db数据库文件的放置文件夹目录，默认保存在sys:data/files/db目录下，也可根据业务指定保存目录名
     * @param {string} options.key 数据库密码，支持英文、数字、中文及其他特殊字符
     * @param {function} options.callback 回调函数，参数是标准接口结果类型
     */
    openAsyn (options) {
        dbIsCrypt = true
        var db = createDb()

        options.path = base.getSysPath(options.path || 'db')
        db.openAsyn({
            name: options.name,
            path: options.path,
            key: options.key
        }, function (result) {
            var result = parseInt(result.errCode) === 0 ? { code: '0' } : { code: '-1', msg: '数据库打开失败。' }
            if (options.callback) {
                options.callback(result)
            }
        })
    },

    /**
     * 当前数据库是否处于打开状态
     * @method App.db.isOpen
     */
    isOpen () {
        var db = getDb()
        return db ? db.isOpen() : false
    },

    /**
     * 关闭已打开数据库
     * @method App.db.close
     */
    close () {
        var db = getDb()
        return db ? db.close() : false
    },

    /**
     * 在数据库中创建指定数据表
     * @method App.db.dropTable
     * @param {string} tableName 数据表名称
     * @param {array} cols 包含需要构建所有数据表列名，列数据类型的字符串数组
     */
    createTable (tableName, cols) {
        var db = getDb()
        if (db && cols.length) {
            var sql = `create table ${tableName} (${cols.join(',')})`
            return db.execute(sql)
        }

        return false
    },

    /**
     * 在数据库中移除指定数据表
     * @method App.db.dropTable
     * @param {string} tableName 数据表名称
     */
    dropTable (tableName) {
        var db = getDb()
        if (db) {
            return db.isTableExist(tableName) ? db.dropTable(tableName) : true
        }
        return false
    },

    /**
     * 数据库中是否存在指定表名的数据表
     * @method App.db.isTableExist
     * @param {string} tableName 数据表名称
     */
    isTableExist (tableName) {
        var db = getDb()
        return db ? db.isTableExist(tableName) : false
    },

    /**
     * 获取指定表的列名数组
     * @method App.db.getTableCols
     * @param {string} tableName 数据表名称
     */
    getTableCols (tableName) {
        var db = getDb()
        return db ? db.getTableCols(tableName) : null
    },

    /**
     * 执行查询语句，返回查询结果集数组（数组每项均为json对象）
     * @param {string} sql 需要执行的select查询SQL语句
     */
    query (sql) {
        var db = getDb()
        return db ? db.query(sql) : null
    },

    /**
     * 执行单条插入insert，更新update或删除delete语句
     * @param {string} sql 需要执行的insert/update/delete SQL语句
     */
    exec (sql) {
        var db = getDb()
        return db ? db.execute(sql) : false
    },

    /**
     * 以事务方式执行多条插入insert、更新update或删除delete语句
     * @param {array} sqls 包含多条需要执行的insert/update/delete SQL语句的数组
     */
    batchExec (sqls) {
        var db = getDb()
        return db ? db.transaction(sqls) : false
    }
}

export default database