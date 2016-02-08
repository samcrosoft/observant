/**
 * Created by Adebola on 04/02/2016.
 */
// assign the module to a local variable
var del = require('del');
var gulp = require('gulp');
var header = require('gulp-header');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var watchify = require('watchify');
var browserify = require('browserify');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var assign = require('lodash.assign');


/*
 * Variables
 */
var distDir = './dist';
// using data from package.json
var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');


var customOpts = {
    entries: ['./src/index.js'],
    debug: true
};
var opts = assign({}, watchify.args, customOpts);
//var b = watchify(browserify(opts));


// Clear
gulp.task('clear', function () {
    del.sync([distDir]);
});




// Javascript
gulp.task('js', function () {
    //return b.bundle()
    //    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    //    .pipe(source('observant'))
    //    .pipe(header(banner, {pkg: pkg}))       // add header banner
    //    .pipe(gulp.dest(distDir + '/'));

    gulp.src('./src/index.js')
        .pipe(babel())
        .pipe(header(banner, {pkg: pkg}))       // add header banner
        .pipe(rename({basename: 'observant'}))
        .pipe(gulp.dest(distDir + '/'));
});

// Watch
gulp.task('watch', ['js'], function() {
    gulp.watch('./src/**/*', ['js']);
});

// Defaults
gulp.task('build', ['js']);
gulp.task('default', ['build']);