'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  server.middleware = [proxyMiddleware('http://localhost:3000/api', {changeOrigin:false}),
                      //  proxyMiddleware('http://localhost:3000/myprofile', {changeOrigin:false}),
                       proxyMiddleware('http://localhost:3000/designs', {changeOrigin:false}),
                       proxyMiddleware('http://localhost:3000/image_uploads', {changeOrigin:false}),
                       proxyMiddleware('http://localhost:3000/articles', {changeOrigin:false}),
                       proxyMiddleware('http://localhost:3000/account/logout', {changeOrigin:false}),
                       proxyMiddleware('/ng2-filemanager', { target: 'http://localhost:4200' }),
                       proxyMiddleware('http://localhost:3000/images', {changeOrigin:false})];                       

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    port: 3001,
    browser: browser,
    notify: false
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['serve-languages', 'watch'], function () {
  var srcPaths = [path.join(conf.paths.tmp, '/serve')];
  conf.paths.allSources.reverse().forEach(function(src) {
    srcPaths.push(src);
  });
  browserSyncInit(srcPaths);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, []);
});
