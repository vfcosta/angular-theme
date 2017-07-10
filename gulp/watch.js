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
      gulp.start('scripts-reload-with-theme');
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.paths.src, '**', conf.paths.languages, '*.json'), function(event) {
      languages.pluginLanguage(event.path, path.join(conf.paths.tmp, '/serve'));
  });

  var watchPaths = [];
  gulp.watch(watchPaths, function(event) {
    browserSync.reload(event.path);
  });
});
