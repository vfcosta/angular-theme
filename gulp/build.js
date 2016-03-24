'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var noosferoThemePrefix = "/designs/themes/angular-theme/dist/";

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'noosferoApp',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
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
    //.pipe($.uglify({ preserveComments: $.uglifySaveLicense, mangle: true, output: { beautify: false} })).on('error', conf.errorHandler('Uglify'))
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

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{map,ts,html,css,js,scss}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('clean-docs', [], function() {
    return $.del([path.join(conf.paths.docs, '/')]);    
});

gulp.task('build', ['html', 'fonts', 'other', 'locale']);
