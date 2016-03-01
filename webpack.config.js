/* global __dirname */

var argv = require("yargs").argv;
var path = require("path");
var glob = require("glob");
var webpack = require("webpack");

var extension = ".js";
if (argv.production) {
  extension = ".min.js"
}

var uglifyLoaderConfig = {
  // I want to uglify with mangling only app files, not thirdparty libs
  test: /\.js$/,
  exclude: /.spec.js/, // excluding .spec files
  loader: "uglify"
};

var testingFiles = glob.sync("./src/app/**/*.[sS]pec.ts");

var webpackConfig = {
  entry: {
    noosfero: './src/app/index.ts',
    'test': './src/test.ts'
  },


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

module.exports = webpackConfig;
