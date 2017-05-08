var gulp = require('gulp')
var $ = require('gulp-load-plugins')();
var path = require('path')
var swPrecache = require('sw-precache')
var express = require('express')
var packageJson = require('./package.json')
var ghPages = require('gh-pages')
var runSequence = require('run-sequence')
var nodemon = require('nodemon')

var ROOT_DIR = 'app'
var port = 3030


gulp.task('generate-service-worker', function(callback) {  
  var config = {
    cacheId: packageJson.name,
    handleFetch: true,
    runtimeCaching: [{
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /stories/,
      handler: 'networkFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 15,
          name: 'stories-cache'
        }
      }
    }],
    staticFileGlobs: [
      ROOT_DIR + '/styles/**.css',
      ROOT_DIR + '/**.html',
      ROOT_DIR + '/images/**.*',
      ROOT_DIR + '/js/**.js',
      ROOT_DIR + '/components/**.js',
      ROOT_DIR + '/components/**.html'
    ],
    stripPrefix: ROOT_DIR + '/',
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  };
    
    swPrecache.write(path.join(ROOT_DIR, 'service-worker.js'), config, callback);
});

gulp.task('default', ['serve'])

gulp.task('build', function(callback) {
    runSequence('generate-service-worker', callback)
})

gulp.task('serve', ['generate-service-worker'], function(callback) {
    nodemon({
      script: 'index.js'
    })
})

gulp.task('gh-pages', ['build'], function(callback) {
  ghPages.publish(path.join(__dirname, 'app'), callback)
})
