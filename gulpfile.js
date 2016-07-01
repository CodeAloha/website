'use strict';
var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    watch  = require('gulp-watch'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-clean-css'),
    livereload = require('gulp-livereload');

gulp.task('sass', function () {
    gulp.src('./css/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifycss())
        .pipe(gulp.dest('./css'))
        .pipe(livereload());
});

gulp.task('js', function() {
    return gulp.src('./js/dist/*.js')
        .pipe(concat('main.js'))
        .pipe(minify())
        .pipe(gulp.dest('./js'));
});

gulp.task('run', function () {
    // Endless stream mode
    gulp.run('sass', 'js');
    gulp.watch([ './css/sass/*.scss', './js/dist/*.js' ], ['sass', 'js']);
});