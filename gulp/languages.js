'use strict';

var path = require('path');
var gulp = require('gulp');
var merge = require('merge-stream');
var conf = require('./conf');
var mergeJson = require('gulp-merge-json');
var glob = require("glob");

exports.pluginLanguages = function(dest) {
  var merged = merge();
  glob(path.join(conf.paths.src, conf.paths.languages, "*.json"), function (er, files) {
    files.forEach(function(file) {
      merged.add(exports.pluginLanguage(file, dest));
    });
  });
  return merged;
}

exports.pluginLanguage = function(file, dest) {
  var language = file.split('/').pop().replace('\.json','');
  return gulp.src(path.join(conf.paths.src, '**', conf.paths.languages, language+'.json'))
    .pipe(mergeJson(path.join(conf.paths.languages, language+'.json')))
    .pipe(gulp.dest(dest))
}

gulp.task('serve-languages', function() {
  return exports.pluginLanguages(path.join(conf.paths.tmp, '/serve'));
});
