module.exports = {
    build: {
        // 需要编译的页面key（发布时不需要配置，一般在开发时配置，实现更快速编译和调试页面）
        // 如果只编译pom/plan.html，则配置为['page/plan']
        includePages: [],
        // 不编译和发布的目录（pages下的一级目录，一般用于按需发布，优先级高于includePages）
        excludeDirs: ['demo', 'demo_app']
    }
}
