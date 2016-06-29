'use strict';
var gulp   = require('gulp'),
    watch  = require('gulp-watch'),
    sass   = require('gulp-sass'),
    uglify = require('gulp-uglifycss'),
    minify = require('gulp-clean-css'),
    concat = require('gulp-concat-css');

gulp.task('sass', function () {
    gulp.src('./css/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(uglify())
        .pipe(minify())
        .pipe(gulp.dest('./css'));
});

gulp.task('run', function () {
    // Endless stream mode
    gulp.watch('./css/sass/*.scss', ['sass']);
});