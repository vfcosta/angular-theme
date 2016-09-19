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

var testFiles = glob.sync("./src/**/**/*.[sS]pec.ts");

var uglifyLoaderConfig = {
    // I want to uglify with mangling only app files, not thirdparty libs
    test: /\.js$/,
    exclude: /.spec.js/, // excluding .spec files
    loader: "uglify"
};

var testingFiles = glob.sync("./src/app/**/**/*.[sS]pec.ts");


var entries = {
    noosfero: './src/app/index.ts',
    'noosfero-specs': testFiles, // './src/specs.ts',
    'vendor.bundle': ['core-js', 'reflect-metadata', 'ng-forward', 'ng-forward/cjs/testing/test-component-builder']
};

var webpackConfig = {
    entry: entries,

    plugins: [new CommonsChunkPlugin("commons", "commons.js")],

    output: {
        path: path.join(__dirname, "src"),
        filename: "[name]" + extension,
    },

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    // Source maps support (or 'inline-source-map' also works)
    // FIXME see why source map is breaking the build
    //devtool: 'source-map',
    devtool: 'eval',

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
        }, {
            test: /\.ts?$/,
            loader: "tslint"
        }]
    }
};

if (argv.production) {
    webpackConfig.module.loaders.push(uglifyLoaderConfig);
}


// if webpack executed with --test argument, this code bellow will add a post-compilation
// code which will run the Tests + Coverage (npm run coverage)
var testProcess = null;
var child_process = require("child_process");
var count = 0;
var stdinPatched = false;


if (argv.test) {
    function spawnChildProcessTest() {
        if (!testProcess) {
            testProcess = child_process.spawn("npm", ["run", "coverage"], {
                stdio: 'inherit'
            });
            testProcess.on('exit', function() {
                testProcess = null
            });
        }
    }
    // configure the webPackOnBuildPlugin with our post-compilation function as argument
    var onBuildPluginConfigured = new WebpackOnBuildPlugin(function(stats) {

        // here we are patching the stdin to allow trigger tests when pressing 'Enter'
        // on terminal
        if (!stdinPatched) {
            process.stdin.on('data', function(info) {
                if (info == '\n') {
                    spawnChildProcessTest();
                }
            });
            stdinPatched = true;
        }

        // webpack in watch mode call this twice for just one compilation    
        // so, here we are checking if the process is still running before trigger another test execution
        if (testProcess == null) {
            console.log("Starting tests execution...");
            spawnChildProcessTest();
        } else {
            console.log("Test still running... Sorry webpack!! :)");
        }

    });
    webpackConfig.plugins.push(onBuildPluginConfigured);
}

module.exports = webpackConfig;
