
'use strict';

var gulp            = require('gulp'),
    bro             = require('gulp-bro'),
    gulpif          = require('gulp-if'),
    babelify        = require('babelify'),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify'),
    jshint          = require('gulp-jshint'),
    rename          = require('gulp-rename'),
    mincss          = require('gulp-minify-css'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('gulp-autoprefixer'),
    argv            = require('yargs').argv,
    uglify          = require('gulp-uglify'),
    strip           = require('gulp-strip-comments'),
    removeEmptyLines = require('gulp-remove-empty-lines');

/**
 * Bundle and minify all of the source script files
 */
gulp.task('scripts', function () {

    return gulp.src('./index.js')
        .pipe(bro({ transform: [
            babelify.configure({
                presets: [["preact-cli/babel", { "modules": "commonjs" }]],
                plugins: [],
            })
        ]}))
        .pipe(strip())
        .pipe(rename('app.js'))
        .pipe(gulp.dest('../server/public/pub/js'));
});

gulp.task('jshint', function() {
    return gulp.src('./**/*.js')
        .pipe(jshint(require('./config/jshint.js')))
        .pipe(jshint.reporter('default'))
});

gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
        .pipe(gulpif(argv.production, mincss()))
        .pipe(gulp.dest('../server/public/pub/css'));
});

gulp.task('minify', ['scripts'], function() {
    return gulp.src('../server/public/pub/js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('../server/public/pub/js'));
});

gulp.task('build', ['sass', 'scripts']);
gulp.task('prod', ['sass', 'scripts', 'minify']);

gulp.task('watch', function() {
    gulp.watch([
        './**/*.js',
        './scss/**'
    ], ['build']);
});
