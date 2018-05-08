/**
 * 自定义的url-loader，解决静态资源相对路径问题
 */

var loaderUtils = require('../node_modules/url-loader/node_modules/loader-utils')
var mime = require('mime')
var path = require('path')

/**
 * file-loader修改
 */
function loadFile (content) {
    this.cacheable && this.cacheable()
    if (!this.emitFile) throw new Error('emitFile is required from module system')

    var query = loaderUtils.getOptions(this) || {}
    var configKey = query.config || 'fileLoader'
    var options = this.options[configKey] || {}
    var config = {
        publicPath: undefined,
        useRelativePath: false,
        name: '[hash].[ext]'
    }

    // options takes precedence over config
    Object.keys(options).forEach(function (attr) {
        config[attr] = options[attr]
    })

    // query takes precedence over config and options
    Object.keys(query).forEach(function (attr) {
        config[attr] = query[attr]
    })

    var context = config.context || this.options.context
    var url = loaderUtils.interpolateName(this, config.name, {
        context: context,
        content: content,
        regExp: config.regExp
    })

    var outputPath = url
    var publicPath

    if (config.useRelativePath) {
        if (this._module && this._module.issuer && this._module.issuer.resource) {
            var fileName = path.basename(this._module.issuer.resource).toLowerCase()
            var extName = path.extname(fileName)
            if (extName === '.html' || fileName === 'main.js') {
                var rootPath = path.resolve(__dirname, '../src/pages')
                var issuerContext = this._module && this._module.issuer && this._module.issuer.context || context
                var relativeUrl = issuerContext && path.relative(issuerContext, rootPath).split(path.sep).join('/')
                var relativePath = relativeUrl && path.dirname(relativeUrl) + '/'
                publicPath = JSON.stringify(relativePath + url)
            } else if (extName === ".js") {
                publicPath = '(typeof(window.publicPath) === "string" ? window.publicPath : "") + ' + JSON.stringify(url)
            } else if (['.css', '.less', '.sass', '.scss', '.stylus', '.styl'].indexOf(extName) !== -1) {
                publicPath = JSON.stringify('../../' + url)
            }
        }
    } else {
        publicPath = '__webpack_public_path__ + ' + JSON.stringify(url)
    }

    if (config.publicPath !== undefined) {
        // support functions as publicPath to generate them dynamically
        publicPath = JSON.stringify(
            typeof config.publicPath === 'function'
                ? config.publicPath(url)
                : config.publicPath + url
        )
    }

    if (query.emitFile === undefined || query.emitFile) {
        this.emitFile(outputPath, content)
    }

    /* debug info
    console.log('\n\n\n------------------------------')
    console.log('0 --- ' + this._module.resource)
    console.log('1 --- ' + this._module.issuer.context)
    console.log('2 --- ' + this._module.issuer.resource)
    console.log('3 --- ' + url)
    */

    return 'module.exports = ' + publicPath + ''
}

/**
 * url-loader修改
 */
module.exports = function (content) {
    this.cacheable && this.cacheable()

    var options = loaderUtils.getOptions(this) || {}
    // Options `dataUrlLimit` is backward compatibility with first loader versions
    var limit = options.limit || (this.options && this.options.url && this.options.url.dataUrlLimit)

    if (limit) {
        limit = parseInt(limit, 10)
    }

    var mimetype = options.mimetype || options.minetype || mime.lookup(this.resourcePath)

    // No limits or limit more than content length
    if (!limit || content.length < limit) {
        if (typeof content === 'string') {
            content = new Buffer(content)
        }
        return 'module.exports = ' + JSON.stringify('data:' + (mimetype ? mimetype + ';' : '') + 'base64,' + content.toString('base64'))
    }

    return loadFile.call(this, content)
}

module.exports.raw = true
