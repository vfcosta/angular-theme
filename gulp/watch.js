'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject-reload']);

  var stylePaths = [];
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

  var watchPaths = [];
  conf.paths.allSources.forEach(function(src) {
    watchPaths.push(path.join(src, '/app/**/*.html'));
  });
  gulp.watch(watchPaths, function(event) {
    browserSync.reload(event.path);
  });
});
