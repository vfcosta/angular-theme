/* global process, */
'use strict';

var webpack = require('webpack');
var path = require('path');
var conf = require('./gulp/conf');

var argv = require("yargs").argv;

var singleRun = (argv.singleRun !== undefined && argv.singleRun);
var coverage = (argv.coverage === undefined || argv.coverage);


if (argv.singleRun) {
    singleRun = true;
}

var projectFiles = [
    './src/commons.js',
    './src/noosfero-test.js',
    './src/noosfero-specs.js',
];

var vendorFiles = [
    'node_modules/core-js/client/shim.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/zone.js/dist/long-stack-trace-zone.js',
    'node_modules/zone.js/dist/proxy.js',
    'node_modules/zone.js/dist/sync-test.js',
    'node_modules/zone.js/dist/jasmine-patch.js',
    'node_modules/zone.js/dist/async-test.js',
    'node_modules/zone.js/dist/fake-async-test.js',
    { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
    { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },
    { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
    { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false }
];

var karmaPlugins = [
    'karma-chrome-launcher',
    'karma-phantomjs-launcher',
    'karma-angular-filesort',
    'karma-phantomjs-shim',
    'karma-jasmine',
    'karma-spec-reporter',
    'karma-ng-html2js-preprocessor',
    'karma-sourcemap-loader',
    'karma-coverage',
    'karma-coverage-istanbul-reporter',
    'karma-webpack'
];

var _ = require('lodash');
var wiredep = require('wiredep');

var pathSrcHtml = [
    path.join('./src/**/!(language-selector)/*.html')
];

var glob = require("glob");

function listFiles() {
    var wiredepOptions = _.extend({}, conf.wiredep, {
        dependencies: true,
        devDependencies: true
    });

    var patterns = [].concat(wiredep(wiredepOptions).js)
        .concat(projectFiles)
        .concat(pathSrcHtml);

    var files = vendorFiles;
    var pFiles = patterns.map(function (pattern) {
        return {
            pattern: pattern
        };
    });
    files = files.concat(pFiles);
    files.push({
        pattern: path.join(conf.paths.src, '/assets/**/*'),
        included: false,
        served: true,
        watched: false
    });
    files.push({ pattern: './src/app/layout/language-selector/**/*.html', included: false, watched: true, served: true });
    return files;
}

var webpackConfig = require("./webpack.config.js")();
module.exports = function (config) {
    var configuration = {
        basePath: './',
        files: listFiles(),
        singleRun: singleRun,
        autoWatch: true,
        colors: true,
        logLevel: config.LOG_INFO,
        webpack: webpackConfig,
        webpackServer: {
            quite: true
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: conf.paths.src + '/',
            moduleName: 'templates'
        },
        frameworks: ['jasmine', 'phantomjs-shim'],
        angularFilesort: {
            whitelist: [path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js')]
        },
        browsers: ['PhantomJS'],
        plugins: karmaPlugins,
        reporters: ['spec', 'coverage-istanbul'],
        proxies: {
            '/assets/': path.join('/base/', conf.paths.src, '/assets/'),
            '/app/': path.join('/base/', conf.paths.src, '/app/')
        },
        coverageIstanbulReporter: {
            reports: ['html', 'text-summary'],
            dir: './coverage',
            fixWebpackSourcePaths: true
        },
        preprocessors: {
            'src/**/*.ts': ['sourcemap']
        },
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                { type: 'html' },
                { type: 'json', file: 'coverage-final.json' },
                { type: 'text-summary' }
            ]
        }
    };

    if(config.grep) {
      configuration.client = { args: ['--grep', config.grep] };
    }

    pathSrcHtml.forEach(function (path) {
        configuration.preprocessors[path] = ['ng-html2js'];
    });
    config.set(configuration);
};
