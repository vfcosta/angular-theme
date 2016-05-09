/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var argv = require('minimist')(process.argv.slice(2));
var gutil = require('gulp-util');
var path = require('path');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  plugins: 'plugins',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  docs: 'docs',
  themes: 'themes',
  languages: 'languages'
};
exports.configTheme = function(theme) {
  exports.paths.theme = theme || "angular-default";
  exports.paths.allSources = [exports.paths.src, path.join(exports.paths.themes, exports.paths.theme)];
  exports.paths.dist = path.join("dist", exports.paths.theme);
}
exports.configTheme(argv.theme);

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/jquery/, /\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/, /\/bootstrap\.css/],
  directory: 'bower_components'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
