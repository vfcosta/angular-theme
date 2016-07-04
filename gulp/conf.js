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
var fs = require('fs-extra');

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

exports.isBuild = function () {
  if (!exports.building) {
    exports.building = (argv._[0] == 'build' ? true : false);
  }
  return exports.building;
};

exports.isDefaultTheme = function (name) {
  return /-default$/.test(name);
};

/**
* Check if theme folder exists on "themes" directory
*
* @param path The string relative path of the theme
*/
exports.themeExists = function (path) {
  try {
    fs.statSync(path);
  } catch (e) {
    throw new Error('The theme "'+exports.paths.theme+ ' on path "'+path+'" was not found');
  }
};

/**
* Check if skin file exists on "{theme}/app/layout/skins" directory
*
* @param skin The skin name passed by arg to gulp task
*/
exports.skinExists = function (skin) {
  
    var skinPath, prefixPath = '';
    var skinFile = skin+'.scss';
    if (/skin-/.test(skin)) {
       skinFile = skin.replace('skin-','_')+'.scss';
    }

    if (exports.isDefaultTheme(exports.paths.theme)) {
      prefixPath = exports.paths.src;
    }else {
      prefixPath = path.join(exports.paths.themes, exports.paths.theme);
    }

    skinPath = path.join(prefixPath, '/app/layout/scss/skins/', skinFile);

    try {
      fs.statSync(skinPath);
    } catch(e) {
      throw new Error('The skin file "'+skinPath+'" was not found');
    }

    var content = fs.readFileSync(skinPath, {encoding: 'utf8'});
    if (content.search(skin) == -1) {
      throw new Error('The skin css selector ".'+skin+'" was not found in "'+skinPath+'" file');
    }else if (content.search('@extend %skin-base') == -1) {
      throw new Error('The skin css selector ".'+skin+'" needs inherit from %skin-base sass placeholder');
    }

};

exports.configTheme = function(theme) {

  exports.paths.theme = theme || "angular-default";
  var themePath = path.join(exports.paths.themes, exports.paths.theme);

  exports.paths.allSources = [exports.paths.src, themePath];

  exports.themeExists(themePath);
  exports.paths.dist = path.join("dist", exports.paths.theme);

  if(exports.isBuild() && !exports.isDefaultTheme(exports.paths.theme)){

      try {
        fs.statSync(path.join(themePath,'package.json'));
        var themeData = fs.readJsonSync(path.join(themePath,'package.json'));

        if(!themeData.config || !themeData.config.skin) {
          throw new Error('The theme "'+exports.paths.theme+'" needs a default skin on their package.json file');
        }
        argv.skin = themeData.config.skin;
      } catch (e) {
        gutil.log(gutil.colors.yellow('[WARNING]','The package.json file was not found into theme:'), gutil.colors.cyan(exports.paths.theme));
      }

  }

  if(argv.skin && argv.skin != 'skin-whbl') {
    exports.skinExists(argv.skin);

    exports.paths.skin = argv.skin;
  }

  gutil.log('Configuring theme', gutil.colors.green(exports.paths.theme.toUpperCase()));
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
