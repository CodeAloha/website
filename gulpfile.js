'use strict';
var gulp   = require('gulp'),
    watch  = require('gulp-watch'),
    sass   = require('gulp-sass'),
    minify = require('gulp-minify'),
    minifycss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('sass', function () {
    gulp.src('./css/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifycss())
        .pipe(gulp.dest('./css'));
});

gulp.task('js', function() {
    return gulp.src('./js/dist/*.js')
        .pipe(uglify())
        .pipe(minify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('run', function () {
    // Endless stream mode
    gulp.watch([ './css/sass/*.scss', './js/dist/*.js' ], ['sass', 'js']);
});