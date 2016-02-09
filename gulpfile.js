/**
 * Created by Adebola on 04/02/2016.
 */
// assign the module to a local variable
var del = require('del');
var gulp = require('gulp');
var header = require('gulp-header');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var umd = require('gulp-wrap-umd');


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

var umdOptions = {
    exports: 'Observant',
    namespace: 'Observant'
};

// Clear
gulp.task('clear', function () {
    del.sync([distDir]);
});


// Javascript
gulp.task('js', function () {
    gulp.src('./src/index.js')
        .pipe(babel()).on('error', gutil.log.bind(gutil, 'Babel Error'))
        .pipe(umd(umdOptions))
        .pipe(header(banner, {pkg: pkg}))       // add header banner
        .pipe(rename({basename: 'observant'}))
        .pipe(gulp.dest(distDir + '/'));
});

// Watch
gulp.task('watch', ['js'], function () {
    gulp.watch('./src/**/*', ['js']);
});

// Defaults
gulp.task('build', ['js']);
gulp.task('default', ['build']);