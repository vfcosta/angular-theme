'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var map  = require('map-stream');
var transform = require('vinyl-transform');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function() {
  browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
  ])
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});

/**
* Replace the default theme skin to a npm config
*
* Uses "vinyl-transform" + "map-stream" to open the
* js file and rewrite the source file into the same
* destination
*
* @see https://www.npmjs.com/package/vinyl-transform
* @see https://www.npmjs.com/package/map-stream
*/
gulp.task('inject-skin', function () {

  if(conf.paths.skin) {

    var jsPaths = {
      src: path.join(conf.paths.src,'./noosfero.js'),
      dest: conf.paths.src,
    };

    $.util.log('Configuring theme skin:', conf.paths.skin, '...');

    var replaceSkin = transform(function(filename) {
      return map(function(file, next) {
        var contents = file.toString();
        contents = contents.replace('skin-whbl', conf.paths.skin);
        return next(null, contents);
      });
    });

    if (conf.isBuild()) {
      jsPaths.src = path.join(conf.paths.dist, 'scripts', 'app-*.js');
      jsPaths.dest = path.join(conf.paths.dist, 'scripts');
    }

    gulp.src(jsPaths.src)
        .pipe(replaceSkin)
        .pipe(gulp.dest(jsPaths.dest));
  }

});

/**
* Replace the default theme to a npm config
*/
gulp.task('inject-theme-components', function () {
  var jsPaths = {
    src: path.join(conf.paths.src, './noosfero.js'),
    dest: conf.paths.src,
  };

  var replaceTheme = transform(function(filename) {
    return map(function(file, next) {
      var contents = file.toString();
      contents = contents.replace('angular-default', conf.paths.theme);
      return next(null, contents);
    });
  });
  if (conf.isBuild()) {
    jsPaths.src = path.join(conf.paths.dist, 'scripts', 'app-*.js');
    jsPaths.dest = path.join(conf.paths.dist, 'scripts');
  }
  gulp.src(jsPaths.src)
      .pipe(replaceTheme)
      .pipe(gulp.dest(jsPaths.dest));
});
