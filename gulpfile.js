/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('ngdocs', ['clean-docs'], function () {
  var gulpDocs = require('gulp-ngdocs');
  var options = {
    scripts: [
      'bower_components/angular/angular.min.js',
      'bower_components/angular/angular.min.js.map',
      'bower_components/angular-animate/angular-animate.min.js',
      'bower_components/angular-animate/angular-animate.min.js.map'
      //'bower_components/angular/angular.js'
    ],
    html5Mode: true,
    startPage: '/',
    title: "Noosfero Angular Theme Documentation",
    //image: "path/to/my/image.png",
    //imageLink: "http://my-domain.com",
    titleLink: "/",
    loadDefaults: {
        angular: false,
        angularAnimate: false
    }
  }
  return gulpDocs.sections({
    api: {
      glob:[
          //'src/**/*.js', '!src/noosfero.js', '!src/noosfero-specs.js'
          //'src/noosfero.js'
          'src/**/*.ts'
      ],//, '!src/**/*.spec.js'],
      api: true,
      title: 'API Documentation'
    },
    tutorial: {
      glob: ['content/tutorial/*.ngdoc'],
      title: 'Tutorial'
    }
  }).pipe(gulpDocs.process(options)).pipe(gulp.dest('./docs'));
});

