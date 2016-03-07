/* global process, */
'use strict';

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
    './src/vendor.bundle.js',
    './src/noosfero.js',
    './src/noosfero-specs.js'
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
    'karma-coverage'
];


var karmaReporters = ['spec', 'coverage'];



// if (coverage) {
//     karmaPlugins.push('karma-coverage');
//     karmaReporters.push('coverage');
// }



var _ = require('lodash');
var wiredep = require('wiredep');

var pathSrcHtml = [
    path.join('./src/app/**/*.html')
];

var glob = require("glob");
//var testFiles = glob.sync("./src/**/*.[sS]pec.ts");

function listFiles() {
    var wiredepOptions = _.extend({}, conf.wiredep, {
        dependencies: true,
        devDependencies: true
    });

    var patterns = [].concat(wiredep(wiredepOptions).js)
        .concat(projectFiles)
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
    // files.push({
    //     pattern: path.join(conf.paths.src, '/test.js.map'),
    //     included: false,
    //     served: true
    // });
    return files;
}

var webpackConfig = require("./webpack.config.js");

module.exports = function (config) {

    var configuration = {
        basePath: '../angular-theme',

        files: listFiles(),

        singleRun: singleRun,

        autoWatch: true,
        colors: true,

        logLevel: config.LOG_INFO,

        ngHtml2JsPreprocessor: {
            stripPrefix: conf.paths.src + '/',
            moduleName: 'templates'
        },


        frameworks: ['jasmine', 'phantomjs-shim'],//, 'angular-filesort'],

        angularFilesort: {
            whitelist: [path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js')]
        },

        browsers: ['PhantomJS'],

        plugins: karmaPlugins,



        reporters: karmaReporters,

        proxies: {
            '/assets/': path.join('/base/', conf.paths.src, '/assets/')
        }
    };


    if (coverage) {

        /*configuration.webpack = {
            module: {
                loaders: [
                    {
                        test: /\.tsx?$/,
                        loader: 'ts-loader'
                    }
                ]
            },
            resolve: {
                extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
                modulesDirectories: ['node_modules'],
                root: path.resolve(__dirname)
            }
        };*/
        /*configuration.webpack = _.merge({
             
         }, webpackConfig, {
             devtool: 'source-map'
         }),
         configuration.webpackServer = {
             quite: true
         };*/
        
        // This is the default preprocessors configuration for a usage with Karma cli
        // The coverage preprocessor is added in gulp/unit-test.js only for single tests
        // It was not possible to do it there because karma doesn't let us now if we are
        // running a single test or not
        configuration.preprocessors = {
            'src/noosfero.js': ['sourcemap', 'coverage'],
            'src/**/*.ts': ['sourcemap']

        };

        configuration.coverageReporter = {
            dir: 'coverage/',
            reporters: [
                { type: 'html' },
                { type: 'json', file: 'coverage-final.json' },
                { type: 'text-summary' }
            ]
        };
    } else {
        // This is the default preprocessors configuration for a usage with Karma cli
        // The coverage preprocessor is added in gulp/unit-test.js only for single tests
        // It was not possible to do it there because karma doesn't let us now if we are
        // running a single test or not
        configuration.preprocessors = {
            'src/noosfero': ['coverage', 'sourcemap'],
            'src/**/*.ts': ['sourcemap']
        };

        configuration.coverageReporter = {
            dir: 'coverage/',
            reporters: [
                { type: 'html' },
                { type: 'json', file: 'coverage-final.json' },
                { type: 'text-summary' }
            ]
        };
    }


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
