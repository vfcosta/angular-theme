/* global __dirname */

var argv = require("yargs").argv;
var path = require("path");
var glob = require("glob");

var WebpackOnBuildPlugin = require('on-build-webpack');

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var extension = ".js";
if (argv.production) {
    extension = ".min.js"
}

var testFiles = glob.sync("./src/**/*.[sS]pec.ts");

var uglifyLoaderConfig = {
    // I want to uglify with mangling only app files, not thirdparty libs
    test: /\.js$/,
    exclude: /.spec.js/, // excluding .spec files
    loader: "uglify"
};

var testingFiles = glob.sync("./src/app/**/*.[sS]pec.ts");

var webpackConfig = {
    watchDelay: 300,
    entry: {
        noosfero: './src/app/index.ts',
        'noosfero-specs': './src/specs.ts'
    },

    plugins: [new CommonsChunkPlugin("commons.js")],

    output: {
        path: path.join(__dirname, "src"),
        filename: "[name]" + extension,
    },
  
    /*plugins: [ new webpack.optimize.CommonsChunkPlugin("common.js") ],*/

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    // Source maps support (or 'inline-source-map' also works)
    devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }, {
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            }, {
                test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=100000'
            }, {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }]
    }
};

if (argv.production) {
    webpackConfig.module.loaders.push(uglifyLoaderConfig);
}

var testProcess = null;
var child_process = require("child_process");
var count = 0;
var stdinPatched = false;
if (argv.test) {
    webpackConfig.plugins.push(
        new WebpackOnBuildPlugin(function (stats) {
            // webpack in watch mode call this twice for just one compilation
            if (!stdinPatched) {
                process.stdin.on('data', function (info) {
                    if (info == '\n') {
                        if (!testProcess) {
                            testProcess = child_process.spawn("npm", ["run", "coverage"], { stdio: 'inherit' });
                            testProcess.on('exit', function () { testProcess = null });
                        }
                    }
                });
                stdinPatched = true;
            }
            
            // so, here we are checking if the process is still running before trigger another test execution
            if (testProcess == null) {
                console.log("Starting tests execution...");
                testProcess = child_process.spawn("npm", ["run", "coverage"], { stdio: 'inherit' });

                testProcess.on('exit', function () { testProcess = null });
            } else {
                console.log("Test still running... Sorry webpack!! :)");
            }

        })
        );
}

module.exports = webpackConfig;
