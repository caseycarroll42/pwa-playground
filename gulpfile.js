var gulp = require('gulp')
var $ = require('gulp-load-plugins')();
var path = require('path')
var swPrecache = require('sw-precache')
var express = require('express')
var packageJson = require('./package.json')
var ghPages = require('gh-pages')
var runSequence = require('run-sequence')

var ROOT_DIR = 'app'
var port = 3030


gulp.task('generate-service-worker', function(callback) {  
  var config = {
    cacheId: packageJson.name,
    handleFetch: true,
    runtimeCaching: [{
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /runtime-caching/,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 1,
          name: 'runtime-cache'
        }
      }
    }],
    staticFileGlobs: [
      ROOT_DIR + '/styles/**.css',
      ROOT_DIR + '/**.html',
      ROOT_DIR + '/images/**.*',
      ROOT_DIR + '/js/**.js'
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
    var app = express();
    

    app.use(express.static(ROOT_DIR))    

    var server = app.listen(port, function() {
        var host = "localhost"
        var port = server.address().port
        console.log('Server running at http://%s:%s', host, port)
    })
})

gulp.task('gh-pages', ['build'], function(callback) {
  ghPages.publish(path.join(__dirname, 'app'), callback)
})
