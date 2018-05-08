/**
 * 用于批量导入词条文件
 * @author zhangmq
 * @date 2018-05-02
 */
import utils from '@/static/js/utils.js'

// 通用的模块先加载
const base = mergeImportsBySubDirName(require.context('@/static/i18n/base/', true, /\.js$/))

/**
 * 将所有匹配的js文件export default对象按直接子目录合并为一个对象：key为子目录名称，value为合并的对象
 * @param {rs} require.context() 加载的文件
 * @return Object 返回值
 */
export function mergeImportsBySubDirName (rs) {
    const rst = {}
    mapImports(rs, function (pathName, r) {
        pathName.replace(/^\.\/([\s\S]*?)\//, function (match, SubDirName) {
            if (rst[SubDirName]) {
                noCoverAssign(rst[SubDirName], r.default, pathName)
            } else {
                rst[SubDirName] = r.default
            }
        })
    })

    return rst
}

/**
 * 按模块导入词条，模块目录下所有词条将挂在该模块下，并且默认挂在了common模块的词条
 * 导出平台词条例子:
 *  // 注意：require.context第一、第二参数必须为'@/static/i18n/'和true；
 *  //      第三个参数模式为：/^\.\/模块目录\/.*\.js$/i
 *  mergeImportsByModule(require.context('@/static/i18n/', true, /^\.\/plat\/.*\.js$/i))
 * @param {rs} require.context() 加载的文件
 * @return Object 返回值
 */
export function mergeImportsByModule (rs) {
    // keys() zh-cn:data
    const rst = {}
    mapImports(rs, function (pathName, r) {
        // 第一个和第二个分组分别为模块名称和语言类型
        pathName.replace(/^\.\/([\s\S]*?)\/([\s\S]*?)\//, function (match, moduleName, langName) {
            if (!rst[langName]) {
                rst[langName] = {}
                rst[langName][moduleName] = r.default
            } else {
                // 对象属性合并、非法值过滤
                noCoverAssign(rst[langName][moduleName], r.default, pathName)
            }
        })
    })

    // 每个模块默认注入base模块的词条
    for (var langName in base) {
        if (!rst[langName]) {
            rst[langName] = {}
        }

        rst[langName]['base'] = base[langName]
    }

    if (warnMsg.length > 0) {
        utils.warn('多语言词条定义存在同名冲突，请解决。', warnMsg)
    }

    return rst
}

const warnMsg = []
/**
 * 深度赋值
 * @param {object} target 目标对象
 * @param {ojbect} source 来源对象
 */
function noCoverAssign (target, source, sourcePath) {
    if (!utils.isPlainObject(target)) {
        target = {}
    }

    if (utils.isPlainObject(source)) {
        for (var prop in source) {
            if (target.hasOwnProperty(prop)) {
                warnMsg.push(`${sourcePath}目录下${prop}属性重复设置，将被忽略。`)
                continue
            }

            target[prop] = source[prop]
        }
    }

    return target
}

/**
 * 将所有匹配的js文件export default对象合并为一个对象
 * @param {rs} require.context() 加载的文件
 * @return Object 返回值
 */
export function mergeImports (rs) {
    var rst = {}
    mapImports(rs, function (pathName, r) {
        Object.assign(rst, r.default)
    })

    return rst
}

/**
 * 遍历处理批量导入的内容
 * @param {rs} require.context() 加载的文件
 * @param {function} callback 回调函数
 */
export function mapImports (rs, callback) {
    rs.keys().forEach(pathName => {
        if (typeof callback === 'function') {
            callback(pathName, rs(pathName))
        }
    })
}
