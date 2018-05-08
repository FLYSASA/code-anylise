/* eslint-disable */
import base from './base'
import utils from '../utils'

/**
 * 缓存操作
 */
var cache = {
    /**
     * 设置本地缓存（默认缓存3天，打包时可设置缓存天数）
     * @method App.cache.setCache
     * @param {string} key 缓存数据的键值
     * @param {string} value 缓存数据
     */
    set (key, value) {
        base.isApp() ? CacheUtil.setCache(key, value) : utils.localStorage.set(key, value)
    },

    /**
     * 取出本地缓存
     * @method App.cache.getCache
     * @param {string} key 缓存数据的键值
     */
    get (key) {
        return base.isApp() ? CacheUtil.getCache(key) : utils.localStorage.get(key)
    },

    /**
     * 清除缓存数据中保存的指定key的数据值
     * @method App.cache.remove
     * @param {string} key 要清理的缓存数据的键值
     */
    remove (key) {
        base.isApp() ? CacheUtil.remove(key) : utils.localStorage.remove(key)
    },

    /**
     * 清除缓存数据中保存的所有数据
     * @method App.cache.clear
     */
    clear () {
        base.isApp() ? CacheUtil.clear() : utils.localStorage.clear()
    },

    /**
     * 清理App缓存（清理网络图片缓存，预览缓存等一系列缓存数据）
     * @method App.cache.clearAppCache
     */
    clearAppCache () {
        base.isApp() && ClientUtil.cleanCache()
    },

    /**
     * 清理Webview浏览器缓存
     * @method App.cache.clearWebviewCache
     */
    clearWebviewCache () {
        base.isApp() && NativeUtil.clearWebviewCache()
    }
}

export default cache
