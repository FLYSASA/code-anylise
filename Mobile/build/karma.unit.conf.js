var base = require('./karma.base.conf.js')

module.exports = function (config) {
    config.set(Object.assign(base, {
        browsers: ['Chrome'],
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: '../coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        },
        singleRun: false,
        plugins: base.plugins.concat([
            'karma-chrome-launcher'
        ])
    }))
}