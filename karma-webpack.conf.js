/* global process, */
'use strict';

var path = require('path');
var conf = require('./gulp/conf');


var _ = require('lodash');
var wiredep = require('wiredep');

var pathSrcHtml = [
    path.join(conf.paths.src, '/**/*.html')
];

function listFiles() {
    var wiredepOptions = _.extend({}, conf.wiredep, {
        dependencies: true,
        devDependencies: true
    });

    var patterns = [].concat(wiredep(wiredepOptions).js)
        .concat([
            './src/spec.ts'
            ]
        )
        .concat(pathSrcHtml);

    var files = patterns.map(function (pattern) {
        return {
            pattern: pattern
        };
    });
    files.push({
        pattern: path.join(conf.paths.src, '/assets/**/*'),
        included: false,
        served: true,
        watched: false
    });
    return files;
}

var webpackConfig = require("./webpack.config.js");

module.exports = function (config) {

    var configuration = {
        files: listFiles(),

        singleRun: false,

        autoWatch: true,
        colors: true,

        logLevel: config.LOG_INFO,

        ngHtml2JsPreprocessor: {
            stripPrefix: conf.paths.src + '/',
            moduleName: 'angular'
        },


        frameworks: ['jasmine', 'phantomjs-shim'],//, 'angular-filesort'],

        angularFilesort: {
            whitelist: [path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js')]
        },

        browsers: ['PhantomJS'],

        webpack: _.merge({
            
        }, webpackConfig, {
            devtool: 'inline-source-map'
        }),
        webpackServer: {
            quite: true
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-angular-filesort',
            'karma-webpack',
            'karma-phantomjs-shim',
            'karma-coverage',
            'karma-jasmine',
            'karma-spec-reporter',
            'karma-ng-html2js-preprocessor',
            'karma-sourcemap-loader'
        ],

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        reporters: ['spec', "coverage"],

        proxies: {
            '/assets/': path.join('/base/', conf.paths.src, '/assets/')
        }
    };

    // This is the default preprocessors configuration for a usage with Karma cli
    // The coverage preprocessor is added in gulp/unit-test.js only for single tests
    // It was not possible to do it there because karma doesn't let us now if we are
    // running a single test or not
     configuration.preprocessors = {
         'src/**/*.ts': ['webpack','sourcemap']
     };

    pathSrcHtml.forEach(function (path) {
        configuration.preprocessors[path] = ['ng-html2js'];
    });

    // This block is needed to execute Chrome on Travis
    // If you ever plan to use Chrome and Travis, you can keep it
    // If not, you can safely remove it
    // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
    if (configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
        configuration.customLaunchers = {
            'chrome-travis-ci': {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        };
        configuration.browsers = ['chrome-travis-ci'];
    }

    config.set(configuration);
};
