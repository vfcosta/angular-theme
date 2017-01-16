'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var languages = require('./languages');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject-reload']);

  var stylePaths = [path.join(conf.paths.src, conf.paths.plugins, '/**/*.scss')];
  conf.paths.allSources.forEach(function(src) {
    stylePaths.push(path.join(src, '/app/**/*.css'));
    stylePaths.push(path.join(src, '/app/**/*.scss'));
  });

  gulp.watch(stylePaths, function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/**/*.js'), function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.paths.src, '**', conf.paths.languages, '*.json'), function(event) {
      languages.pluginLanguage(event.path, path.join(conf.paths.tmp, '/serve'));
  });

  var watchPaths = [];
  conf.paths.allSources.forEach(function(src) {
    watchPaths.push(path.join(src, '/app/**/*.html'));
    watchPaths.push(path.join(src, conf.paths.plugins, '/**/*.html'));
  });
  gulp.watch(watchPaths, function(event) {
    browserSync.reload(event.path);
  });

  gulp.start('inject-theme-options');
});
