/* global __dirname */

var argv = require("yargs").argv;
var path = require("path");
var glob = require("glob");
var testProcess = null;
var child_process = require("child_process");
var count = 0;
var stdinPatched = false;

var WebpackOnBuildPlugin = require('on-build-webpack');

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");

var extension = ".js";
var testFiles = glob.sync("./src/**/**/*.[sS]pec.ts");

var uglifyLoaderConfig = {
    // I want to uglify with mangling only app files, not thirdparty libs
    test: /\.js$/,
    exclude: /.spec.js/, // excluding .spec files
    loader: "uglify"
};

var testingFiles = glob.sync("./src/app/**/*.spec.ts");

var entries = {
    noosfero: './src/app/boot.ts',
    'noosfero-test': ['./src/app/index.ts', './karma.entry.js'],
    'noosfero-specs': testFiles, // './src/specs.ts',
    'vendor.bundle': ['core-js', 'reflect-metadata', 'ng-forward', 'ng2-img-cropper',
      'ng-forward/cjs/testing/test-component-builder', 'zone.js', 'moment',
      '@angular/core','@angular/upgrade/static', '@angular/platform-browser-dynamic',
      '@angular/animations']
};

module.exports = function(env) {
    var theme = (env && env.theme) || process.env.npm_config_angular_theme_theme || "angular-default";
    console.log("THEME", theme);

    if (env && env.production) {
        extension = ".min.js"
    }

    var config = {
        entry: entries,

        plugins: [
            new CommonsChunkPlugin({name: "commons", filename: "commons.js",
                minChunks: function(module, count) {
                    return module.resource && (/node_modules/).test(module.resource) && count >= 2;
                }
            }),
            new ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                path.resolve(__dirname, 'doesnotexist/')
            )
        ],

        output: {
            path: path.join(__dirname, "src"),
            filename: "[name]" + extension,
        },

        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
            modules: ['themes/' + theme, 'src', 'node_modules']
        },
        // Source maps support (or 'inline-source-map' also works)
        devtool: 'source-map',

        module: {
            rules: [{
                test: /\.css$/,
                loader: "style!css"
            }, {
                test:        /\.scss$/,
                use: [
                    {loader: "style"}, {loader: "css?sourceMap"}, {loader: "sass?sourceMap"}
                ]
            }, {
                test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=100000'
            }, {
                test: /themes\/index.ts$/,
                loader: 'string-replace-loader',
                query: {
                    search: 'angular-default',
                    replace: theme
                }
            }, {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    ignoreDiagnostics: [2300, 2374, 2375, 2403, 2304, 2428]
                }
            },{
                test: /\.html$/,
                loader: 'html-loader'
            },{
                test: /src\/.+\.ts$/,
                exclude: /(node_modules|\.spec\.ts$)/,
                loader: 'istanbul-instrumenter-loader',
                enforce: 'post'
            }]
        }
    };


    // if webpack executed with --test argument, this code bellow will add a post-compilation
    // code which will run the Tests + Coverage (npm run coverage)
    if (env && env.test) {
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
            if (!env.singleRun && !stdinPatched) {
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
        config.plugins.push(onBuildPluginConfigured);
    }
    if (env && env.production) {
        config.module.loaders.push(uglifyLoaderConfig);
    }
    return config;
};
