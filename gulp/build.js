'use strict';

var path = require('path');
var gulp = require('gulp');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var merge = require('merge-stream');
var conf = require('./conf');
var languages = require('./languages');

var themeName = conf.paths.theme.replace('-', ' ');
themeName = themeName.charAt(0).toUpperCase() + themeName.slice(1);
var noosferoThemePrefix = path.join("/designs/themes/", conf.paths.theme, '/');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  var merged = merge();
  ['app', conf.paths.plugins].forEach(function(partialPath) {
    var srcPaths = [path.join(conf.paths.tmp, '/serve/app/**/*.html')];
    conf.paths.allSources.forEach(function(src) {
      srcPaths.push(path.join(src, partialPath, '/**/*.html'));
    });
    merged.add(gulp.src(srcPaths)
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe($.angularTemplatecache('templateCacheHtml-'+partialPath+'.js', {
        module: 'noosferoApp',
        root: partialPath
      }))
      .pipe(gulp.dest(conf.paths.tmp + '/partials/')));
  });
  return merged;
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src([
    path.join(conf.paths.tmp, '/partials/templateCacheHtml-app.js'),
    path.join(conf.paths.tmp, '/partials/templateCacheHtml-plugins.js')], { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html', { restore: true });
  var jsFilter = $.filter('**/*.js', { restore: true });
  var cssFilter = $.filter('**/*.css', { restore: true });
  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.replace('assets/images/', noosferoThemePrefix + 'assets/images/'))
    .pipe($.replace('/languages/', noosferoThemePrefix + 'languages/'))
    .pipe($.replace('bower_components/angular-i18n/', noosferoThemePrefix + 'locale/angular-i18n/'))
    .pipe($.replace('bower_components/moment/', noosferoThemePrefix + 'locale/moment/'))
    .pipe($.replace('bower_components/messageformat/', noosferoThemePrefix + 'locale/messageformat/'))
    .pipe($.sourcemaps.init())
    .pipe($.ngAnnotate())
    // TODO - check how to make uglify work with ngforward
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense, mangle: false, output: { beautify: false} })).on('error', conf.errorHandler('Uglify'))
    .pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.sourcemaps.init())
    .pipe($.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
    .pipe($.replace('../../bower_components/font-awesome/fonts/', '../fonts/'))
    .pipe($.minifyCss({ processImport: false }))
    .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace({prefix: noosferoThemePrefix}))
    .pipe(htmlFilter)
    .pipe($.replace('/bower_components/ng-ckeditor/libs/ckeditor/', noosferoThemePrefix + 'ng-ckeditor/libs/ckeditor/'))
    .pipe($.replace('/bower_components/ng-ckeditor/ng-ckeditor.min.js', noosferoThemePrefix + 'ng-ckeditor/ng-ckeditor.min.js'))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
  });

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('ckeditor', function () {
  return gulp.src(['bower_components/ng-ckeditor/**/*']).pipe(gulp.dest(path.join(conf.paths.dist, '/ng-ckeditor')));
});

gulp.task('locale', function () {
  return gulp.src([
    path.join("bower_components/angular-i18n", '*.js'),
    path.join("bower_components/moment/locale", '*.js'),
    path.join("bower_components/messageformat/locale", '*.js'),
  ], {base: 'bower_components/'})
    .pipe(gulp.dest(path.join(conf.paths.dist, '/locale/')));
});

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  var srcPaths = [path.join('!' + conf.paths.src, '/**/*.{map,ts,html,css,js,scss}')];
  conf.paths.allSources.forEach(function(src) {
    srcPaths.push(path.join(src, '/**/*'));
  });
  return gulp.src(srcPaths)
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
  return $.del(["dist", path.join(conf.paths.tmp, '/')]);
});

gulp.task('clean-docs', [], function() {
    return $.del([path.join(conf.paths.docs, '/')]);
});

gulp.task('plugin-languages', ['locale'], function() {
  return languages.pluginLanguages(conf.paths.dist);
});

gulp.task('noosfero', ['html'], function () {
    var layouts = gulp.src('layouts/**/*')
      .pipe(gulp.dest(path.join(conf.paths.dist, "layouts")));
    var theme = gulp.src('theme.yml')
      .pipe(insert.prepend('name: "' + themeName + '"\n'))
      .pipe(gulp.dest(conf.paths.dist));
    var index = gulp.src(path.join(conf.paths.dist, 'index.html'))
      .pipe(rename('index.html.erb'))
      .pipe(gulp.dest(conf.paths.dist));
    return merge(layouts, theme, index);
});

gulp.task('build', ['html', 'fonts', 'other', 'locale', 'ckeditor', 'plugin-languages', 'noosfero']);
